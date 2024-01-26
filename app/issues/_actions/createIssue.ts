import { Issue } from '@prisma/client';
import axios, { AxiosResponse } from 'axios';

export const createIssue = async (issue: Partial<Issue>) => {
  const response: AxiosResponse<Partial<Issue>> = await axios.post(
    'http://localhost:3000/api/issues',
    issue
  );

  return response.data;
};
