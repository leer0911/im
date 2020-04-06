import React from 'react';
import io from 'socket.io-client';
import { CssBaseline, Box, useScrollTrigger, Button } from '@im/component';
import { Dialog, TextField, DialogActions, DialogContentText, DialogTitle, DialogContent } from '@im/component';
import { MESSAGE_TYPE } from '@im/helper';
import Header from './Header';
import Tool from './Tool';
import Message from './Message';
import { ChatProvider, initialState, reducer, useChatStore, Type, ActiveTool } from './store';

const avatars = [...new Array(7)].map((_, index) => `https://material-ui.com/static/images/avatar/${index + 1}.jpg`);

interface WsMessage {
  id: string;
  type: MESSAGE_TYPE;
  numUsers: number;
  username: string;
  userId: string;
  message?: string;
}

function ContainerChat() {
  const [scrollTarget, setScrollTarget] = React.useState<Node | undefined>(undefined);
  const [open, setOpen] = React.useState(true);
  const [username, setUsername] = React.useState('');
  const { state, dispatch } = useChatStore();

  const handleLogin = React.useCallback(
    (data: WsMessage) => {
      dispatch({ type: Type.UPDATE_CURRENT_USER_ID, payload: data.userId });
      dispatch({
        type: Type.INSERT_MEMBER,
        payload: {
          id: data.userId,
          name: username,
          avatar: avatars[data.numUsers - 1] || '',
        },
      });
    },
    [username, dispatch],
  );

  const handleUserJoin = React.useCallback(
    (data: WsMessage) => {
      const { numUsers = 0, username = '', userId = '' } = data;
      dispatch({
        type: Type.INSERT_MEMBER,
        payload: {
          id: userId,
          name: username,
          avatar: avatars[numUsers - 1] || '',
        },
      });

      dispatch({
        type: Type.INSERT_MESSAGE,
        payload: {
          id: data.id,
          type: MESSAGE_TYPE.SYSTEM_TEXT_SIMPLE,
          content: { text: `欢迎 ${username} 加入聊天室` },
        },
      });
    },
    [dispatch],
  );

  const handleUserLeft = React.useCallback(
    (data: WsMessage) => {
      dispatch({
        type: Type.INSERT_MESSAGE,
        payload: {
          id: data.id,
          type: MESSAGE_TYPE.SYSTEM_TEXT_SIMPLE,
          content: { text: `${data.username} 离开了聊天室` },
        },
      });
    },
    [dispatch],
  );

  const handelNewMessage = React.useCallback(
    (data: WsMessage) => {
      dispatch({
        type: Type.INSERT_MESSAGE,
        payload: {
          id: data.id,
          userId: data.userId,
          type: data.type,
          content: { text: data.message, image: data.message },
        },
      });
    },
    [dispatch],
  );

  React.useEffect(() => {
    const socket: SocketIOClient.Socket = io('http://192.168.31.32:3002');
    dispatch({ type: Type.INSERT_SOCKET, payload: socket });
    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  React.useEffect(() => {
    if (!state.socket) {
      return;
    }
    state.socket.removeAllListeners();

    state.socket.on('login', handleLogin);
    state.socket.on('user joined', handleUserJoin);
    state.socket.on('user left', handleUserLeft);
    state.socket.on('new message', handelNewMessage);
  }, [state.socket, handleLogin, handleUserJoin, handelNewMessage, handleUserLeft]);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: scrollTarget,
  });

  const elevation = trigger ? 4 : 0;
  const messageBoxRef = (node: HTMLElement) => (node ? setScrollTarget(node) : setScrollTarget(undefined));

  const handleOk = () => {
    if (username && state.socket) {
      state.socket.emit('add user', username);

      setOpen(false);
    }
  };

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleMessageBoxClick = () => {
    dispatch({ type: Type.UPDATE_ACTIVE_TOOL, payload: ActiveTool.NULL });
  };

  return (
    <Box display="flex" flexDirection="column" width="100vw" height="100vh" overflow="hidden">
      <CssBaseline />
      <Header elevation={elevation} />
      <Message ref={messageBoxRef} messages={state.messages} onClick={handleMessageBoxClick} />
      <Tool />

      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">FE 聊天室</DialogTitle>
        <DialogContent>
          <DialogContentText>欢迎来到 FE 聊天室，在这可以畅聊前端想法！</DialogContentText>
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

export default function Chat() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <ChatProvider value={{ state, dispatch }}>
      <ContainerChat />
    </ChatProvider>
  );
}
