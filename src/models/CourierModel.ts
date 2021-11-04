import { IPackages } from "./PackageModel";

export interface ICourier {
    // branch: '',
    // client: '',
    packages: Array<IPackages>
    total: number,
    total_volumetric: number,
    total_weight: number,
    price_weight: number
}