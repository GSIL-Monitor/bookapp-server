const CONF = {
  serverHost: 'localhost',
  tunnelServerUrl: '',
  tunnelSignatureKey: '27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89',
  // 腾讯云相关配置可以查看云 API 密钥控制台：https://console.cloud.tencent.com/capi
  qcloudAppId: '1256584069',
  qcloudSecretId: 'AKIDUttXBfnfBdzxryP1oS8gAUjsnffcn4d2',
  qcloudSecretKey: 'iNvhNE0cKyukSgo4cAyjNxWyHQQLbIcq',
  wxMessageToken: 'weixinmsgtoken',
  networkTimeout: 30000,

  port: '5757',
  rootPathname: '/var/www/html/bookapp',

  // 微信小程序 App ID
  appId: 'wxb8fb3bc4f87876c3',

  // 微信小程序 App Secret
  appSecret: 'abbc68f590c4552602cba11b86491f5a',

  // 是否使用腾讯云代理登录小程序
  useQcloudLogin: true,

  /**
   * MySQL 配置，用来存储 session 和用户信息
   * 若使用了腾讯云微信小程序解决方案
   * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
   */
  mysql: {
    host: '172.18.40.62',
    port: 3306,
    user: 'root',
    db: 'cAuth',
    pass: '123456',
    char: 'utf8mb4'
  },

  cos: {
    /**
     * 地区简称
     * @查看 https://cloud.tencent.com/document/product/436/6224
     */
    region: 'ap-guangzhou',
    // Bucket 名称
    fileBucket: 'qcloudtest',
    // 文件夹
    uploadFolder: ''
  },

  // 微信登录态有效期
  wxLoginExpires: 7200
}

module.exports = CONF
