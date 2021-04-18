import React, { useMemo } from 'react';
import { Box } from '@chakra-ui/layout';
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { User } from 'types';
import UserCard from './UserCard';

type Props = {
  users: User[];
};

const NUMBER_OF_COLUMNS = 4;

function Cell({ rowIndex, columnIndex, style, data: users }: GridChildComponentProps) {
  const listIndex = NUMBER_OF_COLUMNS * rowIndex + columnIndex;
  const user = users[listIndex] as User;

  let justifyContent = 'flex-start';
  if (columnIndex === NUMBER_OF_COLUMNS - 1) {
    justifyContent = 'flex-end';
  } else if (columnIndex > 0) {
    justifyContent = 'center';
  }

  return (
    <Box d="flex" style={{ ...style, justifyContent: justifyContent }}>
      <UserCard key={String(user.id)} user={user} />
    </Box>
  );
}

export default function UsersGrid({ users }: Props) {
  const numberOfRows = useMemo(() => {
    return Math.ceil(users.length / NUMBER_OF_COLUMNS);
  }, [users.length]);

  return (
    <AutoSizer>
      {({ width, height }) => (
        <Grid
          className="List"
          columnCount={NUMBER_OF_COLUMNS}
          columnWidth={width / NUMBER_OF_COLUMNS}
          rowCount={numberOfRows}
          rowHeight={400}
          width={width}
          height={height}
          itemData={users}
        >
          {Cell}
        </Grid>
      )}
    </AutoSizer>
  );
}
