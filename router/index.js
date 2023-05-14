const authRouter = require('./auth-router');
const officeRouter = require('./office-router');
const userRouter = require('./user-router');
const activityRouter = require('./activity-router');
const votingRouter = require('./voting-router');

module.exports = [
	authRouter,
	officeRouter,
	userRouter,
	activityRouter,
	votingRouter,
];
