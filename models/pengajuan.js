const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pengajuan', {
    id_pengajuan: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    nama: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    tgl_lahir: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    jenis_kelamin: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    tingkat_pendidikan: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    no_telp: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    created_date: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    soft_delete: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    referral_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    jenis_tingkat_pendidikan: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    status_approval: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    approved_by: {
      type: DataTypes.UUID,
      allowNull: true
    },
    target_jobdesk: {
      type: DataTypes.UUID,
      allowNull: false
    },
    nomor_induk_instansi: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    dokumen_validasi: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    nama_pembimbing: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    nip_pembimbing: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    kontak_pembimbing: {
      type: DataTypes.CHAR(16),
      allowNull: false
    },
    nama_instansi: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    curriculum_vitae: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pengajuan',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pengajuan_pkey",
        unique: true,
        fields: [
          { name: "id_pengajuan" },
        ]
      },
    ]
  });
};
