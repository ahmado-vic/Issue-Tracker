import { getSingleIssue } from '../_actions/getIssues';
import SingleIssuePage from './SingleIssuePage';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params: { id } }: Props) {
  const issue = await getSingleIssue(id);
  return {
    title: issue.title,
  };
}

function IssuePage({ params: { id } }: Props) {
  return (
    <>
      <SingleIssuePage id={id} />
    </>
  );
}

export default IssuePage;
