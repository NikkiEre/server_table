const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'user_mysql',
  password : '123456',
  database : 'new_schema'
});

connection.connect();


for (let index = 1; index <= 30; index++) {  // Быстро добавить 30 записей в базу данных
  connection.query(
    `INSERT INTO table_data(date, name, count, distance) VALUES ('${index < 10 ? '0' + index : index}.02.2022', 'name_${index}', ${index}0, ${index}00)`, 
    function (error, results, fields) {
      if(error) console.log(error);
    }
  );
};

const getTableData = () => {
  return new Promise(function(resolve, reject) {
    connection.query('SELECT * FROM table_data', function (error, results, fields) {
      if (error) {
        reject(error);
      };
      resolve(results);
    });
  });
};

module.exports = {
  getTableData,
};