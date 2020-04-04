import React from 'react';
import { Box, RootRef } from '@material-ui/core';

interface Props {}

function ContainerMessage(props: Props, ref: any) {
  return (
    <RootRef rootRef={ref}>
      <Box flexGrow={1} overflow="auto">
        {[...new Array(12)]
          .map(
            () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
          )
          .join('\n')}
      </Box>
    </RootRef>
  );
}

export default React.forwardRef(ContainerMessage);
