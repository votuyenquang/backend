const { success } = require('concurrently/src/defaults');
var db = require('../../config/dbConnect')
const Email = require('../emailController');
module.exports.getFullBill = (req,res)=>{
    const sql = "SELECT * FROM `order`";
    db.query(sql,(err,rows)=>{
        if(err){
            return res.json({msg:err});
        }else{
            return res.json(rows)
        }
    })
}

module.exports.updateStatusBill = (req,res)=>{
    const {code_order,status,email} = req.body;
    const sql = "UPDATE `order` SET status=? WHERE code_order = ?";
    db.query(sql,[status,code_order],(err,rows)=>{
        if(err){
            return res.json({msg:err});
        }else{
            if(status===1){
                Email.SendEmail(email,`Update order #${code_order}`,
                    `Your order #${code_order} is currently in  <b style="color:blue">delivery status</b> !<br/>
                    We will inform you about the order status in the next email.<br/>
                    Please check your email regularly !
                    `
                )
            }
            if(status===2){
                const sql2 = "UPDATE `order` SET payment_status =? WHERE code_order = ?";
                db.query(sql2,[1,code_order],(err,rows)=>{
                    if(err){
                        return res.json({msg:err});
                    }else{
                        
                        Email.SendEmail(email,`Complete the order #${code_order}`,
                        `Order #${code_order} <b style="color:green">completed</b>, please check again !<br/>
                        If there is any problem please contact us. <br/>
                        Go to the website or mobile application to rate and comment on the product immediately. <br/>
                        Thank you for choosing our store!!
                        `
                    )
                    }
                })
            }
            if(status===3){
                Email.SendEmail(email,`Update order #${code_order}`,
                    `Your order #${code_order} <b style="color:gray">cancelled</b> was successful!<br/>
                    If you have any questions or problems, please contact us! <br/>
                    `
                )
            }
            return res.json({msg:"Success"})
        }
    })
}
module.exports.deleteBill = (req,res)=>{
    const {code_order} = req.body;
    const sql_select_product = "SELECT `size`,`idProduct`,`quanity` FROM `order_details` WHERE idOrder = ?";
    db.query(sql_select_product,[code_order],(err,rows)=>{
        if(err){
            return res.json({msg:err});
        }else{
            rows.map((item)=>{
                updateQuanityInventory(item.size,item.idProduct,item.quanity)
            });
            const sql_delete_details = "DELETE FROM `order_details` WHERE `idOrder`= ?";
            db.query(sql_delete_details,[code_order],(err,rows)=>{
                if(err){
                    return res.json({msg:err});
                }else{
                    const sql_delete_order = "DELETE FROM `order` WHERE `code_order`=?"
                    db.query(sql_delete_order,[code_order],(err,rows)=>{
                        if(err){
                            return res.json({msg:err});
                        }else{
                            return res.json({msg:"Success"})
                        }
                    })
                }
            })
        }
    })
}
const updateQuanityInventory = (size,idProduct,quanity)=>{
    const sql = "SELECT `sold` FROM `inventory` WHERE idProduct = ? AND size = ?"
    db.query(sql,[idProduct,size],(err,rows)=>{
        if(err){
            return res.json({msg:err});
        }else{
            const newSold = rows[0].sold-quanity;
            const update = "UPDATE `inventory` SET `sold` = ? WHERE idProduct = ? AND size = ? ";
            db.query(update,[newSold,idProduct,size],(err,rows)=>{
                if(err){
                    return res.json({msg:err});
                }
            })
        }
    })
}
