import { useEffect, useRef, useState } from 'react'
import { useSocket } from '../hooks/useSocket.js'
import { useChatStore } from '../store/useChatStore.js'

export default function Chat() {
  const socketRef = useSocket()
  const { messages, registerSocketHandlers, sendMessage } = useChatStore()
  const [recipientId, setRecipientId] = useState('')
  const [content, setContent] = useState('')
  const listRef = useRef(null)

  useEffect(() => {
    if (socketRef.current) registerSocketHandlers(socketRef)
  }, [socketRef, registerSocketHandlers])

  const onSend = async (e) => {
    e.preventDefault()
    if (!recipientId || !content) return
    // Try websocket first; if not connected, fallback to REST
    const socket = socketRef.current
    if (socket) {
      socket.emit('send_message', { recipientId, content })
    } else {
      await sendMessage({ recipientId, content })
    }
    setContent('')
    listRef.current?.scrollTo(0, listRef.current.scrollHeight)
  }

  return (
    <div className="grid grid-rows-[1fr_auto] h-[70vh] border rounded bg-white">
      <div ref={listRef} className="overflow-auto p-4 space-y-2">
        {messages.map((m) => (
          <div key={m._id || m.id} className="text-sm">
            <span className="font-medium">{m.sender?.firstName || 'Me'}:</span> {m.content}
          </div>
        ))}
      </div>
      <form onSubmit={onSend} className="flex gap-2 p-2 border-t">
        <input placeholder="Recipient ID" value={recipientId} onChange={(e) => setRecipientId(e.target.value)} className="border rounded px-2 py-1 text-sm w-48" />
        <input placeholder="Type a message" value={content} onChange={(e) => setContent(e.target.value)} className="border rounded px-2 py-1 text-sm flex-1" />
        <button className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">Send</button>
      </form>
    </div>
  )
}
