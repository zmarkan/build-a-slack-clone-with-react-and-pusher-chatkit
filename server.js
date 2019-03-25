const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server')

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: "v1:us1:2bec9f06-84eb-45c8-b5f8-814e2e617145",
  key:
    "2035043a-f9ee-4bf4-9a5a-2c8042e377b0:OKLls5zvcrDpU25DW8yOY430Sp5+/tYmTV+PaPVQl88="
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
  const { username } = req.body
  chatkit
    .createUser({
      id: username,
      name: username
    })
    .then((user) => {

      chatkit.addUsersToRoom({
        roomId: "19389963",
        userIds: [username]
      })

      res.sendStatus(201)


    })
    .catch(error => {
      if (error.error === 'services/chatkit/user_already_exists') {
        res.sendStatus(200)
      } else {
        res.status(error.status).json(error)
      }
    })
})

app.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({ userId: req.query.user_id })
  res.status(authData.status).send(authData.body)
})

const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
