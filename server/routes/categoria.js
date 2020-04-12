const express = require('express');

const {verifica_token}  = require('../middlewares/autenticacion');

let app = express();

let Categoria =  require('../models/usuario');

//listar categorias
app.get('/categoria',verifica_token,(req,res)=>{

    

});


// mostrar 1 categoria x id
app.get('/categoria/:id',verifica_token,(req,res)=>{

    

});

// crear categoria
app.post('/categoria',verifica_token,(req,res)=>{

    

});

// crear categoria
app.post('/categoria',verifica_token,(req,res)=>{

    

});

// actualizar categoria
app.put('/categoria/:id',verifica_token,(req,res)=>{

    

});

// borarr categoria solo la borra admin borrar fisicamente
app.put('/categoria/:id',verifica_token,(req,res)=>{

    

});
