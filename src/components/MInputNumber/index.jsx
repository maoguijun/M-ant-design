import React, {Component} from 'react';
import {Form, Input, Col, Tooltip} from 'antd'
import './index.less'
const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 8
  }
};
/**
 *  这个暂时只能当做实现方式，目前没有想到合适的处理办法
 */
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.formatter(props.value)
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(20, nextProps)
    let value = this.formatter(this.parser(nextProps.value))
    this.setState({value});
  }

  formatter = (value) => {
    const {formatter} = this.props
    console.log(value)
    // 空字符不处理
    if (!value) 
      return value
      // 带有 formatter 函数用自定义的处理
    if (formatter) {
      return formatter(value)
    }
    // 不是纯数字不处理
    if (!/^\d+$/.test(value)) 
      return value

      // 否则用默认的
    const rg = /(\d{4})/ig
    value = value.replace(rg, '$1 ').trimEnd()
    console.log('value', value)
    return value
  }

  parser = (value) => {
    const {parser} = this.props
    console.log(value)
    if (parser) {
      return parser(value)
    }
    value = value.replace(/\s/ig, '')
    return value
  }

  onChange = e => {
    const {onChange} = this.props
    const {target: {
        value
      }} = e
    console.log(value)
    if (onChange) {
      onChange(value)
    } else {
      let v = this.parser(value)
      console.log(v)
      v = this.formatter(v)
      console.log(67, v)
      this.setState({value: v});
    }
  }

  render() {
    const {className} = this.props
    const {value} = this.state
    return <Input
      className={`MInputNumber ${className}`}
      value={value}
      onChange={this.onChange}/>
  }
}
