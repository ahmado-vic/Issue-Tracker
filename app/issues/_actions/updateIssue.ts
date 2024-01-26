import { Issue } from '@prisma/client';
import axios, { AxiosResponse } from 'axios';

type Props = Pick<Issue, 'title' | 'body'>;

export const updateIssue = async (id: string, data: Props) => {
  const response: AxiosResponse<Issue> = await axios.put(
    `http://localhost:3000/api/issues/${id}`,
    data
  );

  return response.data;
};
