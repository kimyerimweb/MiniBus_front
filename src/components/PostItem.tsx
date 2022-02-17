import React, { useEffect, useState } from 'react';

import { PostProps } from '../routes/Home';
import { myUserId } from '../utils/hasAuth';
import CommentsWrapper from './CommentsWrapper';
import Like from './Like';
import PostContent from './PostContent';
import WriteMetaInfo from './WriteMetaInfo';

function PostItem({ post }: { post: PostProps }) {
  const {
    id,
    user,
    createdAt,
    updatedAt,
    transportation,
    region,
    text,
    images,
    like,
    comments,
  } = post;
  const tags = [transportation, region];
  const [commentsView, setCommentsView] = useState(false);
  const [isLikeActive, setIsLikeActive] = useState(false);

  const handleCommentsView = () => {
    setCommentsView(prev => !prev);
  };

  useEffect(() => {
    if (like.users.includes(myUserId)) {
      setIsLikeActive(prev => !prev);
    }
  }, []);

  return (
    <>
      <div className="post-container">
        <ul className="post-tag_list">
          {tags.map(tag => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <div className="post-top">
          <WriteMetaInfo
            isPost={true}
            id={id}
            user={user}
            createdAt={createdAt}
            updatedAt={updatedAt}
          />
        </div>
        <PostContent
          text={text}
          images={images}
        />
        <div className="post-bottom">
          <Like
            postId={id}
            isLikeActive={isLikeActive}
            setIsLikeActive={setIsLikeActive}
          />
          <button
            className="post-comment"
            onClick={handleCommentsView}
          >
            <i className="icon-comment"></i>
          </button>
          <div className="post-comment-count">
            {comments.count}
          </div>
        </div>
        {commentsView &&
        <CommentsWrapper postId={id} />
        }
      </div>
    </>
  );
}

export default React.memo(PostItem);
