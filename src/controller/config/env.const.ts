const dotenv = require('dotenv');
dotenv.config();

export default {
	DISABLE_AUTH: process.env.DISABLE_AUTH,
}