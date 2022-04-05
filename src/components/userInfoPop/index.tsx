import styles from './index.less';
import { connect } from 'dva';
import { TweenLite, Circ } from 'gsap';
import { useRef, useEffect, useState } from 'react';
import Contract, { client } from '@/utils/contract';
import { message, Spin, Button, Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { getCidUrl } from '@/utils/common';
import Iconfont from '@/components/Iconfont';
import { history } from 'umi';
import avata from '../../assets/images/avata.png';
interface Props {
  userInfoPopDisabled: boolean;
  dispatch: any;
  userinfo: any;
  setUserInfoPopDisabled: Function;
}

const Page: React.FC<Props> = (props) => {
  let filesInput: any;
  const { contract, signOut, getID } = Contract;
  const uoloadAvator = async () => {
    setPicUpload(true);
    const files = filesInput.files;
    console.log(files);

    if (files.length === 0) {
      message.warning('Select File To Upload!');
      setPicUpload(false);
      return;
    }
    try {
      const fileTypes = ['.jpg', '.png', '.jpeg', 'PNG', '.gif'];
      const FileEnd = files[0].name.substring(files[0].name.indexOf('.'));
      if (
        !fileTypes.some((res: string) => {
          return res == FileEnd;
        })
      ) {
        message.warning('Please Update Image File');
        return;
      }
      const cid = await client.put(files);
      const status = await contract.save_account_image({ cid, name: files[0].name });
      props.dispatch({
        type: 'globalTop/save',
        state: {
          userinfo: {
            ...props.userinfo,
            image: getCidUrl(cid, files[0].name),
          },
        },
      });
      setAvaterImage(getCidUrl(cid, files[0].name));
      setPicUpload(false);
    } catch (error) {
      message.error('Something Wrong is Coming');
      setPicUpload(false);
    }
  };
  const userInformation = async () => {
    const data = JSON.parse(await contract.view_account({ did: `did:near:${getID}` }));
    console.log('data=====================', data);
    setInfomation(JSON.stringify(data.document));
  };
  const rename = async (e: any) => {
    console.log(e);
    if (e.keyCode == 13) {
      setNameInput(false);
      props.dispatch({
        type: 'globalTop/save',
        state: {
          userinfo: {
            ...props.userinfo,
            name: e.target.value.trim(),
          },
        },
      });
      const status = await contract.save_account_name({ name: e.target.value.trim() });
    }
  };
  const [picDisabled, setPicDisabled] = useState(false);
  const [nameInput, setNameInput] = useState(false);
  const [picUpload, setPicUpload] = useState(false);
  const [avaterImage, setAvaterImage] = useState('');
  const [information, setInfomation] = useState('');
  const [indentityContentIndex, setIndentityContentIndex] = useState(0);
  useEffect(() => {
    (async () => {
      await userInformation();
    })();
    setAvaterImage(props.userinfo.image);
  }, []);
  console.log(props.userinfo);

  return (
    <div
      className={
        props.userInfoPopDisabled
          ? `${styles.userInfoPop}`
          : `${styles.userInfoPop} ${styles.disabled}`
      }
    >
      <div className={styles.screen}>
        <header>
          <a
            className={
              !picDisabled ? `${styles.targetBurger} ${styles.toggled}` : `${styles.targetBurger}`
            }
            onClick={() => {
              setPicDisabled(!picDisabled);
            }}
          >
            <ul className={styles.buns}>
              <li className={styles.bun}></li>
              <li className={styles.bun}></li>
            </ul>
          </a>
        </header>
        <nav
          className={!picDisabled ? `${styles.mainNav} ${styles.toggled}` : `${styles.mainNav}`}
          role="navigation"
        >
          <ul>
            {/* <Spin></Spin> */}
            {!picUpload && (
              <img
                onClick={() => {
                  filesInput.click();
                }}
                style={{ borderRadius: '50%' }}
                height={48}
                width={48}
                src={avaterImage}
                alt=""
              />
            )}
            {picUpload && <Spin></Spin>}
            {!nameInput && (
              <li>
                <a
                  onClick={() => {
                    setNameInput(true);
                  }}
                >
                  <span>{props.userinfo.name}</span>
                </a>
              </li>
            )}
            {nameInput && (
              <li>
                <input
                  type="text"
                  onKeyUp={rename}
                  autoFocus
                  onBlur={() => {
                    setNameInput(false);
                  }}
                />
              </li>
            )}
            <li>
              <div className={styles.userinfoPopContent}>
                <div className={styles.indentityBox}>
                  <div className={styles.identityBoxTitle}>
                    <h3>Personal Details</h3>
                    <div
                      className={styles.indentityBoxIcon}
                      onClick={() => {
                        if (indentityContentIndex == 1) {
                          setIndentityContentIndex(0);
                        } else {
                          setIndentityContentIndex(1);
                        }
                      }}
                    >
                      <Iconfont type="icon-xia"></Iconfont>
                    </div>
                  </div>
                  {indentityContentIndex == 1 && (
                    <div className={styles.indentityContent}>{information}</div>
                  )}
                </div>
                <div className={styles.indentityBox}>
                  <div className={styles.identityBoxTitle}>
                    <h3>Privacy Agreement</h3>
                    <div
                      className={styles.indentityBoxIcon}
                      onClick={() => {
                        if (indentityContentIndex == 2) {
                          setIndentityContentIndex(0);
                        } else {
                          setIndentityContentIndex(2);
                        }
                      }}
                    >
                      <Iconfont type="icon-xia"></Iconfont>
                    </div>
                  </div>
                  {indentityContentIndex == 2 && (
                    <div className={styles.indentityContent}>
                      You control your data! SDCloud doesn't keep your personal data; You can delete
                      personal data from your account at any time. SDCloud has no advertising and
                      does not sell your data; Your data is securely stored on the
                      NEAR&IPFS&FILECOIN network
                    </div>
                  )}
                </div>
                <div className={styles.indentityBox}>
                  <div className={styles.identityBoxTitle}>
                    <h3>Custom Node</h3>
                    <div
                      className={styles.indentityBoxIcon}
                      onClick={() => {
                        if (indentityContentIndex == 4) {
                          setIndentityContentIndex(0);
                        } else {
                          setIndentityContentIndex(4);
                        }
                      }}
                    >
                      <Iconfont type="icon-xia"></Iconfont>
                    </div>
                  </div>
                  {indentityContentIndex == 4 && (
                    <div className={styles.indentityContent}>
                      <Button
                        onClick={() => {
                          props.setUserInfoPopDisabled(false);
                          history.push('customNode');
                        }}
                      >
                        Custom Node
                      </Button>
                    </div>
                  )}
                </div>
                <div className={styles.indentityBox}>
                  <div className={styles.identityBoxTitle}>
                    <h3>Version</h3>
                    <div
                      className={styles.indentityBoxIcon}
                      onClick={() => {
                        if (indentityContentIndex == 3) {
                          setIndentityContentIndex(0);
                        } else {
                          setIndentityContentIndex(3);
                        }
                      }}
                    >
                      <Iconfont type="icon-xia"></Iconfont>
                    </div>
                  </div>
                  {indentityContentIndex == 3 && (
                    <div className={styles.indentityContent}>0.2.1</div>
                  )}
                </div>
              </div>
            </li>
            <li>
              <Button
                onClick={() => {
                  signOut();
                }}
              >
                Sign Out
              </Button>
            </li>
            <div className={styles.indentityBoxIconBox}>
              <a href="https://sdcloud.on.fleek.co/" className={styles.indentityBoxIcon}>
                <Iconfont type="icon-webside-copy" size={20}></Iconfont>
              </a>
              <a href="https://discord.gg/vB5Y4ZR2st" className={styles.indentityBoxIcon}>
                <Iconfont type="icon-discord" size={20}></Iconfont>
              </a>
              <a href="https://t.me/+CqZWBUd3PTFlY2I1" className={styles.indentityBoxIcon}>
                <Iconfont type="icon-telegram" size={20}></Iconfont>
              </a>
            </div>
          </ul>
        </nav>
        <div
          className={!picDisabled ? `${styles.container} ${styles.toggled}` : `${styles.container}`}
          style={{ height: '100%', width: '100%' }}
        >
          <div className={styles.appContent}>
            <ul className={styles.contentList}>
              <li>
                <article>
                  <figure>
                    <img
                      height={493}
                      width={329}
                      src={avaterImage}
                      alt="The Jim Lewis Dalaman Briefcase"
                    />
                    <figcaption></figcaption>
                  </figure>
                </article>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <input
        type="file"
        onChange={uoloadAvator}
        style={{ display: 'none' }}
        ref={(el) => {
          filesInput = el;
        }}
      />
    </div>
  );
};

function mapStateToProps(state: any) {
  const { token, userinfo } = state.globalTop;
  return {
    token,
    userinfo,
  };
}

let connectName = connect(mapStateToProps)(Page);
// connectName.wrappers = ['@/auth/login'];

export default connectName;
