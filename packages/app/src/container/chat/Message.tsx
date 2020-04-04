import React from 'react';
import { Box, RootRef, useTheme } from '@im/component';
import MessageItem from './MessageItem';

interface Props {}

function ContainerMessage(props: Props, ref: any) {
  const theme = useTheme();

  return (
    <RootRef rootRef={ref}>
      <Box flexGrow={1} overflow="auto" p={2} bgcolor={theme.palette.background.default}>
        <MessageItem />
      </Box>
    </RootRef>
  );
}

export default React.forwardRef(ContainerMessage);
