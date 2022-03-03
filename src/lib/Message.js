import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'

function Getmes(props) {
  const [ mes, setMes ] = useState([])
  useEffect(() => {
    const getting = supabase
      .from('channels_chat')
      .on('INSERT', payload => {
        console.log('Change received!', payload)
        setMes(payload)
      })
      .subscribe()
  }
  
  return {
    // We can export computed values here to map the authors to each message
    messages: messages.map((x) => ({ ...x, author: users.get(x.user_id) })),
  }
}

function Delmes(props) {
  
}

function Engmes(props) {
  
}

export { Getmes, Delmes, Engmes };
