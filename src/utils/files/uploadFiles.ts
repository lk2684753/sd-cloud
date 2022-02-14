import Contract from '@/utils/contract';
import { formatBytes } from '@/utils/filter';
const { getID } = Contract;
const username = getID;
const storageName = `${username}_uploadFiles`;
export const setUploadFiles = (size = 0) => {
  let storageSize = Number(localStorage.getItem(storageName)) || 0;
  storageSize += size;
  localStorage.setItem(storageName, storageSize.toString());
};
export const getUploadFiles = () => {
  let storageSize = Number(localStorage.getItem(storageName)) || 0;
  return formatBytes(storageSize, 1);
  // return Number(localStorage.getItem(storageName)) || 0
};
