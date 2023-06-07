const express = require('express')
require('dotenv').config();
const app = express()




app.listen(process.env.PORTA,()=>{
    console.log('servidor iniciado com sucesso!');
})