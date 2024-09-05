import { TableContainer, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableFooter, TableHead, TableRow, Typography, Icon, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { calculateTotal } from '../../servicios/productService';
import { useNavigate } from 'react-router-dom';
import { MENU } from '../../reducer/itemsActions';
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

export const CartView = ({items, handlerDelete}) => {
 const [total, setTotal] = useState(0);
 const navigate = useNavigate();

 useEffect(() => {
    setTotal(calculateTotal(items));
 }, [ items]);

 const handlerDeleteProduct = (id) => {
    handlerDelete(id);
 }

 const keepShopping = () => {
    navigate(MENU[1].link);
 }
  return (
      <>
          <Typography variant="h6" sx={{ mb: 2 }}>Productos de la factura</Typography>
          <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                      <TableRow>
                          <StyledTableCell>Producto</StyledTableCell>
                          <StyledTableCell align="center">Precio</StyledTableCell>
                          <StyledTableCell align="center">Cantidad</StyledTableCell>
                          <StyledTableCell align="center">Total</StyledTableCell>
                          <StyledTableCell align="center">Acciones</StyledTableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {items.map(({ product, quantity }) => (
                          <StyledTableRow key={product.id}>
                              <StyledTableCell component="th" scope="row">{product.name}</StyledTableCell>
                              <StyledTableCell align="center">{product.price}</StyledTableCell>
                              <StyledTableCell align="center">{quantity}</StyledTableCell>
                              <StyledTableCell align="center">{quantity * product.price}</StyledTableCell>
                              {/* <StyledTableCell align="center"><Button onClick={() => handlerDeleteItem(product.id)}><DeleteIcon color='error'/></Button></StyledTableCell> */}
                              <StyledTableCell align='center'>
                                <Button startIcon={<FontAwesomeIcon color='#ff253a' icon={faTrash}  bounce  style={{ '--fa-animation-duration': '1s', '--fa-animation-iteration-count': 1 }}  />} 
                                        onClick={() => handlerDeleteProduct(product.id)}>
                                </Button>
                              </StyledTableCell>
                          </StyledTableRow>
                      ))}
                  </TableBody>
                  <TableFooter>
                      <TableRow>
                          <TableCell  align="left"><Button variant='contained' onClick={() => keepShopping()} color="info">Seguir comprando</Button></TableCell>
                          <TableCell align="right" colSpan={3} sx={{ fontSize: 20, color: '#000000', fontWeight: 'bold' }}>Total:</TableCell>
                          <TableCell align="center" sx={{ fontSize: 20, fontWeight: 'bold' }}>{total}</TableCell>
                      </TableRow>
                  </TableFooter>
              </Table>
          </TableContainer>
      </>
  )
}
