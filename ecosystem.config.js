module.exports = {
  apps: [{
    name: "app",
    script: "./dist/app_service/index.js"
  }, {
    name: "cron",
    script: "./dist/cron_service/index.js"
  },{
    name: "highload",
    script: "./dist/highload_service/index.js"
  }, {
    name: "socket",
    script: "./dist/socket_service/index.js"
  }]
}
