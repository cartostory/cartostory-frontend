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

export const load = async (id, token) => {
  const result = await axiosInstance.get(
    `/story/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return result;
};

async function create(story, token) {
  const result = await axiosInstance.post(
    '/story',
    { story },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return result.data.id;
}

async function update(id, story, token) {
  const result = await axiosInstance.put(
    `/story/${id}`,
    { story },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return result.data.id;
}
