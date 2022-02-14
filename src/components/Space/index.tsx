interface Props {
  height?: number;
  width?: number;
}

const Space: React.FC<Props> = (props) => {
  return (
    <div
      style={{
        width: props.width + 'px',
        height: props.height + 'px',
      }}
    />
  );
};

export default Space;
