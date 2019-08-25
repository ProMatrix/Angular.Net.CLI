
export class RequestHttpDownload {
  static readonly type = '[httpDemo] Request Http Download';
  constructor(public payload: boolean) { }
}

export class ResponseHttpDownload {
  static readonly type = '[httpDemo] Response Http Download';
  constructor(public payload: Blob) { }
}
