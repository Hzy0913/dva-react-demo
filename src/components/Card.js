import React from 'react';
import { connect } from 'dva';
import {Link} from 'dva/router';
import { routerRedux,push } from 'dva/router'
import { Icon } from 'antd-mobile';
import styles from './Card.css';

function Card({cardList,title,hashHistory }){
  const handledetails=(id)=>{
    routerRedux.push('/details/123')
  }
  return (
    <div className={styles.cardcontainer}>
      <div className={styles.musicheader}>
        <h1>{title}</h1>
        <Icon type="right" className={styles.arrow} size="lg" color="#999" />
      </div>
      {cardList.map(item => (
        <Link to={`/details/${item.id}`} key={item.id}>
          <div className={styles.cardbody}  onClick={()=>handledetails(item.id) }>
            <div className={styles.cardimg}>
              <img src={item.song.album.blurPicUrl} alt=""/>
            </div>
            <div className={styles.cardcon}>
              <h1>{item.name}</h1>
              <p className={styles.artistsname}>{item.song.artists.map(item => (
                  <span key={item.id}>{item.name}</span>
              ))}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default connect()(Card);
