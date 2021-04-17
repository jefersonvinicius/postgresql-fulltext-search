import { Box } from '@chakra-ui/layout';
import React, { useMemo } from 'react';
import { AutoSizer, Grid, GridCellProps, WindowScroller } from 'react-virtualized';
import 'react-virtualized/styles.css';
import { User } from 'types';
import UserCard from './UserCard';

type Props = {
  users: User[];
};

const NUMBER_OF_COLUMNS = 4;

export default function UsersGrid({ users }: Props) {
  const numberOfRows = useMemo(() => {
    return Math.ceil(users.length / NUMBER_OF_COLUMNS);
  }, [users.length]);

  function renderCell(props: GridCellProps) {
    const listIndex = NUMBER_OF_COLUMNS * props.rowIndex + props.columnIndex;
    const user = users[listIndex];

    if (!user) return null;

    let justifyContent = 'flex-start';
    if (props.columnIndex === NUMBER_OF_COLUMNS - 1) {
      justifyContent = 'flex-end';
    } else if (props.columnIndex > 0) {
      justifyContent = 'center';
    }

    return (
      <Box d="flex" style={{ ...props.style, justifyContent: justifyContent }}>
        <UserCard key={props.key} user={user} />
      </Box>
    );
  }

  return (
    <WindowScroller>
      {({ height, isScrolling, onChildScroll, scrollTop }) => (
        <AutoSizer>
          {({ width }) => (
            <Grid
              autoHeight
              cellRenderer={renderCell}
              columnCount={NUMBER_OF_COLUMNS}
              columnWidth={width / NUMBER_OF_COLUMNS}
              rowCount={numberOfRows}
              rowHeight={400}
              width={width}
              height={height}
              isScrolling={isScrolling}
              scrollTop={scrollTop}
              onScroll={onChildScroll}
              style={{ outline: 'none' }}
            />
          )}
        </AutoSizer>
      )}
    </WindowScroller>
  );
}
