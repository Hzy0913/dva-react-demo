import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Icon } from 'antd-mobile';
import styles from './Playbar.css';
var APlayer = require('APlayer');


@connect(state => ({
  musicurl: state.details.musicdetailsurl,
  musicdetail: state.details.musicdetail,
  lrc: state.details.lrc,
}))

export default class Playbar extends PureComponent {
  state = {

  }
  componentDidMount() {
    const {musicurl,musicdetail,lrc} = this.props;
    if(!musicdetail==true || !musicurl==true){
      return false
    }
    var lrccontent='[10:00.00]'
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
        url:musicurl,  // Required, music url
        pic: self.state.musicimg,  // Optional, music picture
        lrc: lrccontent                   // Optional, lrc, see: ###With lrc
      }
    });
  }
  render() {
    return (
      <div className={styles.musicbar} className="musicbar">
        <div ref="musicbar" className={styles.musicbar} className="aplayer"></div>

        {/*<ul className={styles.more}>*/}
          {/*<li></li>*/}
          {/*<li></li>*/}
          {/*<li></li>*/}
        {/*</ul>*/}
        {/*<div className={styles.musiccon}>*/}
          {/*<h1>1231231231</h1>*/}
          {/*<p>alksdjalkdsjalkdsj</p>*/}
        {/*</div>*/}
      </div>
    );
  }
};


