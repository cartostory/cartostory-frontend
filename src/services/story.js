/* eslint-disable import/prefer-default-export */
import axiosInstance from '@/services/axios';

/*
 * Creates new story.
 * @param {string} user email
 * @param {object} story
 * @return {string} story id
 */
export const save = async (story, token) => {
  const { id, ...rest } = story;
  let result;

  if (id) {
    // eslint-disable-next-line no-use-before-define
    result = await update(id, rest, token);
  } else {
    // eslint-disable-next-line no-use-before-define
    result = await create(rest, token);
  }

  return result;
};

export const load = async (id) => {
  const result = await axiosInstance.get(`/api/story/${id}`);
  return result;
};

export const loadMany = async () => {
  const result = await axiosInstance.get('/api/stories');

  return result.data;
};

async function create(story, token) {
  const result = await axiosInstance.post(
    '/api/story',
    { story },
    {
      headers: {
        Authorization: token,
      },
    },
  );

  return result.data.id;
}

async function update(id, story, token) {
  const result = await axiosInstance.put(
    `/api/story/${id}`,
    { story },
    {
      headers: {
        Authorization: token,
      },
    },
  );

  return result.data.id;
}
