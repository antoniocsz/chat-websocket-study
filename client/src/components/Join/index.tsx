import { useRef } from 'react'
import * as io from 'socket.io-client'

type Props = {
  setChatVisibility: any
  setSocket: any
}

export function Join({ setSocket, setChatVisibility }: Props) {
  const usernameRef = useRef<HTMLInputElement | null>(null)

  async function handleSubmitUser() {
    const username = usernameRef?.current?.value

    if (!username?.trim()) return

    const socket = await io.connect('http://localhost:3001')
    socket.emit('set_username', username)
    setSocket(socket)
    setChatVisibility(true)
  }

  return (
    <div>
      <h1>Join</h1>
      <input type="text" ref={usernameRef} placeholder="Entrar na conversa" />
      <button onClick={handleSubmitUser}>Enviar</button>
    </div>
  )
}
