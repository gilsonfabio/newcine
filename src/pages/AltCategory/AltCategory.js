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
 
export default function AltCategory() {
  const classes = useStyles();
  //const theme = useStyles();
  const navigate = useNavigate();
  
  const params = useParams();

  const [catDescricao, setCatDescricao] = useState(params.catDescricao);
  const [categorias, setCategorias] = useState([]);
  
  function handleCreateCategory(e) {
    e.preventDefault();
    
    let idCat = params.catId;
    api.put(`altcategoria/${idCat}`, {
        catDescricao,   
      }).then(() => {
        alert('categoria alterada com sucesso!')
      }).catch(() => {
        alert('Erro no cadastro!');
    })   
    navigate(-1); 
  }
   
  useEffect(() => {
    let idCat = params.catId;    
    api.get(`searchCategoria/${idCat}`).then(response => {
        //setCategorias(response.data);
        setCatDescricao(response.data[0].catDescricao);
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
            Altere os dados da Categoria 
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
               Salvar Alteração
           </Button>
        </form>
        </div>
      </main>
    </div>
  );
}