const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const {verifica_token,verificaTokenUrl} = require('../middlewares/autenticacion');



app.get('/imagen/:tipo/:img',verificaTokenUrl,(req,res)=>{

    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImg  = path.resolve(__dirname,`../../upload/${tipo}/${img}`);

    if (fs.existsSync(pathImg))
    {
        res.sendFile(pathImg);    
    }
else
{    let noImgPath = path.resolve(__dirname, '../assets/noImg.png');

res.sendFile(noImgPath);
}
    /*res.json({
        ok:true,
        message: {tipo: tipo, img:img}
    });
*/

});

module.exports = app;