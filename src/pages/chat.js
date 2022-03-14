import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabaseClient'
import React from 'react';
// import { Link, Navigate } from 'react-router-dom';// 追加 Linkタブを読み込む
import { useNavigate, useParams } from 'react-router-dom';
// import { MdPassword, MdAlternateEmail } from "react-icons/md";

// import { GetLog } from '../lib/GetLog';
// import { CheckRole } from '../lib/CheckRole';

import { Submes, Addmes, Getmes } from '../lib/Message';
import { Textarea, Button } from '@chakra-ui/react';
// import AlertToast from '../components/AlertToast'

import { IoSend } from "react-icons/io5";
import BeatLoader from "react-spinners/BeatLoader";

import Message from "../components/Message";

export default function Chat(props) {
  const navigate = useNavigate();
  const { cid } = useParams();
  const chid = cid
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    var session = supabase.auth.session();
    if (!session) {
      navigate('/login?after=/app/chat/' + cid)
    } else {
      console.log('channelID: ' + chid)
      const userid = session.user.id;
      console.log('userID: ' + userid)
      CheckRole()
      function CheckRole() {
        console.log('id is ' + userid)
      } 
      setMessages = Getmes({ chid })
    }
    return () => {
      console.log('Component unmounted')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const messagesEndRef = useRef(null)  
  useEffect(() => {
    messagesEndRef.current.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    })
  }, [messages])
    
  return (
    <div>
      <Submes id={chid} />
      <div>
        <div>
          {messages.map((x) => (
            <Message message={x} />
           ))}
          </div>
          <div ref={messagesEndRef} style={{ height: 0 }} />
        </div>
      <CoreChat chid={chid} />
    </div>
  )
}

function CoreChat(props) {
  const chid = props.chid
  const [sendtext, setSendText] = useState('')
  const [sendstatus, setSendStatus] = useState(false)
  function clicksend(sendtext){
    setSendStatus(true)
    Addmes(sendtext, chid)
    setSendStatus(false)
  }
  return (
    <div>
      <div>
        <Textarea
            placeholder='Here is a sample placeholder'
            size='md'
            resize='none'
            onChange={(e) => setSendText(e.target.value)}
          />
          <Button
            isLoading={sendstatus}
            colorScheme='green'
            spinner={<BeatLoader size={8} color='white' />}
            onClick={() => clicksend(sendtext)}
          >
            <IoSend />
          </Button>
      </div>
    </div>
   )
}
