const store = require('./store')

function addMessage(user, message, chat) {
  return new Promise((resolve, reject) => {
    if (!user || !message || !chat) {
      console.error('[messageController] No hay usuario o mensaje');
      reject('Datos incorrectos')
      return false;
    }
    const fullMessage = {
      chat,
      user,
      message,
      date: new Date()
    };
    store.add(fullMessage)
    resolve(fullMessage)
  })

}

function getMessages(filterUser) {
  return new Promise((resolve, reject) => {
    resolve(store.list(filterUser))
  })
}

function updateMessage(id, message) {
  return new Promise(async (resolve, reject) => {
    if (!id || !message) {
      reject('invalid data');
      return false
    }
    const result = await store.updateText(id, message)
    resolve(result)
  })
}


function deleteMessage(id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject('parametros o id invalido');
      return false
    }
    store.remove(id)
      .then(() => {
        resolve()
      })
      .catch(e => {
        reject(e)
      })
  })
}

module.exports = {
  addMessage, getMessages, updateMessage, deleteMessage
}