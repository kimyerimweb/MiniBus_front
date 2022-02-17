import React from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ImageProps } from '../routes/Home';

function ImageModal({ isOpen, closeModal, images }: {
  isOpen: boolean,
  closeModal: () => void,
  images: ImageProps[],
}) {
  return (
    <div className={isOpen ? 'modal openModal' : 'modal'}>
      <section>
        <button onClick={closeModal}>
          <i className="icon-cancel"></i>
        </button>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ type: 'fraction' }}
        >
          {images?.map(({ id, url }) => (
            <SwiperSlide key={id}>
              <img src={url} alt="유저 입력 사진" />
            </SwiperSlide>
          ))}
        </Swiper>

      </section>
    </div>
  );
}

export default ImageModal;
