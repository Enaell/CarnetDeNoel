import React from 'react';
import { Column } from '../common/Flexbox';
import TextField from '@material-ui/core/TextField';
import translate from 'counterpart';

type LoginFormType = {
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, 
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, 
  passwordError: boolean, 
  emailAddressError: boolean
}

export const LoginForm = ({
  handleEmailChange, 
  handlePasswordChange, 
  passwordError, 
  emailAddressError
}: LoginFormType) => {
  return(
    <Column vertical={'space-between'} horizontal={'center'} style={{minWidth: '75%'}}>
        <TextField
          error = { emailAddressError }
          helperText = { emailAddressError ? translate('connection.emailInvalidError') : null } 
          required
          margin="dense"
          id="email"
          label={translate('connection.email')}
          type="email"
          onChange={handleEmailChange}
          fullWidth
        />
        <TextField
          error = {passwordError}
          helperText = {passwordError ? translate('connection.passwordError') : null} 
          required
          margin="dense"
          id="password"
          label={translate('connection.password')}
          type="password"
          onChange={handlePasswordChange}
          fullWidth
        />
    </Column>
  );
}