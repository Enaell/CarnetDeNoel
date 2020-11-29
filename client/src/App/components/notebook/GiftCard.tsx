import React, { useState } from 'react'
import { Column, Row } from '../common/Flexbox'
import { Card, Typography, CardContent, CardMedia, IconButton, TextField, Button, colors } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import SaveAltOutlinedIcon from '@material-ui/icons/SaveAltOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import { giftKind, GiftType } from '../common/types';
import giftPict from './ressources/gifts.jpg';
import boardgamePict from './ressources/boardGame.jpg';
import clothPict from './ressources/cloths.jpg';
import cookingPict from './ressources/cooking.jpg';
import gamePict from './ressources/game.jpg';
import bookPict from './ressources/book.jpeg';
import jewelPict from './ressources/jewel.jpg';
import videoGamePict from './ressources/videoGames.jpeg';

import { Autocomplete } from '@material-ui/lab';
import { giftTypes } from '../common/utils';

function getPictureByType(giftType: giftKind | undefined) {
  switch (giftType) {
    case 'book': return {pict: bookPict, name: 'Livre'};
    case 'boardgame': return {pict: boardgamePict, name: 'Jeu de société'};
    case 'game': return {pict: gamePict, name: 'Jouet'};
    case 'cloth': return {pict: clothPict, name: 'Vêtement'};
    case 'cooking': return {pict: cookingPict, name: 'Cuisine'};
    case 'jewel': return {pict: jewelPict, name: 'Bijoux'};
    case 'videogame': return {pict: videoGamePict, name: 'Jeux vidéo'};
    default: return {pict: giftPict, name: ''};
  }
}

export const GiftCard = ({ gift, isOwned, creation = false, createGift, updateGift, deleteGift}: {
  gift?: GiftType,
  isOwned: boolean,
  creation?: boolean,
  updateGift: (gift: GiftType) => void,
  createGift: (gift: GiftType) => void,
  deleteGift: (gift: GiftType) => void
}) => {

  const [onHover, setOnHover] = useState(false);
  
  const [onModify, setOnModify] = useState(creation);
  const [newGift, setNewGift] = useState(gift || {} as GiftType);
  const [pictureInfo, setPictureInfo] = useState(getPictureByType(newGift?.types ? newGift?.types[0]: undefined));

  return (
    <div style={{width: '615px', height: '100%'}} onMouseOver={() => {setOnHover(true)}} onMouseLeave={()=>{setOnHover(false)}}>
      <Row width='100%' style={{position: 'relative', margin: '10px'}} >
        <CardMedia 
          style={{ 
            position: 'absolute',
            zIndex: 2,
            height: '154px',
            width: '150px',
            borderRadius: '50%',
            margin:'-2px 0 0 0',
            boxShadow:'0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
          }}
          image={pictureInfo.pict}
        />
        <Row 
          horizontal='center'
          vertical='center'
          style={{
            zIndex: 3,
            height: '154px',
            width: '150px',
            borderRadius: '50%',
            position: 'absolute',
            margin:'-2px 0 0 0',
            backgroundColor: onHover ? '#00000000': '#00000014',
            transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
          }}
          >
          { onModify && <Autocomplete
            style={{backgroundColor: '#e34836', height: '154px', width: '150px', borderRadius: '50%'}}
            limitTags={8}
            options={giftTypes}
            getOptionLabel={(gKind: giftKind) => getPictureByType(gKind).name}
            value={newGift?.types ? newGift?.types[0]: 'other'}
            filterSelectedOptions
            disableCloseOnSelect
            onChange={(_event, values) => {
              setNewGift({...newGift, types: values ? [values as giftKind] : ['other']});
              setPictureInfo(getPictureByType(values ? values as giftKind : 'other'));
            }}
            renderInput={(params: any) => (
              <TextField
                {...params}
                variant="standard"
                label={'Type'}
                placeholder={'Type'}
                style={{margin: '20px', width: '110px'}}
              />
            )}
          />
          }
        </Row>
        <Card
          elevation={onHover ? 5 : 1}
          style={{width: '500px', paddingTop: '0', margin: '0 0 0 75px'}}
        >
          <CardContent style={{paddingLeft: '95px'}} >
          <Row width={'100%'} height={'100%'} horizontal='space-between'>
            <Column height={'110px'}>
              <TextField
                InputProps={onModify ? undefined : {
                  readOnly: true,
                }}
                label='Nom'
                error={!newGift?.name}
                value={newGift.name}
                onChange={e=> setNewGift({...newGift, name: e.target.value})}
              />
              <Row horizontal='space-between'>
                {(gift?.price?.average || onModify) && <TextField
                  InputProps={onModify ? undefined : {
                    readOnly: true,
                  }}
                  style={{width: '100px'}}
                  type='number'
                  label='Prix moyen'
                  value={newGift.price?.average}
                  onChange={(e: React.ChangeEvent<{ value: unknown }>)=> setNewGift({...newGift, price: { ...newGift.price, average: e.target.value as number}})}
                />}
                {(gift?.price?.max || onModify) && <TextField
                  InputProps={onModify ? undefined : {
                    readOnly: true,
                  }}
                  style={{width: '100px'}}
                  type='number'
                  label='Prix Max'
                  value={newGift.price?.max}
                  onChange={(e: React.ChangeEvent<{ value: unknown }>)=> setNewGift({...newGift, price: { ...newGift.price, max: e.target.value as number}})}
                />}
                {(gift?.price?.min || onModify) && <TextField
                  InputProps={onModify ? undefined : {
                    readOnly: true,
                  }}
                  style={{width: '100px'}}
                  type='number'
                  label='Prix Min'
                  value={newGift.price?.min}
                  onChange={(e: React.ChangeEvent<{ value: unknown }>)=> setNewGift({...newGift, price: { ...newGift.price, min: e.target.value as number}})}
                />}
              </Row>
            </Column>
            { isOwned && onHover && <Column>
            { !onModify ?
              <>
                <Button onClick={() => setOnModify(true)}>
                  <CreateOutlinedIcon color='action' titleAccess={'Modify'}/>
                </Button>
              </>
              : 
              <>
                <Button>
                  <SaveAltOutlinedIcon 
                    onClick={async () => {
                      if (creation) {
                        createGift(newGift);
                        setNewGift({
                          name: '',
                          price: {average: 0, max: 0, min: 0},
                          types:['other']
                        })
                      }
                      else {                        
                        updateGift(newGift);
                        setOnModify(false)
                      }
                    }}
                    color='action'
                    titleAccess={'Save'}
                  />
                </Button>
                <Button>
                  <DeleteOutlinedIcon onClick={() => {if(gift) deleteGift(gift); setOnModify(false)}}  color='action' titleAccess={'Delete'}/>
                </Button>
                <Button>
                  <CloseIcon onClick={() => {setNewGift(gift || {} as GiftType); setOnModify(false)}} color='action' titleAccess={'Cancel'}/>
                </Button>
              </>}
            </Column>}
          </Row>
        </CardContent>
      </Card>
    </Row>
  </div>)
}