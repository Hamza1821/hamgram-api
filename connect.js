import mysql from 'mysql'

export const db=mysql.createConnection({
    host : "localhost",
    user:'root',
    password:'Hamza@182',
    database:'socialdb'
})
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }

    console.log('Connected to MySQL database successfully.');
});