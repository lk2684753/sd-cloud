import styles from './index.less';
import { connect } from 'dva';
import { Image } from 'antd';
import { useState } from 'react';
import { sidToCid, getCidUrl } from '@/utils/common';
interface Props {
  fileType: string;
  fileCid: string;
}

const Page: React.FC<Props> = (props) => {
  const [imageVisible, setImageVisible] = useState(false);
  const cid = props.fileCid
  const fileSrc = cid;
  return (
    <div className={styles.Demo}>
      <Image.PreviewGroup
        preview={{ visible: imageVisible, onVisibleChange: (vis) => setImageVisible(vis) }}
      >
        <Image src={fileSrc} />
      </Image.PreviewGroup>
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
connectName.wrappers = ['@/auth/login'];

export default connectName;
