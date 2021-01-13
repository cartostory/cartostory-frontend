/* eslint-disable import/prefer-default-export */
import axiosInstance from '@/services/axios';

/*
 * Creates new story.
 * @param {string} user email
 * @param {object} story
 * @return {string} story id
 */
export const save = async (story) => {
  const { id, ...rest } = story;
  let result;

  if (id) {
    // eslint-disable-next-line no-use-before-define
    result = await update(id, rest);
  } else {
    // eslint-disable-next-line no-use-before-define
    result = await create(rest);
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

async function create(story) {
  const result = await axiosInstance.post(
    '/api/story',
    { story },
  );

  return result.data.id;
}

async function update(id, story) {
  const result = await axiosInstance.put(
    `/api/story/${id}`,
    { story },
  );

  return result.data.id;
}
