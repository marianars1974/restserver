const jwt = require('jsonwebtoken');

//req lo que llega, lo que devuelve, y next para que siga ejecutando

let verifica_token = (req, res, next) =>
{
    //req.get // del headers
    let token = req.get('token');
    //console.log(token);
    if(token===undefined)
    {
        return res.status(401).json(
            {
                ok:false,
                err: {message: "token no enviado"}
            }
        )
    }

    
    jwt.verify(token, process.env.SEED, (err, decoded)=>{

        if(err)
        {
            return res.status(401).json(
                {
                    ok:false,
                    err: {message: "token no valido"}
                }
            )
        }
        //decoded es el payload (info del usuario)
        //le asigno a la peticion la info del usuario.
        req.usuario = decoded.usuario;
        next();

    });
    
    
};

//verificaTokenURl

let verificaTokenUrl = (req,res,next)=>
{

    let token = req.query.token;

    if(token===undefined)
    {
        return res.status(401).json(
            {
                ok:false,
                err: {message: "token no enviado"}
            }
        )
    }

    
    jwt.verify(token, process.env.SEED, (err, decoded)=>{

        if(err)
        {
            return res.status(401).json(
                {
                    ok:false,
                    err: {message: "token no valido"}
                }
            )
        }
        //decoded es el payload (info del usuario)
        //le asigno a la peticion la info del usuario.
        req.usuario = decoded.usuario;
        next();

    });
}

//verifica admin role
let verificaAdminRole = (req, res, next)=>
{
    let usuario_role = req.usuario.role;

    console.log(usuario_role, 'role usuario');
   
    if (usuario_role!=='ADMIN_ROLE')
    {
       // console.log(usuario.role, 'role usuario 1');
        return res.status(400).json({
            ok:false    ,
            err: {message: "Usuario no tiene permiso"}
        });
    }
    next();
}


module.exports = {
    verifica_token,
    verificaAdminRole,
    verificaTokenUrl
}