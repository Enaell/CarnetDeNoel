import React from 'react';
import { Box, makeStyles, Tab, Tabs, Theme, Typography } from '@material-ui/core';
import { familyMembers } from '../common/utils';
import tabBG from './ressources/bgtab.jpg'

type TabPanelProps = {
  children?: React.ReactNode;
  index: any;
  value: any;
  classes: Record<"root" | "tabs" | "tabPanel", string>;
} 

function TabPanel(props: TabPanelProps) {
  const { children, value, index, classes, ...other } = props;

  return (
    <div
      className={classes.tabPanel}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.primary.main,
    display: 'flex',
    height: '100%',
    maxHeight: 'calc(100vh - 400px)',
    width: '100%',
    maxWidth: '1200px',
    boxShadow: '0 0 5px 5px #bed0c2',
    borderRadius: '25px'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabPanel: {
    width: '100%',
    // backgroundImage: `url(${tabBG})`,
    backgroundSize: '100% 100%',
    borderRadius: '25px'
  }
}));

export const NotebookTabs = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
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

      {familyMembers.map((member, index) => <TabPanel classes={classes} key={member} value={value} index={index} {...a11yProps(index)}> {`PANEL ${index} ${member}`} </TabPanel> )}
    </div>
  );
}