/**
 * @ Author: Lee
 * @ Description: 消息列表展示
 */

import React from 'react';
import { Box, RootRef, useTheme } from '@im/component';
import MessageItem from './MessageItem';
import { Message } from './store';

interface Props {
  messages: Message[];
  onClick?: () => void;
}

function ContainerMessage(props: Props, ref: any) {
  const theme = useTheme();
  const { messages = [], onClick } = props;

  const [lastMessage, setLastMessage] = React.useState<HTMLElement | undefined>(undefined);
  const messageBoxRef = (index: number) => {
    return (node: HTMLElement | null) => {
      if (messages.length - 1 === index && node) {
        setLastMessage(node);
        return;
      }
      setLastMessage(undefined);
    };
  };

  // 获取最后一个消息，并将滚动到可视区域
  React.useEffect(() => {
    if (lastMessage) {
      lastMessage.scrollIntoView();
    }
  }, [lastMessage]);

  return (
    <RootRef rootRef={ref}>
      <Box flexGrow={1} overflow="auto" p={2} bgcolor={theme.palette.background.default} onClick={onClick}>
        {messages.map((message: Message, index: number) => (
          <div key={message.id} ref={messageBoxRef(index)}>
            <Box mb={2}>
              <MessageItem data={message} />
            </Box>
          </div>
        ))}
      </Box>
    </RootRef>
  );
}

export default React.forwardRef(ContainerMessage);
