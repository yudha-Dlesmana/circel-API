export enum Status {
  success = "SUCCESS",
  error = "ERROR",
}

export function createReponse<T>(
  status: Status,
  code: number,
  message: string,
  data: T
) {
  return {
    status,
    code,
    message,
    data,
  };
}
