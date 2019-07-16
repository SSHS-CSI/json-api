const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const Express = require("express");
const fortuneHTTP = require("fortune-http");
const jsonApiSerializer = require("fortune-json-api");

const store = require("./store.js");

const jsonApiListener = fortuneHTTP(store, {
    serializers: [ [ jsonApiSerializer, { prefix: "api" } ] ]
});

const httpListener = fortuneHTTP(store);

const app = new Express();
app.use("/api", jsonApiListener);
app.use(httpListener);

app.listen(4000);
