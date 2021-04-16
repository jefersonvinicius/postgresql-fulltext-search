import React, { useEffect, useRef, useState } from 'react';
import { Container } from '@chakra-ui/layout';
import SearchBar from './components/SearchBar';

import './global.css';
import { APIRequest } from './services/api';
import UsersGrid from './components/UsersGrid';
import { User } from 'types';

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [term, setTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const searchTimeout = useRef<number>();
  useEffect(() => {
    if (searchTimeout.current) {
      window.clearTimeout(searchTimeout.current);
    }

    if (term.trim() === '') return;

    searchTimeout.current = window.setTimeout(handleSearchTimeout, 1000);

    async function handleSearchTimeout() {
      setIsSearching(true);
      try {
        const response = await APIRequest.search({ term });
        setUsers(response.data.users);
        console.table(response.data.users);
      } catch {
      } finally {
        setIsSearching(false);
      }
    }
  }, [term]);

  return (
    <Container>
      <SearchBar term={term} onChangeTerm={setTerm} isSearching={isSearching} />
      <UsersGrid users={users} />
    </Container>
  );
}
