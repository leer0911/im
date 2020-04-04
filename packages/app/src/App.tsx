import React from 'react';
import { CssBaseline, Box, useScrollTrigger } from '@im/component';
import { Header, Tool, Message } from './container';

export default function App() {
  const [scrollTarget, setScrollTarget] = React.useState<Node | undefined>(undefined);

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
      <Message ref={messageBoxRef} />
      <Tool />
    </Box>
  );
}
