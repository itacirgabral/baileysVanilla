import { initInMemoryKeyStore, BufferJSON, AuthenticationState  } from '@adiwajshing/baileys-md'

export const saveConnect = (filename: string) => {
	// require fs here so that in case "fs" is not available -- the app does not crash
	const { readFileSync, writeFileSync, existsSync } = require('fs')

	let state: AuthenticationState

	const saveState = () => {
    console.log('saving auth state saveConnect')
    const toWrite = JSON.stringify(state, BufferJSON.replacer, 2)

    writeFileSync(filename, toWrite)
	}

  const { creds, keys } = JSON.parse(readFileSync(filename, { encoding: 'utf-8' }), BufferJSON.reviver)

  state = { 
      creds: creds, 
      // stores pre-keys, session & other keys in a JSON object
      // we deserialize it here
      keys: initInMemoryKeyStore(keys, saveState) 
  }

	return { state, saveState }
}