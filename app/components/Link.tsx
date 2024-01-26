import NextLink from 'next/link';
import { Link as RadixLink } from '@radix-ui/themes';

type Props = {
  href: string;
  children: string;
};

function CustomLink({ href, children }: Props) {
  //we passed #passHref and legacyBehaviour as props when we custom next link component and has a children with 'a' tag
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
}

export default CustomLink;
