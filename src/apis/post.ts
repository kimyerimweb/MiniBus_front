import axios from 'axios';

const baseUrl = 'http://3.37.182.59:8080/api';

export const getPosts = async (params: {
  start: number,
  size: number,
  sorting: string,
  regions?: string[],
  transportations?: string[]
}) => {
  const {
    start,
    size,
    sorting = 'createdAt',
    regions,
    transportations,
  } = params;

  try {
    const { data: { data } } = await axios.get(`${baseUrl}/posts`, {
      params: {
        start,
        size,
        sorting,
        regions: regions?.join(','),
        transportations: transportations?.join(','),
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (id: number) => {
  try {
    const { data } = await axios.delete(`${baseUrl}/post/${id}`);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (postId: number, userId: number) => {
  try {
    const { data } = await axios.put(`${baseUrl}/post/like/${postId}`, {
      userId,
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async(
  userId: number,
  content: string,
  region: string,
  transportation:string,
  imageFiles:File[]
) => {
  try {
    const formData = new FormData();

    formData.append('request', new Blob([
      JSON.stringify({
        userId,
        content,
        region,
        transportation,
      }),
    ],
    { type: 'application/json' }));

    if (imageFiles.length) {
      imageFiles.forEach(file => formData.append('img', file));
    }

    const { data: { data } } = await axios.post(
      'http://3.37.182.59:8080/api/post'
      , formData
    );

    return data;
  } catch (e) {
    console.error(e);
  }
};
