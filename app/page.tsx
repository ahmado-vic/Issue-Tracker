import IssueChart from './components/IssueChart';
import IssuesSummery from './components/IssuesSummery';
import LatestIssues from './components/LatestIssues';

export default async function Home() {
  return (
    <main className='flex flex-col gap-5 md:flex-row'>
      <section className='flex flex-col gap-4 basis-1 md:basis-[60%]'>
        <IssuesSummery />
        <IssueChart />
      </section>
      <aside className=' basis-1 md:basis-[40%]'>
        <LatestIssues />
      </aside>
    </main>
  );
}
