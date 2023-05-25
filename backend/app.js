const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const errorMiddleware = require('./middlewares/error');
const cors=require('cors')

const app = express();

// config
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: 'backend/config/config.env' });
}
app.use(express.json({  limit: '50mb' }))
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(fileUpload());

app.use(cors())
 
const user = require('./routes/userRoute');
const product = require('./routes/productRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');
const message=require('./routes/messageRoute')
const tender = require('./routes/tenderRoutes');

app.use('/api/v1', user);
app.use('/api/v1', product);
app.use('/api/v1', order); 
app.use('/api/v1', payment);
app.use('/api/v1',message);
app.use('/api/v1',tender);

// if (process.env.NODE_ENV == 'production') {
//     app.use(express.static('frontend/build'));
//     app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, '../frontend', 'build','index.html')));
//   }else{
    app.get('/', (req, res) => {
        res.send('Server is Running! 🚀');
    });
  // }

 
//}

// error middleware
app.use(errorMiddleware);

module.exports = app;
