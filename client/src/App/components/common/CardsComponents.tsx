import React from 'react';
import { giftKind, GiftType } from './types';
import translate from 'counterpart';
import { giftTypes, visibilities } from '../common/utils';
import Typography from '@material-ui/core/Typography';
import { Card, CardContent, PropTypes, Divider, ListItemSecondaryAction, IconButton, TextField, FormControlLabel, FormControl, Button, withStyles, Switch } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import Autocomplete from '@material-ui/lab/Autocomplete';

const styles = {
  marginTop15: {marginTop: '15px'}
}

export const GiftCard = ({
  gift= {} as GiftType, 
  setGift = ()=> {},
  giftErrors = {
    name: false,
    types: false,
    visibility: false
  },
  modify= false,
  elevation,
  variant= 'h1',
  giftDetailVariant='h6',
  align='center', 
  giftDetailAlign='center',
  style
  }: {
  gift?: GiftType,
  setGift?: (giftUpdated: GiftType) => void,
  giftErrors?: {
    name: boolean;
    types: boolean;
    visibility: boolean;
  }
  modify?: boolean,
  elevation?: number,
  align?: PropTypes.Alignment,
  variant?: "inherit" | "button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "overline" | "srOnly" | undefined,
  giftDetailVariant?: "inherit" | "button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "overline" | "srOnly" | undefined,
  giftDetailAlign?: PropTypes.Alignment,
  style?: any 
}) => {

  const localeGift = 'dictionaryPage.gift';

  return (
    <Card elevation={ elevation || 1 } style={style}>
      <CardContent>
      {modify 
      ? <TextField
        error= {giftErrors.name}
        fullWidth
        label="Caractère"
        margin="normal"
        variant="standard"
        value={gift?.name}
        onChange={(e) => {
          setGift({
            ...gift,
            name: e.target.value,
          })
        }}
        name="character"
        required
      />
      : <Typography align={ align } color="textSecondary" gutterBottom>
        {translate(`${localeGift}.name.fr`)}
      </Typography>}
      <Typography align={ align } component="h2" variant={variant} gutterBottom>
        { gift?.name || ''}
      </Typography>
      {modify &&
      <>
        <Autocomplete
          style={styles.marginTop15}
          multiple
          limitTags={8}
          options={giftTypes}
          getOptionLabel={(subject: string) => translate(`types.${subject}`)}
          value={gift?.types}
          filterSelectedOptions
          disableCloseOnSelect
          onChange={(_event, values) => {setGift({...gift, types: values})}}
          renderInput={(params: any) => (
            <TextField
              {...params}
              error={giftErrors.types}
              variant="standard"
              label={translate(`${localeGift}.subject`)}
              placeholder={translate(`${localeGift}.subject`)}
            />
          )}
        />
        <Autocomplete
          style={styles.marginTop15}
          options={visibilities}
          getOptionLabel={(visibility: string) => translate(`visibility.${visibility}`)}
          value={gift?.visibility}
          filterSelectedOptions
          openOnFocus
          onChange={(_event: React.ChangeEvent<{}>, value: string | null) => setGift({...gift})}
          renderInput={(params: any) => (
            <TextField
              {...params}
              variant="standard"
              label={translate(`${localeGift}.visibility`)}
              placeholder={translate(`${localeGift}.visibility`)}
              error={giftErrors.visibility}
            />
          )}
        />
      </>
      }
      </CardContent>
    </Card>
  );
}

const CssTextField = withStyles({
  root: {
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottomColor: '#949494'
    },
    '& .MuiInput-underline:before': {
      border: 0
    }
  },
})(TextField);

export const CollapseGiftList = ({
  style, 
  listTitle, 
  giftList,
  onActionClick
}: {
  style: any,
  listTitle: string, 
  giftList: GiftType[],
  onActionClick: (gift: GiftType) => void
}) => {
  return (
    <div style={{...style}}>
      <ExpansionPanel elevation={0}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{listTitle}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{paddingTop: '0', paddingBottom: '0'}}>
          <List style={{paddingTop: '0', width: '100%', paddingLeft: '20px', paddingRight: '20px'}} >
            {giftList.map((gift) => (
            <div key={gift.id || gift.name} >
              <ListItem style={{minWidth: '350px'}} role={undefined} button onClick={() => {}}>
                <ListItemText
                  style={{paddingRight: '15px'}} 
                  primary= {`${gift.name}`}
                  primaryTypographyProps={{variant:'body1'}}
                />
                <ListItemSecondaryAction >
                  <IconButton aria-label="addGift" onClick={() => onActionClick(gift)}>
                    <AddIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </div>))}
          </List >
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}
