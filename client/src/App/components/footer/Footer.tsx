import React from 'react';
import { Row } from '../common/Flexbox';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';

function Footer() {

  const palette = useSelector((state: any) => state.theme.palette)
  return(
    <Row horizontal='space-around' width='100%' style={{ padding: '20px 0 20px 0', backgroundColor : palette.primary.main, color: 'white'}}>
      <Typography color='secondary'> footer 1 </Typography>
      <Typography color='secondary'> footer 2 </Typography>
      <Typography color='secondary'> footer 3 </Typography>
    </Row>
  )
}

export default Footer;