import React from 'react';
import { Collapse, Box, Grid, Typography, useTheme } from '@im/component';
import ImageIcon from '@material-ui/icons/Image';

interface Props {
  visible: boolean;
}

export default function Emoji(props: Props) {
  const { visible } = props;
  const theme = useTheme();
  const handleSendImage = () => {
    // Call native
  };

  return (
    <Collapse in={visible}>
      <Box overflow="auto" height={200} bgcolor={theme.palette.background.default} p={2}>
        <Grid container spacing={1}>
          <Grid item xs={3} spacing={4} justify="center">
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
              <Typography color="textSecondary" variant="caption" onClick={handleSendImage}>
                相册
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Collapse>
  );
}
