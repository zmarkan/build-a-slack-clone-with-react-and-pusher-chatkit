import React, { Component } from "react"

class Message extends Component {

    state = {
        linkEmbed: ""
    }

    componentDidMount() {
        window.iframely && window.iframely.load();
    }

    getIframelyHtml() {
        return { __html: this.state.linkEmbed };
    }

    render() {

        const styles = {
            container: {
                overflowY: 'scroll',
                flex: 1,
            },
            ul: {
                listStyle: 'none',
            },
            li: {
                marginTop: 13,
                marginBottom: 13,
            },
            senderUsername: {
                fontWeight: 'bold',
            },
            message: { fontSize: 15 },
        }

        let message = this.props.message
        let text = message.parts[ 0 ].payload.content

        console.log(message)

        let hasLink = message.parts.length > 1
        let link = ""
        if (hasLink && this.state.linkEmbed.length <= 0 ) {
            link = encodeURIComponent(message.parts[1].payload.url) 
            let iframelyAPICall = `https://iframe.ly/api/oembed?api_key=2ca0506ea6b3b12f93913b&iframe=1&omit_script=1&url=${link}`

            console.log(iframelyAPICall)

            fetch(iframelyAPICall).then(response =>
                response.json()
            ).then(response => {
                this.setState({ linkEmbed: response.html })
            }
        )
        } 

        return (
            <div>

                <div>
                    <span style={ styles.senderUsername }>{ message.senderId }</span>{ ' ' }
                </div>
                <p style={ styles.message }>{ text }</p>

                { hasLink && this.state.linkEmbed &&
                    <div dangerouslySetInnerHTML={ this.getIframelyHtml() } />
                }
            </div>

        )
    }

}

export default Message

