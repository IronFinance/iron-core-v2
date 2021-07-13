import {ethers} from 'ethers';

export const dec18 = (x: string | number) => ethers.utils.parseUnits(typeof x === 'number' ? x.toFixed(18) : x, 18);
