const express = require('express');
const sequelize = require('./database/sequelize');
const userRouter = require('./routes/userRouter');
const bookRouter = require('./routes/bookRouter');
const cors = require('cors');

const PORT = 1320;

const app = express();
app.use(cors({origin: "*"}));
app.use(express.json());
//middleware body-parser
app.use(userRouter);
app.use(bookRouter);

const server = async ()=> {
    try {
        
        
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }catch (error){
        console.error('unable to connect to the database:', error);
    }
}
server();

app.listen(PORT, ()=>{
    console.log(`Server is listening to PORT: ${PORT}`);
})