/**
 * @ Author: Lee
 * @ Description: 聊天室状态分派中心
 */

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

// 从服务端接收的消息数据模型
interface WsMessage {
  id: string;
  type: MESSAGE_TYPE;
  numUsers: number;
  username: string;
  userId: string;
  message?: string;
}

function ContainerChat() {
  const { state, dispatch } = useChatStore();

  // 用户昵称
  const [username, setUsername] = React.useState('');
  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  // 建立 Socket 连接
  React.useEffect(() => {
    const socket: SocketIOClient.Socket = io('http://localhost:3002');
    dispatch({ type: Type.INSERT_SOCKET, payload: socket });
    return () => {
      socket.close();
    };
  }, [dispatch]);

  // 监听当前用户登录消息，保存当前 userId、新增聊天室成员
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

  // 监听其他用户进入聊天室，新增聊天室成员并发送用户加入聊天室的系统消息
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

  // 监听其他用户离开聊天室，发送用户离开的系统消息
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

  // 监听消息体，新增到消息列表
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

  // Socket 监听事件回调处理
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

  // 消息盒子滚动后顶部通栏阴影处理
  const [scrollTarget, setScrollTarget] = React.useState<Node | undefined>(undefined);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: scrollTarget,
  });
  const elevation = trigger ? 4 : 0;
  const messageBoxRef = (node: HTMLElement) => (node ? setScrollTarget(node) : setScrollTarget(undefined));

  // 聊天室用户输入昵称弹框
  const [open, setOpen] = React.useState(true);
  const handleOk = () => {
    if (username && state.socket) {
      state.socket.emit('add user', username);
      setOpen(false);
    }
  };

  // 点击消息盒子后，还原聊天室输工具栏状态
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
