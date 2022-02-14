import styles from './index.less';
import { Spin } from 'antd';

interface Props {}

const Loading: React.FC<Props> = (props) => {
  return (
    <div className={styles.loadingBox}>
      <Spin size="large" />
    </div>
  );
};

export default Loading;
