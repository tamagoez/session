import { useState } from 'react'
import { supabase } from '../supabaseClient'
import React from 'react';
// import { Link, Navigate } from 'react-router-dom';// 追加 Linkタブを読み込む
import { Navigate } from 'react-router-dom';
// import { MdPassword, MdAlternateEmail } from "react-icons/md";

export default function Chat(props) {
  const session = supabase.auth.session();
  return (
    <div>
      {!session ? <Navigate to="/login" state={'/app/chat/channel/' + props.match.params.cid} /> : <CoreChat chid={props.match.params.cid} />}
    </div>
  )
}

function CoreChat(props) {
  // Prepare
  const chid = props.chid
  const [loading, setLoading] = useState(false)
  const userid = supabase.auth.session().user.id
  // const navigate = useNavigate();
  CheckRole({userid})
  GetLog()

  async function GetLog() {
    try {
      setLoading(true)
      const { data, error, status } = await supabase
        .from('channels_chat')
        .select('message')
        .eq('on_channel', chid)
  
        if (error && status !== 406) {
          throw error
        }
  
        console.log(data)
      } catch (error) {
        alert(error.message)
      } finally {
        setLoading(false)
      }
  }

  return (
    <div>
      <p>{loading ? 'Loading ...' : 'Update'}</p>
    </div>
  )
}

function CheckRole({id}) {
  console.log('id is' + id)
}
