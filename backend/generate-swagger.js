import fs from "fs";
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "simple API",
      version: "1.0.0",
      description: "simple API with Swagger",
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: ["./server.js"],
};

// Generate spec
const swaggerSpec = swaggerJSDoc(options);

// Ensure folder exists
const outputDir = path.join(process.cwd(), "swagger-dist");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Save swagger.json
fs.writeFileSync(
  path.join(outputDir, "swagger.json"),
  JSON.stringify(swaggerSpec, null, 2)
);

console.log("Swagger file generated at backend/swagger-dist/swagger.json");
