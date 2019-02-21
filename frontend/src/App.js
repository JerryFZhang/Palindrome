// /client/App.js
import React, { Component } from 'react'
import Palindrome from './Palindrome'
import Moment from 'react-moment'
import {ButtonGroup, Button, Table, Nav, Input} from 'reactstrap'

class App extends Component {
  // initialize
  state = {
    data: {},
    browserLanguage: null,
    intervalIsSet: false,
    isLoaded:null, 
    inputField:null
  };

  componentDidMount() {
    this.getData();

    // Pull every minute
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getData, 100);
      this.setState({ intervalIsSet: interval });
    }

    // Detect language for future localization purpose
    if (navigator.language) {
      this.setState({ browserLanguage: navigator.language });
    }
  }

  // never let a process live forever
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  _handleChange = (event) => {
    this.setState({inputField: event.target.value});
  }

  _handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.postMessage()
    }
  }

  // fetch data from backend
  getData = () => {
    const requestOptions = {
      headers: {
          'Accept': 'application/json',
      }
    }
    fetch('http://localhost:4000/message', requestOptions)
    .then((res) => res.json(),
          (error) => {console.err(`'${error}' happened!`); return {};})
    .then((res) => this.setState({ data: res, isLoaded: true }),
          (error) => this.setState({ isLoaded: true, error}));
  };

  deleteMessage = messageId => {
    const requestOptions = {
      method: 'DELETE'
    };
    fetch("http://localhost:4000/message/" + messageId, requestOptions)
    .then((res) => console.log(res),
          (error) => {console.err(`'${error}' happened!`); return {};
    });
  }

  postMessage = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messageBody: this.state.inputField,
      })
    };
    fetch('http://localhost:4000/message/', requestOptions)
    .then((res) => this.state.inputField = "",
      (error) => {console.err(`'${error}' happened!`); return {};
    });
  }
 
  render() {
      const messages  = this.state.data.messages;
      console.log(messages)
      return (
        <div>
<Table responsive>
  <thead>
    <tr>
      <th>Sorted</th>
      <th>Message</th>
      {/* <th>Message ID</th> */}
      <th className="d-none d-md-block">Posted At</th>
      <th></th>
      <th>Palindrome</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
         {
           messages === undefined || messages.length <= 0  ? 'NO ENTRIES'
            : messages.sort((a, b) => a.postedAt - b.postedAt).map((message, index)  => (
            <tr>
              <td>{index + 1}</td>
              <td>{message.messageBody}</td>
              <td className="d-none d-md-block"><Moment format='lll'>{ message.postedAt }</Moment></td>
              <td><Moment fromNow>{ message.postedAt }</Moment></td>
              <td><Palindrome props={message.messageBody}></Palindrome></td>
              <td>
                <ButtonGroup size="sm"> 
                  <Button onClick={() => { this.deleteMessage(message._id) }} color="outline-danger" size="sm">X</Button>
                </ButtonGroup>
              </td>
            </tr>
        ))}
  </tbody>
</Table>
 <Nav className="navbar navbar-light bg-light shadow-sm fixed-bottom navbar-expand w-100">
  <div className="input-group pl-5 pr-5 pb-3 pt-3">
     <Input type="text" placeholder="Type your message here ..." value={this.state.inputField} onChange={this._handleChange} onKeyPress={this._handleKeyPress} className="form-control" aria-label="Text input with segmented dropdown button" />
     <div className="input-group-append">
         <Button onClick={() => { this.postMessage()} }type="button" color="primary" >Post</Button>
     </div>
  </div>
  </Nav>
  </div>
   );
  }
}

export default App;
