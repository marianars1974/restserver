// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;


// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
//  secret key SEED SEMILLA AUTOTENCIACION
// ============================
process.env.SEED = process.env.SEED || 'este-es-secret-dev';


// ============================
//  VENCIMIENTO TOKENT
// ============================
//expira '' * ' * hs * d
process.env.VENC_TOKEN =  60 * 60 * 24 * 30;


// ============================
//  Base de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;