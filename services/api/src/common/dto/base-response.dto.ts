export class BaseResponseDto<T> {
  message: string;
  data?: T;
}
