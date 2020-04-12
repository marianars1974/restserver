const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const fs = require('fs');
const path = require('path');

const Usuario = require('../models/usuario');

//defaulto options ver 
app.use(fileUpload()); //los archivos subidos los pone en req.files

app.put('/upload/:tipo/:id', function(req, res) {
    let tipo = req.params.tipo;
    let id = req.params.id;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json(
           {
               ok:false,
               err: {mesage: "no hay archivos"}
           } );
    }
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let archivo = req.files.archivo; //nomber del campo de la imagen.

    let tiposValidos = ['usuarios','producto'];

    if (tiposValidos.indexOf(tipo)<0){
        return res.status(500).json( {
                ok:false,
                err: {message: 'los tipos validas son ' + tiposValidos.join(', ')}
        });
    }  
    //validar ext
    let extensionesValidas = ['png','jpg','gif','jpeg'];

    let nombreArchivo =archivo.name.split('.');
    console.log(nombreArchivo);
    let extension =nombreArchivo[nombreArchivo.length-1];
    console.log(extension);

    if (extensionesValidas.indexOf(extension)<0){
        return res.status(500).json( {
                ok:false,
                err: {message: 'las externsiones validas son ' + extensionesValidas.join(', ')}
        });
    }  

    //cambiar nombre archivos
    let nombreArchivoRenom = `${id}-${new Date().getMilliseconds()}.${extension}`;
    archivo.mv(`upload/${tipo}/${nombreArchivoRenom}`, (err) => {
        if (err)
          return res.status(500).json(
             {
                 ok:false,
                 err
             });

        imagenUsuario(id, res,nombreArchivoRenom);
             
    
       
      });



} );

let imagenUsuario = (id, res,nombreArchivoRenom)=>
{
    Usuario.findById(id, (err,usuarioDB )=>{
        if (err)
        {
        return res.status(500).json({
                ok: false,
                err: {message: "usaurio no existe f" }
            });
        }
        if (!usuarioDB)
        {
             return res.status(400).json({
                ok: false,
                err: {message: "usaurio no existe" }
            });
        }

        let pahtImg = path.resolve(__dirname,`../../uploads/usuarios/`);


        usuarioDB.img = nombreArchivoRenom;
        usuarioDB.save((err, UsuarioDb)=>
        {
             res.json(
                 {ok:true,
                usuario: usuarioDB,
                img: nombreArchivoRenom
            });
        
        });

    });
};

module.exports = app;
