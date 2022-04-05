import { connect } from 'dva';
import { Button } from 'antd';
import './index.css';
interface Props {
  submit: Function;
}
import { useState } from 'react';
import { userInfo } from 'os';

const Page: React.FC<Props> = (props) => {
  const [userNodeInfo, setUserNodeInfo] = useState({
    nodeName: '',
    nodeAddress: '',
  });
  return (
    <div className="Demo">
      <div className="main">
        <div className="header">
          <h4>SET YOUR NODE</h4>
          <p>Keep the data in your own hands</p>
        </div>
        <form className="form">
          <div className="input-group">
            <input type="text" 
            onChange={(e) => {
                setUserNodeInfo({
                  ...userNodeInfo,
                  nodeName: e.target.value,
                });
              }}
              required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Node Name</label>
          </div>

          <div className="input-group">
            <input
              type="text"
              onChange={(e) => {
                setUserNodeInfo({
                  ...userNodeInfo,
                  nodeAddress: e.target.value,
                });
              }}
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Node Address</label>
          </div>
          <Button onClick={() => props.submit(userNodeInfo)}>submit</Button>
        </form>
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

let connectName = connect(mapStateToProps)(Page);
// connectName.wrappers = ['@/auth/login'];

export default connectName;
