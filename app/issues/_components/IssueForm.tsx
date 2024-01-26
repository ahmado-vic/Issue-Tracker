'use client';

import { ErrorCallout, ErrorMessage, Spinner } from '@/app/components';
import { validationSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, TextField } from '@radix-ui/themes';
import { clsx } from 'clsx';
import 'easymde/dist/easymde.min.css';
import { usePathname } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { MutationFunction } from '@tanstack/react-query';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

type FormInputs = z.infer<typeof validationSchema>;

type Props = {
  submitFn: MutationFunction<Partial<Issue>, { title: string; body: string }>;
  error: string;
  issue?: Issue;
};

function IssueForm({ submitFn, error, issue }: Props) {
  const pathname = usePathname();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    resolver: zodResolver(validationSchema),
  });

  return (
    <form
      className='max-w-xl flex flex-col gap-4'
      onSubmit={handleSubmit(submitFn)}
    >
      <ErrorCallout>{error}</ErrorCallout>
      <TextField.Root>
        <TextField.Input
          placeholder='Title'
          {...register('title')}
          defaultValue={issue?.title}
        />
      </TextField.Root>
      <ErrorMessage>{errors.title?.message}</ErrorMessage>
      <Controller
        name='body'
        control={control}
        defaultValue={issue?.body}
        render={({ field }) => (
          <>
            <SimpleMDE placeholder='Issue Description...' {...field} />
            <ErrorMessage>{errors.body?.message}</ErrorMessage>
          </>
        )}
      />

      <Button
        className={clsx({
          'opacity-90': isSubmitting,
          'self-start': true,
        })}
        disabled={isSubmitting}
      >
        {pathname.includes('edit') ? 'Edit Issue' : ' Create New Issue'}
        {isSubmitting && <Spinner />}
      </Button>
    </form>
  );
}

export default IssueForm;
