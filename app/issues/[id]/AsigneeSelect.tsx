'use client';

import { User } from '@prisma/client';
import { Avatar, Select } from '@radix-ui/themes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import { getSingleIssue } from '../_actions/getIssues';
import { assignUserToIssue } from './assignUserToIssue';

type Props = {
  users: User[];
  issueId: string;
};

function AsigneeSelect({ users, issueId }: Props) {
  const queryClient = useQueryClient();

  const { data: issue } = useQuery({
    queryKey: ['issue', { issueId }],
    queryFn: async () => await getSingleIssue(issueId),
  });

  const { mutateAsync: userToIssue } = useMutation({
    mutationFn: async (userId: string) =>
      await assignUserToIssue(issueId, userId),

    onError: () => {
      toast.error("Issue Couldn't be assigned!");
    },

    onSuccess: () => {
      toast.success('Issue has been asigned succesfully');
      queryClient.invalidateQueries({ queryKey: ['issue', { issueId }] });
    },
  });

  return (
    <>
      {issue && (
        <Select.Root
          onValueChange={issueId => userToIssue(issueId)}
          defaultValue={issue?.userId || ''}
        >
          <Select.Trigger
            placeholder='Assign User for issue...'
            variant='soft'
          />
          <Select.Content>
            <Select.Group>
              {users?.map(user => (
                <Select.Item key={user.id} value={user.id as string}>
                  <Avatar
                    src={user.image!}
                    fallback='a'
                    radius='full'
                    size='1'
                    className='mr-4'
                  />
                  <span>{user.name}</span>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      )}
      <Toaster />
    </>
  );
}

export default AsigneeSelect;
