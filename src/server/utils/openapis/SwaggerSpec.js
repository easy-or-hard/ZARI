import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';


export default class SwaggerSpec {
    static #instance;
    static #options = {
        encoding: 'utf8',
        failOnErrors: false,
        verbose: false,
        format: '.json',
        swaggerDefinition: {
            openapi: "3.0.0",
            info: {
                title: "ZARI API",
                version: "1.0.0",
                description: "A simple API to manage ZARI",
            },
            servers: [
                {
                    url: '/',
                },
            ],
        },
        definition: {}, // do not use this, instead use swaggerDefinition field
        apis: ["./src/server/MVC/**/*.js"]
    };

    #serve = swaggerUi.serve;
    #setup = swaggerUi.setup(swaggerJsdoc(this.constructor.#options));

    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;
    }

    get server() {return this.#serve;}

    get setup() { return this.#setup;}
}