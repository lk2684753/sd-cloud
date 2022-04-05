import { connect } from 'dva';
import './index.scss';
interface Props {}

const Page: React.FC<Props> = (props) => {
  return (
    <div className="Demo">
      <div className="bicycle-container">
        <div className="wheel back-wheel">
          <div className="tire"></div>
          <div className="rim"></div>
          <div className="spokes"></div>
          <div className="spokes"></div>
          <div className="hub"></div>
        </div>
        <div className="wheel front-wheel">
          <div className="tire"></div>
          <div className="rim"></div>
          <div className="spokes"></div>
          <div className="spokes"></div>
          <div className="hub"></div>
        </div>
        <div className="gear">
          <div className="gear-red"></div>
          <div className="tube pedal-tube"></div>
          <div className="pedal"></div>
        </div>
        <div className="tube chain-tube"></div>
        <div className="tube seat-tube-back"></div>
        <div className="tube seat-tube-front"></div>
        <div className="tube seat-tube-post"></div>
        <div className="tube top-tube"></div>
        <div className="tube top-handlebar-tube"></div>
        <div className="tube top-handlebar-tube2"></div>
        <div className="tube down-tube"></div>
        <div className="tube head-tube"></div>
        <div className="tube head-tube-post"></div>
        <div className="saddle"></div>
        <div className="handlebars"></div>
      </div>
      <div className="ground-container">
        <div className="ground ground1"></div>
        <div className="ground ground2"></div>
        <div className="ground ground3"></div>
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
