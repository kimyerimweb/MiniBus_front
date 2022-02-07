import React, { useState } from 'react';
import useSWR from 'swr';

import PostList from '../components/PostList';
import SelectorGroup from '../components/SelectorGroup';
import fetcher from '../utils/fetcher';
import { getPostsRequestURI } from '../utils/getUri';

function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [sortingState, setSortingState] = useState('createdAt');
  const [regionState, setRegionState] = useState<string[]>([]);
  const [transportationState, setTransportationState] = useState<string[]>([]);
  const pageSize = 10;

  const { data, error } = useSWR(getPostsRequestURI({
    start: currentPage,
    size: pageSize,
    sorting: sortingState,
    regionState,
    transportationState,
  }), fetcher);

  console.log(data);

  return (
    <div className="container">
      <div className="background">
        <SelectorGroup
          regionState={regionState}
          transportationState={transportationState}
          setSortingState={setSortingState}
          setRegionState={setRegionState}
          setTransportationState={setTransportationState}
        />
        <PostList />
      </div>
    </div>
  );
}

export default Home;

