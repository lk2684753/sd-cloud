import styles from './index.less';

interface Props { }

const Loading: React.FC<Props> = (props) => {
    return (
        <div className={styles.loadingBox}>
            <div className={styles.loader}>
                <div className={styles.row}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className={styles.row}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className={styles.row}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    );
};

export default Loading;
