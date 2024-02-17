export class AppServer {
  private app: string

  constructor(info: string) {
    this.app = info ?? 'Óla mundo'
  }
}
