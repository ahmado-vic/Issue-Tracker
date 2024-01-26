import { Issue } from '@prisma/client';
import axios, { AxiosResponse } from 'axios';

type IssueAxiosResponse = {
  issues: Issue[];
  issuesCount: number;
  pageSize: number;
};

export const getIssues = async (page: number, status: string) => {
  const response: AxiosResponse<IssueAxiosResponse> = await axios.get(
    `http://localhost:3000/api/issues?status=${
      status === 'All' ? '' : status
    }&page=${page}`
  );

  return response.data;
};

export const getSingleIssue = async (id: string) => {
  const response: AxiosResponse<Issue> = await axios.get(
    `http://localhost:3000/api/issues/${id}`
  );

  return response.data;
};
