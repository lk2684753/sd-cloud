import { Result, Button } from 'antd';
import { history } from 'umi';

export default function () {
  return (
    <div style={styles.errorPage}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry"
        extra={
          <Button
            type="primary"
            onClick={() => {
              history.push('/menu/home');
            }}
          >
            Back Home
          </Button>
        }
      />
    </div>
  );
}

var styles = {
  errorPage: {
    color: 'white',
  },
};
