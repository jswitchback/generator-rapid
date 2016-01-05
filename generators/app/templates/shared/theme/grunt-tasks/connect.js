module.exports = {
  connect: {
      server: {
          options: {
              port: 8000,
              keepalive: true,
              base: 'docs'
          }
      }
  }
};
