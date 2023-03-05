const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('instansi', {
    id_instansi: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    nama: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    kode_instansi: {
      type: DataTypes.STRING(12),
      allowNull: false
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    kode_pos: {
      type: DataTypes.CHAR(7),
      allowNull: true
    },
    website: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'instansi',
    schema: 'ref',
    timestamps: false,
    indexes: [
      {
        name: "instansi_pkey",
        unique: true,
        fields: [
          { name: "id_instansi" },
        ]
      },
    ]
  });
};
