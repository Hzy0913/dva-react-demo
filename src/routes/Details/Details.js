import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './Details.css';
var APlayer = require('APlayer');



@connect(state => ({
  musicurl: state.details.musicdetailsurl,
  musicdetail: state.details.musicdetail,
  lrc: state.details.lrc,
}))
export default class Details extends PureComponent {
  state = {
    musicimg:''
  }
  componentDidUpdate(){
    self=this;
    const {musicurl,musicdetail,lrc} = this.props;
    console.log('ask来得及ask的逻辑啊可是大家啊拉开僵尸的')
    console.log(!musicurl)
    console.log(!musicdetail)
    if(!musicdetail==true || !musicurl==true){
      return false
    }
    if(!lrc){
      var lrccontent='暂无歌词[10:00.00]'
    }else if(lrc.uncollected){
      console.log('这里啊23123123')
      var lrccontent='暂无歌词[10:00.00]'
    }else {
      var lrccontent=lrc.lrc.lyric
    }

    this.setState({musicimg:musicdetail.al.picUrl})
    console.log(this.state.musicimg)
    console.log('asdasd11111111111')
    console.log(musicdetail)
    console.log(musicurl)
    var ap = new APlayer({
      element: this.refs.musicbar,                       // Optional, player element
      narrow: false,                                                     // Optional, narrow style
      autoplay: true,                                                    // Optional, autoplay song(s), not supported by mobile browsers
      showlrc: 1,                                                        // Optional, show lrc, can be 0, 1, 2, see: ###With lrc
      mutex: true,                                                       // Optional, pause other players when this player playing
      theme: '#ee4747',                                                  // Optional, theme color, default: #b7daff
      mode: 'random',                                                    // Optional, play mode, can be `random` `single` `circulation`(loop) `order`(no loop), default: `circulation`
      preload: 'metadata',                                               // Optional, the way to load music, can be 'none' 'metadata' 'auto', default: 'auto'
      listmaxheight: '513px',                                             // Optional, max height of play list
      music: {                                                           // Required, music info, see: ###With playlist
        title: musicdetail.name,                                          // Required, music title
        author: musicdetail.ar[0].name,                          // Required, music author
        url: musicurl,  // Required, music url
        pic: self.state.musicimg,  // Optional, music picture
        lrc: lrccontent                   // Optional, lrc, see: ###With lrc
      }
    });
  }
  componentDidMount() {

    let  detailsid=this.props.match.params.id;

    this.props.dispatch({
      type: 'details/queryDetails',
      payload:{id:detailsid}
    });
    this.props.dispatch({
      type: 'details/queryMusicDetails',
      payload:{id:detailsid}
    });
    this.props.dispatch({
      type: 'details/queryMusicLyric',
      payload:{id:detailsid}
    });

  }
  handleLoop(){

  }
  render() {
    const {musicdetail} = this.props;
    let img=musicdetail.songs
    console.log(img)
    return (
      <div className="aplayerbox">
        <div>
          <div className={styles.model}></div>
          <img src={this.state.musicimg} />
        </div>
        <div ref="musicbar" className={styles.musicbar} className="aplayer" >  </div>
          <div className={styles.control}>
            <i className={styles.loop} onClick={this.handleLoop}></i>
            <i className={styles.random}></i>
            <i className={styles.like}></i>
            <i className={styles.menu}></i>
          </div>
        </div>


  )

  }
}




