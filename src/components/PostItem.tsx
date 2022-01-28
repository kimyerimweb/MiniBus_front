import axios from 'axios';
import React, { useState } from 'react';

import ImageSwiper from './ImageSwiper';
import Report from './Report';

export interface ImageProps {
  id: number,
  url: string
}

function PostItem() {
  const [view, setView] = useState(false);
  const images: ImageProps[] = [
    {
      id: 1,
      url: `https://picsum.photos/800?random=${Math.random()}`,
    },
    {
      id: 2,
      url: `https://picsum.photos/800?random=${Math.random()}`,
    },
    {
      id: 3,
      url: `https://picsum.photos/800?random=${Math.random()}`,
    },
    {
      id: 4,
      url: `https://picsum.photos/800?random=${Math.random()}`,
    },
  ];

  const handleReportView = () => {
    setView(prev => !prev);
  };

  return (
    <>
      <div className="post-container">
        <ul className="post-tag_list">
          <li>tag1</li>
          <li>tag2</li>
          <li>tag3</li>
        </ul>
        <div className="post-top">
          <div className="post-info">
            <div className="post-info-emotion">
              <img src="..\static\dummy\avatar-empty.png" alt="아바타" />
            </div>
            <time
              className="post-info-date"
              // dateTime ='2021-01-21'
            >
              created date
            </time>
          </div>
          <button className="post-report" onClick={handleReportView}>
            <img src="..\static\icons\icon_report.svg" alt="신고 버튼" />
          </button>
        </div>
        <div className="post-content">
          <p className="post-content-text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Porro fugiat hic blanditiis assumenda animi.
            Commodi accusantium, incidunt, quam sapiente vitae
            dolorum provident aliquam eligendi alias porro fugiat
            distinctio, voluptatibus ratione.
          </p>
          <ImageSwiper images={images} />
        </div>
        <div className="post-bottom">
          <button className="post-like">
            <div className="post-like-btn">
              <img src="..\static\icons\icon_like_empty.svg" alt="추천 버튼" />
            </div>
          </button>
          <div className="post-like-count">
            0
          </div>
          <button className="post-comment">
            <img src="static/icons/icon_comment.svg" alt="댓글 버튼" />
          </button>
          <div className="post-comment-count">
            0
          </div>
        </div>
        {view && <Report
          handleReportView={handleReportView}
          setView={setView} />}
      </div>
    </>
  );
}

export default PostItem;
