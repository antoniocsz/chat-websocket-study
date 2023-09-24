import { useRef, useState, useEffect } from 'react'

type Props = {
  socket: any
}

export function Chat({ socket }: Props) {
  const messageRef = useRef<any>()
  const [messageList, setMessageList] = useState<any>([])

  async function handleSubmitMessage() {
    const message = messageRef?.current?.value

    if (!message?.trim()) return

    socket.emit('message', message)
    clearInput()
  }

  function clearInput() {
    messageRef.current.value = ''
  }

  useEffect(() => {
    socket.on('receive_message', (data: any) => {
      setMessageList((current: any) => [...current, data])
    })

    return () => socket.off('receive_message')
  }, [socket])

  return (
    <div>
      <h1>Chat</h1>
      {messageList.map((message, index) => (
        <p key={index}>
          {message.author}: {message.text}
        </p>
      ))}

      <input type="text" ref={messageRef} placeholder="Mensagem" />
      <button onClick={handleSubmitMessage}>Entrar</button>
    </div>
  )
}
