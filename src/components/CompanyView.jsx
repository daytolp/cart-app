import React from 'react'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Divider, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export const CompanyView = ({ company }) => {
  return (
      <>                    
        <Typography variant="h5">Datos de la empresa</Typography>
         <Divider/>
          <List
              sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper' }}
              component="nav"
              aria-labelledby="nested-list-subheader"
          >
              <ListItemButton divider={true}>
                  <ListItemText primary={company.name} />
              </ListItemButton>
              <ListItemButton divider={true}>
                  <ListItemText primary={company.fiscalNumber} />
              </ListItemButton>
          </List>
      </>
  )
}

CompanyView.prototype = {
    company: PropTypes.object.isRequired
}
