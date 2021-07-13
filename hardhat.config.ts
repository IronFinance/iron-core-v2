import 'dotenv/config';
import {HardhatUserConfig} from 'hardhat/types';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import 'hardhat-gas-reporter';
import {node_url, accounts} from './utils/networks';

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.4',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      accounts: accounts('localhost'),
    },
    localhost: {
      url: 'http://localhost:8545',
      accounts: accounts('localhost'),
    },
    bsctestnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      accounts: accounts('testnet'),
      live: true,
    },
    bsc: {
      url: 'https://bsc-dataseed.binance.org',
      accounts: accounts('bsc'),
      live: true,
    },
    matic: {
      url: 'https://young-restless-butterfly.matic.quiknode.pro/7d84ed2f3469de6a923c646c40778ab1022ab999/',
      accounts: accounts('matic'),
      live: true,
      gasPrice: 20e9
    },
    mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com',
      accounts: accounts('mumbai'),
      live: true,
      gasPrice: 1e9
    },
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 5,
    enabled: !!process.env.REPORT_GAS,
  },
  namedAccounts: {
    creator: 1,
    deployer: 1,
  }
};

export default config;
