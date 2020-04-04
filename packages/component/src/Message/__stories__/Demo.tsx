import React from 'react';
import { MessageText, Box, MessageMedia } from '../../';
import img from './img.jpg';

const Demo = () => {
  return (
    <Box bgcolor="#eee" px={1} py={3} minHeight="100vh" overflow="hidden">
      <MessageText name="Jony">您好，在吗？</MessageText>
      <Box pt={2} />
      <MessageText reverse>不在</MessageText>
      <Box pt={2} />
      <MessageMedia>
        <img src={img}></img>
      </MessageMedia>
    </Box>
  );
};

export default Demo;
