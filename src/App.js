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
  const [sessioncount, setSessionCount] = React.useState(0)
  React.useEffect(() => {
    // setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSessionCount((sessioncount += 1))
      if (sessioncount === 1) {
       console.log('Seems session change: ' + session)
       window.location.reload()
      } else {
       console.log('Seems this is first render process.: Ignored');
    })
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
