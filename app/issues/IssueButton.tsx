'use client';
import { Button } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

function IssueButton() {
  const router = useRouter();

  const handleClick = () => router.push('/issues/new');
  return (
    <Button onClick={handleClick} className='self-start'>
      New Issue
    </Button>
  );
}

export default IssueButton;
