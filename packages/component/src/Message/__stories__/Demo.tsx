import React from 'react';
import { MessageText, MessageMedia, MessageSystem, Box, Typography } from '../../';
import img from './img.jpg';

const Demo = () => {
  return (
    <Box bgcolor="#eee" px={1} py={3} minHeight="100vh" overflow="hidden">
      <Typography paragraph>文本消息：</Typography>
      <MessageText name="Jony">您好，在吗？</MessageText>
      <Box pt={2} />
      <MessageText reverse>不在</MessageText>
      <Box pt={2} />

      <Typography paragraph>图片消息：</Typography>
      <MessageMedia>
        <img src={img}></img>
      </MessageMedia>
      <Box pt={2} />

      <Typography paragraph>系统消息：</Typography>
      <MessageSystem>
        <Typography color="textSecondary" variant="caption" align="center" paragraph>
          sorrycc 加入了群聊
        </Typography>
      </MessageSystem>
      <MessageSystem message="大漠退出了群聊" />
    </Box>
  );
};

export default Demo;
