import React from 'react'
import { makeStyles } from '@material-ui/core'

import ScrollToBottom from 'react-scroll-to-bottom'
import { Message } from '../../Message/Message'

const useStyles = makeStyles({
  root: {
    border: '1px solid rgba(0,0,0, 0.1)',
    borderRadius: 4,
    marginTop: 5,
    height: 500,
    overflow: 'hidden'
  },
  toBottonBtn: {
    position: 'absolute',
    bottom: 5,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 60
  }
})

export const Messages = ({ messages, name }) => {
  const classes = useStyles()
  return (
    <ScrollToBottom
      followButtonClassName={classes.toBottonBtn}
      className={classes.root}
    >

      {messages.map((message, index) => (<Message key={`${message.text}_${index}`} name={name} message={message} />))}
    </ScrollToBottom>
  )
}