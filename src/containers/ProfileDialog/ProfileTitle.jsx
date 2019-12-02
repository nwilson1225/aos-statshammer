import React from 'react';
import {
  Typography, DialogTitle, AppBar, Toolbar, IconButton,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  appBar: {
    position: 'relative',
  },
});

const ProfileTitle = ({ header, fullScreen, onClose }) => {
  const classes = useStyles();
  return (
    fullScreen
      ? (
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton onClick={onClose}><Close /></IconButton>
            <Typography variant="h6">{header}</Typography>
          </Toolbar>
        </AppBar>
      )
      : <DialogTitle>{header}</DialogTitle>
  );
};

export default ProfileTitle;