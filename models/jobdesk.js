const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('jobdesk', {
    id_jobdesk: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    nama_jobdesk: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    kuota: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    soft_delete: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    penanggung_jawab: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'jobdesk',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "jobdesk_pkey",
        unique: true,
        fields: [
          { name: "id_jobdesk" },
        ]
      },
    ]
  });
};
