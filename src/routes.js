import React from 'react';
import { Routes, Route }  from 'react-router-dom';

import Login from './pages/Login/Login';
import Layout from './pages/Layout/Layout';
import Categorias from './pages/Categorias/Categorias';
import NewCategory from './pages/NewCategory/NewCategory';
import AltCategory from './pages/AltCategory/AltCategory';
import Movies from './pages/Movies/Movies';
import NewMovie from './pages/NewMovie/NewMovie';
import AltMovie from './pages/AltMovies/AltMovies';
import Enquetes from './pages/Enquetes/Enquetes';
import NewEnquete from './pages/NewEnquete/NewEnquete';
import AltEnquete from './pages/AltEnquete/AltEnquete';
import Votacao from './pages/Votacao/Votacao';

export default function MainRoutes() {
    return(
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/layout" element={<Layout />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/newcategoria" element={<NewCategory />} />
            <Route path="/altcategory/:catId" element={<AltCategory />} />    
            <Route path="/movies" element={<Movies />} />      
            <Route path="/newmovie" element={<NewMovie />} />
            <Route path="/altmovie/:movId" element={<AltMovie />} /> 
            <Route path="/enquetes" element={<Enquetes />} />      
            <Route path="/newenquete" element={<NewEnquete />} />
            <Route path="/altenquete/:enqId" element={<AltEnquete />} />
            <Route path="/votacao/:movId" element={<Votacao />} />  
        </Routes>
    )
}
