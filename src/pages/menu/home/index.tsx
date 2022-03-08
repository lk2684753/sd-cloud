import styles from './index.less';
import { connect } from 'dva';
import Card from '@/components/Card';
import Space from '@/components/Space';
import Iconfont from '@/components/Iconfont';
import { useState, useEffect } from 'react';
import Contract from '@/utils/contract';
import { formatBytes } from '@/utils/filter/index';
let { contract, getID } = Contract;
import LogoCircle from '@/components/logoCircle'
import { history } from 'umi';
import Intro from '@/components/introBox'
import homeBackImg from '@/assets/images/homeBack.png'
import { getUploadFiles } from '@/utils/files/uploadFiles';
import { getRecentlyList } from '@/utils/files/recentlyFiles';
import Empty from '@/components/Empty';

interface Props { }

const Page: React.FC<Props> = (props) => {
  const [windowHeight, setWindowHeight] = useState(969)
  useEffect(() => {
    setWindowHeight(window.innerHeight)
    console.log(window.innerHeight);
  }, [window.innerHeight])
  const [cardList, setCardList] = useState([
    {
      icon: 'icon-cunchushijian',
      title: 'Storage days',
      number: '0',
      unit: 'day',
    },
    {
      icon: 'icon-cunchudaxiao',
      title: 'Total storage size',
      number: '0',
      unit: 'B',
    },
    {
      icon: 'icon-cunchushuliang',
      title: 'Number of stored file',
      number: '0',
      unit: '',
    },
  ]);
  let CardListRender = () => {
    return cardList.map((item, index) => {
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
  const getList = async () => {
    let result = await contract.view_account({ did: `did:near:${getID}` });

    result = JSON.parse(result);
    let nowTime = new Date().getTime();
    //Gets the time difference between the creation time and the current time
    nowTime = nowTime - result.document.created.toString().substring(0, 13);
    let time = Math.ceil(nowTime / 1000 / 24 / 3600);
    setCardList([
      {
        icon: 'icon-cunchushijian',
        title: 'Storage days',
        number: time,
        unit: 'day',
      },
      {
        icon: 'icon-cunchudaxiao',
        title: 'Total storage size',
        number: formatBytes(result.files_all_size, 2),
        unit: '',
      },
      {
        icon: 'icon-cunchushuliang',
        title: 'Number of stored file',
        number: result.files_num,
        unit: '',
      },
    ]);
  };
  useEffect(() => {
    (async () => {
      await getList();
    })();
  }, []);

  function goMore() {
    history.push('/menu/history');
  }

  return (
    <>
      {/* <LogoCircle></LogoCircle> */}
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
    </>
  );
};

function mapStateToProps(state: any) {
  const { token } = state.globalTop;
  return {
    token,
  };
}

let connectName = connect(mapStateToProps)(Page);

export default connectName;
