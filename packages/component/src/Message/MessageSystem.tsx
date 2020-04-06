/**
 * @ Author: Lee
 * @ Description: 文本系统消息
 */

import React from 'react';
import { Box, Typography } from '../';

interface Props {
  message?: string;
  children?: JSX.Element;
}

export default function MessageSystem(props: Props) {
  const { message, children } = props;
  return (
    <Box>
      {message && (
        <Typography color="textSecondary" variant="caption" align="center" paragraph>
          {message}
        </Typography>
      )}
      {children}
    </Box>
  );
}
