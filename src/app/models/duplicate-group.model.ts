import { Vendor } from './vendor.model';

export interface DuplicateGroup {
  groupId: number;
  confidence: number; // 0–1
  reason: string;
  vendors: Vendor[];
}
