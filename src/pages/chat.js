import { useState } from 'react'
import { supabase } from '../supabaseClient'
import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';// 追加 Linkタブを読み込む

// import { MdPassword, MdAlternateEmail } from "react-icons/md";

export default function Chat(props) {
  const session = supabase.auth.session();
  return (
    <div>
      {!session ? <Navigate to="/login" state={'/app/chat/channel/' + props.cid} : <CoreChat cid={props.cid} /> />}
    </div>
  )
}

function CoreChat(props) {
  // Prepare
  const chid = props.cid
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
}
