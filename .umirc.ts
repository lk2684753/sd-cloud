import { defineConfig } from 'umi';
export default defineConfig({
  title: 'SDCloud',
  base: '/',
  publicPath: '/',
  outputPath: '/dist/',
  hash: true,
  history: {
    type: 'hash',
  },
  favicon: '/assets/logo.png',
  nodeModulesTransform: {
    type: 'none',
  },
  // mfsu: {},
  extraBabelIncludes: [
    '@nftstorage/ipfs-cluster',
    'ipfs-http-client',
    'web3.storage',
    'ipfs-car/blockstore/memory',
    'ipfs-car/pack',
    'ipfs-car/unpack'],
  forkTSChecker: {
    typescript: true,
  },
  // fastRefresh: {},
  ignoreMomentLocale: true,
  dva: {
    immer: true,
  },
  dynamicImport: {
    loading: '@/components/Loading/index',
  },
  links: [
    { rel: 'icon', href: './public/assets/logo.png', type: 'image/x-icon' },
],
  locale: {
    default: 'zh-CN',
    antd: true,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  antd: {
    dark: false,
    compact: true,
  },
  cssLoader: {
    localsConvention: 'camelCase',
  },
  chainWebpack(config: any) {
    config
      .plugin('replace')
      .use(require('webpack').ContextReplacementPlugin)
      .tap(() => {
        return [/^\.\/locale$/, /moment$/];
      });
  },
});
