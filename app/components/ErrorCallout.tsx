import { Callout } from '@radix-ui/themes';
import { PropsWithChildren } from 'react';
import { BsInfoCircle } from 'react-icons/bs';

function ErrorCallout({ children }: PropsWithChildren) {
  if (!children) return;
  return (
    <Callout.Root color='red'>
      <Callout.Icon>
        <BsInfoCircle />
      </Callout.Icon>
      <Callout.Text>{children}</Callout.Text>
    </Callout.Root>
  );
}

export default ErrorCallout;
