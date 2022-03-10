// https://github.com/samarthmn/supabase-chat-app/blob/master/src/hooks/useMessage.ts

import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'

function Getmes(props) {
  const [messages, setMessages] = useState([])
  const [newMessage, handleNewMessage] = useState(null)
  const [deletedMessage, handleDeletedMessage] = useState(null)
  const [newOrUpdatedUser, handleNewOrUpdatedUser] = useState(null)
  // const [newChannel, handleNewChannel] = useState(null)
  // const [ mes, setMes ] = useState([]);
  const [users] = useState(new Map())
  
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
      userListener.unsubscribe()
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
  
  // Deleted message received from postgres
  useEffect(() => {
    if (deletedMessage) setMessages(messages.filter((message) => message.id !== deletedMessage.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedMessage])
  
  // New or updated user recieved from Postgres
  useEffect(() => {
    if (newOrUpdatedUser) users.set(newOrUpdatedUser.id, newOrUpdatedUser)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newOrUpdatedUser])
  
  return (
    {
      // We can export computed values here to map the authors to each message
      // messages: messages.map((x) => ({ ...x, author: users.get(x.created_by) })),
      messages.map
    }
  );
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

/**
 * Delete a message from the DB
 * @param {number} message_id
 */
export const deleteMessage = async (message_id) => {
  try {
    let { body } = await supabase.from('channels_chat').delete().match({ created_by: message_id })
    return body
  } catch (error) {
    console.log('error', error)
  }
}

export { Getmes, Delmes, Engmes };
