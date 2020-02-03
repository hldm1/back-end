const app = require('./app');
const { initialize } = require('./utils/initialization');

const port = process.env.PORT || 8005;

app.listen(port, () => console.log(`server listening on port: ${port}`));

//Initialize app, by fetching clients and policies data and hydrating keys
const clientsUrl = 'http://www.mocky.io/v2/5808862710000087232b75ac';
const policiesUrl = 'http://www.mocky.io/v2/580891a4100000e8242b75c5';

initialize(clientsUrl, policiesUrl);
