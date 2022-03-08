import * as nearApiJs from 'near-api-js';
export const ACCOUNT_ID_SUFFIX = 'testnet';
export const ACCOUNT_HELPER_URL = 'https://near-contract-helper.onrender.com';
export const NETWORK_ID = 'default';
export const MULTISIG_CONTRACT_HASHES = process.env.MULTISIG_CONTRACT_HASHES || [
  // https://github.com/near/core-contracts/blob/fa3e2c6819ef790fdb1ec9eed6b4104cd13eb4b7/multisig/src/lib.rs
  '7GQStUCd8bmCK43bzD8PRh7sD2uyyeMJU5h8Rj3kXXJk',
  // https://github.com/near/core-contracts/blob/fb595e6ec09014d392e9874c2c5d6bbc910362c7/multisig/src/lib.rs
  'AEE3vt6S3pS2s7K6HXnZc46VyMyJcjygSMsaafFh67DF',
  // https://github.com/near/core-contracts/blob/636e7e43f1205f4d81431fad0be39c5cb65455f1/multisig/src/lib.rs
  '8DKTSceSbxVgh4ANXwqmRqGyPWCuZAR1fCqGPXUjD5nZ',
  // https://github.com/near/core-contracts/blob/f93c146d87a779a2063a30d2c1567701306fcae4/multisig/res/multisig.wasm
  '55E7imniT2uuYrECn17qJAk9fLcwQW4ftNSwmCJL5Di',
];
export const NODE_URL = 'https://rpc.testnet.near.org';
export const ACCOUNT_ID_REGEX = /^(([a-z\d]+[-_])*[a-z\d]+\.)*([a-z\d]+[-_])*[a-z\d]+$/;
export const LOCKUP_ACCOUNT_ID_SUFFIX = process.env.LOCKUP_ACCOUNT_ID_SUFFIX || 'lockup.near';
export const MIN_BALANCE_FOR_GAS =
  process.env.REACT_APP_MIN_BALANCE_FOR_GAS || nearApiJs.utils.format.parseNearAmount('0.05');
export const REACT_APP_USE_TESTINGLOCKUP = process.env.REACT_APP_USE_TESTINGLOCKUP;
export const NEAR_CONTRACTID = 'dev-1643075353301-97924219324147';
// export const NEAR_CONTRACTID = 'dev-1642989436813-52543682623145';
export const GAS = '300000000000000';
export const DID_TITLE = 'did:near:';
