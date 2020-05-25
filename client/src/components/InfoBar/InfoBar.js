import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  toolBar: {
    display: 'flex',
  },
  btn: {
    flexGrow: 2
  },
  title: {
    flexGrow: 10
  }
})

const InfoBar = ({ room }) => {
  const classes = useStyles()
  return (
    <AppBar position="static">
      <Toolbar
        className={classes.toolBar}
      >
        <Typography
          className={classes.title}
          variant="h6"
        >
          {`Комната: ${room}`}
        </Typography>
        <Button
          className={classes.btn}
          color="inherit"
          component={Link}
          to="/"
        >
          Выйти
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export { InfoBar }