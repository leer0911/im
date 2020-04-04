import React from 'react';
import { makeStyles, useTheme, fade } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Box, InputBase } from '@material-ui/core';
import { InsertEmoticon, ControlPoint, Mic } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  inputRoot: {
    color: 'inherit',
  },
}));

export default function ContainerTool() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <AppBar position="static" component="footer" elevation={4}>
      <Toolbar>
        <Box flexGrow={1} display="flex" alignItems="flex-end">
          <IconButton edge="start" color="inherit" aria-label="send voice">
            <Mic />
          </IconButton>
          <Box
            flexGrow={1}
            px={1}
            my={1}
            borderRadius={theme.shape.borderRadius}
            bgcolor={fade(theme.palette.common.white, 0.15)}
          >
            <InputBase
              classes={{
                root: classes.inputRoot,
              }}
              inputProps={{ 'aria-label': 'search' }}
              fullWidth
              multiline
              rowsMax={5}
            />
          </Box>
          <IconButton edge="end" color="inherit" aria-label="send emoji">
            <InsertEmoticon />
          </IconButton>
          <IconButton edge="end" color="inherit" aria-label="open tool">
            <ControlPoint />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
