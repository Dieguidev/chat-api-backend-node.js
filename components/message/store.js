// const { default: mongoose } = require('mongoose');
// const db = require('mongoose');
const Model = require('./model')

// let URI = 'mongodb+srv://dieguidev:021087Mikeyla@fithouse.ud9bzzl.mongodb.net/chat_api'

// main().catch(err => console.log(err))
// async function main() {
//   await db.connect(URI, {
//     useNewUrlParser: true,
//   })
//   console.log('conexion exitosa a la bd')
// }


function addMessage(message) {

  // list.push(message);
  const myMessage = new Model(message);
  myMessage.save()
}

function getMessage(filterUser) {
  return new Promise((resolve, reject) => {
    let filter = {}
    if (filterUser !== null) {
      filter = { user: filterUser }
    }
    const messages = Model.find(filter)
      .populate('user')
      .catch(e => {
        reject(e)
      })
    resolve(messages)

  })
}

async function updateText(id, message) {
  const foundMessage = await Model.findOne({
    _id: id
  });
  foundMessage.message = message;
  const newMessage = await foundMessage.save();
  return newMessage
}

function deleteMessage(id) {
  return Model.deleteOne({ _id: id })
}

module.exports = {
  add: addMessage,
  list: getMessage,
  updateText: updateText,
  remove: deleteMessage
  //get
  //update
  //delete
}