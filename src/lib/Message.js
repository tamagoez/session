// https://github.com/samarthmn/supabase-chat-app/blob/master/src/hooks/useMessage.ts

import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'

function Getmes(props) {
  const [newMessage, handleNewMessage] = useState(null)
  const [deletedMessage, handleDeletedMessage] = useState(null)
  const [newOrUpdatedUser, handleNewOrUpdatedUser] = useState(null)
  // const [newChannel, handleNewChannel] = useState(null)
  const [ mes, setMes ] = useState([]);
  
  useEffect(() => {
    // Listen for changes to our users
    const userListener = supabase
      .from('profiles')
      .on('*', (payload) => handleNewOrUpdatedUser(payload.new))
      .subscribe()
    const messageListener = supabase
      .from('channels_chat')
      .on('INSERT', (payload) => handleNewMessage(payload.new))
      .on('DELETE', (payload) => handleDeletedMessage(payload.old))
      .subscribe()
    // Cleanup on unmount
    return () => {
      messageListener.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  // New message recieved from Postgres
  useEffect(() => {
    if (newMessage && newMessage.channel === Number(props.chid)) {
      const handleAsync = async () => {
        let authorId = newMessage.created_by
        if (!users.get(authorId)) await fetchUser(authorId, (user) => handleNewOrUpdatedUser(user))
        setMessages(messages.concat(newMessage))
      }
      console.log("New message: " + newMessage)
      handleAsync()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage])
  
  return (mes);
}

function Delmes(props) {
  
}

function Engmes(props) {
  
}

export const fetchUser = async (userId, setState) => {
  try {
    let { body } = await supabase.from('profiles').select(`*`).eq('id', userId)
    let user = body[0]
    if (setState) setState(user)
    return user
  } catch (error) {
    console.log('error', error)
  }
}

export { Getmes, Delmes, Engmes };
