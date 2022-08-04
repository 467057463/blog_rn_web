module.exports = {
  apps: [
    {
      name: 'blog_rn_web',
      script: 'npm',
      args: 'run build:prod',
      env: {
        COMMON_VARIABLE: 'true',
      },
      env_production: {
        NODE_ENV: 'production', // 环境变量
      },
    },
  ],

  deploy: {
    production: {
      user: 'root',
      host: '95.179.164.10',
      ref: 'origin/main',
      repo: 'git@github.com:467057463/blog_rn_web.git',
      path: '/var/www/blog_rn_web',
      // 'pre-deploy-local': '',
      // 'post-deploy':
      //   'npm --production=false install --legacy-peer-deps && cp ./icons/Iconfont.js ./node_modules/react-native-vector-icons/ && cp ./icons/Iconfont.json ./node_modules/react-native-vector-icons/glyphmaps/ && cp ./icons/Iconfont.ttf ./node_modules/react-native-vector-icons/Fonts/ && npm run build:web',
      'pre-setup': '',
      env: {
        NODE_ENV: 'production',
      },
    },
  },
};
