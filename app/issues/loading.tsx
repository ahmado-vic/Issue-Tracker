import { Skeleton } from '@/app/components';
import { Table } from '@radix-ui/themes';

function IssuesLoadingPage() {
  const issues = [1, 2, 3];
  return (
    <Table.Body>
      {issues?.map(issue => (
        <Table.Row key={issue}>
          <Table.RowHeaderCell>
            <Skeleton />
          </Table.RowHeaderCell>
          <Table.Cell className='hidden md:table-cell'>
            <Skeleton />
          </Table.Cell>
          <Table.Cell className='hidden md:table-cell'>
            <Skeleton />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  );
}

export default IssuesLoadingPage;
