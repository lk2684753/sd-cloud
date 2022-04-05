import styles from './index.less';
import { connect } from 'dva';
import { useState, useEffect, useRef } from 'react';
import Iconfont from '@/components/Iconfont';
import { Checkbox, Input, Popover, message } from 'antd';
import Card from '@/components/Card';
import { useInfiniteScroll, useSetState } from 'ahooks';
import FileSetBottom from '../FileSetBottom';
import { dataFormat, formatBytes } from '@/utils/filter';
import { cidToSid, getCidUrl,getIPFSCidUrl, sidToCid } from '@/utils/common';
import { setRecentlyList, deleteRecentlyList } from '@/utils/files/recentlyFiles';
import Contract, { client } from '@/utils/contract';
let { getlist, contract, getID } = Contract;
import { history } from 'umi';
import { setUploadFiles } from '@/utils/files/uploadFiles';
import axios from 'axios';
import Empty from '@/components/Empty';
import PageLoading from '@/components/PageLoading';
import { folder } from 'jszip';
interface HeaderList {
  key: string;
  title: string;
  width?: number;
  align?: 'left' | 'center' | 'right';
  sort?: boolean;
}
interface Props {
  setShowCheck: any;
  title: string;
  headerList: HeaderList[];
  getList: any;
  setShareModal: Function;
  setDeleteModal: Function;
  setSelectListType: Function;
  setSelectListModal: Function;
  setClickItem: Function;
  setReloadTable: Function;
  dispatch: Function;
  setCheckData: Function;
  audioActiveIndex: number;
  noData?: string;
  noDataImage?: string;
  reloadTable: Function;
  setFileDownloadStatus: Function;
  setFileModelDisplay: Function;
  setShareUrl: Function;
  setPreviewState: Function;
  floderType?: string;
}

