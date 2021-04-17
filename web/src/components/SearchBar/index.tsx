import React from 'react';
import { Button } from '@chakra-ui/button';
import { SearchIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';
import { Box, Flex } from '@chakra-ui/layout';
import { User } from 'types';

type Props = {
  term: string;
  onChangeTerm: (term: string) => void;
  isSearching: boolean;
  users: User[];
  queryDuration: number;
};

export default function SearchBar({ term, onChangeTerm, isSearching, users, queryDuration }: Props) {
  return (
    <Flex direction="column">
      <Flex mb={1}>
        <Input variant="outline" colorScheme="teal" value={term} onChange={(e) => onChangeTerm(e.target.value)} />
        <Button colorScheme="teal" variant="ghost" isLoading={isSearching}>
          <SearchIcon />
        </Button>
      </Flex>
      {term.trim() && !isSearching && (
        <Box fontSize="sm" color="teal" fontWeight="bold">
          {users.length} usuário{users.length > 1 && 's'} encontrado{users.length > 1 && 's'} em{' '}
          {Math.trunc(queryDuration)}ms
        </Box>
      )}
    </Flex>
  );
}
