import loading, { Options, Loading } from "loading-cli";

class Load {
  load: null | Loading;
  constructor() {
    this.load = null;
  }

  /**
   * @param options
   * 开始Loading状态 第二次开始传string类型
   */
  start(options: Options | string) {
    !this.load && (this.load = loading(options).start());
    this.load && this.load.start(options as string);
  }

  /**
   *停止Loading
   */
  stop() {
    this.load && this.load.stop();
  }

  warn(text: string) {
    this.load && this.load.warn(text);
  }

  info(text: string) {
    this.load && this.load.info(text);
  }
}

export default new Load();
