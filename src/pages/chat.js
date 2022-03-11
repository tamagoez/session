// import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import React from 'react';
// import { Link, Navigate } from 'react-router-dom';// 追加 Linkタブを読み込む
import { Navigate, useParams } from 'react-router-dom';
// import { MdPassword, MdAlternateEmail } from "react-icons/md";

// import { GetLog } from '../lib/GetLog';
// import { CheckRole } from '../lib/CheckRole';

import { Getmes } from '../lib/Message';
import { Textarea } from '@chakra-ui/react';

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
  // const [loading, setLoading] = useState(false)
  // console.log('Loading: ' + loading)
  // setLoading(true)
  
  const chid = props.chid
  console.log('channelID: ' + chid)
  var session = supabase.auth.session();
  
  // console.log('User session: ' + session)
  
  const userid = session.user.id;
  console.log('userID: ' + userid)
  
  // const navigate = useNavigate();
  // setLoading(false)
  
  // useEffect(() => {
  //   console.log('Load: ' + loading)
  // }, [loading])
  
  CheckRole()
  // GetLog()
  
  // const { messages } = Getmes({ chid })
  
  function CheckRole() {
    console.log('id is ' + userid)
  }
  
  return (
    <div>
      <Getmes id={chid} />
    </div>
   )
}

function MessageBox(){
    return (
      <>
        <Textarea
          placeholder='Here is a sample placeholder'
          size='md'
          resize='none'
        />
      </>
    )
  }
}
