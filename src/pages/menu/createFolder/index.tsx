import styles from './index.less';
import { connect } from 'dva';
import FileTable from '@/components/FileTable';
import Contract from '@/utils/contract';
import { DID_TITLE } from '@/utils/near/config';
let { contract, getID, getlist } = Contract;
import { useState, createRef, useEffect } from 'react';
import { useAsyncEffect } from 'ahooks';

interface Props {}

const Page: React.FC<Props> = (props: any) => {
  const query: any = props.location.query;
  let title = query.id;
  interface Result {
    list: {
      icon?: string;
      file_name: string;
      file_size: number;
      file_type: string;
      holder: string;
      sid?: string;
      created: number;
    }[];
    page: number;
    next: boolean;
    folderName?: string;
  }

  let ChildRef: any = createRef();
  const getList = async () => {
    let limit = 10;
    const result = JSON.parse(
      await contract.view_files_in_folder({
        did: DID_TITLE + getID,
        folder: query.id,
      }),
    );
    return result;
  };
  useEffect(() => {
    // refresh data when route change
    ChildRef.current.reloadTable();
  }, [query.id]);
  return <FileTable onRef={ChildRef} floderType="newFloder" getList={getList} title={title} />;
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
