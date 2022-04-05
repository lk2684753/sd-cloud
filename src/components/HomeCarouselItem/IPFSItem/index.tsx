import styles from './index.less';
import { connect } from 'dva';
import Card from '@/components/Card';
import { useState,useEffect } from 'react';
import Intro from '@/components/introBox'
import Space from '@/components/Space';
import homeBackImg from '@/assets/images/homeBack.png'
import Iconfont from '@/components/Iconfont';


interface Props {
    cardList:any
}
const Page: React.FC<Props> = (props) => {
    const [windowHeight, setWindowHeight] = useState(969)
    useEffect(() => {
        console.log(styles);
        
        setWindowHeight(window.innerHeight)
        console.log(window.innerHeight);
      }, [window.innerHeight])
      let CardListRender = () => {
        return props.cardList.map((item:any, index:number) => {
          return (
            <div className={styles.rotateTable}>
            <div className={styles.rotateBox}>
            <Card defaultBorder={false} borderAnimation background="#2E3139" radius={20} key={index}>
              <div className={styles.CardBox}>
    
              </div>
            </Card>
            </div>
            <div className={styles.CardHover} key={index}>
              
              <Card defaultBorder={false} borderAnimation background="#33373F" radius={20} key={index}>
                <div className={styles.CardBox}>
                  <div className={styles.icon}>
                    <Iconfont type={item.icon} size={28}></Iconfont>
                  </div>
                  <div className={styles.title}>{item.title}</div>
                  <div className={styles.printUnit}>
                    {item.number}
                    <div className={styles.unit}>{item.unit}</div>
                  </div>
                </div>
              </Card>
            </div>
            </div>
          );
        });
      };
  return (
    <div style={{'height':windowHeight}}>
    <Intro/>
      <img className={styles.backImage} src={homeBackImg} height={windowHeight} alt="" />
      <div className={styles.home}>
          <div className={styles.leftContext}>
          {/* {nodeRender()} */}
          <Space height={40}></Space>
          <div className={styles.CardList}>{CardListRender()}</div>
        </div>
        <div className={`${styles.rightContext} rightContext`}>
            {/* <AudioMini></AudioMini> */}
          {/* <NetWork></NetWork> */}
        </div>
            </div>
    </div>
    )
};

function mapStateToProps(state: any) {
  const { token } = state.globalTop;
  return {
    token,
  };
}

let IPFSItem = connect(mapStateToProps)(Page);
// connectName.wrappers = ['@/auth/login'];

export default IPFSItem;
