import baileys from '@adiwajshing/baileys-md'
import { saveConnect  } from './saveConnect'

if (process.argv[2]) {
  const { state, saveState } = saveConnect(`./auth_info_multi.${process.argv[2]}.json`)

  const connect = baileys({
    printQRInTerminal: true,
    auth: state
  })

  connect.ev.on('creds.update', saveState)

  connect.ev.on('messages.update', () => console.log('messages.update'))
  connect.ev.on('presence.update', () => console.log('presence.update'))
  connect.ev.on('chats.update', () => console.log('chats.update'))
  connect.ev.on('contacts.update', () => console.log('contacts.update'))
}