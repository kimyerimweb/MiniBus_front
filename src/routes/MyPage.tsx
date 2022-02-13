import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

import {
  editProfileImage,
  getMyComments,
  getMyPosts,
  getUserInfo,
  signOut,
} from '../apis/auth';
import CommentItem from '../components/CommentItem';
import PostList from '../components/PostList';
import { myUserId } from '../utils/hasAuth';
import { CommentProps, PostProps } from './Home';

interface UserInfoProps {
  nickname: string,
  email: string,
  avatar: string,
  posts: PostProps[],
  postsCount: number,
  comments: CommentProps[],
  commentsCount: number,
}

function MyPage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfoProps>({
    nickname: '',
    email: '',
    avatar: '',
    posts: [],
    postsCount: 0,
    comments: [],
    commentsCount: 0,
  });
  const [profileImage, setProfileImage] = useState<File | any>(null);
  const [isPostsView, setIsPostsView] = useState(false);
  const [isCommentsView, setIsCommentsView] = useState(false);
  const [isActivePost, setIsActivePost] = useState(false);
  const [isActiveComment, setIsActiveComment] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getUserInfo(myUserId);
      const {
        user: { nickname, email, avatar },
        posts,
        comments,
      } = res;

      setUserInfo({
        ...userInfo,
        nickname,
        email,
        avatar,
        postsCount: posts.length,
        commentsCount: comments.length,
      });
    })();
  }, []);

  useEffect(() => {
    console.log('changed');
  }, [profileImage]);

  const handleChangeProfileImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    const { target: { files } } = e;
    if (files) {
      const file = files[0];

      setProfileImage(file);
      console.log(file);
      console.log(files[0]);
      console.log(profileImage);
    }
    console.log(profileImage);
  };

  const handleActivePostList = () => {
    setIsActivePost(true);
    setIsActiveComment(false);
  };

  const handleActiveCommentList = () => {
    setIsActivePost(false);
    setIsActiveComment(true);
  };

  const handleSubmitProfileImage = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    await editProfileImage(myUserId, profileImage);
  };

  const handleToggleContentsView = async (type: string) => {
    if (type === 'posts') {
      if (userInfo.posts.length === 0) {
        const posts = await getMyPosts(myUserId);
        setUserInfo({
          ...userInfo,
          posts,
        });
      }
      setIsCommentsView(false);
      setIsPostsView(prev => !prev);
    }

    if (type === 'comments') {
      if (userInfo.comments.length === 0) {
        const comments = await getMyComments(myUserId);
        setUserInfo({
          ...userInfo,
          comments,
        });
      }
      setIsPostsView(false);
      setIsCommentsView(prev => !prev);
    }
  };

  const handleSignOut = async () => {
    try {
      const res = await signOut();

      if (res) {
        localStorage.removeItem('Auth');
        navigate('/');
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!localStorage.getItem('Auth')) {
    return <Navigate replace to="/login" />;
  }

  return (
    <>
      <div className="container">
        <div className="mypage">
          <div className="row">
            <div className="col-sm-4">
              {!isPostsView && !isCommentsView &&
              <section className="mypage-profile">
                <div className="mypage-profile-avatar">
                  <div>
                    <form
                      onSubmit={handleSubmitProfileImage}
                      encType="multipart/form-data">
                      <label htmlFor="profileImage">
                        <img
                          src={userInfo.avatar}
                          alt="유저 사진"
                          className="mypage-profile-avatar-image"
                        />
                        <img
                          src="static/icons/icon-settings.svg"
                          alt="프로필 이미지 변경"
                          className="mypage-profile-avatar-edit"
                        />
                      </label>
                      <input
                        type="file"
                        id="profileImage"
                        accept="image/*"
                        hidden
                        onChange={handleChangeProfileImage}
                      />
                      {/* TODO: 제출 버튼 */}
                    </form>
                  </div>
                </div>
                <div className="mypage-profile-nickname">
                  {userInfo.nickname}
                </div>
              </section>}
              <section className="mypage-contents">
                <div onClick={
                  () => {
                    handleToggleContentsView('posts');
                    handleActivePostList();
                  }}
                className={isActivePost ? 'isActive' : undefined}>
                  <div>{userInfo.postsCount}</div>
                  <div>내가 쓴 글</div>
                </div>
                <div onClick={() => {
                  handleToggleContentsView('comments');
                  handleActiveCommentList();
                }}
                className={isActiveComment ? 'isActive' : undefined}>
                  <div>{userInfo.commentsCount}</div>
                  <div>내가 쓴 댓글</div>
                </div>
              </section>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              {isPostsView &&
              <section className="mypage-contents-posts">
                <PostList posts={userInfo.posts} />
              </section>
              }
              {isCommentsView &&
          <section className="mypage-contents-comments">
            {userInfo.comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
              />
            ))}
          </section>}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <section className="mypage-info">
                <h6>내 정보</h6>
                <div className="mypage-info-item mypage-info-account">
                  <div>계정정보</div>
                  <div className="mypage-info-account-email">
                    <div>
                      <img src="static/icons/icon_kakao_simple.svg" alt="카카오" />
                    </div>
                    {userInfo.email}
                  </div>
                </div>
                <div className="mypage-info-item">
                  <button onClick={handleSignOut}>로그아웃</button>
                </div>
                <div className="mypage-info-item">
                  <button>회원탈퇴</button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPage;
