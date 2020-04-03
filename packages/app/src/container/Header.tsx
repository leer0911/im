import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { ArrowBackIos, MoreHoriz } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  backButton: {
    marginRight: theme.spacing(2),
  },
  moreButton: {
    marginLeft: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();
  const [title] = React.useState('聊天室');

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.backButton} color="inherit" aria-label="back">
          <ArrowBackIos />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        <IconButton edge="end" className={classes.moreButton} color="inherit" aria-label="more">
          <MoreHoriz />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

Header.displayName = 'ContainerHeader';
