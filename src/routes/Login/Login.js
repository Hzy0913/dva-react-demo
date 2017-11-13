import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { List, InputItem, Button,Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import classnames from 'classnames'
import styles from './Login.css';



@connect(state => ({
  musicurl: state.details.musicdetailsurl,
  musicdetail: state.details.musicdetail,
  lrc: state.details.lrc,
}))
class Login extends PureComponent {
  state = {
    musicimg:'',
    loginshow:true,
    registershow:false,
    setpassworldshow:false,
  }
  componentDidUpdate(){
    self=this;

  }
  componentDidMount() {
    let  detailsid=this.props.match.params.id;

  }
  handleregister=(e)=>{
    e.preventDefault();
    var emailreg=/^(\w)+(.\w+)*@(\w)+((.\w{2,3}){1,3})$/;
    this.props.form.validateFields((error, value) => {
      if(!emailreg.test(value.registerEmail)){
        Toast.info('您的邮箱输入格式不正确', 1.6);
        return false
      }else if(!value.registerNike){
        Toast.info('您还未输入昵称', 1.6);
        return false
      }else if(!value.registerPass){
        Toast.info('您还未输入密码', 1.6);
        return false
      }else if(value.registerPass.length<6){
        Toast.info('密码不可以小于6位哦', 1.6);
        return false
      }else if(value.registerPass!=value.registerPassagen){
        Toast.info('您两次输入的密码不一致', 1.6);
        return false
      }else {
        Toast.loading('Loading...',30);
        var registerobj={
          username:value.registerEmail,
          nick:value.registerNike,
          password:value.registerPassagen
        }
        this.props.dispatch({
          type: 'login/queryRegister',
          payload:registerobj
        });
      }
    });
  }
  handletogglelogin=(e)=>{
    this.setState({loginshow:true});
    this.setState({registershow:false});
    this.setState({setpassworldshow:false});
  }
  handletoggleregister=(e)=>{
    this.setState({loginshow:false});
    this.setState({registershow:true});
    this.setState({setpassworldshow:false});
  }
  handlesetpass=(e)=>{
    this.setState({loginshow:false});
    this.setState({registershow:false});
    this.setState({setpassworldshow:true});
  }
  handlelogin=(e)=>{
    e.preventDefault();
    var emailreg=/^(\w)+(.\w+)*@(\w)+((.\w{2,3}){1,3})$/;
    this.props.form.validateFields((error, value) => {
      if(!emailreg.test(value.loginuser)){
        Toast.info('您的邮箱输入格式不正确', 1.6);
        return false
      }else if(!value.loginpassword){
        Toast.info('您还未输入密码', 1.6);
        return false
      }else {
        Toast.loading('Loading...',30);
        var userlogin={
          username:value.loginuser,
          password:value.loginpassword
        }
        this.props.dispatch({
          type: 'login/userLogin',
          payload:userlogin
        });
      }
    });
  }
  handlemodify=(e)=>{
    e.preventDefault();
    this.props.form.validateFields((error, value) => {
      var emailreg=/^(\w)+(.\w+)*@(\w)+((.\w{2,3}){1,3})$/;
      if(!emailreg.test(value.modifyloginuser)){
        Toast.info('您的邮箱输入格式不正确', 1.6);
        return false
      }else if(!value.modifyoldpassword){
        Toast.info('您还未输入原始密码', 1.6);
        return false
      }else if(!value.modifynewpassword){
        Toast.info('您还未输入新密码', 1.6);
        return false
      }else if(value.modifynewpassword<6){
        Toast.info('设置密码长度不能小于6位哦', 1.6);
        return false
      }else {
        Toast.loading('Loading...',30);
        var userlogin={
          username:value.modifyloginuser,
          password:value.modifyoldpassword,
          setpassworld:value.modifynewpassword
        }
        this.props.dispatch({
          type: 'login/modifyuserLogin',
          payload:userlogin
        });
      }
    })
  }
  render() {

    // const { getFieldProps } = this.props.form;
    const { getFieldProps, getFieldError } = this.props.form;

    return (
      <div>
        <div className={classnames('loginbox',{ 'loginshow': this.state.loginshow })}>
          <List renderHeader={() => ''} className='user'>
            <InputItem
              {...getFieldProps('loginuser')}
              placeholder="请输入您的账号">
              <div className={styles.usericon} />
            </InputItem>
            <InputItem
              type="password"
              {...getFieldProps('loginpassword')}
              placeholder="请输入您的密码"
            >
              <div className={styles.passworldicon} />
            </InputItem>
          </List>
          <Button type="primary" onClick={this.handlelogin} >登陆</Button>
          <div className={styles.logintype}>
            <p onClick={this.handletoggleregister} >注册</p>
            <p  onClick={this.handlesetpass}>修改密码</p>
          </div>
        </div>

        <div className={classnames('register',{ 'registershow': this.state.registershow })} >
          <List renderHeader={() => ''} >
            <InputItem
              {...getFieldProps('registerEmail')}
              placeholder="请输入您要注册的邮箱账号"
            >
              <div className={styles.usericon} />
            </InputItem>
            <InputItem
              {...getFieldProps('registerNike')}
              placeholder="请输入您的昵称"
            >
              <div className={styles.usericon} />
            </InputItem>
            <InputItem
              {...getFieldProps('registerPass')}
              type="password"
              placeholder="请输入您的密码"
            >
              <div className={styles.passworldicon} />
            </InputItem>
            <InputItem
              {...getFieldProps('registerPassagen')}
              type="password"
              placeholder="请再次输入您的密码"
            >
              <div className={styles.passworldicon} />
            </InputItem>
          </List>
          <Button type="primary" onClick={this.handleregister} >确定</Button>
          <div className={styles.logintype}>
            <p onClick={this.handletogglelogin} >登陆</p>
            <p onClick={this.handlesetpass}>修改密码</p>
          </div>
        </div>


        <div  className={classnames('setpassworld',{ 'setpassworldshow': this.state.setpassworldshow })}>
          <List renderHeader={() => ''}>
            <InputItem
              {...getFieldProps('modifyloginuser')}
              placeholder="请输入您的账号">
              <div className={styles.usericon} />
            </InputItem>
            <InputItem
              type="password"
              {...getFieldProps('modifyoldpassword')}
              placeholder="请输入您的原始密码"
            >
              <div className={styles.passworldicon} />
            </InputItem>
            <InputItem
              type="password"
              {...getFieldProps('modifynewpassword')}
              placeholder="请输入您的新密码"
            >
              <div className={styles.passworldicon}/>
            </InputItem>
          </List>
          <Button type="primary" onClick={this.handlemodify} className={styles.setpassworlbtn}  >确认修改</Button>
          <div className={styles.logintype}>
            <p onClick={this.handletoggleregister}>注册</p>
            <p onClick={this.handletogglelogin} >登陆</p>
          </div>
        </div>
      </div>

  )

  }
}
export default createForm()(Login)





