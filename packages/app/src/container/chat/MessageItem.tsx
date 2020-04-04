import React from 'react';
import { Box, MessageText } from '@im/component';

export default function ContainerMessageItem() {
  return (
    <Box>
      <MessageText>你好，世界！</MessageText>
      <MessageText reverse>Hello world</MessageText>
    </Box>
  );
}
