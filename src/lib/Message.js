// https://github.com/samarthmn/supabase-chat-app/blob/master/src/hooks/useMessage.ts

import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'

function Getmes(props) {
  
  const [ mes, setMes ] = useState([]);
  
  useEffect(() => {
    supabase
      .from('channels_chat')
      .on('INSERT', handleInsert)
      // .on('DELETE', (payload) => console.log(payload.old); setMes(payload.old))
      .subscribe()
      // Cleanup on unmount
      // return () => {
      //   messageListener.unsubscribe()
      // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mes])
  
  const handleInsert = (payload: { new: MESSAGE }) => {
    setMes([...messages, payload.new]);
  };
  
  return (mes);
}

function Delmes(props) {
  
}

function Engmes(props) {
  
}

export { Getmes, Delmes, Engmes };
