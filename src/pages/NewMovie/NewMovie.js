import React, {useState} from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import api from '../../services/api';
import { TextField } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

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
 
export default function NewMovie() {
  const classes = useStyles();

  const [movTitulo, setTitulo] = useState('');
  const [movSinopse,  setSinopse] = useState('');
  const [movDiretor,  setDiretor] = useState('');
  const [movAnoCriacao, setAnoCriacao] = useState('');
  const [movAnoPart,  setAnoPart] = useState('');
  const [movUrlPoster,  setUrlPoster] = useState('');
  const [movCategoria, setCategoria] = useState('');

  const navigate = useNavigate();
  
  function handleHistory() {
    //history.push("/landing");
  }

  function handleCreateCategory(e) {
    e.preventDefault();
    
    api.post('newcategory', {
        movTitulo, 
        movSinopse,  
        movDiretor,  
        movAnoCriacao,
        movAnoPart,  
        movUrlPoster,
        movCategoria      
    }).then(() => {
        alert('categoria cadastrata com sucesso!')
    }).catch(() => {
        alert('Erro no cadastro!');
    })    
    navigate(-1);
  }

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
            Informe dados do Filme
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
            Salvar cadastro
          </Button>
        </form>
        </div>
      </main>
    </div>
  );
}