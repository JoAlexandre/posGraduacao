import app from './index.js';
const port_app = process.env.PORT_APP || 3002;


app.listen(port_app, async () => {
	// await db.sync({alter: true});
	console.log(`Api Desafio Final is running at ${port_app}!`);
});
