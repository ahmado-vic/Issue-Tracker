import { Skeleton } from '@/app/components';
import { Box } from '@radix-ui/themes';

function NewIssuePage() {
  return (
    <Box className='max-w-xl flex flex-col gap-4'>
      <Box>
        <Skeleton width='36rem' />
      </Box>
      <Box>
        <Skeleton width='36rem' height='30rem' />
      </Box>
    </Box>
  );
}

export default NewIssuePage;
