/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
class Palindrome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.props,
      palindrome: null
    }
  }

  // Determine if the entry is a Palindrome
  getPalindrome = (msg) => {
    var str = msg.toLowerCase().replace(/[\W_]/g, '');
    var reversed = str.split('').reverse().join('');
   if (reversed === str) return "yes" 
   else return "no"
  }

  render() {
    return (<span>{this.getPalindrome(this.state.data)}</span>);
  }
}
export default Palindrome;
