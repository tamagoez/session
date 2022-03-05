import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'

function Getmes(props) {
  const [ mes, setMes ] = useState([])
  useEffect(() => {
    const messageListener = supabase
      .from('messages')
      .on('INSERT', (payload) => handleNewMessage(payload.new))
      .on('DELETE', (payload) => handleDeletedMessage(payload.old))
      .subscribe()
    // Cleanup on unmount
    return () => {
      messageListener.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  
  return (
    mes
  )
}

function Delmes(props) {
  
}

function Engmes(props) {
  
}

export { Getmes, Delmes, Engmes };
