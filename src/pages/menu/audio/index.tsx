import styles from './index.less';
import { connect } from 'dva';
import FileTable from '@/components/FileTable';
import AudioAction from './components/AudioAction';
import Contract from '@/utils/contract';
import { DID_TITLE } from '@/utils/near/config';
let { contract, getID, getlist } = Contract;

interface Props {
  audioList: any;
}

const Page: React.FC<Props> = (props) => {
  let title = 'music';

  // todoList
  const getList = async (from_index: number) => {
    let limit = 10;
    let result = await contract.view_files_in_folder({
      did: DID_TITLE + getID,
      folder: 'music',
      from_index: (from_index * limit).toString(),
      limit,
    });
    return JSON.parse(result);
  };

  return (
    <div className={styles.Audio}>
      <FileTable
        getList={getList}
        title={title}
        noData="No audio"
        tableAfterContent={(showCheck: any) => {
          return props.audioList?.length > 0 ? (
            <>
              <AudioAction showCheck={showCheck} />
              <div className={styles.line}></div>
            </>
          ) : (
            ''
          );
        }}
      />
    </div>
  );
};

function mapStateToProps(state: any) {
  const { audioList } = state.menu;
  return {
    audioList,
  };
}

export default connect(mapStateToProps)(Page);
