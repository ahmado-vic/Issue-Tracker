import { Issue } from '@prisma/client';
import axios, { AxiosResponse } from 'axios';

export const deleteSingleIssue = async (id: string) => {
  const response: AxiosResponse<Issue> = await axios.delete(
    `http://localhost:3000/api/issues/${id}`
  );

  return response.data;
};
