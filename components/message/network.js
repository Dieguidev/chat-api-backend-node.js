const express = require('express');
const multer = require('multer')
const router = express.Router();
const path = require('path')
const response = require('../../Network/response');
const controller = require('./controller')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() +
      path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
// const upload = multer({
//   dest: 'uploads/'
// })

router.get('/', function (req, res) {
  const filterMessage = req.query.chat || null;

  controller.getMessages(filterMessage)
    .then((messageList) => {
      response.success(req, res, messageList, 200)
    })
    .catch(e => {
      response.error(req, res, 'unexpected error', 500, e)
    })
})
router.post('/', upload.single('file'), function (req, res) {
  controller.addMessage(req.body.user, req.body.message, req.body.chat)
    .then(() => {
      response.success(req, res, 'Creado correctamente', 201)
    })
    .catch(e => {
      response.error(req, res, 'Informacion invalida', 400, 'Error en el controller')
    })

})

router.patch('/:id', function (req, res) {
  controller.updateMessage(req.params.id, req.body.message)
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch(e => {
      response.error(req, res, 'Error interno', 500, e)
    })
})

router.delete('/:id', function (req, res) {
  controller.deleteMessage(req.params.id)
    .then(() => {
      response.success(req, res, `Mensaje del usuario ${req.params.id} eliminado`, 200)
    })
    .catch(e => {
      response.error(req, res, 'Error interno', 500, e)
    })
})

module.exports = router;