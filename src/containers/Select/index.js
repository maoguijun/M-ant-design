import React, {Component} from 'react';
import {Select, Form} from 'antd'
import MSelect from '../../components/MSelect';
const {Option} = Select
/**
 * 这个组件主要是为了解决antd 的select的直接设置值的问题
 */
class SelectDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    const {form} = this.props

    form.setFieldsValue({userName: 'second'})
  }

  render() {
    const {form: {
        getFieldDecorator
      }} = this.props
    const options = [
      {
        label: '第一个',
        value: 'first'
      }, {
        label: '第二个',
        value: 'second'
      }
    ].map(({label, value}) => (
      <Option key={value}>{label}</Option>
    ))
    console.log(this.props)
    return (
      <Form>

        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [
              {
                required: true,
                message: 'Please input your username!'
              }
            ]
          })(
            <MSelect>{options}
            </MSelect>
          )}
        </Form.Item>
      </Form>

    );
  }
}

export default Form.create()(SelectDemo)