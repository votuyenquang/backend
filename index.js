const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT || 300;
const morgan = require('morgan');
const dbConnect = require('./config/dbConnect');
const route = require('./Routes');
const bodyParser = require('body-parser');
// const { notFound, errorHandler } = require('./middelwares/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');



dbConnect.connect(function(err) {
    if (err) throw err;
       console.log("Connected!");
});
app.use(cors());
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(cookieParser());

route(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
