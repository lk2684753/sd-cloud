import styles from './index.less';
import { connect } from 'dva';
import { useEffect, useRef, useState, useImperativeHandle } from 'react';
import ActionHeader from './components/ActionHeader';
import Table from './components/Table';
import ShareModal from './components/ShareModal';
import DeleteModal from './components/DeleteModal';
import SelectListModal from './components/SelectListModal';
import FileModel from './components/fileModel';
import { Modal } from 'antd';
import { Document, Page } from 'react-pdf';
import './fileTable.less';
interface Props {
  getList: any;
  title: string;
  tableAfterContent?: Function;
  onRef?: any;
  noData?: string;
  noDataImage?: string;
  floderType?: string;
}

const FileTable: React.FC<Props> = (props) => {
  interface HeaderList {
    key: string;
    title: string;
    width?: number;
    align?: 'left' | 'center' | 'right';
    sort?: boolean;
    render?: object;
  }
  interface DownLoadStatus {
    progress: 0;
    fileName: string;
    filesize: number;
  }
  const [headerList, setHeaderList] = useState<HeaderList[]>([
    {
      key: 'name',
      title: 'Name',
    },
    {
      key: 'cid',
      title: 'CID',
      width:300
    },
    {
      key: 'pinStatus',
      title: 'Pin Status',
      width:100
    },
    
    {
      key: 'file_size',
      title: 'Size',
      width: 100,
      // sort: true,
    },
    {
      key: 'created',
      title: 'Timestamp',
      width: 130,
      // sort: true,
    },
    {
      key: 'storageProviders',
      title: 'Storage Providers',
      width:100
    },
    {
      key: 'set',
      title: '',
      width: 70,
    },
  ]);

  const [shareModal, setShareModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectListType, setSelectListType] = useState<'copy' | 'move'>('copy');
  const [selectListModal, setSelectListModal] = useState(false);
  const [fileDownloadStatus, setFileDownloadStatus] = useState<DownLoadStatus>();
  const [clickItem, setClickItem] = useState(null);
  const [checkData, setCheckData] = useState(null);
  const [fileModelDisplay, setFileModelDisplay] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [reloadTable, setReloadTable] = useState(() => {
    return () => {};
  });
  const imgBox = useRef(null);
  const [previewState, setPreviewState] = useState({
    previewURL: '',
    isPreview: false,
    previewType: '',
    fileType: '',
  });
  useImperativeHandle(props.onRef, () => {
    return { reloadTable: reloadTable };
  });
  const [showCheck, setShowCheck] = useState();
  return (
    <div className={styles.FileTable}>
      <ActionHeader
        setFileModelDisplay={setFileModelDisplay}
        setFileDownloadStatus={setFileDownloadStatus}
        title={props.title}
        reloadTable={reloadTable}
        floderType={props.floderType}
      />
      <div className={styles.tableCardBox}>
        <div className={styles.title}>{props.title}</div>
        {props.tableAfterContent && props.tableAfterContent(showCheck)}
        <Table
          setShowCheck={setShowCheck}
          setFileModelDisplay={setFileModelDisplay}
          setFileDownloadStatus={setFileDownloadStatus}
          setCheckData={setCheckData}
          title={props.title}
          floderType={props.floderType}
          headerList={headerList}
          getList={props.getList}
          setShareModal={setShareModal}
          setDeleteModal={setDeleteModal}
          setClickItem={setClickItem}
          setSelectListType={setSelectListType}
          setSelectListModal={setSelectListModal}
          setReloadTable={setReloadTable}
          noData={props.noData}
          reloadTable={reloadTable}
          noDataImage={props.noDataImage}
          setShareUrl={setShareUrl}
          setPreviewState={setPreviewState}
        />
      </div>
      {/* <FileModel
      ></FileModel> */}
      <ShareModal shareUrl={shareUrl} shareModal={shareModal} setShareModal={setShareModal} />
      <DeleteModal
        deleteModal={deleteModal}
        clickItem={clickItem}
        setDeleteModal={setDeleteModal}
        reloadTable={reloadTable}
      />
      <SelectListModal
        type={selectListType}
        selectListModal={selectListModal}
        checkData={checkData}
        setSelectListModal={setSelectListModal}
      />
      <div className="previewContent">
        <Modal
          visible={previewState.isPreview}
          footer={null}
          className="previewContent"
          width={previewState.previewType === 'image' ? '520px' : '80%'}
          onCancel={() => setPreviewState({ ...previewState, isPreview: false })}
          style={{ backgroundColor: 'rgba(0,0,0,0)' }}
        >
          <div className={styles.previewBox} style={{ textAlign: 'center' }}>
            <embed
              src={previewState.previewURL}
              style={{ color: '#fff', backgroundColor: '#f1f1f1' }}
              type={previewState.fileType}
              color="#fff"
              width="800"
              height="800"
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

function mapStateToProps(state: any) {
  const { token } = state.globalTop;
  return {
    token,
  };
}

export default connect(mapStateToProps)(FileTable);
