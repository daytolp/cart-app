import React from 'react'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import BadgeIcon from '@mui/icons-material/Badge';
import { Divider, Typography } from '@mui/material';
import PropTypes from 'prop-types';


export const InvoiceView = ({ id, name }) => {
  return (
    <>    
          <Typography variant="h5">Ejemplo Factura</Typography>
          <Divider/>
          <List
              sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper' }}
              component="nav"
              aria-labelledby="nested-list-subheader"
          >
              <ListItemButton divider={true}>
                  <ListItemIcon>
                      <PermIdentityIcon />
                  </ListItemIcon>
                  <ListItemText primary={`Id: ${id}`} />
              </ListItemButton>
              <ListItemButton divider={true}>
                  <ListItemIcon>
                      <BadgeIcon />
                  </ListItemIcon>
                  <ListItemText primary={`Name: ${name}`} />
              </ListItemButton>
          </List>
    </>
  )
}

InvoiceView.prototype = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
}
