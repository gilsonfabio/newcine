import React, {useState, useEffect} from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import HowToVoteIcon from '@material-ui/icons/HowToVote';

import api from '../../services/api';

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

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: 100,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100vh',
    },
    root: {
        marginLeft: 100,
        maxWidth: 600,
        height: 700,
      },

      media: {
        width: 250,
        height: 360,
      },

    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));
 
export default function AltCategory() {
  const classes = useStyles();
  const navigate = useNavigate();
  
  const params = useParams();
  const [enquetes, setEnquetes] = useState([]);

  const [movTitulo, setTitulo] = useState('');
  const [movSinopse,  setSinopse] = useState('');
  const [movDiretor,  setDiretor] = useState('');
  const [movAnoCriacao, setAnoCriacao] = useState('');
  const [movAnoPart,  setAnoPart] = useState('');
  const [movUrlPoster,  setUrlPoster] = useState('');
  const [movCategoria, setCategoria] = useState('');
  const [catDescricao, setCatDescricao] = useState('');

  useEffect(() => {
    let idMov = params.movId;   
    api.get(`searchMovie/${idMov}`).then(response => {
        setTitulo(response.data[0].movTitulo);
        setSinopse(response.data[0].movSinopse);
        setDiretor(response.data[0].movDiretor);
        setAnoCriacao(response.data[0].movAnoCriacao);
        setAnoPart(response.data[0].movAnoPart);
        setUrlPoster(response.data[0].movUrlPoster);
        setCategoria(response.data[0].movCategoria);
        setCatDescricao(response.data[0].catDescricao);  
    })

    api.get(`enquetes`).then(response => {
        setEnquetes(response.data);        
    })
    
  },[]);

  function handleVotacao(enqId) {

  }
     
  return (  
    <div className={classes.container}>
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
      <main className={classes.main}>
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia className={classes.media}
                    component="img"
                    alt="Contemplative Reptile"
                    height="440"
                    image={movUrlPoster}
                    title="Contemplative Reptile"
                />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {movTitulo}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {movSinopse}
                </Typography>
                <Divider />
                <Typography variant="body2" color="textSecondary" component="h2">
                    Diretor: {movDiretor}
                </Typography>
                <Divider />
                <Typography variant="body2" color="textSecondary" component="h2">
                    Categoria: {catDescricao}
                </Typography>
            </CardContent>
            </CardActionArea>                
        </Card>
        </main>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Descrição Enquete</StyledTableCell>
            <StyledTableCell align="right">Votar</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {enquetes.map((row) => (
            <StyledTableRow key={row.enqId}>
              <StyledTableCell align="left">{row.enqDescricao}</StyledTableCell>
              <StyledTableCell align="right">
              <Link to={() => handleVotacao(row.enqId)} >
                <HowToVoteIcon />
              </Link>                         
              </StyledTableCell>              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      
    </div>
  );
}