import React, { useState } from 'react';

import Options from './Options';

function WriteMetaInfo({ isPost, id, user, createdAt, updatedAt }: {
  isPost: boolean,
  id: number,
  user: {
    id: number,
    nickname: string,
    avatar: string,
  },
  createdAt: Date | string,
  updatedAt: Date | string,
}) {
  const [optionsView, setOptionsView] = useState(false);

  const handleOptionsView = () => {
    setOptionsView(prev => !prev);
  };

  createdAt = new Date(createdAt);
  updatedAt = new Date(updatedAt);

  const formatTime = (time: Date) => {
    const now = new Date().getTime();
    time = new Date(time);
    const timeGap = (now - time.getTime()) / 1000 / 60;

    if (timeGap < 1) {
      return '방금 전';
    }

    if (timeGap < 60) {
      return `${Math.floor(timeGap)}분 전`;
    }

    if (timeGap < 60 * 24) {
      return `${Math.floor(timeGap / 60)}시간 전`;
    }

    const year = String(time.getFullYear()).slice(2, 4);
    const month = time.getMonth() + 1 > 10
      ? time.getMonth() + 1
      : `0${time.getMonth() + 1}`;
    const date = time.getDate() > 10
      ? time.getDate()
      : `0${time.getDate()}`;
    const stringTime = `${year}.${month}.${date}`;

    return stringTime;
  };

  return (
    <>
      <div className="write_meta_info">
        <div className="write_meta_info-avatar">
          <img src={user.avatar} alt="아바타" />
        </div>
        <div>
          <div className="write_meta_info-user">
            {user.nickname}
          </div>
          <time
            className="write_meta_info-date"
            dateTime={String(createdAt)}
          >
            {formatTime(createdAt)}
            {JSON.stringify(createdAt) === JSON.stringify(updatedAt)
              ? null
              : ' (수정됨)'
            }
          </time>
        </div>
        <div className="write_meta_info-options">
          <div onClick={handleOptionsView} >
            <i className="icon-more"></i>
            {optionsView &&
            <Options
              isPost={isPost}
              id={id}
              userId={user.id}
            />}
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(WriteMetaInfo);
