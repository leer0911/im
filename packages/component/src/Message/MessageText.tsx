/**
 * @ Author: Lee
 * @ Description: 文本消息
 */

import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Box, makeStyles } from '../';
import MessageBase, { Props as MessageBaseProps } from './MessageBase';

const useStyles = makeStyles(theme => ({
  arrow: ({ reverse }: MessageBaseProps) => ({
    position: 'absolute',
    right: `${reverse ? '-4px' : 'auto'}`,
    left: `${reverse ? 'auto' : '-4px'}`,
    top: 8,
    width: 0,
    height: 0,
    borderTop: '4px solid transparent',
    borderBottom: '4px solid transparent',
    transform: `${reverse ? '' : 'rotate(180deg)'}`,
    borderLeft: `4px solid ${reverse ? theme.palette.primary.light : theme.palette.background.paper}`,
  }),
}));

export default function MessageText(props: MessageBaseProps) {
  const { reverse = false, avatar = '', name = '', children } = props;
  const classes = useStyles({ reverse });
  const theme = useTheme();
  return (
    <MessageBase reverse={reverse} avatar={avatar} name={name}>
      <Box
        position="relative"
        color={reverse ? theme.palette.primary.contrastText : ''}
        bgcolor={reverse ? theme.palette.primary.light : theme.palette.background.paper}
        borderRadius={theme.shape.borderRadius}
      >
        <div className={classes.arrow} />
        <Box p={1}>{children}</Box>
      </Box>
    </MessageBase>
  );
}
