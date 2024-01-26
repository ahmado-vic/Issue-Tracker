'use client';

import { validationSchema } from '@/app/validationSchema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import { createIssue } from '../_actions/createIssue';

type FormInputs = z.infer<typeof validationSchema>;

const IssueForm = dynamic(() => import('../_components/IssueForm'), {
  ssr: false,
});

function CreateNewIssue() {
  const router = useRouter();
  const [error, setError] = useState('');
  const queryClient = useQueryClient();

  const { mutateAsync: submitIssues } = useMutation({
    mutationFn: (issue: FormInputs) => createIssue(issue),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
      router.push('/issues');
    },
    onError: () => {
      setError('Something Went Wrong !');
    },
  });

  return <IssueForm submitFn={submitIssues} error={error} />;
}

export default CreateNewIssue;
