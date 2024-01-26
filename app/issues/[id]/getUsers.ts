import { Issue, User } from '@prisma/client';
import axios, { AxiosResponse } from 'axios';

export const getUsers = async () => {
  const response: AxiosResponse<User[]> = await axios.get(
    'http://localhost:3000/api/users'
  );

  return response.data;
};
