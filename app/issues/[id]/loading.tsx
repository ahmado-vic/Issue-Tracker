import { Skeleton } from '@/app/components';
import { Card, Flex } from '@radix-ui/themes';

function SingleIssuePage() {
  return (
    <Card variant='surface' className='prose'>
      <Skeleton />
      <Flex gap='4' my='4'>
        <Skeleton width='5rem' />
        <Skeleton width='8rem' />
      </Flex>
      <Skeleton count={3} />
    </Card>
  );
}

export default SingleIssuePage;
