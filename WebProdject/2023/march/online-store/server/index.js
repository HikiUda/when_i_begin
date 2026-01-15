require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const path = require('path');
const fileUpload = require('express-fileupload');
const models = require('./models/model');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');

PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/api', router);

app.use(errorHandler);

const start = async () => {
   try {
      await sequelize.authenticate();
      await sequelize.sync();
      app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
   } catch (e) {
      console.log(e);
   }
};
start();
