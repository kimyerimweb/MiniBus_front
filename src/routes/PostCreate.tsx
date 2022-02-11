import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createPost } from '../apis/post';
import ImageInput from '../components/ImageInput';
import TagSelector from '../components/TagSelector';
import useInput from '../hooks/useInput';
import { useSelectId } from '../hooks/useSelectId';
import { myUserId } from '../utils/hasAuth';

function PostCreate() {
  const [
    selectedTransportation,
    handleChangeSelectedTransportation,
  ] = useSelectId<string>('');
  const [
    selectedRegion,
    handleChangeSelectedRegion,
  ] = useSelectId<string>('');

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [text, handleChangeText] = useInput('');

  const navigate = useNavigate();

  const handleSubmitPost
    = useCallback(async(
      e:
      React.FormEvent<HTMLFormElement>|
      React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (!selectedRegion) {
        alert('지역을 선택하세요!');
        return;
      }

      if (!selectedTransportation) {
        alert('타고 있는 교통수단을 선택하세요!');
        return;
      }

      if (!text.trim()) {
        alert('글 내용을 입력하세요!');
        return;
      }

      const response = await createPost(
        myUserId,
        text,
        selectedRegion,
        selectedTransportation,
        imageFiles);

      if (typeof response === 'number') {
        alert('글 작성이 완료되었습니다!');
        navigate(-1);
        return;
      }
      alert('다시 시도해주세요!');
    }, [imageFiles, text, selectedRegion, selectedTransportation]);

  return (
    <>
      <div className="container">
        <div className="post_create">
          <div className="row">
            <div className="col-sm-4">
              <header className="post_create-header">
                <button
                  className="post_create-back"
                  onClick={() => navigate(-1)}
                >
                  <img src="../static/icons/arrow-left.svg" alt="뒤로가기" />
                </button>
                <h1>의견</h1>
                <button
                  type="submit"
                  className="post_create-submit"
                  onClick={handleSubmitPost}
                >
                  남기기
                </button>
              </header>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <form onSubmit={handleSubmitPost} encType="multipart/form-data">
                <ImageInput
                  imageFiles={imageFiles}
                  setImageFiles={setImageFiles}
                />
                <textarea
                  placeholder="이동과 관련된 이야기를 나눠보세요."
                  value={text}
                  onChange={handleChangeText} />
              </form>
            </div>
          </div>
          <TagSelector
            selectedTransportationInfo={selectedTransportation}
            selectedRegionInfo={selectedRegion}
            handleChangeSelectedRegionInfo={handleChangeSelectedRegion}
            handleChangeSelectedTransportationInfo
              ={handleChangeSelectedTransportation}
          />
        </div>
      </div>
    </>
  );
}

export default React.memo(PostCreate);
