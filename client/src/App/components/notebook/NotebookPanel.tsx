import { Button, Card } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Column, Row } from '../common/Flexbox';
import { UserType } from '../common/types';
import { arrayOfInt } from '../common/utils';
import { NotebookPage } from './NotebookPage';

export const NotebookPanel = ({user}: { user: UserType }) => {

  const [array, setArray] = useState([
    {id: 1, name: 'a', visibility: true}, {id: 2, name: 'a', visibility: true}, {id: 3, name: 'a', visibility: true}, {id: 4, name: 'a', visibility: true}, {id: 5, name: 'b', visibility: true}, {id: 6, name: 'b', visibility: true}, {id: 7, name: 'b', visibility: true}, {id: 8, name: 'b', visibility: true}, {id: 9, name: 'b', visibility: true}, {id: 10, name: 'c', visibility: true}, {id: 11, name: 'c', visibility: true}, {id: 12, name: 'c', visibility: true}, {id: 13, name: 'a', visibility: true}, 
  ]);
  

  useEffect(()=> console.log(array), [array])

  return (
    <><Button onClick={()=> setArray(array.map(arr => arr.name !== 'b' ? {...arr, visibility: false} : arr))}>COUCOU</Button>
    <Row width='1200px' horizontal='center' wrap>
  { array.map(arr => <Card key={arr.id} style={{ visibility: arr.visibility ? 'visible': 'hidden', transition: 'width 500ms ease-in-out, height 500ms ease-in-out', width: arr.visibility ? '250px' : '0px', height: arr.visibility ? '250px': '0px', margin: '20px', backgroundColor: 'green'}}>{arr.name}</Card>)}
    </Row></>
  )
}