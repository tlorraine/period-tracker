import React, { useState, useMemo, forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {
  Drawer, IconButton, List, ListItem, ListItemText,
} from '@material-ui/core';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function ListItemLink(props) {
  const { primary, to } = props;

  const renderLink = useMemo(
    () => forwardRef((itemProps, ref) => (
      <RouterLink to={to} ref={ref} {...itemProps} />
    )),
    [to],
  );

  return (
    <li>
      <ListItem key={primary} button component={renderLink}>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

const privateRoutes = ['Home', 'Calendar', 'Summary', 'Contact', 'Privacy'];

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = useState({
    drawerState: false,
  });

  const toggleDrawer = (open) => () => {
    setState({ ...state, drawerState: open });
  };

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {privateRoutes.map((text) => (
          <ListItemLink
            key={text}
            to={`/${text.toLowerCase()}`}
            primary={text}
          />
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="secondary"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={state.drawerState} onClose={toggleDrawer(false)}>
        {sideList()}
      </Drawer>
    </div>
  );
}
