var DataTypes = require("sequelize").DataTypes;
var _instansi = require("./instansi");
var _jobdesk = require("./jobdesk");
var _pengajuan = require("./pengajuan");

function initModels(sequelize) {
  var instansi = _instansi(sequelize, DataTypes);
  var jobdesk = _jobdesk(sequelize, DataTypes);
  var pengajuan = _pengajuan(sequelize, DataTypes);


  return {
    instansi,
    jobdesk,
    pengajuan,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
