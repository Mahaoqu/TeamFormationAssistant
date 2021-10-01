module.exports = {
    HOST: "3.83.120.177",
    USER: "dbuser",
    PASSWORD: "dbuserpwd",
    DB: "teamformation",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
