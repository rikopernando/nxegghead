import React from 'react'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 16,
  },
  title: {
    flexGrow: 1,
  }
}))


export interface HeaderProps {
  title: string;
}

export const Header = (props: HeaderProps) => {
  const classes = useStyles()

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          {props.title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
