import React, {Component} from 'react';
import {Layout, Breadcrumb, Menu} from 'antd'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import routes from '../../routes';
import './index.less'
const {Header, Content, Footer, Sider} = Layout;

const getkey = (pathname) => {
  let arr = []
  routes.forEach(({path}) => {
    console.log(pathname, path)
    if (pathname.includes(path)) {
      arr.push(path)
    }
  })
  return arr
}
class BaseLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  pathJump = path => {
    const {history} = this.props
    history.push(path)
  }
  componentDidMount() {
    this.goTop()
  }
  componentWillUpdate() {
    this.goTop()
  }
  componentWillReceiveProps() {
    this.goTop()
  }
  goTop = () => {
    window.scrollTo(0, 0)
  }
  render() {
    const {children, location: {
        pathname
      }} = this.props
    this.goTop()
    const keys = getkey(pathname)
    console.log(12, this.props)
    return (
      <Layout className="layout">
        <Header>
          <div className="logo"/>

        </Header>
        <Layout>
          <Sider>
            <Menu
              selectedKeys={keys}
              onSelect={value => {
              this.pathJump(value.key)
            }}
              style={{
              lineHeight: '64px'
            }}>
              {routes.map(({path, name}) => (
                <Menu.Item key={path}>{name}</Menu.Item>
              ))}
            </Menu>
          </Sider>
          <Content style={{
            padding: '0 50px'
          }}>
            {/* <Breadcrumb style={{
            margin: '16px 0'
          }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
            <div
              style={{
              background: '#fff',
              padding: 24,
              minHeight: 500
            }}>{children}</div>
          </Content>
        </Layout>
        <Footer style={{
          textAlign: 'center'
        }}>
          <a href='https://github.com/maoguijun' target='maoguijun'>毛贵军 github</a>
        </Footer>
      </Layout>
    );
  }
}

export default connect()(withRouter(BaseLayout));