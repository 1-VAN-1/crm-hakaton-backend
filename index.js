require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');
const routers = require('./router');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorMiddleware = require('./middleware/error-middleware');

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL || '';

const app = express();

app.use(express.json());
app.use(cookieParser());

routers.forEach((router) => {
	app.use('/api', router);
});

app.use(errorMiddleware);

const start = async () => {
	try {
		await mongoose.connect(DB_URL);
		app.listen(PORT, () => {
			console.log(`Server started on port ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
