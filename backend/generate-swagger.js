import fs from "fs";
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiDist from "swagger-ui-dist";

const __dirname = path.resolve();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Simple API",
      version: "1.0.0",
    },
  },
  apis: ["./backend/server.js"],
};

const swaggerSpec = swaggerJSDoc(options);

// create folder
const outputDir = path.join(__dirname, "backend/swagger-dist");
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

// write swagger.json
fs.writeFileSync(path.join(outputDir, "swagger.json"), JSON.stringify(swaggerSpec, null, 2));

// copy swagger-ui-dist files
const swaggerUiPath = swaggerUiDist.getAbsoluteFSPath();

fs.readdirSync(swaggerUiPath).forEach(file => {
  fs.copyFileSync(
    path.join(swaggerUiPath, file),
    path.join(outputDir, file)
  );
});

// modify index.html
let index = fs.readFileSync(path.join(outputDir, "index.html"), "utf8");
index = index.replace("https://petstore.swagger.io/v2/swagger.json", "./swagger.json");
fs.writeFileSync(path.join(outputDir, "index.html"), index);

console.log("Swagger UI static site generated successfully!");
