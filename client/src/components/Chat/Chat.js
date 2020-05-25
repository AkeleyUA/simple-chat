import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import {
  Container, makeStyles, Paper
} from '@material-ui/core'
import { InfoBar } from '../InfoBar/InfoBar'
import { Input } from '../Input/Input'
import { Messages } from '../Messages/Messages'

let socket
const useStyles = makeStyles({
  root: {
    marginTop: '2.5vh',
    height: '95vh',
    position: 'relative',
    paddingTop: 24,
  }
})


const Chat = ({ location }) => {
  const classes = useStyles()
  const [join, setJoin] = useState({
    name: '',
    room: ''
  })
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')

  const ENDPOINT = 'localhost:5000'

  useEffect(() => {
    const { name, room } = queryString.parse(location.search)

    socket = io(ENDPOINT)
    socket.emit('join', { name, room }, () => { })

    setJoin({ name, room })

    return () => {
      socket.emit('disconnect')
      socket.off()
    }
  }, [ENDPOINT, location])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message])
    })
    return () => { socket.off() }
  }, [messages])

  console.log(message, messages)

  const sendMessage = event => {
    event.preventDefault()
    if (message) {
      socket.emit('sendMessage', message, () => { setMessage('') })
    }
  }

  return (
    <Container
      maxWidth="md"
      className={classes.root}
      component={Paper}
    >
      <InfoBar room={join.room} />
      <Messages messages={messages} name={join.name} />
      <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
    </Container>
  )
}

export { Chat }