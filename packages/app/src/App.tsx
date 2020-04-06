import React from 'react';
import { createMuiTheme, ThemeProvider } from '@im/component';
import { grey } from '@material-ui/core/colors';
import { Chat } from './container';
import { ContextStore, useStore } from './store';

const theme = createMuiTheme({
  palette: {
    background: {
      default: grey[100],
    },
  },
});

export default function App() {
  const store = useStore();

  return (
    <ContextStore.Provider value={store}>
      <ThemeProvider theme={theme}>
        <Chat />
      </ThemeProvider>
    </ContextStore.Provider>
  );
}
