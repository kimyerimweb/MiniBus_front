import axios from 'axios';

const fetcher = (url: string) => {
  return axios.get(url)
    .then((res) => res.data.data)
    .catch((e) => console.error(e));
};

export default fetcher;
