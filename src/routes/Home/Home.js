import React, { PureComponent } from 'react';
import { SearchBar,Drawer} from 'antd-mobile';
import { connect } from 'dva';
import { Carousel} from 'antd-mobile';
import Card from '../../components/Card.js';
import Playbar from '../../components/Playbar.js';
import style from './Home.css';


@connect(state => ({
  banner: state.home.banner,
  newmusic: state.home.newmusic,
}))
export default class Home extends PureComponent {
  state = {
    data: [{id:'1'}, {id:'2'},{id:'3'}],
    initialHeight: 176,
    docked: false,
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'home/queryBanner',
    });
    this.props.dispatch({
      type: 'home/queryNewmusic',
    });
  }
  // mune 切换
  onDock = (d) => {
    this.setState({
      docked: !this.state.docked
    });
    console.log(routerRedux)
    routerRedux.push('/details/517567264')
  }
  render() {
    const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};
    const { banner,newmusic} = this.props;

    const sidebar = (
      <div>123123123</div>
    );
    const onSubmit= (value) => {
      this.props.dispatch({
        type: 'home/queryMusicSearch',
        payload:{content:value}
      });

    };
    return (
      <div>
        <Drawer
          className={style.style}
          style={{ minHeight: document.documentElement.clientHeight }}
          contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
          sidebarStyle={{ border: '1px solid #ddd' }}
          sidebar={sidebar}
          docked={this.state.docked}>
          <div className={style.hometop}>
            <div className={style.mune}  onClick={() => this.onDock('docked')}></div>
            <SearchBar placeholder="寻找音乐..." onSubmit={ value=>onSubmit(value)} />
            <div className={style.musicline}></div>
          </div>
          <Carousel
            className={style.mycarousel}
            autoplay={true}
            infinite
            selectedIndex={0}
            swipeSpeed={35}
            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
            afterChange={index => console.log('slide to', index)}>
            {banner.map(ii => (
              <a href="http://www.baidu.com" key={ii} style={hProp} >
                <img
                  style={hProp}
                  src={ii.pic}
                  alt=""
                  onLoad={() => {
                    window.dispatchEvent(new Event('resize'));
                    this.setState({
                      initialHeight: null,
                    });

                  }}
                />
              </a>
            ))}
          </Carousel>

          <Card title={'最新'} cardList={newmusic}></Card>
        </Drawer>


        <Playbar ></Playbar>
     </div>
    )
  }
}



//
// function Home({banner}) {
//   return (
//     <Carousel
//       className="my-carousel"
//       autoplay={false}
//       infinite
//       selectedIndex={1}
//       swipeSpeed={35}
//       beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
//       afterChange={index => console.log('slide to', index)}
//     >
//       {banner.map(ii => (
//         <a href="http://www.baidu.com" key={ii} >
//           <img
//             src={`https://zos.alipayobjects.com/rmsportal/${ii}.png`}
//             alt=""
//             onLoad={() => {
//               // fire window resize event to change height
//               // window.dispatchEvent(new Event('resize'));
//
//             }}
//           />
//         </a>
//       ))}
//     </Carousel>
//
//
//   );
// }
//
// Home.propTypes = {
// };
// function homeStateToProps(state, ownProps) {
//   return {
//     banner: state.home.banner,
//   };
// }
//
// export default connect(homeStateToProps)(Home);