const Table: React.FC<Props> = (props) => {
  const [pageLoading, setpageLoading] = useState(false);
  const [userAccount,setUserAccount] = useState('')
  useEffect(()=>{
    (async()=>{
      const userAccountData = JSON.parse(await contract.view_account({ did: `did:near:${getID}` }));
      setUserAccount(userAccountData.account.account_custom_node_name)
    })()
  },[])
  let setList = [
    {
      key: 'download',
      icon: 'icon-xiazai1',
      title: 'Download',
      callback: download,
    },
    {
      key: 'share',
      icon: 'icon-fenxiang',
      title: 'Share Link',
      callback(index: any) {
        let cid = data?.list[index].cid;
        props.setShareUrl(`https://${cid}.ipfs.dweb.link/`);
        props.setShareModal(true);
      },
    },
    {
      key: 'rename',
      icon: 'icon-zhongmingming',
      title: 'Rename',
      callback: onRename,
    },
    {
      key: 'copy',
      icon: 'icon-fuzhi',
      title: 'Copy',
      callback(index: number) {
        props.setCheckData(data?.list[index]);
        props.setSelectListType('copy');
        props.setSelectListModal(true);
      },
    },
    {
      key: 'move',
      icon: 'icon-yidongdao',
      title: 'Move',
      callback() {
        props.setSelectListType('move');
        props.setSelectListModal(true);
      },
    },
    {
      key: 'delete',
      icon: 'icon-shanchu',
      title: 'Remove',
      callback(index: any) {
        if (allChecked === 'all') {
          index = data?.list.map((res: any) => {
            return res.sid;
          });
        }
        if (props.title == 'recently used') {
          if (typeof index === 'number') {
            deleteRecentlyList([data?.list[index].sid]);
            props.reloadTable();
            message.success('Record Remove Success');
          } else if (typeof index === 'object') {
            deleteRecentlyList(index);
            props.reloadTable();
            setTableCheckedList([]);
            message.success('Record Remove Success');
          }
        } else {
          if (typeof index === 'number') {
            props.setClickItem({
              listData: data?.list[index],
              folderName: data?.folderName,
              isOnly: true,
            });
            props.setDeleteModal(true);
          } else if (typeof index === 'object') {
            props.setClickItem({ listData: index, folderName: data?.folderName, isOnly: false });
            props.setDeleteModal(true);
          }
        }
      },
    },
  ];

  function download(index: any) {
    if (typeof index === 'object') {
      data?.list.map((res, index1) => {
        if (res.sid == index[0]) {
          index = index1;
        }
      });
    }
    props.dispatch({
      type: 'fileModelInfo/save',
      state: {
        fileModelDisplay: 'open',
      },
    });
    // props.setFileModelDisplay(true);
    let item = data?.list[index];
    let cid = item.cid;
    let url = item.network_id == 0?getCidUrl(cid, item.file_name):getIPFSCidUrl(cid);
    if (!item) return;
    let fileName = item.file_name;
    const setFiles = data?.list[index];
    props.dispatch({
      type: 'fileModelInfo/save',
      state: {
        fileDownloadStatus: {
          progress: 0,
          fileName: setFiles.file_name,
          filesize: setFiles.file_size,
          type: 'Parsing',
        },
      },
    });

    axios({
      method: 'get',
      url: url,
      responseType: 'blob',
      headers: { 'content-type': item.file_type },
      onDownloadProgress: (evt: any) => {
        props.dispatch({
          type: 'fileModelInfo/save',
          state: {
            fileDownloadStatus: {
              progress: (evt.loaded / evt.total) * 100,
              fileName: setFiles.file_name,
              filesize: setFiles.file_size,
              type: 'Downloading',
            },
          },
        });
      },
    })
      .then((res: any) => {
        let blob = new Blob([res.data], { type: res.data.type });
        let downa = document.createElement('a');
        let href = window.URL.createObjectURL(blob);
        downa.href = href;
        downa.download = fileName;
        document.body.appendChild(downa);
        downa.click();
        document.body.removeChild(downa);
        window.URL.revokeObjectURL(href);
        setRecentlyList(item);
        setUploadFiles(res.data.size);
        props.dispatch({
          type: 'fileModelInfo/save',
          state: {
            fileDownloadStatus: {
              progress: 100,
              fileName: setFiles.file_name,
              filesize: setFiles.file_size,
              type: 'Success',
            },
          },
        });
      })
      .catch((error: any) => {
        props.dispatch({
          type: 'fileModelInfo/save',
          state: {
            fileDownloadStatus: {
              progress: 100,
              fileName: setFiles.file_name,
              filesize: setFiles.file_size,
              type: 'Error',
            },
          },
        });
      });
  }

  interface Result {
    list: {
      icon: string;
      name: string;
      size: string;
      createTime: string;
      cid: string;
    }[];
    page?: number;
    nextPage?: number;
    next: boolean;
  }

  //A list of compontents for page rendering
  const refContent = useRef(null);
  let { data, loading, loadMore, loadingMore, noMore, reload } = useInfiniteScroll(
    (d) => {
      return getLoadMoreList(d?.nextPage);
    },
    {
      target: refContent,
      isNoMore(d) {
        return d?.next === false;
      },
    },
  );
  async function getLoadMoreList(nextPage = 0): Promise<Result> {
    setpageLoading(true);
    let list = [];
    let next = false;
    try {
      list = await props.getList(nextPage);
      list = getlist(list);
      let results = await Promise.all(
        list.map(async (items: any) => {
          if (items.network_id == 0) {
            let result = await client.status(items.cid);
            if (
              result.pins.some((res: any) => {
                return res.status == 'Pinning';
              })
            ) {
              items.pinStatus = 'Pinning';
            } else if (
              result.pins.some((res: any) => {
                return res.status == 'Pinned';
              })
            ) {
              items.pinStatus = 'Pinned';
            } else {
              items.pinStatus = 'PinQueued';
            }
            let storageProvidersArr = [];
            if (result.deals.length != 0) {
              result.deals.forEach((res: any) => {
                storageProvidersArr.push(res);
              });
            } else {
              storageProvidersArr.push('Queuing');
            }
            items.storageProviders = storageProvidersArr;
          }
        }),
      );
      if (props.title === 'recently used') {
        throw Error;
      }
      if (props.floderType === 'newFloder') {
        throw Error;
      }
      if (list.length) {
        nextPage = nextPage + 1;
        next = true;
      }
      setpageLoading(false);
    } catch (error) {
      setpageLoading(false);
      console.warn(error);
    }
    return {
      list,
      nextPage: nextPage,
      next: next,
    };
  }

  useEffect(() => {
    props.setReloadTable(() => {
      return () => {
        setAllChecked('no');
        setTableCheckedList([]);
        setCheckindex([]);
        reload();
      };
    });
  }, [reload]);
  const [tableCheckedList, setTableCheckedList] = useState<boolean[]>([]);
  const [checkindex, setCheckindex] = useState<boolean[]>([]);
  let toggleChecked = (index: number) => {
    let listCopy = tableCheckedList.concat();
    listCopy[index] = !listCopy[index];
    const checkList = [];
    for (const key in listCopy) {
      checkList.push(data?.list[key].sid);
    }
    setCheckindex(checkList);
    setTableCheckedList(listCopy);
  };
  useEffect(() => {
    let list = tableCheckedList.filter((item) => {
      return item;
    });
    if (list.length === data?.list?.length) {
      setAllChecked('all');
    }
    if (list.length < (data?.list?.length || 0)) {
      setAllChecked('some');
    }
    if (list.length === 0) {
      setAllChecked('no');
    }
    props.dispatch({
      type: 'menu/save',
      state: {
        audioList: data?.list,
      },
    });  
  }, [data, tableCheckedList]);

  interface State {
    [key: string]: 0 | 1 | 2 | number;
  }
  const [headerState, setHeaderState] = useSetState<State>({});
  useEffect(() => {
    props.headerList.map((item) => {
      if (item.sort) {
        setHeaderState({ [item.key]: 0 });
      }
    });
  }, [props.headerList]);
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
    return props.headerList.map((item) => {
      let align = item.align || 'left';
      let headerClassName = () => {
        let r = '';
        if (item.sort) {
          r += 'pointer';
        }
        return r;
      };
      let sortRender = () => {
        if (item.sort) {
          let sortTypeProcess = () => {
            let type = headerState[item.key];
            if (type === 0) {
              return '';
            }
            if (type === 1) {
              return styles.top;
            }
            if (type === 2) {
              return styles.bottom;
            }
          };
          return (
            <div className={`${styles.sort} ${sortTypeProcess()}`}>
              <Iconfont type="icon-shang" className={styles.top}></Iconfont>
              <Iconfont type="icon-xia" className={styles.bottom}></Iconfont>
            </div>
          );
        }
      };
      return (
        <div
          className={headerClassName()}
          key={item.key}
          style={{ ...widthProcess(item.width), textAlign: align }}
          onClick={() => headerClick(item)}
        >
          {item.title}
          {sortRender()}
        </div>
      );
    });
  };
  function headerClick(item: HeaderList) {
    if (item.sort) {
      setHeaderState((prev) => ({ [item.key]: (prev[item.key] + 1) % 3 }));
    }
  }
  const [allChecked, setAllChecked] = useState<'all' | 'some' | 'no'>('no');
  let headerCheckedRender = () => {
    let indeterminate = false;
    let checked = false;
    if (allChecked === 'some') {
      indeterminate = true;
    }
    if (allChecked === 'all') {
      checked = true;
    }
    return <Checkbox onChange={onHeaderChecked} indeterminate={indeterminate} checked={checked} />;
  };
  function onHeaderChecked() {
    if (allChecked === 'all') {
      setTableCheckedList(new Array(data?.list?.length).fill(false));
    } else {
      setTableCheckedList(new Array(data?.list?.length).fill(true));
    }
  }

  const [nameEditIndex, setNameEditIndex] = useState({ index: -1, status: '' });
  const [setListPopover, setSetListPopover] = useState(-1);
  let tableListRender = () => {
    if (data?.list.length == 0) {
      return false;
    }
    const storageProvidersHover = (item: any) => {
      return (
        <div>
          <ul>
            {item.map((res: any, index: number) => {
              return (
                <li key={index}>
                  <a href={`https://filfox.info/en/deal/${res.dealId}`}>{res.storageProvider}</a>
                  <span> {res.status}</span>
                </li>
              );
            })}
          </ul>
        </div>
      );
    };
    return data?.list?.map((item, index) => {
      let trRender = (item: any) => {
        let nameRender = () => {
          let r = null;
          r = (
            <div
              className={`${styles.nameBox} pointer ${styles.nowrap}`}
              onClick={() => setNameEditIndex({ ...nameEditIndex, index })}
            >
              <Popover placement="topLeft" content={item.file_name}>
                {item.file_name}
              </Popover>
            </div>
          );
          // }
          return r;
        };
        let setRender = () => {
          let setListClick = (item: any) => {
            setSetListPopover(-1);
            item.callback && item.callback(index);
          };
          let lines = setList.map((item, setListIndex: number) => {
            return (
              <div key={setListIndex} onClick={() => setListClick(item)}>
                <Card borderAnimation={true} radius={4} defaultBorder={false} background="#33373f">
                  <div className={styles.line}>
                    <Iconfont type={item.icon} size={16}></Iconfont>
                    <div className={styles.title}>{item.title}</div>
                  </div>
                </Card>
              </div>
            );
          });
          return <div className={styles.setBox}>{lines}</div>;
        };
        return props.headerList.map((headerItem) => {
          let align = headerItem.align || 'left';
          let r = item[headerItem.key];
          if (headerItem.key === 'name') {
            r = (
              <div className="df aic">
                <Iconfont type={item.icon} size={20}></Iconfont>
                {nameRender()}
              </div>
            );
          }
          if (headerItem.key === 'set') {
            r = (
              <Popover
                content={setRender()}
                trigger="click"
                overlayClassName="tableSetPopover"
                placement="bottomRight"
                visible={setListPopover === index ? true : false}
                onVisibleChange={(visible) => {
                  visible ? setSetListPopover(index) : setSetListPopover(-1);
                }}
              >
                <div>
                  <Iconfont
                    type="icon-gengduo"
                    size={32}
                    className={`${styles.setIcon} pointer`}
                  ></Iconfont>
                </div>
              </Popover>
            );
          }
          if (headerItem.key === 'file_size') {
            r = <span>{formatBytes(item[headerItem.key], 2)}</span>;
          }
          if (headerItem.key == 'storageProviders' && item.network_id == 0) {
            if (typeof item[headerItem.key][0] != 'string' && item.network_id == 0) {
              r = (
                <Popover content={storageProvidersHover(item[headerItem.key])}>
                  <div style={{ color: '#00b8c4' }}>Details</div>
                </Popover>
              );
            } else if (typeof item[headerItem.key][0] == 'string') {
              r = <div>{item[headerItem.key][0]}</div>;
            }
          }else if(headerItem.key == 'storageProviders' &&item.network_id == 1){
            r = <div>IPFS_NODE</div>
          }else if(headerItem.key == 'storageProviders' &&item.network_id == 2){            
            r= <div>{userAccount}</div>
          }
          if (headerItem.key === 'created') {
            r = <span>{dataFormat(item[headerItem.key])}</span>;
          }
          if (headerItem.key === 'pinStatus' && item.network_id == 0) {
            r = <span>{item[headerItem.key]}</span>;
          }else if(headerItem.key === 'pinStatus' && item.network_id == 1){
            r = <span>IPFS_NODE</span>;
          }else if(headerItem.key === 'pinStatus' && item.network_id == 2){
            r = <span>{userAccount}</span>;
          }
          if (headerItem.key === 'cid') {
            r = (
              <Popover content={item[headerItem.key]}>
                <div className={styles.keyBox}>{item[headerItem.key]}</div>
              </Popover>
            );
          }
          return (
            <div
              key={headerItem.key}
              style={{ ...widthProcess(headerItem.width), textAlign: align }}
              className="df"
            >
              {r}
            </div>
          );
        });
      };
      return (
        <div
          key={index}
          className={`${styles.tableListBox} tableListBox`}
          onDoubleClick={() => {
            setRecentlyList(item);

            if (item.file_folder[0] !== 'music') {
              props.setPreviewState({
                previewURL: item.network_id == 0?getCidUrl(item.cid, item.file_name):getIPFSCidUrl(item.cid),
                isPreview: true,
                previewType: '',
                fileType: item.file_type,
              });
            }
            if (props.audioActiveIndex === index) {
              props.dispatch({
                type: 'menu/save',
                state: {
                  audioActiveIndex: -1,
                },
              });
              setTimeout(() => {
                props.dispatch({
                  type: 'menu/save',
                  state: {
                    audioActiveIndex: index,
                  },
                });
              }, 300);
            } else {
              props.dispatch({
                type: 'menu/save',
                state: {
                  audioActiveIndex: index,
                },
              });
            }
          }}
        >
          <Card
            borderAnimation={true}
            fileType={item.file_folder}
            fileCid={item.sid}
            inline={false}
          >
            <div className={styles.tableList}>
              <div className={styles.checkedBox}>
                <Checkbox onChange={() => toggleChecked(index)} checked={tableCheckedList[index]} />
              </div>
              {trRender(item)}
            </div>
          </Card>
        </div>
      );
    });
  };

  async function changeName(e: any) {
    setNameEditIndex({ ...nameEditIndex, status: 'loading' });
    let nameType = data?.list[nameEditIndex.index].file_name.substring(
      data?.list[nameEditIndex.index].file_name.lastIndexOf('.') + 1,
    );
    const renameStatus = await contract.file_rename({
      cid: data?.list[nameEditIndex.index].cid,
      rename: e + '.' + nameType,
    });
    setNameEditIndex({ index: -1, status: '' });
    reload();
  }
  function onRename(index?: number) {
    if (index !== undefined) {
      setNameEditIndex({ ...nameEditIndex, index });
    } else {
      let tableCheckedListFilter = tableCheckedList.filter((item) => {
        return item;
      });
      if (tableCheckedListFilter.length === 1) {
        let firstCheckedIndex = tableCheckedList.findIndex((item) => {
          return item;
        });
        setNameEditIndex({ ...nameEditIndex, index: firstCheckedIndex });
      }
    }
  }

  function loadMoreTitleRender() {
    if (noMore) {
      if (data?.nextPage > 1) {
        return '---No More---';
      }
      return '';
    }
    if (loadingMore) {
      return 'Loading...';
    }
    return;
  }

  const [checkRender, setCheckRender] = useState<JSX.Element>();
  function render() {
    if (checkRender) {
      return checkRender;
    }
    if (!data?.nextPage && !data?.list.length && !pageLoading) {
      return <Empty image={props.noDataImage} title={props.noData}></Empty>;
    } else if (pageLoading) {
      return <PageLoading />;
    }
    return (
      <>
        <div className={styles.TableBox}>
          <div className={styles.header}>
            <div className={styles.checkedBox}>{headerCheckedRender()}</div>
            {headerRender()}
          </div>
          <div className={styles.content} ref={refContent}>
            {loading ? (
              <div className="df jcc" style={{ opacity: '0.1' }}>
                loading
              </div>
            ) : (
              <>
                {tableListRender()}
                <div className="df jcc" style={{ opacity: '0.1' }}>
                  {loadMoreTitleRender()}
                </div>
              </>
            )}
          </div>
        </div>
        <FileSetBottom
          allChecked={allChecked}
          tableCheckedList={tableCheckedList}
          setList={setList}
          checkindex={checkindex}
        />
      </>
    );
  }

  return render();
};

function mapStateToProps(state: any) {
  const { token } = state.globalTop;
  const { audioActiveIndex } = state.menu;
  return {
    token,
    audioActiveIndex,
  };
}

export default connect(mapStateToProps)(Table);
