require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sneakersRouter = require('./routers/sneakersRouter');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(express.json());
app.use(
   cors({
      origin: process.env.CLIENT_URL,
   }),
);
app.use('/api', sneakersRouter);
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

const start = () => {
   try {
      app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
   } catch (e) {
      console.log(e);
   }
};

start();
