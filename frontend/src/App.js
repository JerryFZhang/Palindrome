// /client/App.js
import React, { Component } from 'react'
import Moment from 'react-moment'
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

  render() {
      const messages  = this.state.data.messages;
      console.log(messages)
      return (
      <div className='row pt-5'>
         {
           messages === undefined || messages.length <= 0  ? 'NO ENTRIES'
            : messages.map((message, index)  => (
       <div className='col-xl-6 col-lg-6 col-md-12 card-group mb-3' key={index}>
          #{index + 1}<br />
          {message._id}<br />
          {message.messageBody}<br />
          Message time: <Moment format='lll'>{ message.postedAt }</Moment> <br />
            <span className="badge badge-dark"><Moment fromNow>{ message.postedAt }</Moment></span><br /> <br />
        </div>
        ))}
    </div>
   );
  }
}

export default App;
