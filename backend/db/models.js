const Sequelize = require('sequelize')

const Model = Sequelize.Model;

const sequelize = new Sequelize('postgres://akashiapi:&hZ-]62NN4KstU}N@51.15.107.70:5432/akashitest', {
    dialect: 'postgres'
})

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
}, { sequelize, tableName: 'chapters' , timestamps:false});

class Staff extends Model {}
Staff.init({
    id: { type: Sequelize.INTEGER, autoIncrement: true , primaryKey: true },
    name: Sequelize.STRING,
    discord_id: Sequelize.BIGINT,
    status: Sequelize.STRING
}, {sequelize, tableName: 'staff' , timestamps:false});

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
}, { sequelize, tableName: 'projects' , timestamps:false});


Chapter.belongsTo(Staff, {
    foreignKey: {
        as: 'tl',
        name: 'translator_id'
    }
});

Chapter.belongsTo(Staff, {
    foreignKey: {
        as: 'ts',
        name: 'id'
    }
});

Chapter.belongsTo(Staff, {
    foreignKey: {
        as: 'rd',
        name: 'id'
    }
});

Chapter.belongsTo(Staff, {
    foreignKey: {
        as: 'pr',
        name: 'id'
    }
});

Staff.hasMany(Chapter, {
    foreignKey: {
        name: 'id',
        as: 'tl'
    }
});

Staff.hasMany(Chapter, {
    foreignKey: {
        name: 'redrawer_id',
        as: 'b'
    }
});

Staff.hasMany(Chapter, {
    foreignKey: {
        name: 'proofreader_id',
        as: 'c'
    }
});

Staff.hasMany(Chapter, {
    foreignKey: {
        name: 'typesetter_id',
        as: 'd'
    }
});

Chapter.belongsTo(Project, {
    foreignKey: 'project_id',
    as: 'Project'
})

Project.hasMany(Chapter, {
    foreignKey: 'id',
    as: 'Chapters'
})

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}




async function fetchChapter() {
    const chapter = await Chapter.findOne({
        where: {
            id: 59
        },
        include: [{
            model: Project,
            as: 'Project'
        },
        {
            model: Staff,
            as: 'tl'}
        ]

        });
    console.log(chapter.Typesetter.name);
}

fetchChapter()
