import axios from 'axios';
import { User } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:3332',
});

export const APIRequest = {
  async search(options: SearchOptions) {
    const searchParams = new URLSearchParams({
      q: options.term,
      fulltext: String(options.isFullText),
    });

    const queryString = searchParams.toString();
    const response = await api.get<SearchResult>(`/search?${queryString}`);

    return response;
  },
};

type SearchOptions = {
  term: string;
  isFullText: boolean;
};

type SearchResult = {
  users: User[];
  queryDuration: number;
};
