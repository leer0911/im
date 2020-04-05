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
  const connectedRef = React.useRef(false);

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

  const handleSend = (message: string) => {
    setMessages([
      ...messages,
      {
        id: messages.length,
        username,
        isUser: true,
        type: MESSAGE_TYPE.TEXT_SIMPLE,
        content: { text: message },
      },
    ]);
  };

  React.useEffect(() => {
    const socket: any = io('http://localhost:3002');
    setSocket(socket);
  }, []);

  React.useEffect(() => {
    if (!socket) {
      return;
    }
    
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

    socket.on('new message', (data: any) => {
      setMessages([
        ...messages,
        {
          id: messages.length,
          username,
          type: MESSAGE_TYPE.TEXT_SIMPLE,
          content: { text: data.message },
        },
      ]);
    });

    socket.on('user left', (data: any) => {
      setMessages([
        ...messages,
        {
          id: messages.length,
          type: MESSAGE_TYPE.SYSTEM_TEXT_SIMPLE,
          content: { text: `${data.username} 离开了聊天室` },
        },
      ]);
    });

    connectedRef.current = true;
  }, [socket, messages, username]);

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
      <Tool socket={socket} onSend={handleSend} />

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">聊天室</DialogTitle>
        <DialogContent>
          <DialogContentText>欢迎来到聊天室，请输入您的昵称！</DialogContentText>
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
