import React from 'react';
import { Box, RootRef, useTheme } from '@im/component';
import { MESSAGE_TYPE } from '@im/helper';
import MessageItem from './MessageItem';
import image from '../../assets/img.jpg';

interface Props {}

const messages = [
  { id: 1, type: MESSAGE_TYPE.TEXT_SIMPLE, content: { text: '请问有什么可以帮您？' }, userId: '1' },
  { id: 2, type: MESSAGE_TYPE.TEXT_SIMPLE, content: { text: '我要买个变色龙 ，你能帮我推荐一下吗！' }, userId: '2' },
  { id: 3, type: MESSAGE_TYPE.IMAGE_SIMPLE, content: { image }, userId: '1' },
  { id: 4, type: MESSAGE_TYPE.TEXT_SIMPLE, content: { text: '谢谢您！' }, userId: '2' },
  { id: 5, type: MESSAGE_TYPE.SYSTEM_TEXT_SIMPLE, content: { text: '请注意保护您的个人财产！' } },
];

function ContainerMessage(props: Props, ref: any) {
  const theme = useTheme();

  return (
    <RootRef rootRef={ref}>
      <Box flexGrow={1} overflow="auto" p={2} bgcolor={theme.palette.background.default}>
        {messages.map(message => (
          <Box key={message.id} mb={2}>
            <MessageItem data={message} />
          </Box>
        ))}
      </Box>
    </RootRef>
  );
}

export default React.forwardRef(ContainerMessage);
