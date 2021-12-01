import { initInMemoryKeyStore, initAuthCreds, BufferJSON, AuthenticationState  } from '@adiwajshing/baileys-md'
import { writeFileSync} from 'fs'

export const saveSignup = (filename: string) => {
	let state: AuthenticationState

	const saveState = () => {
		console.log('saving auth state saveSignup')
		const toWrite = JSON.stringify(state, BufferJSON.replacer, 2)

		writeFileSync(filename, toWrite)
	}
	
	const creds = initAuthCreds()
	const keys = initInMemoryKeyStore({ }, saveState)
	state = { creds: creds, keys: keys }

	return { state, saveState }
}
