import swaggerJsdoc from "swagger-jsdoc";

const options = {
    swaggerDefinition: {
        info: {
            title: 'Test API',
            version: '1.0.0',
            description: 'Test API with express',
        },
        host: 'localhost',
        basePath: '/'
    },
    components: {
        res: {
            BadRequest: {
                description: '잘못된 요청.',
            },
            Forbidden: {
                description: '권한이 없음.',
            },
            NotFound: {
                description: '없는 리소스 요청.',
            }
        },
        errorResult: {
            Error: {
                type: 'object',
                properties: {
                    errMsg: {
                        type: 'string',
                        description: 'Error.'
                    }
                }
            }
        }
    },
    schemes: ['http', 'https'], // 사용 가능한 통신 방식
    apis: ['./routes/*', './swagger/*']
};

const specs = swaggerJsdoc(options);

export default specs;