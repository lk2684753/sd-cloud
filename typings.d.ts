declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.png';
declare module '*.jpg';
declare module 'styled-components';
declare module 'near-seed-phrase';
declare module 'near-api-js';
declare module 'near-api-js/lib/utils';
declare module 'ipfs-core';
declare module '@/utils/g2/data-set.min.js';
declare module '@/utils/g2/g2.min.js';
declare module 'multiaddr';
declare module 'd3';
declare module 'react-faux-dom';
declare module 'money-clip';
declare module 'ipfs-geoip';
declare module 'geoip-lite';
declare module 'react-copy-to-clipboard';
declare module 'file-saver';
declare module 'react-pdf';
declare module 'web3.storage/dist/bundle.esm.min.js';
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
  const url: string;
  export default url;
}
declare module 'animejs';
declare namespace React {
  interface FunctionComponent<P = {}> {
    wrappers?: string[];
  }
}
declare module 'react-window';
declare module 'crypto-js';
declare module 'crypto-js/tripledes';
declare var ElectronPort: any;
declare module 'axios';
declare module 'three';
