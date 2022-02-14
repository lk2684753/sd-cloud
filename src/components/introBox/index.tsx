import './index.less';
import { connect } from 'dva';
import { useRef, useEffect } from 'react'
interface Props { }

const Page: React.FC<Props> = (props) => {
    return <div className="intro">
        <div className="wrapper">
            <h1 className="cs">Makes Decentralized Storage Easy</h1>
            <p className='intr0-text-p'>{'>>'}You can start storing your files in minutes.</p>
            <p className='intr0-text-p'>{'>>'}Support multiple file type preview function.</p>
            <p className='intr0-text-p'>{'>>'}Applications where users store encrypted data on Filecoin can only be decrypted by the user using the NEAR private key, thus maintaining ownership of their data.
</p>
            <div className="clear"></div>
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
