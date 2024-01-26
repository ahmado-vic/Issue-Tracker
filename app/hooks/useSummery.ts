import { useEffect, useState } from 'react';
import { summeryIssues } from '../issues/_actions/summeryIssues';

function useSummery() {
  const [open, setOpen] = useState<number>(0);
  const [inProgress, setInProgress] = useState<number>(0);
  const [closed, setClosed] = useState<number>(0);

  useEffect(() => {
    (async => {
      summeryIssues('OPEN').then(value => setOpen(value));
      summeryIssues('IN_PROGRESS').then(value => setInProgress(value));
      summeryIssues('CLOSED').then(value => setClosed(value));
    })();
  }, ['OPEN', 'IN_PROGRESS', 'CLOSED']);

  return { open, inProgress, closed };
}

export default useSummery;
