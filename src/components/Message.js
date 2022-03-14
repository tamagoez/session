const Message = (message) => {
  console.log('[RENDER] ID: ' + message.id)
  console.log('[RENDER] UserID: ' + message.userid)
  console.log('[RENDER] Message: ' + message.message)
  console.log('[RENDER] props: ' + message)
  console.log('[RENDER] ------------------------------')
  return (
      <div id="Message">
        <p id={message.id}>{message.userid}</p>
        <p>{message.message}</p>
      </div>
  )
}

export default Message
