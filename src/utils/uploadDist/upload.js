const ipfs = require('./ipfs.js');
const rimraf = require('rimraf');
const compressing = require('compressing');

exports.uploading = async () => {
  console.log('[ uploading ]-6');
  await compressing.zip.compressDir('dist/', 'dist.zip');
  let newCid = await ipfs.upload('dist.zip');
  await rimraf.sync('dist.zip');
  await ipfs.writeUpdateJson(newCid);
  console.log('upload end...');
};
