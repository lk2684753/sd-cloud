import styles from './index.less';
import { connect } from 'dva';
import { useState, useEffect } from 'react';
import Iconfont from '@/components/Iconfont';
import { Modal, Spin } from 'antd';
import Contract from '@/utils/contract';
interface Props {
  type: 'copy' | 'move';
  selectListModal: boolean;
  setSelectListModal: any;
  checkData: any;
}
interface FolderList {
  icon: string;
  title: string;
}
[];
const SelectListModal: React.FC<Props> = (props) => {
  let { contract, getID, getlist } = Contract;
  let title = props.type === 'copy' ? 'Copy' : 'Move';
  const [loading, setLoding] = useState(false);
  const [folderList, setFolderList] = useState<Array<{ icon: string; title: string }>>([
    {
      icon: '',
      title: '',
    },
  ]);
  const [confirmLoading, setComfirmLoading] = useState(false);
  const getFolderList = async () => {
    const data = JSON.parse(await contract.view_account({ did: `did:near:${getID}` }));
    const folderList: FolderList[] = [];
    for (const key in data.file_folders) {
      if (
        data.file_folders[key] === 'picture' ||
        data.file_folders[key] === 'music' ||
        data.file_folders[key] === 'video' ||
        data.file_folders[key] === 'document' ||
        data.file_folders[key] === 'other'
      ) {
      } else {
        folderList.push({
          title: data.file_folders[key],
          icon: 'icon-wenjian',
        });
      }
    }
    return [...folderList];
  };
  useEffect(() => {
    (async function () {
      setFolderList([...(await getFolderList())]);
    })();
  }, []);
  const handleOK = async (title: string) => {
    setComfirmLoading(true);
    if (props.type === 'copy') {
      const result = await contract.file_copy_to_folder({
        sid: props.checkData.sid,
        folder: title,
      });
    } else if (props.type === 'move') {
      const result = await contract.file_copy_to_folder({
        sid: props.checkData.sid,
        folder: title,
      });
    }
    setComfirmLoading(false);
    onCancel();
  };
  let onCancel = async () => {
    props.setSelectListModal(false);
  };

  return (
    <Modal
      title={title}
      visible={props.selectListModal}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      centered={true}
      zIndex={1031}
    >
      {folderList.length !== 0 && (
        <div className={styles.SelectListBox}>
          {folderList.map((item, index) => {
            return (
              <div className={`${styles.box}`} key={index} onClick={() => handleOK(item.title)}>
                <Iconfont type={item.icon} size={20}></Iconfont>
                <div className={styles.title}>{item.title}</div>
              </div>
            );
          })}
          {folderList.length === 0 && <div>None</div>}
        </div>
      )}
    </Modal>
  );
};

function mapStateToProps(state: any) {
  const { token } = state.globalTop;
  return {
    token,
  };
}

export default connect(mapStateToProps)(SelectListModal);
