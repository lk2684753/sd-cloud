const { create } = require('ipfs-http-client');
const fs = require('fs');
const client = create(new URL('http://122.114.19.250:25001'));
const app_root_dir = '/sdy_electron_root_dir';

exports.upload = async (_path) => {
  var buf = await fs.readFileSync(_path);
  const { cid } = await client.add(buf);
  let _p = app_root_dir + cid.toString();
  try {
    await client.files.cp('/ipfs/' + cid.toString(), _p);
  } catch (err) {
    await client.files.rm(_p);
    await client.files.cp('/ipfs/' + cid.toString(), _p);
  }
  return cid.toString();
};

exports.writeUpdateJson = async (newCid) => {
  console.log('[ writeUpdateJson ]-20');
  const { cid } = await client.add(newCid);
  let _p = app_root_dir + 'update.json';
  try {
    await client.files.cp('/ipfs/' + cid.toString(), _p);
  } catch (err) {
    await client.files.rm(_p);
    await client.files.cp('/ipfs/' + cid.toString(), _p);
  }
};
