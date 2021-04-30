import React, { useCallback } from 'react';
import { Button } from '@chakra-ui/button';
import { SearchIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';
import { Box, Divider, Flex } from '@chakra-ui/layout';
import { User } from 'types';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Switch } from '@chakra-ui/switch';

type Props = {
  term: string;
  onChangeTerm: (term: string) => void;
  isFullText: boolean;
  onChangeFullText: (isFullText: boolean) => void;
  isSearching: boolean;
  users: User[];
  queryDuration: number;
};

export default function SearchBar({
  term,
  onChangeTerm,
  isFullText,
  onChangeFullText,
  isSearching,
  users,
  queryDuration,
}: Props) {
  const getText = useCallback(() => {
    if (term.trim() && !isSearching) {
      const plural = users.length > 1 ? 's' : '';
      const duration = Math.trunc(queryDuration);
      return `${users.length} usuário${plural} encontrado${plural} em ${duration}ms`;
    }

    if (isSearching) {
      return 'Pesquisando...';
    }

    return '';
  }, [isSearching, queryDuration, term, users.length]);

  return (
    <Flex direction="column">
      <Flex mb={1}>
        <Input variant="outline" colorScheme="teal" value={term} onChange={(e) => onChangeTerm(e.target.value)} />
        <Button colorScheme="teal" variant="ghost" isLoading={isSearching}>
          <SearchIcon />
        </Button>
      </Flex>
      <Flex justifyContent="space-between" p="2">
        <Box fontSize="sm" color="teal" fontWeight="bold">
          {getText()}
        </Box>
        <Box>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="fulltext-search" mb="0">
              search fulltext
            </FormLabel>
            <Switch
              isChecked={isFullText}
              onChange={(e) => onChangeFullText(e.target.checked)}
              id="fulltext-search"
              colorScheme="teal"
            />
          </FormControl>
        </Box>
      </Flex>
      <Divider mb="2" colorScheme="teal" />
    </Flex>
  );
}
