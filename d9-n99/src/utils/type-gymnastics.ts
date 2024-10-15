export type Require<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
export const asT = <T>(v: any): T => v as unknown as T;
