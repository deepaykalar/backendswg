import fs from "fs";
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiDist from "swagger-ui-dist";

// Always work relative to backend folder
const backendDir = process.cwd(); 
const outputDir = path.join(backendDir, "swagger-dist");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Simple API",
      version: "1.0.0",
    },
  },
  apis: ["./server.js"], // server.js is inside backend
};

const swaggerSpec = swaggerJSDoc(options);

// Create folder if not exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write swagger.json
fs.writeFileSync(
  path.join(outputDir, "swagger.json"),
  JSON.stringify(swaggerSpec, null, 2)
);

// Copy Swagger UI files
const swaggerUiPath = swaggerUiDist.getAbsoluteFSPath();

fs.readdirSync(swaggerUiPath).forEach((file) => {
  fs.copyFileSync(
    path.join(swaggerUiPath, file),
    path.join(outputDir, file)
  );
});

// Fix index.html to load your swagger.json
let indexHtml = fs.readFileSync(path.join(outputDir, "index.html"), "utf8");
indexHtml = indexHtml.replace(
  "https://petstore.swagger.io/v2/swagger.json",
  "./swagger.json"
);
fs.writeFileSync(path.join(outputDir, "index.html"), indexHtml);

console.log("Swagger UI static files generated successfully!");
