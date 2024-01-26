'use client';

import { Card } from '@radix-ui/themes';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import useSummery from '../hooks/useSummery';

type IssuesContainer = {
  label: string;
  value: number;
}[];

function IssueChart() {
  const { open, inProgress, closed } = useSummery();
  const data: IssuesContainer = [
    { label: 'Open', value: open },
    {
      label: 'In Progress',
      value: inProgress,
    },
    { label: 'Closed', value: closed },
  ];

  return (
    <Card className='w-full h-full'>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data}>
          <XAxis dataKey='label' />
          <YAxis />
          <Bar
            dataKey='value'
            barSize={70}
            style={{ fill: 'var(--accent-9)' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default IssueChart;
