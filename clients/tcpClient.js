const net = require('net')

const PORT = 3002
const client = net.connect(PORT,() => {
    console.log('client 請求連線')
})

//tcp 資料傳遞為 string or buffer
client.on('connect', data => {
    // const clientData = {
    //     hello: 'world'
    // }

    // client.write(JSON.stringify(clientData), () => {
    //     console.log('client send data')
    // })


    //const buf = Buffer.alloc(10, 1);
    const buf =  Buffer.from([8, 6, 7, 5, 3, 0, 9]);
    client.write(buf, () => {
        console.log('client send data')
    })

    //結束 client 端 連線
    client.end()
})

client.on('data', data => {
    console.log('client端：收到 server端 傳輸資料為 ' + data.toString())
})