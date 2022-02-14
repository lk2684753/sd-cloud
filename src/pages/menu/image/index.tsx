import styles from './index.less';
import { connect } from 'dva';
import FileTable from '@/components/FileTable';
import Contract,{client} from '@/utils/contract';
import { DID_TITLE } from '@/utils/near/config';
let { contract, getID, getlist } = Contract;
import { useState } from 'react';
interface Props {}

const Page: React.FC<Props> = (props: any) => {

  let title = 'image';
  const getList = async (from_index: number) => {
    let limit = 10;
    let result = await contract.view_files_in_folder({
      did: DID_TITLE + getID,
      folder: 'picture',
      from_index: (from_index * limit).toString(),
      limit,
    });
    return JSON.parse(result);
  };

  return <FileTable noData="No Image" getList={getList} title={title} />;
};

function mapStateToProps(state: any) {
  const { token, dispatch, fileList } = state.globalTop;
  return {
    token,
    fileList,
    dispatch,
  };
}

export default connect(mapStateToProps)(Page);


