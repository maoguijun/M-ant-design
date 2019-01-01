import React, {Component} from 'react';
import {Form, Input, Col, Tooltip} from 'antd'

const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 8
  }
};
class MForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: props.source
    }
  }
  // componentDidMount() {   const {source, form} = this.props
  // form.setFieldsValue(source) } componentWillReceiveProps(nextProps) {   const
  // {form, editing} = this.props   if (editing) {
  // form.setFieldsValue(nextProps.source)   } }
  render() {
    const {
      form: {
        getFieldDecorator
      },
      columns,
      className,
      editing,
      source,
      children
    } = this.props
    return (
      <div className={`${className}`}>
        {columns.map(({
          dataIndex,
          label,
          FormTag,
          options,
          cols,
          render,
          ...rest
        }, index) => {
          options = {
            initialValue: source[dataIndex],
            ...options
          }
          return (
            <Col span={24} {...cols} key={dataIndex || index}>
              <Form.Item {...formItemLayout} label={label}>
                {editing
                  ? getFieldDecorator(dataIndex, options)(FormTag)
                  : <Tooltip
                    placement="topLeft"
                    title={render
                    ? render()
                    : source[dataIndex]}>
                    <div className='limit-wrap'>{render
                        ? render(source[dataIndex])
                        : source[dataIndex]}</div>
                  </Tooltip>}
              </Form.Item>
            </Col>
          )
        })}
        {children}
      </div>
    );
  }
}
export default Form.create()(MForm)