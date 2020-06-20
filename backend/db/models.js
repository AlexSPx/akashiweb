const Sequelize = require('sequelize')

const Model = Sequelize.Model;

class Chapter extends Model {}
Chapter.init({
    id: { type: Sequelize.INTEGER, autoIncrement: true , primaryKey: true },
    number: Sequelize.FLOAT,
    title: Sequelize.STRING,
    notes: Sequelize.STRING,
    link_raw: Sequelize.STRING,
    link_tl: Sequelize.STRING,
    link_rd: Sequelize.STRING,
    link_ts: Sequelize.STRING,
    link_pr: Sequelize.STRING,
    link_rl: Sequelize.STRING,
    date_created: Sequelize.DATE,
    date_tl: Sequelize.DATE,
    date_rd: Sequelize.DATE,
    date_ts: Sequelize.DATE,
    date_pr: Sequelize.DATE,
    date_qcts: Sequelize.DATE,
    date_release: Sequelize.DATE,
    typesetter_id: Sequelize.INTEGER,
    translator_id: Sequelize.INTEGER,
    redrawer_id: Sequelize.INTEGER,
    proofreader_id: Sequelize.INTEGER,
    project_id: Sequelize.INTEGER
}, { sequelize, modelName: 'chapters' });

class Staff extends Model {}
Staff.init({
    id: { type: Sequelize.INTEGER, autoIncrement: true , primaryKey: true },
    name: Sequelize.STRING,
    discord_id: Sequelize.BIGINT,
    status: Sequelize.STRING
});

class Project extends Model {}
Project.init({
    id: { type: Sequelize.INTEGER, autoIncrement: true , primaryKey: true },
    title: Sequelize.STRING,
    status: Sequelize.STRING,
    link: Sequelize.STRING,
    altNames: Sequelize.STRING,
    typesetter_id: Sequelize.INTEGER,
    translator_id: Sequelize.INTEGER,
    redrawer_id: Sequelize.INTEGER,
    proofreader_id: Sequelize.INTEGER,
    thumbnail: Sequelize.STRING,
    icon: Sequelize.STRING,
    position: Sequelize.INTEGER,
    color: Sequelize.STRING
}, { sequelize, modelName: 'projects' });


Chapter.belongsTo(Staff, {
    foreignKey: {
        name: 'translator_id'
    }
});

Chapter.belongsTo(Staff, {
    foreignKey: {
        name: 'typesetter_id'
    }
});

Chapter.belongsTo(Staff, {
    foreignKey: {
        name: 'redrawer_id'
    }
});

Chapter.belongsTo(Staff, {
    foreignKey: {
        name: 'proofreader_id'
    }
});

Staff.hasMany(Chapter, {
    foreignKey: {
        name: 'id'
    }
});

Chapter.belongsTo(Project, {
    foreignKey: 'project_id'
})

Project.hasMany(Chapter, {
    foreignKey: 'id'
})