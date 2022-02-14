const name = 'loginPage';

const obj: any = {
  signInTitle: '创建新的账户',
  signInHint: '只需要输入用户名即完成注册',
  signInInputTitle: '输入用户名',
  singInInputPlaceHodler: 'correct horse batter...',
  signInInputsccess: '恭喜！该用户名可以注册',
  signInInputError: '用户名已被注册，请尝试其他',
  signInHintFirst: '你的用户名可以输入以下任何字符:',
  signInHintSecond: '小写字母(a-z);数字(0-9);下划线(_)用于分割;',
  signInHintThird: '你的用户名不可以包括',
  signInHintFouth: '符号(@等特殊字符);少于两个字符;多余54个字符;',
  setPhraseTitle: '设置恢复助记词',
  setPhraseHint: '请按顺序记录以下助记词，并安全保管它们。',
  setPhraseCopyBtn: '复制助记词',
  setPhraseContinueBtn: '继续',
  verifyPhraseTitle: '验证助记词',
  verifyPhraseHint: '请根据你的助记词输入以下单词完成设置。',
  verifyPhraseInputTitleLeft: '请输入第 ',
  verifyPhraseInputTitleRight: '个助记词：',
  verifyPhraseInputBtn: '完成',
  signUpTitle: '通过助记词导入账户',
  signUpHint: '请输入与此账户关联的助记词。',
  inputPhraseTitle: '助记词（12 个单词）',
  inputPhrasePlaceHolder: 'correct horse batter...',
  buttonText: '确定',
  singUpPageInput: '请输入用户名',
  signUpWelTitle: '导入已有账户',
  signUpBtnText: '导入',
  signInWelTitle: '欢迎创建账户',
  signInBtnText: '创建',
};

export default Object.fromEntries(
  Object.keys(obj).map((item) => {
    return [name + '.' + item, obj[item]];
  }),
);
