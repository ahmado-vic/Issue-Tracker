'use client';

import { Button } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { deleteSingleIssue } from '../_actions/deleteIssue';
import { useErrorStore } from '../UseErrorStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Props = {
  id: string;
};

function DeleteButton({ id }: Props) {
  const router = useRouter();

  const changeError = useErrorStore(state => state.setIsErr);
  const queryClient = useQueryClient();

  //handler
  // const handleSubmit = async () => {
  //   try {
  //     await deleteSingleIssue(id);
  //     router.push('/issues');
  //   } catch (error) {
  //     changeError();
  //   }
  // };

  const { mutateAsync: handleSubmit } = useMutation({
    mutationFn: async () => await deleteSingleIssue(id),
    onSuccess: () => {
      router.push('/issues');
      queryClient.invalidateQueries({ queryKey: ['issues'] });
    },
    onError: () => {
      changeError();
    },
  });

  return (
    <>
      <Button onClick={() => handleSubmit()} color='red' className='w-52'>
        Delete Issue
      </Button>
    </>
  );
}

export default DeleteButton;
