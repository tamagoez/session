import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'

function Getmes(props) {
  const [ mes, setMes ] = useState([])
  
  function handleNewMes(value){
    console.log(value)
    setMes(value)
  }
  
  useEffect(() => {
    const messageListener = supabase
      .from('channels_chat')
      .on('INSERT', (payload) => handleNewMes(payload.new))
      // .on('DELETE', (payload) => console.log(payload.old); setMes(payload.old))
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
