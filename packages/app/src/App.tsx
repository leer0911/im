import React from 'react';
import io from 'socket.io-client';
import { CssBaseline, Box, useScrollTrigger, Button } from '@im/component';
import { Dialog, TextField, DialogActions, DialogContentText, DialogTitle, DialogContent } from '@im/component';
import { MESSAGE_TYPE } from '@im/helper';
import { Header, Tool, Message } from './container';

export default function App() {
  const [scrollTarget, setScrollTarget] = React.useState<Node | undefined>(undefined);
  const [open, setOpen] = React.useState(true);
  const [username, setUsername] = React.useState('');
  const [socket, setSocket] = React.useState<any>();
  const [messages, setMessages] = React.useState<any>([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    if (username && socket) {
      socket.emit('add user', username);
      setOpen(false);
    }
  };

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  React.useEffect(() => {
    const socket: any = io('http://localhost:3000');
    setSocket(socket);

    socket.on('user joined', (data: any) => {
      setMessages([
        ...messages,
        {
          id: messages.length,
          type: MESSAGE_TYPE.SYSTEM_TEXT_SIMPLE,
          content: { text: `欢迎 ${data.username} 加入聊天室` },
        },
      ]);
    });
  }, []);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: scrollTarget,
  });

  const elevation = trigger ? 4 : 0;
  const messageBoxRef = (node: HTMLElement) => (node ? setScrollTarget(node) : setScrollTarget(undefined));

  return (
    <Box display="flex" flexDirection="column" width="100vw" height="100vh" overflow="hidden">
      <CssBaseline />
      <Header elevation={elevation} />
      <Message ref={messageBoxRef} messages={messages} />
      <Tool />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">聊天室</DialogTitle>
        <DialogContent>
          <DialogContentText>欢迎来到聊天室，请输入你在本聊天室的昵称！</DialogContentText>
          <TextField
            value={username}
            onChange={handleUsername}
            autoFocus
            margin="dense"
            id="name"
            label="请输入昵称"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOk} color="primary">
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
