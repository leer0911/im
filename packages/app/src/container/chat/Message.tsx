import React from 'react';
import { Box, RootRef, useTheme } from '@im/component';
import MessageItem from './MessageItem';

interface Props {
  messages: any;
}

function ContainerMessage(props: Props, ref: any) {
  const { messages = [] } = props;
  const theme = useTheme();

  return (
    <RootRef rootRef={ref}>
      <Box flexGrow={1} overflow="auto" p={2} bgcolor={theme.palette.background.default}>
        {messages.map((message: any) => (
          <Box key={message.id} mb={2}>
            <MessageItem data={message} />
          </Box>
        ))}
      </Box>
    </RootRef>
  );
}

export default React.forwardRef(ContainerMessage);
