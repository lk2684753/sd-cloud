import styles from './index.less';
import { connect } from 'dva';
import FileTable from '@/components/FileTable';
import { getRecentlyList } from '@/utils/files/recentlyFiles';

interface Props {}

const Page: React.FC<Props> = (props) => {
  let title = 'recently used';
  //todolist
  const getList = () => {
    const list = getRecentlyList(10);
    return list;
  };
  return <FileTable noData="Mo Usage Record" getList={getList} title={title} />;
};

function mapStateToProps(state: any) {
  const { token } = state.globalTop;
  return {
    token,
  };
}

export default connect(mapStateToProps)(Page);
