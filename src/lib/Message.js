// https://github.com/samarthmn/supabase-chat-app/blob/master/src/hooks/useMessage.ts

import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import AlertToast from '../components/AlertToast';

function Submes(props) {
  const [messages, setMessages] = useState([])
  const [newMessage, handleNewMessage] = useState(null)
  const [deletedMessage, handleDeletedMessage] = useState(null)
  // const [newChannel, handleNewChannel] = useState(null)
  // const [ mes, setMes ] = useState([]);
  
  useEffect(() => {
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
 

  console.log(messages)
  // console.log(messages.message)
  return (
    <div>
      <p>Now on working</p>
    </div>
  );
}

async function Getmes(props) {
  console.log('props' + props)
  console.log('props.child' + props.chid)
  const chid = props.chid
  try {
    const { status, data, error } = await supabase
      .from('channels_chat')
      .select('*')
      .eq('channel', chid)
    if (error && status !== 406) {
        throw error
    }
    if (data) {
      return(data.message)
    }
  } catch (error) {
     AlertToast('ERROR', error.message + 'Please reload or contact to maintainer(@tamagoez)' , 'error', 12000)
  } finally {
    console.log('Got chat log: ' + chid)
  }
}

async function Addmes(message, chid) {
  const user = supabase.auth.user();
  try {
    const { status, error } = await supabase
      .from('channels_chat')
      .insert([
        { userid: user.id, message: message, channel: chid }
      ])
    if (error && status !== 406) {
        throw error
     }
   } catch (error) {
      AlertToast('ERROR', error.message, 'error', 6000)
   } finally {
      console.log('Message sent')
   } 
}

function Delmes(props) {
  
}

function Engmes(props) {
  
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

export { Submes, Getmes, Addmes, Delmes, Engmes };
