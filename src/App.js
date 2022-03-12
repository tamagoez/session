import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import Toppage from './pages/toppage';
import Account from './pages/Account';
import Dashboard from './pages/dashboard';
import Chat from './pages/chat';

// https://zenn.dev/kenara/articles/3677b9a899cfb9
// https://reffect.co.jp/react/react-router-6
import NotFound from './components/404';
import { supabase } from './supabaseClient'
 

export default function App() {
  const session = supabase.auth.session();
  // const lastsession = "".concat(session);
  const lastsession = session
  
 React.useEffect(() => {
  console.log('session: ' + session);
  console.log('lastsession: ' + lastsession);
   if (session !== lastsession){
    console.log("Seems session changed: " + session);
    // window.location.reload();
   } else {
    console.log("Seems first render: Ignored");
   }
   // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Toppage />} />
        <Route path="/login" element={<Auth type="login" />} />
        <Route path="/signup" element={<Auth type="signup" />} />
        <Route path="/account" element={<Account />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/app" element={<Dashboard />} />
        <Route path="/app/chat/:cid" element={<Chat />} />
        <Route path="*" element={<NotFound />} />;
      </Routes>
    </BrowserRouter>
  );
}
