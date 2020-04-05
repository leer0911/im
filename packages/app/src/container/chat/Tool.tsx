import React from 'react';
import { AppBar, Toolbar, IconButton, Box, Button, InputBase, makeStyles, useTheme, fade } from '@im/component';
import { InsertEmoticon, ControlPoint, Mic } from '@material-ui/icons';
import Emoji from './Emoji';
import Extra from './Extra';

const useStyles = makeStyles(() => ({
  inputRoot: {
    color: 'inherit',
    lineHeight: 1.43,
  },
}));

interface Props {
  socket: any;
  onSend: (message: string) => void;
}

export default function ContainerTool(props: Props) {
  const { socket, onSend } = props;
  const classes = useStyles();
  const theme = useTheme();

  const [emojiVisible, setEmojiVisible] = React.useState(false);
  const [extraVisible, setExtraVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (socket) {
      socket.emit('new message', message);
      onSend(message);
      setMessage('');
    }
  };

  const handleOpenEmoji = () => {
    setExtraVisible(false);
    setEmojiVisible(true);
  };

  const handleOpenTool = () => {
    setEmojiVisible(false);
    setExtraVisible(true);
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
    <>
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
                rowsMax={5}
                classes={{
                  root: classes.inputRoot,
                }}
                inputProps={{ 'aria-label': 'search' }}
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
      <Emoji visible={emojiVisible} onSelect={handleSelectEmoji} />
      <Extra visible={extraVisible} />
    </>
  );
}
