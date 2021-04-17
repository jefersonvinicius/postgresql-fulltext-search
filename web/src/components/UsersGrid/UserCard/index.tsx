import { Image } from '@chakra-ui/image';
import { Box } from '@chakra-ui/layout';
import React, { CSSProperties } from 'react';
import { User } from 'types';

type Props = {
  user: User;
  style?: CSSProperties;
};

export default function UserCard({ user, style }: Props) {
  return (
    <Box
      maxW="300px"
      maxH="350px"
      overflow="hidden"
      borderWidth="1px"
      borderColor="gray.300"
      borderRadius="lg"
      style={style}
    >
      <Image
        src={user.image}
        boxSize="300px"
        objectFit="cover"
        borderTopRightRadius="lg"
        borderTopLeftRadius="lg"
        maxH="200px"
      />
      <Box p="3" textOverflow="ellipsis" overflow="hidden">
        <Box color="teal" fontWeight="bold" fontSize="sm">
          {user.name} &bull; {user.email}
        </Box>
        <Box as="p" color="gray.500" fontSize="xs">
          {user.bio}
        </Box>
      </Box>
    </Box>
  );
}
