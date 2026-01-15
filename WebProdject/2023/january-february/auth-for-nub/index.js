const express = require('express');
const authRouter = require('./routers/authRouter');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use('/auth', authRouter);

const startServer = () => {
   try {
      app.listen(PORT, () => {
         console.log(`Server started on port ${PORT}`);
      });
   } catch (e) {
      console.log(e);
   }
};

startServer();
