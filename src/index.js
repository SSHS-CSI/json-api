const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const Express = require("express");
const fortune = require("fortune");
const fortuneHTTP = require("fortune-http");
const jsonApiSerializer = require("fortune-json-api");
const mongodbAdapter = require("fortune-mongodb");

const store = fortune({
    assignment: {
        title: String,
        content: String,
        written: Date,
        deadline: Date,
        author: "student",
        comments: Array("comment")
    },
    class: {
        times: Array(Number),
        lectures: Array("lecture"),
        teachers: Array("teacher"),
        students: Array("student"),
        assignments: Array("assignment")
    },
    comment: {
        content: String,
        written: Date,
        author: "student"
    },
    lecture: {
        name: String,
        teachers: Array("teacher"),
        classes: Array("class")
    },
    student: {
        name: String,
        phone: String,
        email: String,
        code: String,
        classes: Array("class")
    },
    subject: {
        name: String,
        teachers: Array("teacher"),
        lectures: Array("lecture")
    },
    teacher: {
        name: String,
        phone: String,
        email: String,
        subject: "subject",
        classes: Array("class")
    }
}, {
    adapter: [ mongodbAdapter, { url: `mongodb://${process.env.DB_USER}:${process.env.DB_PW}@ds149744.mlab.com:49744/csi-web-db` } ]
});

const jsonApiListener = fortuneHTTP(store, {
    serializers: [ [ jsonApiSerializer, { prefix: "api" } ] ]
});

const httpListener = fortuneHTTP(store);

const app = new Express();
app.use("/api", jsonApiListener);
app.use(httpListener);

app.listen(8000);