const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDocument = require('./swagger.json');
const sol_generate_wallet = require('./src/routes/sol_generate_wallet')

app.use(cors())
app.use(cors({
  origin: ['*'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sol_wallet.html'));
});

app.get('/sol_address', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sol_address.html'));
});

app.use('/api', sol_generate_wallet);
const options = {
  definition: swaggerDocument,
  apis: ['./src/routes/*.js'], // Caminho para os arquivos com anotações Swagger
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const port = 3000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;