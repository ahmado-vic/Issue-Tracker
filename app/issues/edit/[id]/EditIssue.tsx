'use client';

import { validationSchema } from '@/app/validationSchema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useErrorStore } from '../../UseErrorStore';
import { getSingleIssue } from '../../_actions/getIssues';
import { updateIssue } from '../../_actions/updateIssue';

type Props = {
  id: string;
};

type FormInputs = z.infer<typeof validationSchema>;

const IssueForm = dynamic(() => import('../../_components/IssueForm'), {
  ssr: false,
});

function EditIssue({ id }: Props) {
  const error = useErrorStore(state => state.errMsg);
  const setError = useErrorStore(state => state.setErrMsg);

  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: issue } = useQuery({
    queryFn: () => getSingleIssue(id),
    queryKey: ['issues', { id }],
  });

  const { mutateAsync: EditIssue } = useMutation({
    mutationFn: async (data: FormInputs) => await updateIssue(id, data),
    onSuccess: () => {
      router.push('/issues');
      queryClient.invalidateQueries({ queryKey: ['issues'] });
    },
    onError: () => {
      setError('Some thing wen wrong while fetching!');
    },
  });

  return <IssueForm submitFn={EditIssue} error={error} issue={issue} />;
}

export default EditIssue;
