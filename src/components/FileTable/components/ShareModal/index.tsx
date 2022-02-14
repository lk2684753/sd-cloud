import styles from './index.less';
import { connect } from 'dva';
import { useState } from 'react';
import { Modal } from 'antd';
import Card from '@/components/Card';
import { CopyToClipboard } from 'react-copy-to-clipboard';
interface Props {
  shareModal: boolean;
  setShareModal: any;
  shareUrl: string;
}

const ShareModal: React.FC<Props> = (props) => {
  let title = 'SHARE';
  let onCancel = () => {
    props.setShareModal(false);
  };
  let link = 'http://www.sdcloud.top.sdcloud.topsd…';
  const copyLink = () => {};
  return (
    <Modal
      title={title}
      visible={props.shareModal}
      footer={false}
      onCancel={onCancel}
      centered={true}
      zIndex={1031}
    >
      <div className={styles.ShareBox}>
          <div className={styles.title}>Share link has been generated</div>
          <div className={styles.inputBox}>
            <Card radius={4} borderAnimation={false}>
              <div className={styles.input}>{props.shareUrl}</div>
            </Card>
            <CopyToClipboard text={props.shareUrl}>
              <div className={styles.copy}>Copy</div>
            </CopyToClipboard>
          </div>

      </div>
    </Modal>
  );
};

function mapStateToProps(state: any) {
  const { token } = state.globalTop;
  return {
    token,
  };
}

export default connect(mapStateToProps)(ShareModal);
