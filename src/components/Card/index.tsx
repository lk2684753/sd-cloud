import styles from './index.less';
import FilePreview from '../FileTable/filePreview';
interface Props {
  boxShadow?: string;
  className?: string;
  radius?: number;
  defaultBorder?: boolean;
  background?: string;
  inline?: boolean;
  borderAnimation?: boolean;
  // borderAnimationRotate?: number;
  children?: any;
  fileType?: any;
  fileCid?: any;
}

const Card: React.FC<Props> = (props) => {
  props = {
    inline: true,
    radius: 8,
    defaultBorder: true,
    background: 'rgb(38, 41, 45)',
    borderAnimation: false,
    ...props,
  };

  let cardClassName = `${styles.Card} ${props.borderAnimation ? styles.borderAnimation : ''}`;

  let CardStyle: any = {
    borderRadius: props.radius + 'px',
    display: props.inline ? 'inline-block' : 'block',
  };
  if (props.boxShadow) {
    CardStyle.boxShadow = props.boxShadow;
  }

  let bg1Styles = {
    borderRadius: props.radius + 'px',
    background: props.background,
  };
  let bg2Styles = {
    borderRadius: props.radius + 'px',
  };
  return (
    <div className={cardClassName} style={CardStyle}>
      <div className={`${styles.bg1} ${props.className || ''}`} style={bg1Styles}></div>
      <div
        className={`${styles.bg2} ${props.defaultBorder ? styles.defaultBorder : ''}`}
        style={bg2Styles}
      ></div>
      {props.children}
      {/* <FilePreview fileType={props.fileType} fileCid={props.fileCid}/> */}
    </div>
  );
};

export default Card;
