import { Metadata } from 'next';
import EditIssue from './EditIssue';

type Params = {
  params: {
    id: string;
  };
};

export const metadata: Metadata = {
  title: 'Edit Issue',
  description: 'Edit issue page.',
};

function EditIssuePage({ params: { id } }: Params) {
  return (
    <>
      <EditIssue id={id} />
    </>
  );
}

export default EditIssuePage;
