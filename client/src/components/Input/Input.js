import React from 'react'
import {
  TextField,
  makeStyles,
  IconButton,
  Icon
} from '@material-ui/core'

const useStyles = makeStyles({
  inputWrapper: {
    marginTop: 20
  }
})

export const Input = ({ message, setMessage, sendMessage }) => {
  const classes = useStyles()
  return (
    <div
      className={classes.inputWrapper}
    >
      <TextField
        InputProps={{
          className: classes.input,
          endAdornment: (message ? <IconButton color="primary" onClick={event => sendMessage(event)}><Icon>forward</Icon></IconButton> : null)
        }}
        fullWidth
        placeholder="Введите сообщение"
        variant="outlined"
        onChange={event => setMessage(event.target.value)}
        onKeyPress={event => (event.key === 'Enter') ? sendMessage(event) : null}
        value={message}
      />
    </div>
  )
}