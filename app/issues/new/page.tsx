import { Metadata } from 'next';
import CreateNewIssue from './CreateNewIssue';

export const metadata: Metadata = {
  title: 'Create New Issue',
  description: 'Creating a new issue.',
};

function NewIssuePage() {
  return <CreateNewIssue />;
}

export default NewIssuePage;
