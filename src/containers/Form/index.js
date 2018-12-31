import React, {Component} from 'react';
import {Input, DatePicker, Select, Col, Button} from 'antd'
import MForm from '../../components/MForm';
import moment from 'moment'

const {Option} = Select

const data = {
  name: 'maoguijun',
  password: 'Qwerty1',
  date: moment('1992-03-23'),
  food: 'ziranniurou'
}
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
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
