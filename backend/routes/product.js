const express = require('express')
const db = require('../db')
router = express.Router()



router.get('/product',(req,res)=>{

    const query = "SELECT * FROM product"

    db.query(query,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.json(result)
        }
    })
})

router.get('/product/:id',(req,res)=>{
    const id = req.params.id
    console.log(id)

    const query ="SELECT product.id,product.name ,product.price, product.quantity FROM product JOIN product_type ON product.type_id = product_type.id WHERE product_type.name LIKE ?"
    db.query(query, [id] ,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.json(result)
        }
    })
})


router.get('/shop/:id',(req,res)=>{
    const id = req.params.id
    

    const query = 'SELECT *FROM product WHERE id = ?'
    db.query(query,[id],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.json(result)
        }
    })
})
router.get('/product_type',(req,res)=>{

    const query = "SELECT * FROM product_type"

    db.query(query,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.json(result)
        }
    })
})


module.exports = router;