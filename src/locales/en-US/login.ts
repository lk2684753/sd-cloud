const name = 'login';

const obj: any = {
  title: '12322',
};

export default Object.fromEntries(
  Object.keys(obj).map((item) => {
    return [name + '.' + item, obj[item]];
  }),
);
