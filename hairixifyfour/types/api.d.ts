/* eslint-disable @typescript-eslint/no-explicit-any */
interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}
