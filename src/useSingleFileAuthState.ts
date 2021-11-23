import baileys, { initInMemoryKeyStore, initAuthCreds, BufferJSON, AuthenticationState  } from '@adiwajshing/baileys-md'

export const useSingleFileAuthState = (filename: string) => {
	// require fs here so that in case "fs" is not available -- the app does not crash
	const { readFileSync, writeFileSync, existsSync } = require('fs')

	let state: AuthenticationState

	// save the authentication state to a file
	const saveState = () => {
		console.log('saving auth state')
		writeFileSync(
			filename,
			// BufferJSON replacer utility saves buffers nicely
			JSON.stringify(state, BufferJSON.replacer, 2)
		)
	}
	
    if(existsSync(filename)) {
        const { creds, keys } = JSON.parse(
            readFileSync(filename, { encoding: 'utf-8' }), 
            BufferJSON.reviver
        )
        state = { 
            creds: creds, 
            // stores pre-keys, session & other keys in a JSON object
            // we deserialize it here
            keys: initInMemoryKeyStore(keys, saveState) 
        }
    } else {
        const creds = initAuthCreds()
        const keys = initInMemoryKeyStore({ }, saveState)
        state = { creds: creds, keys: keys }
    }

	return { state, saveState }
}