'use client';
import { Button } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

type Props = {
  id: string;
};

function EditButton({ id }: Props) {
  const router = useRouter();
  const handleClick = () => router.push(`/issues/edit/${id}`);

  return (
    <Button onClick={handleClick} className='w-52'>
      Edit Issue
    </Button>
  );
}

export default EditButton;
