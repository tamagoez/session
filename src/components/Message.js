const Message = ({ message }) => {
  return (
      <div id="Message">
        <p id={message.id}>{message.author.username}</p>
        <p>{message.message}</p>
      </div>
  )
}

export default Message
