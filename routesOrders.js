const express = require('express')
const routes = express.Router()

routes.get('/',  (req,res)=> {

     req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query('SELECT * FROM order_table', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/', (req, res)=>{
    
    if(!req.body.name || !req.body.ID_user || !req.body.address || !req.body.email || !req.body.total){
        return res.send("Data is required")
    }
  
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO order_table set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('order added!')
        })
    })
})

routes.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM order_table WHERE _id = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('order deleted!')
        })
    })
})


module.exports = routes;