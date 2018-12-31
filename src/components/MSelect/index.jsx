import React, {Component} from 'react';
import {Select} from 'antd'
import './index.less'
/**
 * 这个组件主要是为了解决antd 的select的直接设置值的问题
 */
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const {
      children,
      className,
      ...rest
    } = this.props
    console.log(this.props)
    return (
      <Select className={`Mselect ${className}`} {...rest}>{children}</Select>
    );
  }
}
