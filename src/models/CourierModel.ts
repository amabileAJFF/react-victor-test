import { IPackages } from './PackageModel';

export interface ICourier {
  // branch: '',
  // client: '',
  packages: Array<IPackages>;
  total: number;
  totalVolumetric: number;
  totalWeight: number;
  priceWeight: number;
}
