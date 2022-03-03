import { useState } from 'react'
import { supabase } from '../supabaseClient'
import React from 'react';
// import { Link, Navigate } from 'react-router-dom';// 追加 Linkタブを読み込む
import { Navigate, useParams } from 'react-router-dom';
// import { MdPassword, MdAlternateEmail } from "react-icons/md";

// import { GetLog } from '../lib/GetLog';
// import { CheckRole } from '../lib/CheckRole';

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
  console.log('User session: ' + session)
  const userid = session.user.id;
  console.log('userID: ' + userid)
  // const navigate = useNavigate();
  // setLoading(false)
}
