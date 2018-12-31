import React, {Component} from 'react';
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Tooltip
} from 'antd';
import './index.less'
const FormItem = Form.Item;
export const EditableContext = React.createContext();

const EditableRow = ({
  form,
  index,
  ...props
}) => (
  <EditableContext.Provider value={form}>
    <tr {...props}/>
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {

  render() {
    const {
      FormTag,
      editing,
      editable,
      dataIndex,
      title,
      record,
      index,
      width,
      withToolTip,
      ...restProps
    } = this.props;
    const limitWidth = width || 100
    console.log(this.props)
    return (
      <EditableContext.Consumer>
        {(form) => {
          const {getFieldDecorator} = form;
          return (
            <td {...restProps}>
              {editing
                ? (
                  <FormItem style={{
                    margin: 0
                  }}>
                    {getFieldDecorator(dataIndex, {
                      rules: [
                        {
                          required: true,
                          message: `Please Input ${title}!`
                        }
                      ],
                      initialValue: record[dataIndex]
                    })(FormTag ||< Input />)}
                  </FormItem>
                )
                : withToolTip
                  ? <Tooltip placement='topLeft' title={restProps.children}>
                      <div
                        className='limit-wrap'
                        style={{
                        width: limitWidth
                      }}>{restProps.children}</div>
                    </Tooltip>
                  : <div
                    className='limit-wrap'
                    style={{
                    width: limitWidth
                  }}>{restProps.children}</div>}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.dataSource,
      editingKey: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.dataSource});
  }

  render() {
    let {columns} = this.props
    const {data} = this.state
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };

    columns = columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editing: record.editing,
          ...col
        })
      };
    });

    return (<Table
      components={components}
      bordered
      dataSource={data}
      columns={columns}
      rowClassName="editable-row"/>);
  }
}

export default EditableTable