import React, { SetStateAction, useCallback, useRef, useState } from 'react';

interface ImagesInfo {
  [x: string]: string;
}

interface ImageInputProps {
    imageFiles: File[],
    setImageFiles: React.Dispatch<SetStateAction<File[]>>
}

function ImageInput({ imageFiles, setImageFiles }:ImageInputProps) {
  const [imagesInfo, setImagesInfo] = useState<ImagesInfo>({});

  const handleUploadImages = (
    e:React.ChangeEvent<HTMLInputElement>
  ) => {
    if (imageFiles.length >= 10) {
      alert('사진은 10개 이하로 등록해주세요!');
      return;
    }

    if (e.target.files) {
      const submitImagesCount
        = e.target.files.length > 10 ? 10 : e.target.files.length;
      const submitableImageCount = 10 - imageFiles.length;

      const limit
      = submitImagesCount > submitableImageCount ?
        submitableImageCount : submitImagesCount;

      const newImagesInfo:ImagesInfo = {}; //key는 파일 경로, value는 파일 이름으로 한다.
      const newImageFiles = [];


      for (let i = 0;i < limit ;i++) {
        const file = e.target.files[i];
        const newImagePath = URL.createObjectURL(file);
        if (!Object.keys(imagesInfo).includes(newImagePath)) {
          newImagesInfo[newImagePath] = file.name;
          newImageFiles.push(file);
        }
      }
      setImagesInfo({ ...imagesInfo, ...newImagesInfo });
      setImageFiles([...imageFiles, ...newImageFiles]);
    }
  };

  const handleDeleteImages
    = useCallback((e:any) => {
      const filePath = e.target.id;
      const fileName = e.target.value;
      if (Object.keys(imagesInfo).includes(filePath)) {
        delete imagesInfo[filePath];
        setImageFiles([
          ...imageFiles.filter(
            file => {
              return file.name !== fileName;
            }),
        ]);
      } //여기서 e:any는 e.target.id때문에 작성했습니다. 원래 Event객체에 id라는 값이 없지만 써야해서..
    }, [imagesInfo, setImagesInfo, imageFiles, setImageFiles]);


  const imageInputRef = useRef<any>();
  const handleClickUploadButton = () => {
    imageInputRef.current.focus();
  };


  return (
    <>
      <label htmlFor="images" onClick={handleClickUploadButton}>
        <img src="../static/icons/icon-camera.svg" alt="사진 첨부" />
      </label>
      <input
        type="file"
        id="images"
        accept="image/*"
        multiple
        hidden
        ref={imageInputRef}
        onChange={handleUploadImages}
      />
      <p>게시글 등록 시 파일명에 한글이 포함되면 안됩니다.</p>
      {Object.entries(imagesInfo).map(image => (
        <div key={image[0]} >
          <button
            type="button"
            onClick={handleDeleteImages}
            id={image[0]}
            value={image[1]}>
                  삭제
          </button>
          <img
            src={image[0]}
            alt="유저 등록 이미지"
            width="100px" />
        </div>
      ))}
    </>
  );
}

export default React.memo(ImageInput);
