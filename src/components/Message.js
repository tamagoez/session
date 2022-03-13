const Message = ({ message }) => {
  return (
      <div id="Message">
        <p id={message.id}>{message.userid}</p>
        <p>{message.message}</p>
      </div>
  )
}

export default Message
