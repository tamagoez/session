import { useState } from 'react'
import { supabase } from '../supabaseClient'
import React from 'react';
// import { Link, Navigate } from 'react-router-dom';// 追加 Linkタブを読み込む
import { Navigate, useParams } from 'react-router-dom';
// import { MdPassword, MdAlternateEmail } from "react-icons/md";

export default function Chat(props) {
  var session = supabase.auth.session();
  const { cid } = useParams();
  return (
    <div>
      {!session ? <Navigate to="/login" state={'/app/chat/' + cid} /> : <CoreChat chid={cid} />}
    </div>
  )
}

function CoreChat(props) {
  // Prepare
  const chid = props.chid
  const [loading, setLoading] = useState(false)
  var session = supabase.auth.session();
  const userid = session.user.id;
  // const navigate = useNavigate();
  CheckRole({userid})
  GetLog()

  async function GetLog() {
    try {
      setLoading(true)
      const { data, error, status } = await supabase
        .from('channels_chat')
        .select('message')
        .eq('channel', chid)
  
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
  console.log('id is ' + id)
}
