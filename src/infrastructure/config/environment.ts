export const environment = {
  /**
   * Set to false to use the real PostgreSQL-backed API repositories.
   * Keep true to use offline mock data (no backend required).
   */
  useMockRepositories: false,

  apiBaseUrl: "",

  /**
   * URL of the local Express backend server.
   *
   * • Android Emulator  → use 10.0.2.2 instead of localhost
   * • iOS Simulator     → localhost works fine
   * • Physical device   → use your machine's local network IP (e.g. 192.168.x.x)
   *
   * Change this to match your machine's IP when testing on a real device.
   */
  alertApiBaseUrl: "http://localhost:5000",

  appName: "MahaJal IoT",
  deepLinkScheme: "mahajal"
};
