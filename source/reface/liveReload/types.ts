export interface LiveReloadOptions {
  /**
   * WebSocket server port
   * @default 35729
   */
  port?: number;

  /**
   * WebSocket server host
   * @default "localhost"
   */
  host?: string;

  /**
   * Paths to watch for changes
   * @default []
   */
  watchPaths?: string[];
}
