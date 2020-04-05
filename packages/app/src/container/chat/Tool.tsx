import React from 'react';
import { AppBar, Toolbar, IconButton, Box, Button, InputBase, makeStyles, useTheme, fade } from '@im/component';
import { InsertEmoticon, ControlPoint, Mic } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  inputRoot: {
    color: 'inherit',
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

  const renderSend = () => {
    if (message.trim().length !== 0) {
      return (
        <Box pl={2} my={1}>
          <Button variant="contained" size="small" onClick={handleSend}>
            发送
          </Button>
        </Box>
      );
    }
    return (
      <Box>
        <IconButton edge="end" color="inherit" aria-label="send emoji">
          <InsertEmoticon />
        </IconButton>
        <IconButton edge="end" color="inherit" aria-label="open tool">
          <ControlPoint />
        </IconButton>
      </Box>
    );
  };

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
              value={message}
              onChange={handleMessageChange}
              classes={{
                root: classes.inputRoot,
              }}
              inputProps={{ 'aria-label': 'search' }}
              fullWidth
              multiline
              rowsMax={5}
            />
          </Box>
          {renderSend()}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
