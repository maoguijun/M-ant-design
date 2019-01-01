import React, {Component} from 'react';
import {Input, DatePicker, Select, Col, Button} from 'antd'
import MForm from '../../components/MForm';
import moment from 'moment'
import MInputNumber from '../../components/MInputNumber';
console.dir(MInputNumber)
const {Option} = Select

const data = {
  name: 'maoguijun',
  password: 'Qwerty1',
  date: moment('1992-03-23'),
  food: 'ziranniurou',
  bank: '6214832170406818',
  amount: '99999999'
}
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false, // 表单是否可编辑
      source: data
    }
  }
  edit = () => {
    this.setState({editing: true});
  }
  save = () => {
    let {source} = this.state
    this
      .form
      .props
      .form
      .validateFields((err, value) => {
        if (err) 
          return
        source = {
          ...source,
          ...value
        }
        console.log(source)
        this.setState({editing: false, source});
      })
  }

  formatter = value => {
    const rg = /(\d{3})/ig
    if (!value) 
      return value
    let arr = value.split('.')
    console.log(arr)
    let left = arr[0]
      .split('')
      .reverse()
      .join('')
      .replace(rg, '$1,')
      .split('')
      .reverse()
      .join('')
    console.log(59, left)
    if (arr[1]) {
      value = `${left}.${arr[1].slice(0, 2)}`
    } else if (value.includes('.')) {
      value = `${left}.`
    } else {
      value = left

    }
    return value
  }
  parser = value => {
    value = value.replace(/,/ig, '')
    return value
  }
  render() {
    const {editing, source} = this.state
    const shiwu = [
      {
        value: 'hongshaorou',
        label: '红烧肉'
      }, {
        value: 'shousiji',
        label: '手撕鸡'
      }, {
        value: 'ziranniurou',
        label: '孜然牛肉'
      }
    ]
    const columns = [
      {
        dataIndex: 'name',
        label: '姓名',
        FormTag: <Input/>
      }, {
        dataIndex: 'password',
        label: '密码',
        FormTag: <Input type="password"/>
      }, {
        dataIndex: 'date',
        label: '生日',
        FormTag: <DatePicker/>,
        render: () => moment(source['date']).format('YYYY-MM-DD')
      }, {
        dataIndex: 'food',
        label: '喜欢的食物',
        render: () => shiwu
          .find(item => item.value === source['food'])
          .label,
        FormTag: <Select style={{
            width: 200
          }}>{shiwu.map(({label, value}) => (
              <Option key={value}>{label}</Option>
            ))}
          </ Select>
      }, {
        dataIndex: 'bank',
        label: '银行卡号',
        FormTag: <MInputNumber/>,
        render: (text) => {
          // 否则用默认的
          const rg = /(\d{4})/ig
          if (text) {
            text = text.replace(rg, '$1 ')
          }
          console.log('value', text)
          return text
        }
      }, {
        dataIndex: 'amount',
        label: '消费总额',
        FormTag: <MInputNumber formatter={this.formatter} parser={this.parser}/>,
        render: this.formatter
      }
    ]
    return (
      <MForm
        source={source}
        columns={columns}
        editing={editing}
        wrappedComponentRef={f => this.form = f}>
        <Col offset={4}>
          {editing
            ? <Button onClick={this.save} type="primary">保存</Button>
            : <Button onClick={this.edit}>修改</Button>}
        </Col>
      </MForm>
    );

  }
}
