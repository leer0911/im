import React from 'react';
import ImageIcon from '@material-ui/icons/Image';
import { Collapse, Box, Grid, Typography, useTheme } from '@im/component';
import { MESSAGE_TYPE } from '@im/helper';
import { useChatStore, Type } from './store';

interface Props {
  visible: boolean;
}

const images = ['https://material-ui.com/static/images/cards/paella.jpg'];

export default function Emoji(props: Props) {
  const { visible } = props;
  const theme = useTheme();
  const { state, dispatch } = useChatStore();
  const handleSendImage = () => {
    const payload = {
      id: `message-${state.messages.length}`,
      userId: state.currentUserId,
      isOwner: true,
      type: MESSAGE_TYPE.IMAGE_SIMPLE,
      content: { image: images[0] },
    };
    dispatch({
      type: Type.INSERT_MESSAGE,
      payload,
    });
    if (state.socket) {
      state.socket.emit('new message', { message: images[0], type: payload.type });
    }
  };

  return (
    <Collapse in={visible}>
      <Box overflow="auto" height={200} bgcolor={theme.palette.background.default} p={2}>
        <Grid container spacing={1}>
          <Grid item xs={3} onClick={handleSendImage}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box
                mb={1}
                width={50}
                height={50}
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor={theme.palette.background.paper}
                borderRadius={theme.shape.borderRadius}
              >
                <ImageIcon />
              </Box>
              <Typography color="textSecondary" variant="caption">
                相册
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Collapse>
  );
}
