import React, { useEffect, useRef, useState } from 'react';
import { Container } from '@chakra-ui/layout';
import SearchBar from './components/SearchBar';

import './global.css';
import { APIRequest } from './services/api';
import UsersGrid from './components/UsersGrid';
import { User } from 'types';

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [queryDuration, setQueryDuration] = useState(0);
  const [term, setTerm] = useState('');
  const [isFullText, setIsFullText] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const searchTimeout = useRef<number>();
  useEffect(() => {
    if (searchTimeout.current) {
      window.clearTimeout(searchTimeout.current);
    }

    if (term.trim() === '') {
      setUsers([]);
      setQueryDuration(0);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    searchTimeout.current = window.setTimeout(handleSearchTimeout, 1000);

    async function handleSearchTimeout() {
      try {
        const response = await APIRequest.search({ term, isFullText });
        setUsers(response.data.users);
        setQueryDuration(response.data.queryDuration);
      } catch {
      } finally {
        setIsSearching(false);
      }
    }
  }, [isFullText, term]);

  return (
    <Container w="full" maxWidth="none" h="full" margin="0" p="5">
      <SearchBar
        term={term}
        onChangeTerm={setTerm}
        isFullText={isFullText}
        onChangeFullText={setIsFullText}
        isSearching={isSearching}
        users={users}
        queryDuration={queryDuration}
      />
      <UsersGrid users={users} />
    </Container>
  );
}
