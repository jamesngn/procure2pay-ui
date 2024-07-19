export interface IDTOHttpError {
  code: string | number;
  msg: string;
  statusCode: string;
  data: any;
}

export interface IDTOServiceResponse<T> {
  code?: number;
  data?: T;
  exception?: string;
  msg?: string;
  serverDateTime?: string;
  status?: number;
  successful?: boolean;
  error?: any;
}

export interface IField {
  label: string;
  value: string;
}
