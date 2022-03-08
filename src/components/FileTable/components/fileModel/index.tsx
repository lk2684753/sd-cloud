import styles from './index.less';
import { connect } from 'dva';
import Iconfont from '@/components/Iconfont';
import { useState, useEffect } from 'react';
import { Progress } from 'antd';
import { object } from 'multiaddr/dist/src/protocols-table';
import { formatBytes } from '@/utils/filter/index';
import { SwapOutlined } from '@ant-design/icons';
interface Props {
  // showCheck?: Function;
  // fileModelDisplay: boolean;
  // fileDownloadStatus: any;
  // setFileModelDisplay: Function;
}
interface HeaderList {
  key: string;
  title: string;
  width: number;
}
interface DownLoadStatus {
  progress: number;
  fileName: string;
  filesize: number;
  type: '';
  status: '';
}
const Page: React.FC<Props> = (props: any) => {
  const [headerList, setHeaderList] = useState<HeaderList[]>([
    {
      key: 'fileName',
      title: 'Name',
      width: 221,
    },
    {
      key: 'filesize',
      title: 'Size',
      width: 134,
    },
    {
      key: 'type',
      title: 'Status',
      width: 165,
    },
    {
      key: 'status',
      title: '',
      width: 16,
    },
  ]);
  let widthProcess = (res: number | undefined) => {
    if (res) {
      let rate = Math.floor((res / 560) * 100);
      return {
        minWidth: rate + '%',
      };
    } else {
      return {
        flex: 1,
      };
    }
  };
  let fileStatusIcon = (status: string) => {
    if (status === 'Success') {
      return (
        <>
          <div className={`${styles.successBox}`}>
            <div className={`${styles.checkmark}`}>
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 16.12 16.12"
                xmlSpace="preserve"
              >
                <path
                  className={`${styles.path}`}
                  fill="none"
                  stroke="#3EBBA4"
                  d="M42.59,5.21L42.59,52.1c-2.2-2.6-6-2.6-8.3-0.1l-42.7,46.2l-14.3-16.4
  c-2.3-2.7-6.2-2.7-8.6-0.1c-1.9,2.1-2,5.6-0.1,7.7l17.6,20.3c0.2,0.3,0.4,0.6,0.6,0.9c1.8,2,4.4,2.5,6.6,1.4c0.7-0.3,1.4-0.8,2-1.5
  c0.3-0.3,0.5-0.6,0.7-0.9l4.63-5.01C42.77,5.75,42.77,5.42,42.59,5.21z"
                />
                <circle
                  className={`${styles.path}`}
                  fill="none"
                  stroke="#3EBBA4"
                  cx="8.06"
                  cy="8.06"
                  r="6.21"
                />
                <polyline
                  className={`${styles.path}`}
                  fill="none"
                  stroke="#3EBBA4"
                  points="11.3,5.28
  7.41,10.84 4.82,8.64 "
                />
                <circle
                  className={`${styles.spin}`}
                  fill="none"
                  stroke="#3EBBA4"
                  cx="8.06"
                  cy="8.06"
                  r="7.39"
                />
              </svg>
            </div>
          </div>
        </>
      );
    } else if (status == 'Error') {
      return <Iconfont type="icon-shibai" size={30}></Iconfont>;
    } else {
      return <div className={styles.loader14}></div>;
    }
  };
  const [fileList, setFileList] = useState<DownLoadStatus[]>([]);
  useEffect(() => {
    if (fileList.length === 0) {
      if (props.fileDownloadStatus) {
        setFileList([props.fileDownloadStatus]);
      }
    } else {
      if (fileList.every((res: any) => res.fileName !== props.fileDownloadStatus.fileName)) {
        if (fileList.some((res: any)=>{
          return !res.length
        })) {
          console.log(1);
          setFileList([props.fileDownloadStatus])
        }else{
          setFileList([props.fileDownloadStatus, ...fileList]);
        }
        console.log(3);

      } else {
        let fileListCopy = fileList.concat();        
        fileListCopy.map((res: any, index: number) => {
          if (!res.type) {
            fileListCopy.splice(index, 1);
          }
          if (res.fileName == props.fileDownloadStatus.fileName) {
            fileListCopy[index] = props.fileDownloadStatus;
          }
        });
        setFileList([...fileListCopy]);
      }
    }
  }, [props.fileDownloadStatus]);
  let headerREnder = () => {
    return headerList.map((item) => {
      let headerClassName = () => {
        let r = '';
        return r;
      };
      return (
        <div className={headerClassName()} key={item.key} style={{ ...widthProcess(item.width) }}>
          {item.title}
        </div>
      );
    });
  };
  let fileTable = () => {
    return fileList.map((res, index) => {
      return (
        <div key={index} className={styles.progressListBox}>
          <div className={styles.progressList}>
            <div className={styles.fileName}>{res.fileName}</div>
            <div className={styles.filesize}>{formatBytes(res.filesize, 1)}</div>
            <div className={styles.type}>{res.type}</div>
            {fileStatusIcon(res.type)}
          </div>
          <Progress
            strokeColor={{
              from: '#BB3E3E',
              to: '#3EBBA4',
            }}
            trailColor="#2F333A"
            strokeWidth={2}
            percent={res.progress}
            showInfo={false}
            status={res.progress === 100 ? 'success' : 'active'}
          ></Progress>
        </div>
      );
    });
  };
  return (
    <div>
      <div
        className={styles.fileModel}
        style={props.fileModelDisplay === 'open' ? {} : { display: 'none' }}
      >
        <div className={styles.modelTitleBox}>
          <div className={styles.titleText}>File assistant</div>
          <div className={styles.closeBox}>
            <div>
              <span
                onClick={() =>
                  props.dispatch({
                    type: 'fileModelInfo/save',
                    state: {
                      fileModelDisplay: 'wait',
                    },
                  })
                }
              >
                <Iconfont
                  type="icon-zuixiaohua"
                  color="ffffff"
                  className={styles.FileBoxIcon}
                ></Iconfont>
              </span>
            </div>
          </div>
        </div>
        <div className={styles.modelBox}>
          <div className={styles.spaceLine}></div>
          <div className={styles.fileModelTable}>{headerREnder()}</div>
          <div className={styles.fileTableBar}>{fileTable()}</div>
        </div>
      </div>
      <div
        className={styles.waitBox}
        style={props.fileModelDisplay === 'wait' ? {} : { display: 'none' }}
        onClick={() => {
          props.dispatch({
            type: 'fileModelInfo/save',
            state: {
              fileModelDisplay: 'open',
            },
          });
        }}
      >
        <SwapOutlined rotate={90} style={{ color: '#00B8C4', fontSize: '24px' }} />
      </div>
    </div>
  );
};

function mapStateToProps(state: any) {
  const { token } = state.globalTop;
  const { dispatch } = state.fileModelInfo;
  const { fileDownloadStatus, showCheck, fileModelDisplay } = state.fileModelInfo;
  return {
    dispatch,
    token,
    fileDownloadStatus,
    showCheck,
    fileModelDisplay,
  };
}

let connectName = connect(mapStateToProps)(Page);
export default connectName;
