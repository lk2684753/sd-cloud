import { ACCOUNT_HELPER_URL } from './config';

export let controller: any;

export async function getAccountIds(publicKey: string) {
  controller = new AbortController();
  return await fetch(`${ACCOUNT_HELPER_URL}/publicKey/${publicKey}/accounts`, {
    signal: controller.signal,
  }).then((res) => res.json());
}
