import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import useSWRInfinite from 'swr/infinite';

import { baseUrl } from '../apis/baseUrl';
import Loading from '../components/Loading';
import PostList from '../components/PostList';
import SelectorGroup from '../components/SelectorGroup';
import { useSelectIdArray } from '../hooks/useSelectId';
import { fetcherWithParams } from '../utils/fetcher';

export interface ImageProps {
  id: number
  url: string
}

export interface CommentProps {
  id: number
  user: {
    id: number
    avatar: string
    nickname: string
  }
  text: string
  createdAt: Date | string
  updatedAt: Date | string
}

export interface CommentsProps {
  count: number
  contents: CommentProps[] | []
}

export interface PostProps {
  id: number
  user: {
    id: number
    email: string
    avatar: string
    nickname: string
  }
  createdAt: Date | string
  updatedAt: Date | string
  transportation: string
  region: string
  text: string
  images: ImageProps[] | []
  like: {
    count: number
    users: number[]
  }
  comments: {
    count: number
    contents: CommentProps[] | []
  }
}

function Home() {
  const pageSize = 5;
  const [endPointRef, isInView] = useInView();
  const [selectedSorting, setSelectdSorting] = useState('createdAt');
  const [selectedRegions, handleChangeSelectedRegions] =
    useSelectIdArray<string>([]);
  const [selectedTransportations, handleChangeSelectedTransportations] =
    useSelectIdArray<string>([]);

  const getKey = (pageNumber: number, previousPageData: PostProps[]) => {
    if (previousPageData && !previousPageData.length) {
      return null;
    } // 끝에 도달

    return [
      `${baseUrl}/posts`,
      {
        start: pageNumber,
        size: pageSize,
        sorting: selectedSorting,
        regions: selectedRegions?.join(','),
        transportations: selectedTransportations?.join(','),
      },
    ]; // SWR 키
  };

  const {
    data,
    isValidating, // 요청이나 갱신 로딩의 여부
    size,
    setSize,
  } = useSWRInfinite(getKey, fetcherWithParams, { refreshInterval: 60000 });

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (isInView && !isValidating) {
      setSize((prevState) => prevState + 1);
    }
  }, [isInView, isValidating]);

  const datas = data ? [].concat(...data) : [];

  return (
    <div className="container">
      <div className="background">
        <SelectorGroup
          selectedRegions={selectedRegions}
          selectedTransportations={selectedTransportations}
          setSelectdSorting={setSelectdSorting}
          handleChangeSelectedRegions={handleChangeSelectedRegions}
          handleChangeSelectedTransportations={
            handleChangeSelectedTransportations
          }
        />
        {!data ? <Loading /> : <PostList posts={datas} />}
        {isValidating ? <Loading /> : null}
        {!isValidating ? <div ref={endPointRef}>load more posts...</div> : null}
      </div>
    </div>
  );
}

export default Home;
