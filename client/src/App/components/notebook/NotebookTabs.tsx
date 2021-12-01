import React from 'react';
import { Box, Button, makeStyles, Tab, Tabs, Theme, Typography } from '@material-ui/core';
import { familyMembers, giftTypes } from '../common/utils';
import tabBG from './ressources/bgtab.jpg';
import banner from './ressources/baniereNoel.jpg';
import border from './ressources/borderNoel.jpg';

import { Column, Row } from '../common/Flexbox';
import { GiftType, UserType } from '../common/types';
import { GiftCard } from './GiftCard';
import { useSelector } from 'react-redux';
import { useNoteBook } from './notebookHooks';
import { ResevationPanel } from './ReservationPanel';
import { isMobile } from 'react-device-detect';

type TabPanelProps = {
  gifts?: GiftType[],
  userName: string,
  isOwned: boolean,
  index: any;
  value: any;
  classes: Record<"tabs" | "tabPanel", string>;
  createGift: (gift: GiftType) => Promise<void>,
  updateGift: (gift: GiftType) => Promise<void>,
  deleteGift: (gift: GiftType) => Promise<void>,
  onReserve: (gift: GiftType) => Promise<void>
}

function TabPanel({gifts, userName, isOwned, value, index, classes, updateGift, createGift, deleteGift, onReserve, ...other }: TabPanelProps) {
  return (
    <div
      className={classes.tabPanel}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Column width='100%' horizontal='center'>
        <Row>{isOwned && <GiftCard isOwned={isOwned} creation createGift={createGift} updateGift={updateGift} deleteGift={deleteGift}/>}</Row>
        {value === index && (gifts?.map((gift, i) => (
          <Row key={`${gift.id}${i}`}>
            <GiftCard isOwned={isOwned} key={gift.name} gift={gift} createGift={createGift} updateGift={updateGift} deleteGift={deleteGift}/>
            { !isOwned && <ResevationPanel userName={userName} gift={gift} onReserve={onReserve}/>}
          </Row>)
          )
        )}
      </Column>
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  notebook: {
    flexGrow: 1,
    display: 'flex',
    height: '100%',
    maxHeight: 'calc(100vh - 200px)',
    width: '100%',
    maxWidth: '1000px',
    boxShadow: '0 0 5px 5px #bed0c2',
    borderRadius: '25px',
    backgroundColor: 'white',
    zIndex:2,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabPanel: {
    width: '100%',
    // backgroundImage: `url(${tabBG})`,
    borderRadius: '25px',
    overflow: 'auto',
    overflowX: 'hidden'
  },
  banner: {
    position: 'absolute',
    width: '100%',
    height: '100vh',
    backgroundImage: `url(${border})`,
    top: 0,
    backgroundSize: '100% 100%'
  }
}));

export const NotebookTabs = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const {giftsByPerson, createGift, updateGift, deleteGift, onReserve, restoreCollection} = useNoteBook();

  const userName = useSelector((state: any) => state.user.username)

  return (
    <>
      <div className={classes.banner} />
      <div className={classes.notebook}>
        {userName === 'Aurelien' && <Button onClick={()=> restoreCollection()}>COLLECTION</Button>}
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          {familyMembers.map((member, index) => <Tab key={member} label={`${member}`} {...a11yProps(index)}/> )}
        </Tabs>

        {familyMembers.map((member, index) => {
          return(
          <TabPanel
            isOwned={userName === member}
            userName={userName}
            gifts={giftsByPerson ? giftsByPerson[member] : []}
            classes={classes}
            key={member}
            value={value}
            index={index}
            createGift={createGift}
            updateGift={updateGift}
            deleteGift={deleteGift}
            onReserve={onReserve}
            {...a11yProps(index)}
          />) }
        )}
      </div>
    </>
  );
}