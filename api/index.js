const express = require('express')
const cors = require('cors')
const SocketServer = require('ws').Server

// open server
const PORT = process.env.PORT || 3001
const app = express()

const server = app.listen(PORT,() => {
    console.log(`open port ${PORT}`)
})

// middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

/**
 * api
 */

// get
app.get('/user',(req,res) => {
    res.send('hello')
})

app.get('/userJson',(req,res) => {
    const jsonObject = {
        id: 123,
        name: 'jonas',
        school: '中山'
    }
    res.json(jsonObject)
})

app.get('/user/:id',(req,res) => {
    const jsonObject = {
        params: req.params.id,
        queryId: req.query.id
    }
    res.json(jsonObject)
})

// post
app.post('/userPost',(req,res) => {
    const user = req.body
    res.json(user)
})

// websocket server
const wss = new SocketServer({ server })

wss.on('connection', (ws,req) => {
    //接收訊息
    ws.on('message', data => {
        console.log(data)
        const dataStr = data.toString()
        console.log(JSON.parse(dataStr))
        ws.send(dataStr)

    })

    ws.on('close', () => {
        console.log('Close connected')
    })
})

