import styles from './layout.less';
import LeftMenu from '@/components/LeftMenu/index';
import { useEffect, useState } from 'react';
import { connect } from 'umi';
import FileModel from '@/components/FileTable/components/fileModel';
import BackPoint from '@/components/BackPoint';
import UserInfoPop from '@/components/userInfoPop'
import {Modal} from 'antd'
import '@/components/FileTable/fileTable.less'
interface Props {
  dispatch: any;
}

const Page: React.FC<Props> = (props) => {
  const [userInfoPopDisabled, setUserInfoPopDisabled] = useState(false)
  useEffect(() => {
    console.log(props);

    props.dispatch({ type: 'globalTop/getUserinfo' });
  }, []);

  return (
    <div className={styles.pageLayout}>
      <LeftMenu setUserInfoPopDisabled={setUserInfoPopDisabled} />
      <BackPoint />
      <div className={styles.rightContext}>
        <div className={styles.relativeBox}>{props.children}</div>
      </div>
      <FileModel></FileModel>
      <Modal
          visible={userInfoPopDisabled}
          footer={null}
          className="previewContent"
          width={520}
          onCancel={() => setUserInfoPopDisabled(false)}
          style={{ backgroundColor: 'rgba(0,0,0,0)' }}
          closable={false}
        >
      <UserInfoPop userInfoPopDisabled={userInfoPopDisabled} setUserInfoPopDisabled={setUserInfoPopDisabled}></UserInfoPop>
      </Modal>
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
