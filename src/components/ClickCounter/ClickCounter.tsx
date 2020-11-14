import React, { Component } from 'react';
import { Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';

interface ClickCounterState {
  count: number;
}

class ClickCounter extends React.Component<{}, ClickCounterState> {
  constructor(props: any) {
    super(props);
    this.state = {count: 0};
    this.buttonClicked = this.buttonClicked.bind(this);
  }
  
  buttonClicked(event: any) {
    this.setState({count: this.state.count+1});
  }
  
  render() {
    return (
    	<div>
        <div>{this.state.count}</div>
        <button onClick={this.buttonClicked}>Click</button>
      </div>
    );
  }
}

export default ClickCounter;
