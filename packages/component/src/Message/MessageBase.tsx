import React from 'react';
import { Box, Avatar, Typography } from '../';

export interface Props {
  reverse?: boolean;
  avatar?: string;
  name?: string;
  children?: React.ReactNode;
}

export default function MessageText(props: Props) {
  const { reverse = false, avatar = '', name = '', children } = props;

  const [avatarWidth, setAvatarWidth] = React.useState();
  const avatarRef = React.useRef(null);

  React.useEffect(() => {
    const avatarEl: any = avatarRef.current;
    if (avatarEl) {
      const { width } = avatarEl.getBoundingClientRect();
      setAvatarWidth(width);
    }
  }, []);

  return (
    <Box display="flex" flexDirection={reverse ? 'row-reverse' : 'row'}>
      <Avatar ref={avatarRef} variant="rounded" src={avatar} />
      <Box display="flex" flexDirection="column" overflow="hidden" mx={1}>
        {!reverse && (
          <Typography variant="caption" color="textSecondary">
            {name}
          </Typography>
        )}
        {children}
      </Box>
      <Box width={avatarWidth} height={avatarWidth} flexShrink={0} />
    </Box>
  );
}
