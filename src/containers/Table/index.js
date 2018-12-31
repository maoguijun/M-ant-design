import React, {Component} from 'react';
import {Select, Form, Popconfirm} from 'antd'
import MEditTable, {EditableContext} from '../../components/MEditTable';
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no. ${i}`,
    editing: false
  });
}
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: data
    }
  }
  changeEditing = (key, target) => {
    const {dataSource} = this.state
    let data = [...dataSource]
    data = data.map((item) => {
      if (key === item.key) {
        return ({
          ...item,
          editing: target
        })
      } else {
        return item
      }
    })
    this.setState({dataSource: data});
  }

  save = (form, key) => {
    console.log('save', form, key)
    form.validateFields((err, value) => {
      if (err) 
        return
      console.log(value)
    })
    this.changeEditing(key, false)
  }
  cancel = (key) => {
    console.log('cancel', key)
    this.changeEditing(key, false)
  }
  edit = (key) => {
    console.log('edit', key)
    this.changeEditing(key, true)
  }
  render() {
    const {dataSource} = this.state
    const columns = [
      {
        title: 'name',
        dataIndex: 'name',
        width: 200,
        editable: true,
        withToolTip: true
      }, {
        title: 'age',
        dataIndex: 'age',
        width: 100,
        editable: true,
        withToolTip: true,
        render: (text, record, index) => (
          <div>{text - 1}</div>
        )
      }, {
        title: 'address',
        dataIndex: 'address',
        width: 500,
        editable: true,
        withToolTip: true
      }, {
        title: 'operation',
        dataIndex: 'operation',
        width: 80,
        render: (text, record) => (
          <div>
            {record.editing
              ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a
                        href="javascript:;"
                        onClick={() => this.save(form, record.key)}
                        style={{
                        marginRight: 8
                      }}>
                        Save
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
              )
              : (
                <a onClick={() => this.edit(record.key)}>Edit</a>
              )}
          </div>
        )

      }
    ];

    return (<MEditTable columns={columns} dataSource={dataSource}/>);
  }
}