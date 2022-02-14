import styles from './index.less';
import { connect } from 'dva';
import { Table } from 'antd';
import Iconfont from '@/components/Iconfont';

import { useInfiniteScroll, useSetState } from 'ahooks';
import Card from '@/components/Card';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
interface Props {
  peersData: any;
}
interface HeaderList {
  key: string;
  title: string;
  width: number;
  align?: 'left' | 'center' | 'right';
  sort?: string;
}
interface PeersData {
  icon: string;
  site: string;
  delay: string;
  connect: string;
  peer: string;
  belongCluster: string;
  cluster: string;
}
interface Result {
  list: {
    icon: string;
    site: string;
    delay: string;
    connect: string;
    peer: string;
    belongCluster: string;
    cluster: string;
    Addr: string;
  }[];
  page?: number;
  from_index?: number;
  next: boolean;
}
const Page: React.FC<Props> = (props) => {
  const [peersData, setPeersData] = useState<PeersData[]>([]);
  const [headerList, setHeaderList] = useState<HeaderList[]>([
    {
      key: 'site',
      title: 'site',
      width: 194,
    },
    {
      key: 'delay',
      title: 'delay',
      width: 82,
    },
    {
      key: 'connect',
      title: 'IP',
      width: 107,
    },
    {
      key: 'belongCluster',
      title: 'belongCluster',
      width: 160,
    },
    {
      key: 'peer',
      title: 'peer',
      width: 182,
    },
  ]);
  let widthProcess = (res: number | undefined) => {
    if (res) {
      let rate = Math.floor((res / (1130 - 86)) * 100);
      return {
        minWidth: rate + '%',
      };
    } else {
      return {
        flex: 1,
      };
    }
  };
  let headerRender = () => {
    return headerList.map((item) => {
      let align = item.align || 'center';
      let headerClassName = () => {
        let r = '';
        if (item.sort) {
          r += 'pointer';
        }
        return r;
      };
      return (
        <div
          className={headerClassName()}
          key={item.key}
          style={{ ...widthProcess(item.width), textAlign: align }}
        >
          {item.title}
        </div>
      );
    });
  };
  useEffect(() => {
    const peersCopy = [];
    for (const key in props.peersData) {
      const peersItems = {
        icon: props.peersData[key].icon,
        site: props.peersData[key].site,
        cluster: props.peersData[key].cluster,
        belongCluster: props.peersData[key].belongCluster,
        connect: props.peersData[key].connect,
        delay: props.peersData[key].Latency,
        peer: props.peersData[key].Peer,
      };
      if (peersItems.cluster === '') {
      } else {
        peersCopy.push(peersItems);
      }
    }
    setPeersData(peersCopy);
  }, [props.peersData]);
  const refContent = useRef(null);
  let tableListRender = () => {
    if (peersData.length == 0) {
      return false;
    }
    return peersData.map((item, index) => {
      let trRender = (res: any) => {
        return headerList.map((headerItem) => {
          let align = headerItem.align || 'center';
          let r = res[headerItem.key];
          if (headerItem.key === 'site') {
            r = (
              <div className="df icon">
                <Iconfont type={res.icon} size={20} className={`${styles.icon}`}></Iconfont>
                {r}
              </div>
            );
          }
          return (
            <div
              key={headerItem.key}
              style={{ ...widthProcess(headerItem.width), textAlign: align }}
              className="df headerItemBox"
            >
              {r}
            </div>
          );
        });
      };

      return (
        <div key={index} className={`${styles.tableListBox} tableListBox`}>
          <Card borderAnimation={true} inline={false}>
            <div className={styles.tableList}>{trRender(item)}</div>
          </Card>
        </div>
      );
    });
  };
  return (
    <div className={styles.PeersTable}>
      <div className={styles.tableCardBox}>
        <div className={styles.header}>{headerRender()}</div>
        <div className={styles.content} ref={refContent}>
          <>
            {tableListRender()}
            <div className="df jcc">---No More---</div>
          </>
        </div>
      </div>
    </div>
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
