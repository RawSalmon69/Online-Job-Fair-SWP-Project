const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const {xss} = require('express-xss-sanitizer');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

const companies = require('./routes/companies');
const auth = require('./routes/auth');
const appointments = require('./routes/appointments');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const app = express();

//env vars
dotenv.config({path:'./config/config.env'});
//body parser
app.use(express.json());
//use security headers
app.use(helmet());
//sanitize data
app.use(mongoSanitize());
//xss sanitizer
app.use(xss());
//rate limiting
const limiter = rateLimit({
    windowMs: 10*60*1000, //10mins
    max: 300
});
app.use(limiter);
//prevent http param pollution
app.use(hpp());
//enable cors
app.use(cors());
//cookie parser
app.use(cookieParser());
//routing
app.use('/api/v1/companies', companies);
app.use('/api/v1/auth', auth);
app.use('/api/v1/appointments', appointments);

//swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Online Job Fair API',
            version: '1.0.0',
            description: 'A simple Express Online Job Fair API'
        },
        servers: [
            {
                url: 'http://localhost:5000/api/v1'
            }
        ]
    },
    apis: ['./routes/*.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//port
const PORT = process.env.PORT || 5000;

connectDB();
const server = app.listen(PORT, console.log('Online Job Fair server running in ', process.env.NODE_ENV, ' mode on port ', PORT));

//handle unhandled promise rejections
process.on('unhandledRejection', (err,promise) => {
    console.log(`Error: ${err.message}`);
    //close server & ecit process
    server.close(() => process.exit(1));
})