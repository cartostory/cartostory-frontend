/* eslint-disable import/prefer-default-export */
import axiosInstance from '@/services/axios';

/*
 * Signs up user logged in for the first time.
 * @param {string} user email
 */
export const signup = async (email) => {
  await axiosInstance.post(
    '/api/auth/signup',
    { email },
  );
};
