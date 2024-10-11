export type requestOptions = {
  showloading?: boolean
  throwErr?: boolean
  showMessage?: boolean
  headers?: object
}

export type responseBody<T = any> = {
  success: boolean
  statusCode: number
  message: string
  data: T
}
