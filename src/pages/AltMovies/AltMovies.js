import React, {useState, useEffect} from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';

import api from '../../services/api';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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
 
export default function AltMovies() {
  const classes = useStyles();
  const navigate = useNavigate();

  const params = useParams();

  const [movies, setMovies] = useState([]);

  const [movTitulo, setTitulo] = useState('');
  const [movSinopse,  setSinopse] = useState('');
  const [movDiretor,  setDiretor] = useState('');
  const [movAnoCriacao, setAnoCriacao] = useState('');
  const [movAnoPart,  setAnoPart] = useState('');
  const [movUrlPoster,  setUrlPoster] = useState('');
  const [movCategoria, setCategoria] = useState('');
  
  function handleCreateCategory(e) {
    e.preventDefault();
    let idMov = params.movId;
    
    api.put(`altmovie/${idMov}`, {
        movTitulo, 
        movSinopse,  
        movDiretor,  
        movAnoCriacao,
        movAnoPart,  
        movUrlPoster,
        movCategoria   
    }).then(() => {
        alert('filme alterado com sucesso!')
    }).catch(() => {
        alert('Erro no cadastro!');
    })    
    navigate(-1);
  }

  useEffect(() => {
    let idMov = params.movId;

    api.get(`searchMovie/${idMov}`).then(response => {
        setMovies(response.data);    
        setTitulo(response.data[0].movTitulo);
        setSinopse(response.data[0].movSinopse);
        setDiretor(response.data[0].movDiretor);
        setAnoCriacao(response.data[0].movAnoCriacao);
        setAnoPart(response.data[0].movAnoPart);
        setUrlPoster(response.data[0].movUrlPoster);
        setCategoria(response.data[0].movCategoria);  
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
      <main className={classes.main}>
        <div className={classes.paper}> 
        <Typography variant="h6" noWrap>
            Altere os dados do Filme
        </Typography> 
        <form onSubmit={handleCreateCategory} >
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="titulo"
                label="Título do filme"
                name="titulo"
                autoFocus                
                value={movTitulo} 
                onChange={(e) => {setTitulo(e.target.value)}} 
            />
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="sinopse"
                label="Sinopse do filme"
                name="sinopse"
                autoFocus                
                value={movSinopse} 
                onChange={(e) => {setSinopse(e.target.value)}} 
            />
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="diretor"
                label="Diretor(a) do filme"
                name="diretor"
                autoFocus                
                value={movDiretor} 
                onChange={(e) => {setDiretor(e.target.value)}} 
            />
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="anoCriacao"
                label="Ano Criação"
                name="anoCriacao"
                autoFocus                
                value={movAnoCriacao} 
                onChange={(e) => {setAnoCriacao(e.target.value)}} 
            />
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="anoPart"
                label="Ano Participação"
                name="anoPart"
                autoFocus                
                value={movAnoPart} 
                onChange={(e) => {setAnoPart(e.target.value)}} 
            />
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="urlPoster"
                label="Url Poster do filme"
                name="urlPoster"
                autoFocus                
                value={movUrlPoster} 
                onChange={(e) => {setUrlPoster(e.target.value)}} 
            />
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="categoria"
                label="Categoria do filme"
                name="categoria"
                autoFocus                
                value={movCategoria} 
                onChange={(e) => {setCategoria(e.target.value)}} 
            />
           <Button variant="contained" color="primary" type="submit" className={classes.submit}>
               Salvar Alteração
           </Button>
        </form>
        </div>
      </main>
    </div>
  );
}