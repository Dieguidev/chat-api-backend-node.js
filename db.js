const { default: mongoose } = require('mongoose');
const db = require('mongoose');
require('dotenv').config();

let URI = process.env.DB_URI

main().catch(err => console.log(err))
async function main() {
  await db.connect(URI, {
    useNewUrlParser: true,
  })
  console.log('conexion exitosa a la bd')
}

module.exports= main