import { IPackages } from './PackageModel';

export interface ICourier {
  // branch: '',
  // client: '',
  packages: Array<IPackages>;
  total: number;
  volumetricTotal: number;
  weightTotal: number;
  weightRate: number;
}
