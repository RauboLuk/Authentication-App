const app = require('./app')
const config = require('./utils/config')

const port = config.PORT || 3000;

app.listen(port, () => {
  console.log(`Authentication app listening at http://localhost:${port}`);
});