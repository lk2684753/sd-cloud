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
import {Carousel} from 'antd'
import IPFSItem from '@/components/HomeCarouselItem/IPFSItem'
import Web3Item from '@/components/HomeCarouselItem/Web3Item'
import SettingItem from '@/components/HomeCarouselItem/SettingItem'

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
     <Carousel effect="fade" autoplay>
      <IPFSItem cardList={cardList}>
      </IPFSItem>
      <Web3Item/>
      {/* <SettingItem/> */}
     </Carousel>
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
