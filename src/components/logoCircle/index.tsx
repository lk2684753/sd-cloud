import styles from './index.less';
import { connect } from 'dva';
interface Props { }

const Page: React.FC<Props> = (props) => {
  return (<div className={styles.logoCircle}>
      <div className={styles.heroLogoCircles}>

        {/* <img src="//github-atom-io-herokuapp-com.freetls.fastly.net/assets/index-portal-sides-8f3d2e2077a1fb786c0bed45cc8f9e5ead36d291c4485ff8f00d8d713a3a7499.svg" alt="" className={styles.heroCircle} /> */}

        <img src="https://bafybeidoa5xbuyoywigy7goasfl67lszq7rdgid5kzwxbmxi2znaybiacu.ipfs.dweb.link/sdcloud-logo.png" alt="" className={styles.atomLogo} width="60vw" />

        <img className={`${styles.heroLogoCircle1} ${styles.heroCircle}`} src="https://github-atom-io-herokuapp-com.freetls.fastly.net/assets/index-portal-red-semi-5aec49dbe5d420f928cece7001b96267ee17a9d3577374b68b4fba47c547bd75.svg" />

        <img className={`${styles.heroLogoCircle2} ${styles.heroCircle}`} src="https://github-atom-io-herokuapp-com.freetls.fastly.net/assets/index-portal-red-2f7737b286dff1537adff47b8201aa43e33cbe1e47bd528ca2189809917fe132.svg" />

        <img className={`${styles.heroLogoCircle3} ${styles.heroCircle}`} src="https://github-atom-io-herokuapp-com.freetls.fastly.net/assets/index-portal-orange-semi-d9d13d5529ae8f3c91dc80b182cf14fc629118bbdac8851b36e102dd15652557.svg" />

        <img className={`${styles.heroLogoCircle4} ${styles.heroCircle}`} src="https://github-atom-io-herokuapp-com.freetls.fastly.net/assets/index-portal-orange-235189ed438049f084ca873f6ed2055c4127ddef84a55fa464053f34c10157e6.svg" />

        <img className={`${styles.heroLogoCircle5} ${styles.heroCircle}`} src="https://github-atom-io-herokuapp-com.freetls.fastly.net/assets/index-portal-yellow-semi-af7a94ccf4768a81e6692d808f00e33ac88d9110f842d02c5ab211577686301a.svg" />

        <img className={`${styles.heroLogoCircle6} ${styles.heroCircle}`} src="https://github-atom-io-herokuapp-com.freetls.fastly.net/assets/index-portal-yellow-bf8ec5927e343b3a804448d37a799c9c346af320f30b3cdc019297938fe00300.svg" />

        <img className={`${styles.heroLogoCircle7} ${styles.heroCircle}`} src="https://github-atom-io-herokuapp-com.freetls.fastly.net/assets/index-portal-green-semi-6b12059c6aea11bf60e8f3c89afdffb6b817913541a1ce72cbca29f733224984.svg" />

        <img className={`${styles.heroLogoCircle8} ${styles.heroCircle}`} src="https://github-atom-io-herokuapp-com.freetls.fastly.net/assets/index-portal-green-8a75a5e7cc4f8426a47f5ebfe2459283d3554cfdcf8dc5f492fda0b26d2d6d79.svg" />

        <img className={`${styles.heroLogoCircle9} ${styles.heroCircle}`} src="https://github-atom-io-herokuapp-com.freetls.fastly.net/assets/index-portal-blue-semi-930c6662236ab84933e73083bc057b869b895bd36cef9e3e5254018fb61bc82a.svg" />

        <img className={`${styles.heroLogoCircle10} ${styles.heroCircle}`} src="https://github-atom-io-herokuapp-com.freetls.fastly.net/assets/index-portal-blue-50996d0762fb6d9ee13d6a52404dd01327fc542cc729777d532c9b633103c835.svg" />
      </div>
  </div>)

}
  function mapStateToProps(state: any) {
    const { token } = state.globalTop;
    return {
      token,
    };
  }
  let connectName = connect(mapStateToProps)(Page);
  // connectName.wrappers = ['@/auth/login'];
  
  export default connectName;
