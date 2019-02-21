// /client/App.js
import React, { Component } from 'react'
import Moment from 'react-moment'
import {ButtonGroup, Button, Table} from 'reactstrap'

class App extends Component {
  // initialize
  state = {
    data: {},
    browserLanguage: null,
    intervalIsSet: false,
    isLoaded:null
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

  // fetch data from backend
  getData = () => {
    fetch('http://localhost:4000/message', {
        headers: {
            'Accept': 'application/json',
        },
    })
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

  render() {
      const messages  = this.state.data.messages;
      console.log(messages)
      return (
<Table responsive>
  <thead>
    <tr>
      <th>Sorted</th>
      <th>Message</th>
      {/* <th>Message ID</th> */}
      <th className="d-none d-md-block">Posted At</th>
      <th></th>
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
              {/* <td>{message._id}</td> */}
              <td className="d-none d-md-block"><Moment format='lll'>{ message.postedAt }</Moment></td>
              <td><Moment fromNow>{ message.postedAt }</Moment></td>
              <td>
                <ButtonGroup size="sm"> 
                  <Button data-toggle="tooltip" data-placement="left" title="Tooltip on left" color="outline-warning" size="sm">?</Button> 
                  <Button  onClick={() => { this.deleteMessage(message._id) }} color="outline-danger" size="sm">X</Button>
                </ButtonGroup>
              </td>
            </tr>
        ))}
  </tbody>
</Table>
   );
  }
}

export default App;
