import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { List } from 'antd-mobile';
const Item = List.Item;
import styles from './UserList.css';



@connect(state => ({
  userlist: state.userlist.userlist,
}))
export default class UserList extends PureComponent {
  state = {

  }
  componentDidMount() {
    this.props.dispatch({
      type: 'userlist/queryUserList',
    });
    let  detailsid=this.props.match.params.id;

  }
  handlelogout= () => {
    this.props.dispatch({
      type: 'userlist/logout',
    });
  }
  render() {
    const {userlist} = this.props;
    return (
      <div>
        <div onClick={this.handlelogout} className={styles.logout}>退出登录</div>
        <List renderHeader={() => '用户列表'} className="user-list">
          {userlist.map(item => (
          <Item  key={item.id} extra={item.nick}>{item.username}</Item>
          ))}
        </List>
      </div>
    )
  }
}





