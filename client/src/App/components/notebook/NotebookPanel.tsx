import { Button, Card } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Column, Row } from '../common/Flexbox';
import { GiftType, UserType } from '../common/types';
import { familyMembers } from '../common/utils';
import { NotebookTabs } from './NotebookTabs';
import image from '../landingPage/ressources/landing.jpg'



export const NotebookPanel = ({...props}) => {
  
  return (
    <Column height='100vh' width='100%' horizontal='center' vertical='space-around'>
      <NotebookTabs />
    </Column>
  )
}