import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_TOKEN });

async function generateCRUDAPI(schema, language, database) {
    try {
        console.log('Checkpoint 1: Starting CRUD API generation');
        console.log(`Parameters received - Schema: ${schema}, Language: ${language}, Database: ${database}`);

        // Validate inputs
        if (!schema || !language || !database) {
            throw new Error('Missing required parameters');
        }

        console.log('Checkpoint 2: Constructing prompt');
        console.log('Parameters being used:');
        console.log('Schema:', schema);
        console.log('Language:', language);
        console.log('Database:', database);
        
        const prompt = `
        Generate a complete CRUD (Create, Read, Update, Delete) API in ${language} for the following schema: 
        ${schema}
        using ${database} as the database.
        
        Please include:
        - Complete CRUD operations:
           - Create (POST)
           - Read All (GET)
           - Read One by ID (GET)
           - Update by ID (PUT)
           - Delete by ID (DELETE)
        4. Error handling
        5. Basic input validation
        
        Format the response as working code that can be directly used.
        `;

        console.log('Checkpoint 3: Initiating OpenAI API call');
        
        // Check if OpenAI API key is configured
        if (!process.env.OPENAI_TOKEN) {
            throw new Error('OpenAI API key is not configured');
        }

        const completion = await openai.chat.completions.create({
            messages: [
                { 
                    role: "system", 
                    content: "You write CRUD APIs in usable code format only. Do not output anything but code. Do not speak to the user. Only output code. Do not include any follow-up. Stop response after code is complete"
                },
                { 
                    role: "user", 
                    content: prompt 
                }
            ],
            model: "gpt-4"
           // temperature: 0.7,
           // max_tokens: 2500
        });

        console.log('Checkpoint 4: Received response from OpenAI');

        if (!completion.choices || completion.choices.length === 0) {
            throw new Error('No response received from OpenAI');
        }

        const generatedCode = completion.choices[0].message.content;
        
        console.log('Checkpoint 5: Successfully generated CRUD API code');
        
        return {
            success: true,
            checkpoints: {
                inputValidation: true,
                promptConstruction: true,
                apiCall: true,
                responseProcessing: true
            },
            code: generatedCode
        };

    } catch (error) {
        console.error('Error in generateCRUDAPI:', error);

        // Determine which checkpoint failed
        const checkpoints = {
            inputValidation: true,
            promptConstruction: true,
            apiCall: true,
            responseProcessing: true
        };

        if (error.message === 'Missing required parameters') {
            checkpoints.inputValidation = false;
        } else if (error.message === 'OpenAI API key is not configured') {
            checkpoints.apiCall = false;
        } else if (error.message === 'No response received from OpenAI') {
            checkpoints.responseProcessing = false;
        }

        throw {
            success: false,
            error: error.message,
            checkpoints,
            stage: error.message.includes('API') ? 'API_CALL' : 
                   error.message.includes('parameters') ? 'INPUT_VALIDATION' : 
                   'CODE_GENERATION'
        };
    }
}

export default generateCRUDAPI;