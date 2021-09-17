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
 
export default function NewCategory() {
  const classes = useStyles();
  const navigate = useNavigate();
  
  const [catDescricao, setCatDescricao] = useState('');
  
  function handleCreateCategory(e) {
    e.preventDefault();
    
    api.post('newcategory', {
        catDescricao,   
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
            Informe a nova Categoria
          </Typography> 
        <form onSubmit={handleCreateCategory} >
            <TextField 
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="descricao"
                label="Descrição da Categoria"
                name="descricao"
                autoFocus                
                value={catDescricao} 
                onChange={(e) => {setCatDescricao(e.target.value)}} 
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