// /client/App.js
import React, { Component } from 'react'
import Palindrome from './Palindrome'
import Moment from 'react-moment'
import {ButtonGroup, Button, Table, Nav, Input} from 'reactstrap'
const baseURL = 'http://localhost:4000/'
class App extends Component {
  // initialize
  state = {
    data: {},
    browserLanguage: null,
    intervalIsSet: false,
    isLoaded:null,
    inputField:''
  };

  componentDidMount() {
    this.getData();

    // Pull every .1s
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

  // keep track of the input field
  _handleChange = (event) => {
    this.setState({inputField: event.target.value});
  }

  // handle keyboard "enter"
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
    fetch(baseURL + 'message/', requestOptions)
    .then((res) => res.json(),
          (error) => {console.err(`'${error}' happened!`); return {};})
    .then((res) => this.setState({ data: res, isLoaded: true }),
          (error) => this.setState({ isLoaded: true, error}));
  };

  // Send DELETE request to backend
  deleteMessage = messageId => {
    const requestOptions = {
      method: 'DELETE'
    };
    fetch(baseURL + 'message/' + messageId, requestOptions)
    .then((res) => console.log(res),
          (error) => {console.err(`'${error}' happened!`); return {};
    });
  }

  // Send POST request to backend
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
    fetch(baseURL + 'message/', requestOptions)
    .then((res) =>this.setState({ inputField: ""}),
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
      <div className="input-group pl-md-5 pr-md-5 pb-3 pt-3">
        <Input type="text" placeholder="Type your message here ..." value={this.state.inputField} onChange={this._handleChange} onKeyPress={this._handleKeyPress} className="form-control" />
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
