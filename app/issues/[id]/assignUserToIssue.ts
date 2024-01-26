import { Issue } from '@prisma/client';
import axios, { AxiosResponse } from 'axios';

export const assignUserToIssue = async (issueId: string, userId: string) => {
  const response: AxiosResponse<Issue> = await axios.post(
    `http://localhost:3000/api/issues/${issueId}?userId=${userId}`,
    userId
  );

  return response.data;
};
