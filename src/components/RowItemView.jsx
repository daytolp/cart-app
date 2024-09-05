import React from 'react'
import { Button, TableCell, TableRow, tableCellClasses } from '@mui/material'
import { styled } from '@mui/material/styles';
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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const RowItemView = ({ id, product, price, quantity, handlerDeleteItem }) => {
  return (
      <>
          <StyledTableRow key={id}>
              <StyledTableCell component="th" scope="row">{product}</StyledTableCell>
              <StyledTableCell align="center">{price}</StyledTableCell>
              <StyledTableCell align="center">{quantity}</StyledTableCell>
              <StyledTableCell align='center'><Button variant="contained" color="error" onClick={() => handlerDeleteItem(id)}>Eliminar</Button></StyledTableCell>
          </StyledTableRow>
      </>
  )
}


RowItemView.prototype = {
    key: PropTypes.number.isRequired,
    product: PropTypes.object.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired
}

