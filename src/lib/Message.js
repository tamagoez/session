import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'

function Getmes(props) {
  const [ mes, setMes ] = useState([])
  useEffect(() => {
    supabase
      .from('channels_chat')
      .on('INSERT', payload => {
        console.log('Change received!', payload)
        setMes(payload)
      })
      .subscribe()
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
