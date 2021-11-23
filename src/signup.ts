import baileys from '@adiwajshing/baileys-md'
import { useSingleFileAuthState  } from './useSingleFileAuthState'

const number = !!process.argv[2] ? String(Math.random()).slice(2) : process.argv[2] 
console.log(`number=${number}`)

const { state, saveState } = useSingleFileAuthState(`./auth_info_multi.${number}.json`)

const signup = baileys({
  printQRInTerminal: true,
  auth: state
})

// SAVE STATE
signup.ev.on('creds.update', saveState)

// after auto close
// reconnect
signup.ev.on('connection.update', (update) => {
  const { connection, lastDisconnect } = update
  
  if(connection === 'close') {
    const { state, saveState } = useSingleFileAuthState(`./auth_info_multi.${number}.json`)
    const connect = baileys({
      printQRInTerminal: true,
      auth: state
    })

    // SAVE STATE
    connect.ev.on('creds.update', saveState)

    connect.ev.on('messages.update', () => console.log('messages.update'))
    connect.ev.on('presence.update', () => console.log('presence.update'))
    connect.ev.on('chats.update', () => console.log('chats.update'))
    connect.ev.on('contacts.update', () => console.log('contacts.update'))
  }
})

