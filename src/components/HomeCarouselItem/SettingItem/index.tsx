import styles from './index.less';
import { connect } from 'dva';
import LogoCircle from '@/components/logoCircle';
import Gear from './gear';
import NewNodeForm from './NewNodeForm';
interface Props {}
import { useState, useEffect } from 'react';

const Page: React.FC<Props> = (props) => {
  const [windowHeight, setWindowHeight] = useState(969);
  useEffect(() => {
    setWindowHeight(window.innerHeight);
    console.log(window.innerHeight);
  }, [window.innerHeight]);

  const [userSubmitStatus, setUserSubmitStatus] = useState(false);
  const submit = () => {
    setUserSubmitStatus(true);
    setTimeout(() => {
      setUserSubmitStatus(false);
    }, 10000);
  };
  return (
    <div className={styles.SettingBox} style={{ height: windowHeight }}>
      <LogoCircle />
      {userSubmitStatus && <Gear></Gear>}
      {!userSubmitStatus && <NewNodeForm submit={submit} />}
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
// connectName.wrappers = ['@/auth/login'];

export default connectName;
