import styles from './index.scss';
import { connect } from 'dva';
import { useState } from 'react'
import Iconfont from '@/components/Iconfont'
interface Props { }

const Page: React.FC<Props> = (props) => {
    const [checkIndex, setCheckIndex] = useState(0)
    return <div className={`${styles.IntroCard} ${styles.options}`}>
        <div className={checkIndex == 0 ? `${styles.option}  ${styles.active}` : `${styles.option}`} onClick={() => { setCheckIndex(0) }}>
            <div className={styles.shadow}></div>
            <div className={styles.label}>
                <div className={styles.icon}>
                    <i className={`${styles.fas}`}>
                        <Iconfont type='icon-contract' size={30}></Iconfont>
                    </i>
                </div>
                <div className={styles.info}>
                    <div className={styles.main}>CONTRACT</div>
                    <div className={styles.sub}>{'>>'} "NEAR is a decentralized development platform where developers can host serverless applications and smart contracts; SDCloud contracts are written and deployed on NEAR, supporting various file operations;</div>
                </div>
            </div>
        </div>
        <div className={checkIndex == 1 ? `${styles.option}  ${styles.active}` : `${styles.option}`} onClick={() => { setCheckIndex(1) }}>
            <div className={styles.shadow}></div>
            <div className={styles.label}>
                <div className={styles.icon}>
                    <i className={`${styles.fas}`}>
                        <Iconfont type='icon-storage' size={30} ></Iconfont>
                    </i>
                </div>
                <div className={styles.info}>
                    <div className={styles.main}>STORAGE</div>
                    <div className={styles.sub}>{'>>'} Filecoin is a decentralized peer-to-peer storage network, allowing anyone to store and validate large-scale data as part of a global, 15-exabyte (and growing) network. Under the hood, all Filecoin nodes use the InterPlanetary File System (IPFS), a content-addressed protocol for storing and sharing data.</div>
                </div>
            </div>
        </div>
        <div className={checkIndex == 2 ? `${styles.option}  ${styles.active}` : `${styles.option}`} onClick={() => { setCheckIndex(2) }} >
            <div className={styles.shadow}></div>
            <div className={styles.label}>
                <div className={styles.icon}>
                    <i className={`${styles.fas}`}>
                        <Iconfont type='icon-payment' size={30} ></Iconfont>
                    </i>
                </div>
                <div className={styles.info}>
                    <div className={styles.main}>PAYMENT</div>
                    <div className={styles.sub}>{'>>'} You only need to pay a small amount of NEAR as an on-chain transaction fee to store your hotspot data on the IPFS network; cold backup data, according to the quotation and file size of the storage miners, store the data on the Filecoin network, your file operations Every step will be recorded on the chain.</div>
                </div>
            </div>
        </div>
        <div className={checkIndex == 3 ? `${styles.option}  ${styles.active}` : `${styles.option}`} onClick={() => { setCheckIndex(3) }} >
            <div className={styles.shadow}></div>
            <div className={styles.label}>
                <div className={styles.icon}>
                    <i className={`${styles.fas}`}>
                        <Iconfont type='icon-_Identity' size={30} ></Iconfont>
                    </i>
                </div>
                <div className={styles.info}>
                    <div className={styles.main}>IDENTITY</div>
                    <div className={styles.sub}>{'>>'}We host a DID implementation on the NEAR chain, also known as NEAR DID. This specification complies with the requirements specified in the current DID specification published by the NEAR & W3C Certificate Community Organization.</div>
                </div>
            </div>
        </div>
        <div className={checkIndex == 4 ? `${styles.option}  ${styles.active}` : `${styles.option}`} onClick={() => { setCheckIndex(4) }} >
            <div className={styles.shadow}></div>
            <div className={styles.label}>
                <div className={styles.icon}>
                    <i className={`${styles.fas}`}>
                        <Iconfont type='icon-icon_card_concise' size={30} ></Iconfont>
                    </i>
                </div>
                <div className={styles.info}>
                    <div className={styles.main}>CONCISION</div>
                    <div className={styles.sub}>{'>>'}In dapp, your file types will be classified by default; support multiple file types to download, preview, share; you can share your favorites to others at any time.</div>
                </div>
            </div>
        </div>
        <div className={checkIndex == 5 ? `${styles.option}  ${styles.active}` : `${styles.option}`} onClick={() => { setCheckIndex(5) }} >
            <div className={styles.shadow}></div>
            <div className={styles.label}>
                <div className={styles.icon}>
                    <i className={`${styles.fas}`}>
                        <Iconfont type='icon-icon_card_concise' size={30} ></Iconfont>
                    </i>
                </div>
                <div className={styles.info}>
                    <div className={styles.main}>POLICY</div>
                    <div className={styles.sub}>{'>>'}You control your data! SDCloud doesn't keep your personal data; You can delete personal data from your account at any time. SDCloud has no advertising and does not sell your data; Your data is securely stored on the NEAR&IPFS&FILECOIN network.</div>
                </div>
            </div>
        </div>
    </div>
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
