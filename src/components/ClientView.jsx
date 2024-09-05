import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Divider, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export const ClientView = ({ client }) => {
  const { name, lastName, address } = client;
  return (
    <>
      <Typography variant="h5">Datos del cliente</Typography>
      <Divider/>
      <List
        sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton divider={true}>
          <ListItemText primary={`${name} ${lastName}`} />
        </ListItemButton>
        <ListItemButton divider={true}>
          <ListItemText primary={ `${address.country} / ${address.city}` } />
        </ListItemButton>
        <ListItemButton divider={true}>
          <ListItemText primary={`${address.street} ${address.number}`} />
        </ListItemButton>
      </List>
    </>
  )
}


ClientView.prototype = {
  client: PropTypes.object.isRequired
}

