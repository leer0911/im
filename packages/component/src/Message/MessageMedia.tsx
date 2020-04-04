import React from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import MessageBase, { Props } from './MessageBase';

const useStyles = makeStyles(theme => ({
  messageMedia: {
    '& img': {
      maxWidth: '50vw',
      maxHeight: '150px',
      display: 'block',
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

export default function MessageText(props: Props) {
  const { reverse = false, avatar = '', name = '', children } = props;
  const theme = useTheme();
  const classes = useStyles();

  return (
    <MessageBase reverse={reverse} avatar={avatar} name={name}>
      <Box
        border={1}
        borderColor={theme.palette.divider}
        borderRadius={theme.shape.borderRadius}
        className={classes.messageMedia}
      >
        {children}
      </Box>
    </MessageBase>
  );
}
