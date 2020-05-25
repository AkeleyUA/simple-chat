import React from 'react'
import { makeStyles, Avatar, Typography } from '@material-ui/core'
import ReactEmoji from 'react-emoji'

const useStyles = makeStyles({
  message: {
    display: 'flex',
    justifyContent: 'flex-start',
    margin: '10px 0',
    alignItems: 'center',
  },
  yourMessage: {
    display: 'flex',
    flexDirection: 'row-reverse',
    margin: '10px 0',
    alignItems: 'center',
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0,0,0, 0.1)',
    padding: 5,
    borderRadius: 4,
    wordBreak: 'break-word'
  },
  yourText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#3f51b5',
    color: '#FFFFFF',
    padding: 5,
    borderRadius: 4,
    wordBreak: 'break-word'
  },
  avatar: {
    margin: '0 10px'
  },
  caption: {
    margin: '0 10px'
  }
})

export const Message = ({ message: { user, text }, name }) => {
  const classes = useStyles()
  const trimmedName = name.trim().toLowerCase()
  return (
  <div
    className={user === trimmedName ? classes.yourMessage : classes.message}
  >
    <Avatar
      className={classes.avatar}
    >{user[0].toUpperCase()}</Avatar>
    <Typography
      variant="body1"
      className={user === trimmedName ? classes.yourText : classes.text}
    >
      {ReactEmoji.emojify(text)}
    </Typography>
    <Typography
      className={classes.caption}
      variant="caption"
    >
      {user}
    </Typography>
  </div>
)}