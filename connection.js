require('dotenv').config();
const {Pool}=require("pg")
const pool=new Pool({
    user:"postgres",
    host:"localhost",
    database:"postgres",
    password:process.env.password,
    port:5432
})
module.exports=pool