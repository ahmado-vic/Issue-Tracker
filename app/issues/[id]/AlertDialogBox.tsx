'use client';

import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import React from 'react';
import { useErrorStore } from '../UseErrorStore';

type Props = {
  error: boolean;
};

function AlertDialogBox({ error }: Props) {
  const removeError = useErrorStore(state => state.setIsErr);

  return (
    <div>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Error !</AlertDialog.Title>
          <AlertDialog.Description size='2'>
            This issue couldn't be delered !!
          </AlertDialog.Description>

          <Flex gap='3' mt='4' justify='end'>
            <AlertDialog.Cancel>
              <Button variant='solid' color='red' onClick={removeError}>
                Close
              </Button>
            </AlertDialog.Cancel>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
}

export default AlertDialogBox;
