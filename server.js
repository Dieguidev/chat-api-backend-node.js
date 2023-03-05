const express = require('express');

const db=require('./db')


const router = require('./Network/routes')

const app = express();
app.use(express.json())   ///esto permite recibir info desde el body

// app.use(router);
router(app);


app.use('/app', express.static('public'));
// app.use('/', function (req, res) {
//   res.send('Hola');
// });

app.listen(3000);
console.log('La aplicacion esta funcionando en http://localhost:3000');