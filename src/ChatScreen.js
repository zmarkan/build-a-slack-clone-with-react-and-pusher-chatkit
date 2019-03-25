import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit-client'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import TypingIndicator from './components/TypingIndicator'
import WhosOnlineList from './components/WhosOnlineList'
import NavBar from './components/NavBar'

class ChatScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {},
      currentRoom: {},
      messages: [],
      usersWhoAreTyping: [],
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.sendTypingEvent = this.sendTypingEvent.bind(this)
  }

  sendTypingEvent() {
    this.state.currentUser
      .isTypingIn({ roomId: this.state.currentRoom.id })
      .catch(error => console.error('error', error))
  }

  sendMessage(text) {

    let links = text.match(/\bhttps?:\/\/\S+/gi)
    let message = []
    message.push({type: "text/plain", content: text})

    if(links) {
      message.push({type: "text/html", url: links[0] })
    }

    this.state.currentUser.sendMultipartMessage({
      roomId: this.state.currentRoom.id,
      parts: message
    })

    // // const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
    // // let linkIndex = text.search(urlRegex)
    // // let link = text.search(urlRegex)


    // this.state.currentUser.sendMessage({
    //   text,
    //   roomId: this.state.currentRoom.id,
    // })
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:2bec9f06-84eb-45c8-b5f8-814e2e617145',
      userId: this.props.currentUsername,
      tokenProvider: new Chatkit.TokenProvider({
        url: 'http://localhost:3001/authenticate',
      }),
    })

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser })
        return currentUser.subscribeToRoomMultipart({
          roomId: "19389919",
          messageLimit: 100,
          hooks: {
            onMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              })
            },
            // onUserStartedTyping: user => {
            //   this.setState({
            //     usersWhoAreTyping: [
            //       ...this.state.usersWhoAreTyping,
            //       user.name
            //     ]
            //   })
            // },
            // onUserStoppedTyping: user => {
            //   this.setState({
            //     usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
            //       username => username !== user.name
            //     )
            //   })
            // },
            onPresenceChange: () => this.forceUpdate(),
            onUserJoined: () => this.forceUpdate()
          }
        })
      })
      .then(currentRoom => {
        this.setState({ currentRoom })
      })
      .catch(error => console.error('error', error))
  }

  render() {
    const styles = {
      container: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '38px',
      },
      chatContainer: {
        display: 'flex',
        flex: 1,
      },
      whosOnlineListContainer: {
        width: '15%',
        padding: 20,
        backgroundColor: '#2c303b',
        color: 'white',
      },
      chatListContainer: {
        padding: 20,
        width: '85%',
        display: 'flex',
        flexDirection: 'column',
      },
    }

    return (
      <div style={styles.container}>
        <NavBar />
        <div style={styles.chatContainer}>
          <aside style={styles.whosOnlineListContainer}>
            <WhosOnlineList
              currentUser={this.state.currentUser}
              users={this.state.currentRoom.users}
            />
          </aside>
          <section style={styles.chatListContainer}>
            <MessageList
              messages={this.state.messages}
              style={styles.chatList}
            />
            <TypingIndicator
              usersWhoAreTyping={this.state.usersWhoAreTyping}
            />
            <SendMessageForm
              onSubmit={this.sendMessage}
              onChange={this.sendTypingEvent}
            />
          </section>
        </div>
      </div>
    )
  }
}

export default ChatScreen
