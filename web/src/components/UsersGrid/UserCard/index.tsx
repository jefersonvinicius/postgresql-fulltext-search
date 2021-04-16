import { Image } from '@chakra-ui/image';
import { Box } from '@chakra-ui/layout';
import React from 'react';
import { User } from 'types';

type Props = {
  user: User;
};

export default function UserCard({ user }: Props) {
  return (
    <Box>
      <Image src={user.image} />
    </Box>
  );
}
