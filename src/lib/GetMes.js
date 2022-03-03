import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'

export default function GetMes(props) {
  const [channels, setChannels] = useState([])
  const [messages, setMessages] = useState([])
  const [users] = useState(new Map())
  const [newMessage, handleNewMessage] = useState(null)
  const [newChannel, handleNewChannel] = useState(null)
  const [newOrUpdatedUser, handleNewOrUpdatedUser] = useState(null)
  const [deletedChannel, handleDeletedChannel] = useState(null)
  const [deletedMessage, handleDeletedMessage] = useState(null)
  
  // Get Channels
  const chid = props.id
  
  // Load initial data and set up listeners
  useEffect(() => {
    // Listen for new and deleted messages
    const messageListener = supabase
      .from('messages')
      .on('INSERT', (payload) => handleNewMessage(payload.new))
      .on('DELETE', (payload) => handleDeletedMessage(payload.old))
      .subscribe()
    // Listen for changes to our users
    const userListener = supabase
      .from('users')
      .on('*', (payload) => handleNewOrUpdatedUser(payload.new))
      .subscribe()
    // Listen for new and deleted channels
    const channelListener = supabase
      .from('channels')
      .on('INSERT', (payload) => handleNewChannel(payload.new))
      .on('DELETE', (payload) => handleDeletedChannel(payload.old))
      .subscribe()
    // Cleanup on unmount
    return () => {
      messageListener.unsubscribe()
      userListener.unsubscribe()
      channelListener.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  // New message recieved from Postgres
  useEffect(() => {
    if (newMessage && newMessage.channel_id === Number(chid)) {
      const handleAsync = async () => {
        let authorId = newMessage.user_id
        if (!users.get(authorId)) await fetchUser(authorId, (user) => handleNewOrUpdatedUser(user))
        setMessages(messages.concat(newMessage))
      }
      handleAsync()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage])
  
    // Deleted message received from postgres
  useEffect(() => {
    if (deletedMessage) setMessages(messages.filter((message) => message.id !== deletedMessage.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedMessage])

  // New channel recieved from Postgres
  useEffect(() => {
    if (newChannel) setChannels(channels.concat(newChannel))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newChannel])

  // Deleted channel received from postgres
  useEffect(() => {
    if (deletedChannel) setChannels(channels.filter((channel) => channel.id !== deletedChannel.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedChannel])

  // New or updated user recieved from Postgres
  useEffect(() => {
    if (newOrUpdatedUser) users.set(newOrUpdatedUser.id, newOrUpdatedUser)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newOrUpdatedUser])

  return {
    // We can export computed values here to map the authors to each message
    messages: messages.map((x) => ({ ...x, author: users.get(x.user_id) })),
    channels: channels !== null ? channels.sort((a, b) => a.slug.localeCompare(b.slug)) : [],
    users,
  }
}

export const fetchUser = async (userId, setState) => {
  try {
    let { body } = await supabase.from('users').select(`*`).eq('id', userId)
    let user = body[0]
    if (setState) setState(user)
    return user
  } catch (error) {
    console.log('error', error)
  }
}
