import IssueButton from './IssueButton';
import IssueStatusFilter from './IssueStatusFilter';
import IssuesData from './IssuesData';

function issuesPage() {
  return (
    <div className='flex flex-col gap-4 max-w-full max-h-3/4'>
      <div className='flex justify-between'>
        <IssueButton />
        <IssueStatusFilter />
      </div>
      <IssuesData />
    </div>
  );
}

export default issuesPage;
