import React from 'react';
import { User } from '../../types';
import UserCard from './UserCard';

type Props = {
  users: User[];
};

export default function UsersGrid({ users }: Props) {
  return (
    <>
      {users.map((user) => (
        <UserCard key={String(user.id)} user={user} />
      ))}
    </>
  );
}
