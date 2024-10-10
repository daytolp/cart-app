import React, { useContext, useMemo, useState } from 'react'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { AddTask } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { AuthContext } from './auth/context/AuthContext';


  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  const headCells = [
    {
      id: 'id',
      disablePadding: true,
      label: 'Id',
    },
    {
      id: 'username',
      disablePadding: false,
      label: 'Username',
    },
    {
      id: 'email',
      disablePadding: false,
      label: 'Email',
    },
    {
      id: 'acciones',
      disablePadding: false,
      label: 'Acciones',
    }
  ];

  const EnhancedTableHead = (props) => {
    const { order, orderBy, onRequestSort, isAdmin } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            headCell.id === 'acciones' ?
             isAdmin &&
              <TableCell
              key={headCell.id}
              align={'center'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
            { headCell.id === 'acciones' ? headCell.label : ( 
              <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              >
              {headCell.label}
              </TableSortLabel>
            )} 
            </TableCell>
            :  <TableCell
                key={headCell.id}
                align={'center'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}
              >
              { headCell.id === 'acciones' ? headCell.label : (
                <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                >
                {headCell.label}
                </TableSortLabel>
              )}
              </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  
  const EnhancedTableToolbar = () => {
    return (
      <Toolbar sx={[
          {
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }
        ]}
      >
        {
          <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">Lista de usuarios</Typography>
        }
      </Toolbar>
    );
  }
  
export const UserList = ({admin}) => {  
    const { users, handlerRemoveUser, handlerSelected } = useContext(UserContext);
    const { login } = useContext(AuthContext);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('acciones');
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();

  
    const handleRequestSort = (_, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleChangePage = (_, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const handleChangeDense = (event) => {
      setDense(event.target.checked);
    };
 
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;
  
    const visibleRows = useMemo(() =>
        [...users]
          .sort(getComparator(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
      [order, orderBy, page, rowsPerPage, users],
    );
  
    const onRemoveUser = (id) => {
      handlerRemoveUser(id);
    }

    const onSelectedUser = (user) => {
      handlerSelected(user);
    }

    const onEditUser = (id) => {
      navigate(`/users/edit/${id}`);
    }

    return (
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={users.length}
                isAdmin={login.isAdmin}
              />
              <TableBody>
                {visibleRows.map(({id, username, email, admin}, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
  
                  return (
                    <TableRow hover tabIndex={-1} key={id} sx={{ cursor: 'pointer' }}>
                      <TableCell align={'center'}>
                        {id}
                      </TableCell>
                      <TableCell align={'center'}>
                        {username}
                      </TableCell>
                      <TableCell align={'center'}>
                        {email}
                      </TableCell>
                      { login.isAdmin && (
                         <TableCell align="center">
                         <DeleteIcon onClick={() => onRemoveUser(id)} sx={{ color: '#C70039', borderRadius: 1, border: 2, marginRight: .5 }} /> 
                         <EditIcon onClick={() => onSelectedUser({id, username, email, admin})} sx={{ color: '#16a085', borderRadius: 1, border: 2, marginRight: .5 }} /> 
                         <AddTask  onClick={() => onEditUser(id)} sx={{ color: '#b059b1', borderRadius: 1, border: 2 }} />
                       </TableCell>
                      )} 
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Densidad de padding"
        />
      </Box>
    );
}
