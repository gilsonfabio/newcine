import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import api from '../../services/api';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  cadastrar: {
    marginTop: 70,
    padding: 10,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  }
});

export default function Enquetes() {
  const classes = useStyles();
  const [enquetes, setEnquetes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`enquetes`).then(response => {
        setEnquetes(response.data);
        
    })
  },[]);
  
  return (
    <div>
      <AppBar position="fixed" >
        <Toolbar>
          <IconButton color="inherit" onClick={() => navigate(-1)} >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Cine Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.cadastrar}>
      <Button variant="contained" color="primary">
        <Link to={`/newenquete`} className="button-edit" className={classes.link}>Nova Enquete</Link>
        
      </Button>
      </div>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">ID</StyledTableCell>
            <StyledTableCell align="left">Descrição Enquete</StyledTableCell>
            <StyledTableCell align="right">Editar</StyledTableCell>
            <StyledTableCell align="right">Excluir</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {enquetes.map((row) => (
            <StyledTableRow key={row.enqId}>
              <StyledTableCell align="left" component="th" scope="row">{row.enqId}</StyledTableCell>
              <StyledTableCell align="left">{row.enqDescricao}</StyledTableCell>
              <StyledTableCell align="right">
              <Link to={`/altenquete/${row.enqId}`} >
                <EditIcon />
              </Link>                         
              </StyledTableCell>
              <StyledTableCell align="right">
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
    </div>
  );
}