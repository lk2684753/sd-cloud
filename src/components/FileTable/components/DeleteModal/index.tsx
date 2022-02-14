import { connect } from 'dva';
import { Modal } from 'antd';
import { useState } from 'react';
import Contract from '@/utils/contract';
import { message } from 'antd';
import { GAS } from '@/utils/near/config';
interface Props {
  deleteModal: boolean;
  setDeleteModal: any;
  clickItem: any;
  reloadTable: Function;
}

const DeleteModal: React.FC<Props> = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  let { contract } = Contract;
  let deleteValue = props.clickItem;
  let title = 'Delete';
  let onCancel = () => {
    props.setDeleteModal(false);
  };
  const handleOk = async () => {
    console.log(deleteValue);
    
    setConfirmLoading(true);
    if (deleteValue.isOnly) {
      if (deleteValue.listData.cid && !deleteValue.folderName) {
        await contract.file_delete({ cid: deleteValue.listData.cid });
        props.reloadTable();
        props.setDeleteModal(false);
      }
      else if (deleteValue.listData.cid && deleteValue.folderName) {
        await contract.file_delete_in_folder({
          cid: deleteValue.listData.cid,
          folder: deleteValue.folderName,
        });
        props.reloadTable();
        props.setDeleteModal(false);
      }
    }
    else {
      if (deleteValue.listData && !deleteValue.folderName) {
        try {
          await contract.files_delete({ sids: deleteValue.listData }, GAS);
          props.reloadTable();
        } catch (error) {
          message.error('Error');
        }
        props.setDeleteModal(false);
      }
      else if (deleteValue.listData && deleteValue.folderName) {
        try {
          await contract.files_delete_in_folder({
            sids: deleteValue.listData,
            folder: deleteValue.folderName,
          });
          props.reloadTable();
        } catch (error) {
          message.error('Error');
        }
        props.setDeleteModal(false);
      }
    }
    setConfirmLoading(false);
  };
  return (
    <Modal
      title={title}
      visible={props.deleteModal}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={handleOk}
      centered={true}
      zIndex={1031}
      cancelText={'No'}
      okText={'Yes'}
    >
      Are you sure to delete this file (folder)?
    </Modal>
  );
};

function mapStateToProps(state: any) {
  const { token } = state.globalTop;
  return {
    token,
  };
}

export default connect(mapStateToProps)(DeleteModal);
