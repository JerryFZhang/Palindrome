/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { Button } from 'reactstrap';
import Popup from 'react-popup';


class PopoverComp extends React.Component {
  constructor(props) {
    super(props)
    this.obj = props.props
  }
  

  render() {
    let component 
    var lowRegStr = this.obj.toLowerCase().replace(/[\W_]/g, '');
    var reverseStr = lowRegStr.split('').reverse().join('');
   (reverseStr === lowRegStr) ? component = "yes" : component = "no"
    return (<span>{component}</span>);
  }
}
export default PopoverComp;
