import './App.css'
import { useState } from 'react'

import { Chat } from './components/Chat'
import { Join } from './components/Join'

export default function App() {
  const [chatVisibility, setChatVisibility] = useState(false)
  const [socket, setSocket] = useState(null)

  return (
    <div>
      {chatVisibility ? (
        <Chat socket={socket} />
      ) : (
        <Join setSocket={setSocket} setChatVisibility={setChatVisibility} />
      )}
    </div>
  )
}
