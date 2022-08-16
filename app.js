const express=require("express")
const db=require("./connection")
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const port=3000
app.listen(port,()=>{
    console.log("server started")
})
db.connect((err,res)=>{
    if(!err){
        console.log("db connected")
    }else{
        console.log(err)
    }
})
app.get("/books",(req,res)=>{
    db.query("select * from library",(err,result)=>{
        if(!err){
            res.send(result.rows).status(200)
        }else{
            console.log(err)
            res.status(400)
        }
    })
})
app.post("/books",(req,res)=>{
    const book=req.body
    let insertdata=`insert into library(bookid,name,author,year,pages)
    values('${book.bookid}','${book.name}','${book.author}',${book.year},${book.pages})`
    db.query(insertdata,(err,result)=>{
        if(!err){
            console.log("book added successfully")
            res.status(200)
        }else{
            console.log("data insertion failed",err)
            res.status(400)
        }
    })
})
app.get("/books/:id",(req,res)=>{
    let search=`select * from library where bookid='${req.params.id}' or name='${req.params.id}' or author='${req.params.id}' or cast(year as text)='${req.params.id}' or cast(pages as text)='${req.params.id}'`
    db.query(search,(err,result)=>{
        if(!err){
            res.send(result.rows).status(200)
        }else{
            res.send("no data found").status(400)
        }          
    })
})
app.delete("/books/:id",(req,res)=>{
    let deleteData=`delete from library where bookid='${req.params.id}'`
    db.query(deleteData,(err,result)=>{
        if(!err){
            console.log("book deleted successfully")
        }else{
            console.log("deletion failed")
        }
    })
})