import { Text } from '@radix-ui/themes';

type Props = {
  children: React.ReactNode;
};

function ErrorMessage({ children }: Props) {
  if (!children) return null;
  return (
    <Text as='p' size='2' className='text-red-500'>
      {children}
    </Text>
  );
}

export default ErrorMessage;
