import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Box } from '../';
import MessageBase, { Props as MessageBaseProps } from './MessageBase';

export default function MessageText(props: MessageBaseProps) {
  const { reverse = false, avatar = '', name = '', children } = props;
  const theme = useTheme();
  return (
    <MessageBase reverse={reverse} avatar={avatar} name={name}>
      <Box
        color={reverse ? theme.palette.primary.contrastText : ''}
        bgcolor={reverse ? theme.palette.primary.light : theme.palette.background.paper}
        borderRadius={theme.shape.borderRadius}
      >
        <Box p={1}>{children}</Box>
      </Box>
    </MessageBase>
  );
}
