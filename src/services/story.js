/* eslint-disable import/prefer-default-export */
import axiosInstance from '@/services/axios';

/*
 * Creates new story.
 * @param {string} user email
 * @param {object} story
 */
export const save = async (email, story) => {
  await axiosInstance.post(
    '/story',
    { email, story },
  );
};
