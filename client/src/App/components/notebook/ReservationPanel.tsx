import { Box, Chip, FormControlLabel, makeStyles, Switch } from '@material-ui/core';
import React, { useState } from 'react';
import { useIsMobile } from '../../hooks/isMobileHook';
import { Column, Row } from '../common/Flexbox';
import { GiftType } from '../common/types';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: '10px',
    width: '10%'
  },
  chip: {
    borderRadius:'25px', padding:'8px', margin: '4px',color:'white', backgroundColor: theme.palette.primary.main
  },
}));

export const ResevationPanel = ({ userName, gift, onReserve}: {
  userName: string,
  gift: GiftType,
  onReserve: (gift: GiftType) => Promise<void>
}) => {
  const isMobile = useIsMobile();

  const [isReserved, setIsReserved] = useState(gift.reservations?.some(reservation => reservation.userName === userName))

  const classes = useStyles();
  const [onHover, setOnHover] = useState(false);

  return (
    <div className={classes.root} onMouseOver={() => {setOnHover(true)}} onMouseLeave={()=>{setOnHover(false)}}>

    <Column horizontal='start' width= {isMobile ? '100%' : '135px'}>
       { (onHover || isMobile || !gift.reservations || !gift.reservations.length) && <FormControlLabel
          labelPlacement="top"
          control={<Switch 
            color='primary'
            checked={isReserved} 
            onChange={() => {
              if (isReserved) {
                onReserve({...gift, reservations: gift.reservations?.filter(resa => resa.userName !== userName)})
                setIsReserved(false);
              }
              else {
                onReserve({...gift, reservations: gift.reservations ? [...gift.reservations, {userName}] : [{userName}]})
                setIsReserved(true);
              }
            }} 
            name='Je participe !'
          />}
          style={isMobile ? {marginLeft: '6px'} : undefined}
        label={isMobile ? '' : 'Je participe !'}
      />}
      <Row wrap width='100%' horizontal='start' style={{marginLeft: '10px'}}>
        {gift.reservations?.map((reservation, index) => (
          <Box key={`${reservation.userName}${index}`} className={classes.chip} >{isMobile ? getForMobileName(reservation.userName) : reservation.userName}</Box>
        ))}
      </Row>
    </Column>
    </div>
  )
}

function getForMobileName(name: string) {
  if (name.length > 4)
    return `${name.substr(0, 3)}..`
  return name;
}