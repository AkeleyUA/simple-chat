import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Paper, Container, Button, makeStyles, TextField, Typography, Divider, Icon } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    height: '50%',
    padding: '10%',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'center',
  },
  body: {
    width:'100%',
    height:'100vh'
  },
  mt: {
    marginTop: 30
  },
  divider: {
    backgroundColor: '#FFFFFF',
    marginTop: 30,
    height: 2
  },
  whiteText: {
    color: '#FFFFFF'
  }
})

let socket

const Join = () => {
  const classes = useStyles()
  const [join, setJoin] = useState({
    name: '',
    room: ''
  })
  const [err, setErr] = useState({
    name: false,
    room: false
  })

  const validateHandler = event => {
    if (!join.name) {
      setErr({ ...err, name: true })
      return event.preventDefault()
    }
    if (!join.room) {
      setErr({ ...err, room: true })
      return event.preventDefault()
    }
    return null
  }

  const changeHandler = event => {
    setJoin({ ...join, [event.target.name]: event.target.value })
    setErr({ ...err, [event.target.name]: false })
  }

  return (
    <div
      className={classes.body}
    >
      <Container
        maxWidth="sm"
        className={classes.root}
      >
        <Typography variant="h5" className={classes.whiteText}>React chat</Typography>
        <Divider
          flexItem
          variant="fullWidth"
          className={classes.divider}
        />
        <TextField
          required
          className={classes.mt}
          label="Логин"
          type="text"
          name="name"
          variant="filled"
          component={Paper}
          fullWidth
          error={err.name}
          value={join.name}
          onChange={changeHandler}
        />
        <TextField
          className={classes.mt}
          label="Комната"
          type="text"
          name="room"
          variant="filled"
          component={Paper}
          fullWidth
          error={err.room}
          value={join.room}
          onChange={changeHandler}
        />
        <Button
          fullWidth
          size="large"
          type="submit"
          onClick={validateHandler}
          variant="contained"
          color="primary"
          to={`/chat?name=${join.name}&room=${join.room}`}
          className={classes.mt}
          component={Link}
        >
          Войти
        </Button>
      </Container>
    </div>
  )
}

export { Join }