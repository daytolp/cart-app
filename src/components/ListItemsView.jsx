import { Button, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, tableCellClasses } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import { RowItemView } from './RowItemView';
import PropTypes from 'prop-types';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: ' #16a085',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));



export const ListItemsView = ({ items, handlerDeleteItem }) => {
  return (
      <>
          <Typography variant="h6">Productos de la factura</Typography>
          <Divider />
          <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                      <TableRow>
                          <StyledTableCell>Producto</StyledTableCell>
                          <StyledTableCell align="center">Precio</StyledTableCell>
                          <StyledTableCell align="center">Cantidad</StyledTableCell>
                          <StyledTableCell align="center">Acciones</StyledTableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {items.map(({ id, product, price, quantity }) => (
                         <RowItemView key={id} id={id} product={product} price={price} quantity={quantity} handlerDeleteItem={ handlerDeleteItem }/>
                      ))}
                  </TableBody>
              </Table>
          </TableContainer>
      </>
  )
}


ListItemsView.prototype = {
    items: PropTypes.array.isRequired
}
