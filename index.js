import app from './app.js'

const port = process.envPORT || 4001;

app.listen(port, () => console.log(`App running @ http//localhost:${port}`));
 