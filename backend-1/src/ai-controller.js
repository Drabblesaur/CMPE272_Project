import testcall from './aitasks/test-api.js';
import generateCRUDAPI from './aitasks/schema-to-api.js';
import generateCustom from './aitasks/custom-schema.js';

const responseSchema = {
    response: {
        200: {
            properties: {
                message: { type: 'string' }
            },
            required: ['message']
        }
    }
};

const aiController = (fastify, options, done) => {

    
    fastify.get('/', { schema: responseSchema }, (req, reply) => {
        return {
            message: process.env.OPENAI_API_KEY
        };
    });

    fastify.get('/generateCRUD', async (request, reply) => {
        const { schema, language, database } = request.query;

        console.log('Received request with parameters:', { schema, language, database });

        if (!schema || !language || !database) {
            return reply.status(400).send({ 
                success: false,
                error: 'Missing required parameters: schema, language, database',
                checkpoints: {
                    inputValidation: false,
                    promptConstruction: false,
                    apiCall: false,
                    responseProcessing: false
                }
            });
        }

        try {
            const result = await generateCRUDAPI(schema, language, database);
            return result;
        } catch (error) {
            console.error('Error in /generateCRUD endpoint:', error);
            
            return reply.status(500).send({ 
                success: false,
                error: error.message || 'Failed to generate CRUD API code',
                checkpoints: error.checkpoints || {
                    inputValidation: true,
                    promptConstruction: false,
                    apiCall: false,
                    responseProcessing: false
                },
                stage: error.stage || 'UNKNOWN'
            });
        }
    });


    fastify.post('/generateCustom', async (request, reply) => {
        const { schema, language, database } = request.query;
        const {userInput} = request.body;
        console.log("USERINPUT",userInput);
        if (!schema || !language || !database) {
            return reply.status(400).send({ 
                success: false,
                error: 'Missing required parameters: schema, language, database',
                checkpoints: {
                    inputValidation: false,
                    promptConstruction: false,
                    apiCall: false,
                    responseProcessing: false
                }
            });
        }

        try {
            const result = await generateCustom(schema, language, database, userInput);
            return result;
        } catch (error) {
            console.error('Error in /generateCRUD endpoint:', error);
            
            return reply.status(500).send({ 
                success: false,
                error: error.message || 'Failed to generate CRUD API code',
                checkpoints: error.checkpoints || {
                    inputValidation: true,
                    promptConstruction: false,
                    apiCall: false,
                    responseProcessing: false
                },
                stage: error.stage || 'UNKNOWN'
            });
        }
    });


    // Test call to OpenAI API
    fastify.get('/testcall', async function() {
        const result = await testcall();
        return {
            result
        };
    });


    done();
};

export default aiController;