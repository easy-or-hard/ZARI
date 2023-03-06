import swaggerUi from "swagger-ui-express"
import swaggerJsdoc from "swagger-jsdoc"

const options = {
    swaggerDefinition: {
        info: {
            title: 'Test API',
            version: '1.0.0',
            description: 'Test API with express',
        },
        host: 'localhost:3300',
        basePath: '/'
    },
    apis: ['./routes/*.js', './swagger/*']
};

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    specs
};