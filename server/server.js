require ("./config/config.js");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.json({"nombre":"Mariana","edad":"47"})
})

app.post('/usuario', function (req, res) {
    let body = req.body;

    if (body.nombre ===undefined)
    {
        res.status(400).json({
                ok: false,
                mensaje: "el nombre es obligatorio"
        });
    }
    else
    {
        res.json({
            persona: body
        });
    }
    let nombre =body.nombre;
    let edad =body.edad;
   
   
  });
 
app.put('/usuario/:id', function (req, res) {
let id_usuario =req.params.id;
res.json({id_usuario,"nombre":"Mariana","edad":"47"})
})

app.delete('/usuario', function (req, res) {
    res.json({"nombre":"Mariana","edad":"47"})
  })
app.listen(process.env.PORT,()=>{
    console.log("escuchado puerto",process.env.PORT);
})