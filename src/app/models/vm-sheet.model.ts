export interface VmSheet {
  name: string;
  headers: string[];
  rows: Record<string, any>[];
  sampled?: boolean;
}
