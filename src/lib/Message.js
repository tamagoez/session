import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'

function Getmes(props) {
  const [ mes, setMes ] = useState([])
  const getting = supabase
    .from('channels_chat')
    .on('INSERT', payload => {
      console.log('Change received!', payload)
      setMes(payload)
    })
    .subscribe()
  getting();
}

function Delmes(props) {
  
}

function Engmes(props) {
  
}

export { Getmes, Delmes, Engmes };
