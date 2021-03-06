//import coap from 'coap'
//import Telnet from 'telnet-client'
coap = require('coap')
Telnet = require('telnet-client')

const server = coap.createServer()
const telnetConnection = new Telnet()

const telnetParams = {
  host: '127.0.0.1',
  port: 4711,
  shellPrompt: '',
  timeout: 10000,
  negotiationMandatory: false,
  ors: '\r\n',
  waitfor: '\n'
}

const cmd = '>recentBlocked'

let domain = ''

function getBlockedDomain() {
  setTimeout(() => {
    telnetConnection.send(cmd, function(err, response) {
      domain = Math.floor(Math.random() * 10).toString()
      domain += ' ' + response.split('\n')[0]
      console.log(domain)
      getBlockedDomain()
    })
  }, 3000)
}

telnetConnection.on('connect', function() {
  console.log("Connected")
  getBlockedDomain()
})

telnetConnection.connect(telnetParams)

server.on('request', (req, res) => {
  const path = req.url.split('/')[1]
  if (path === 'sensor') { res.end(val) }
  if (path === 'blocked') { res.end(domain) }
})

let val = Math.floor(Math.random() * 10).toString()

function RNG() {
  setTimeout(() => {
    val = Math.floor(Math.random() * 10).toString()
    console.log(val)
    RNG()
  }, 5000)
}

// the default CoAP port is 5683
server.listen(() => {
  console.log('Listening')
  // RNG()
})