import styles from './index.less';
import { connect } from 'dva';

interface Props {}

const Page: React.FC<Props> = (props) => {
  return <div className={styles.Demo}></div>;
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
