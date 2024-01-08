var db = require('../config/dbConnect')
var axios = require('axios')
const jwt = require('jsonwebtoken');

module.exports.getTopProductSale= (req,res)=>{
    const sql = "SELECT * FROM product where promotional > 0 ORDER BY (price-promotional)/(price) DESC LIMIT 3"
    db.query(sql, (err,result)=>{
        return res.send(result);
    })
}
module.exports.getRecommendationProduct= async(req,res)=>{
    try {
        const token = req.body.id;
        console.log({token});
        if (!token) {
            return res.status(401).json({ error: 'Token không được cung cấp' });
        }
        if (token == 1) { 
            var idUser =  "227566c0-2d6c-11ec-9cf0-c9d95f18e810" 
        } else {
            const decoded = jwt.verify(token, process.env.SECRECT);
            console.log(decoded);
            var idUser =  decoded.id
        }
        console.log({idUser});
      // Make a request to the Python API
        const pythonApiResponse = await axios.post('http://127.0.0.1:5000/api/recommendation', {
            idUser: idUser,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    
        // Use the data from the Python API response
        const responseData = pythonApiResponse.data;
        // console.log(responseData);
        const arrProduct = []
        const sqlFull = `SELECT * FROM product WHere product.id=?`
        // Use Promise.all to wait for all queries to complete
        await Promise.all(responseData.map(async (id) => {
            const result = await new Promise((resolve) => {
                db.query(sqlFull, id, (err, result) => {
                    if (err) {
                        resolve({ msg: err });
                    } else {
                        resolve(result[0]);
                    }
                });
            });
            arrProduct.push(result);
        }));


        res.send({ message: 'Data from Python API', data: arrProduct });
    } catch (error) {
        console.error('Error calling Python API:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports.getRecommendationDetails = (req,res)=>{
    const id = req.body.id;
    const sqlFull = `SELECT * FROM product WHere product.id=?`
    db.query(sqlFull,id ,(err,result)=>{
        if(err){
            return res.json({msg:err});
        } else return res.json({item:result[0]})
    })
}

module.exports.getproductSale= (req,res)=>{
    const sql = "SELECT * FROM product where promotional > 0 ORDER BY (price-promotional)/(price) DESC"
    db.query(sql, (err,result)=>{
        return res.send(result);
    })
}

module.exports.getFullProduct = (req,res)=>{
    const sql = "SELECT product.*,AVG(review.reviewStar) AS reviewStar,COUNT(*) AS quanityReview FROM `product` LEFT JOIN `review` ON product.id=review.idProduct GROUP BY product.id HAVING quanityReview"
    db.query(sql, (err,result)=>{
       return res.send(result);
    })
}
module.exports.getFullProductAdmin = (req,res)=>{
    const sql = "SELECT product.*,category.name AS nameCategory,product_type.name AS nameProductType FROM `product` INNER JOIN `category` ON product.idCategory=category.id INNER JOIN `product_type` ON product.idProductType=product_type.id ORDER BY product.create_at"
    db.query(sql, (err,result)=>{
       return res.send(result);
    })
}
module.exports.getProductType = (req,res)=>{
    const sql = "SELECT product_type.*,category.name AS nameCategory FROM `product_type` INNER JOIN category ON product_type.idCategory=category.id"
    db.query(sql, (err,result)=>{
       return res.send(result);
    })
}
module.exports.getCategory= (req,res)=>{
    const sql = "SELECT * FROM category"
    db.query(sql, (err,result)=>{
       return res.send(result);
    })
}
module.exports.getProduct= (req,res)=>{
    const sql = "SELECT * FROM product"
    db.query(sql, (err,result)=>{
       return res.send(result);
    })
}
module.exports.getProductDetails= (req,res)=>{
    const {id} = req.body;
    const sql = "SELECT product.*,AVG(review.reviewStar) AS reviewStar,COUNT(*) AS quanityReview FROM `product` LEFT JOIN `review` ON product.id=review.idProduct WHERE product.id=? GROUP BY product.id HAVING quanityReview";
    db.query(sql,[id], (err,result)=>{
       return res.send(result);
    })
}
module.exports.getCategoryById= (req,res)=>{
    const {id} = req.body;
    const sql = `SELECT * FROM category WHERE id='${id}'`;
    db.query(sql, (err,result)=>{
       return res.send(result);
    })
}
module.exports.getProductTypeById= (req,res)=>{
    const {id} = req.body;
    const sql = `SELECT * FROM product_type WHERE id='${id}'`;
    db.query(sql, (err,result)=>{
       return res.send(result);
    })
}
module.exports.getProductTypeByCategory = (req,res)=>{
    const {id} = req.body;
    const sql = `SELECT * FROM product_type WHERE idCategory='${id}'`;
    db.query(sql, (err,result)=>{
        return res.send(result);
     })
}
module.exports.getProductByType= (req,res)=>{
    const {id} = req.body;
    const sql = "SELECT product.*,AVG(review.reviewStar) AS reviewStar,COUNT(*) AS quanityReview FROM `product` LEFT JOIN `review` ON product.id=review.idProduct WHERE product.idProductType=? GROUP BY product.id HAVING quanityReview";
    db.query(sql,[id], (err,result)=>{
       return res.send(result);
    })
}
module.exports.getProductByCategory= (req,res)=>{
    const {id} = req.body;
    const sql = "SELECT product.*,AVG(review.reviewStar) AS reviewStar,COUNT(*) AS quanityReview FROM `product` LEFT JOIN `review` ON product.id=review.idProduct WHERE product.idCategory=? GROUP BY product.id HAVING quanityReview";
    db.query(sql,[id], (err,result)=>{
       return res.send(result);
    })
}

module.exports.getProductInventory= (req,res)=>{
    const {id} = req.body;
    const sql = `SELECT * FROM inventory WHERE idProduct='${id}'`;
    db.query(sql, (err,result)=>{
       return res.send(result);
    })
}

module.exports.getProductNew = (req,res)=>{
    const {page} = req.params;
    const sqlFull = `SELECT * FROM product`
    db.query(sqlFull, (err,result)=>{
        if(err){
            return res.json({msg:err});
        }
        result.sort((a,b)=>{
            return new Date(b.create_at) - new Date(a.create_at);
        });
        let item = [];
        let numberofpage = 8;
        let maxlength = numberofpage*page;  
        if(result.length>maxlength){
            for(var i=maxlength-8;i<maxlength;i++){
                item.push(result[i])
                if(i===maxlength-1){
                    return res.json({msg:"Still data",item:item})
                }
            } 
        }else{
            for(var i=maxlength-8;i<result.length;i++){
                item.push(result[i])
                if(i===result.length-1){
                    return res.json({msg:"Out of data",item:item})
                }
            } 
        }
    })
}
module.exports.getProductDeal = (req,res)=>{
    const {page} = req.params;
    const sqlFull = `SELECT * FROM product`;
    db.query(sqlFull, (err,result)=>{
        if(err){
            return res.json({msg:err});
        }
        result.sort((a,b)=>{
            let aP = 0;
            let bP = 0;
            if(a.promotional!==null){
                aP=(a.price-a.promotional)/a.price
            }
            if(b.promotional!==null){
                bP=(b.price-b.promotional)/b.price
            }
            return bP - aP;
        });
        let item = [];
        let numberofpage = 12;
        let maxlength = numberofpage*page;  
        if(result.length>maxlength){
            for(var i=maxlength-12;i<maxlength;i++){
                item.push(result[i])
                if(i===maxlength-1){
                    return res.json({msg:"Still data",item:item})
                }
            } 
        }else{
            for(var i=maxlength-12;i<result.length;i++){
                item.push(result[i])
                if(i===result.length-1){
                   return res.json({msg:"Out of data",item:item})
                }
            } 
        }
    })
}

module.exports.searchProduct = (req,res)=>{
    const {datasearch} = req.body;
    console.log(datasearch)
    const sql = `SELECT product.*,AVG(review.reviewStar) AS reviewStar,COUNT(*) AS quanityReview FROM product LEFT JOIN review ON product.id=review.idProduct WHERE name LIKE "%${datasearch}%" GROUP BY product.id HAVING quanityReview`;
    db.query(sql,(err,rows)=>{
        if(err){
            return res.json({msg:err});
        }else{
            return res.json(rows)
        }
    })
}

