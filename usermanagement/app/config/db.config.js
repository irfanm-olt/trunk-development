module.exports = {
	HOST: 'mysql_db',
	USER: 'root',
	PASSWORD: 'trunk1234',
	DB: 'trunk',
	dialect: "mysql",
	pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
	}
  };