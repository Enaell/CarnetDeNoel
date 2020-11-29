import React from 'react';
import { Column } from '../common/Flexbox';
import TextField from '@material-ui/core/TextField';
import translate from 'counterpart';
import { Autocomplete } from '@material-ui/lab';
import { familyMembers } from '../common/utils';

type LoginFormType = {
  handleUserNameChange: (value: string) => void, 
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, 
  passwordError: boolean, 
  usernameError: boolean
}

export const LoginForm = ({
  handleUserNameChange, 
  handlePasswordChange, 
  passwordError, 
  usernameError
}: LoginFormType) => {
  return(
    <Column vertical={'space-between'} horizontal={'center'} style={{minWidth: '75%'}}>
      <Autocomplete
        fullWidth
        options={familyMembers}
        getOptionLabel={(member: string) => member}
        filterSelectedOptions
        disableCloseOnSelect
        onChange={(_event, value) => handleUserNameChange(value || '')}
        renderInput={(params: any) => (
          <TextField
            {...params}
            error = {usernameError}
            variant="standard"
            label={translate('connection.username')}
            placeholder={translate('connection.usernameError')}
          />
        )}
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