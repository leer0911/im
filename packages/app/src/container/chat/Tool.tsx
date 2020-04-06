import React from 'react';
import { AppBar, Toolbar, IconButton, Box, Button, InputBase, makeStyles, useTheme, fade } from '@im/component';
import { InsertEmoticon, ControlPoint, Mic } from '@material-ui/icons';
import { MESSAGE_TYPE } from '@im/helper';
import Emoji from './Emoji';
import Extra from './Extra';
import { useChatStore, Type, ActiveTool } from './store';

const useStyles = makeStyles(() => ({
  inputRoot: {
    color: 'inherit',
    lineHeight: 1.43,
  },
}));

function ContainerTool() {
  const classes = useStyles();
  const theme = useTheme();
  const { state, dispatch } = useChatStore();

  const [message, setMessage] = React.useState('');
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (state.socket) {
      state.socket.emit('new message', { message, type: MESSAGE_TYPE.TEXT_SIMPLE });
      dispatch({
        type: Type.INSERT_MESSAGE,
        payload: {
          id: `message-${state.messages.length}`,
          userId: state.currentUserId,
          isOwner: true,
          type: MESSAGE_TYPE.TEXT_SIMPLE,
          content: { text: message },
        },
      });
      setMessage('');
    }
  };

  const handleMessageInputFocus = () => {
    dispatch({ type: Type.UPDATE_ACTIVE_TOOL, payload: ActiveTool.NULL });
  };

  const handleOpenEmoji = () => {
    dispatch({ type: Type.UPDATE_ACTIVE_TOOL, payload: ActiveTool.EMOJI });
  };

  const handleOpenTool = () => {
    dispatch({ type: Type.UPDATE_ACTIVE_TOOL, payload: ActiveTool.EXTRA });
  };

  const handleSelectEmoji = (emoji: string) => {
    setMessage(`${message} ${emoji}`);
  };

  const renderSend = () => {
    if (message.trim().length !== 0) {
      return (
        <Box pl={1} my={1}>
          <Button variant="contained" size="small" onClick={handleSend}>
            发送
          </Button>
        </Box>
      );
    }
    return (
      <IconButton edge="end" color="inherit" aria-label="open more tool" onClick={handleOpenTool}>
        <ControlPoint />
      </IconButton>
    );
  };

  return (
    <Box flexShrink={0}>
      <AppBar position="static" component="footer" elevation={1}>
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
                value={message}
                onChange={handleMessageChange}
                onFocus={handleMessageInputFocus}
                rowsMax={5}
                classes={{
                  root: classes.inputRoot,
                }}
                inputProps={{ 'aria-label': 'message input' }}
                fullWidth
                multiline
              />
            </Box>
            <IconButton edge="end" color="inherit" aria-label="send emoji" onClick={handleOpenEmoji}>
              <InsertEmoticon />
            </IconButton>
            {renderSend()}
          </Box>
        </Toolbar>
      </AppBar>
      <Emoji visible={state.activeTool === ActiveTool.EMOJI} onSelect={handleSelectEmoji} />
      <Extra visible={state.activeTool === ActiveTool.EXTRA} />
    </Box>
  );
}

export default ContainerTool;
