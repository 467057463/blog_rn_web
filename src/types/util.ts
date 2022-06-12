export type StatusType = 'loading' | 'success' | 'error';

export type RequestRespon<T> = {
  code: string;
  message: string;
  result: T;
  sysTime: number;
};
