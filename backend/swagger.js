import { version } from "os";
import { title } from "process";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";


//Swagger configuration
const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"simple API",
            version:"1.0.0",
            description:"simple API with Swagger",
        },
        servers:[{url:"http://localhost:5000"}],
       },
        apis:["./server.js"],

};

export const swaggerSpec = swaggerJSDoc(options);

export const swaggerUiServe=swaggerUi.serve;
export const swaggerUiSetup=swaggerUi.setup(swaggerSpec);
