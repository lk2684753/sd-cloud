import styles from './index.less';
import Iconfont from '@/components/Iconfont';
import ImportFiles from '@/components/ImportFiles';
import Card from '@/components/Card';

interface Props {
  title: string;
  reloadTable?: Function;
  setFileModelDisplay: Function;
  setFileDownloadStatus: Function;
  floderType?: string;
}

const ActionHeader: React.FC<Props> = (props) => {
  return (
    <div className={`${styles.ActionHeader} ActionHeader`}>
      <ImportFiles
        floderType={props.floderType}
        setFileModelDisplay={props.setFileModelDisplay}
        setFileDownloadStatus={props.setFileDownloadStatus}
        title={props.title}
        reloadTable={props.reloadTable}
      />
    </div>
  );
};

export default ActionHeader;
