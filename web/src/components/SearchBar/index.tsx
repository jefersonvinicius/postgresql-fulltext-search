import { Button } from '@chakra-ui/button';
import { SearchIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';
import { Flex, Stack } from '@chakra-ui/layout';
import { Radio, RadioGroup } from '@chakra-ui/radio';
import React from 'react';

type Props = {
  term: string;
  onChangeTerm: (term: string) => void;
  isSearching: boolean;
};

export default function SearchBar({ term, onChangeTerm, isSearching }: Props) {
  return (
    <Flex direction="column">
      <Flex mb={1}>
        <Input variant="outline" colorScheme="teal" value={term} onChange={(e) => onChangeTerm(e.target.value)} />
        <Button colorScheme="teal" variant="ghost" isLoading={isSearching}>
          <SearchIcon />
        </Button>
      </Flex>
      <RadioGroup colorScheme="teal">
        <Stack direction="row">
          <Radio value="fulltext">Fulltext</Radio>
          <Radio value="name">Name</Radio>
          <Radio value="email">Email</Radio>
          <Radio value="bio">Bio</Radio>
        </Stack>
      </RadioGroup>
    </Flex>
  );
}
