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
    comment: {
        content: String,
        written: Date,
        author: "student"
    },
    time: {
        weekday: Number,
        start: Number,
        end: Number
    },
    class: {
        time: Array("time"),
        lecture: ["lecture", "classes"],
        teacher: ["teacher", "classes"],
        students: [Array("student"), "classes"],
        assignments: Array("assignment")
    },
    lecture: {
        name: String,
        subject: ["subject", "lectures"],
        classes: [Array("class"), "lecture"]
    },
    student: {
        name: String,
        phone: String,
        email: String,
        code: String,
        classes: [Array("class"), "students"]
    },
    subject: {
        name: String,
        teachers: [Array("teacher"), "subject"],
        lectures: [Array("lecture"), "subject"]
    },
    teacher: {
        name: String,
        phone: String,
        email: String,
        subject: ["subject", "teachers"],
        classes: [Array("class"), "teacher"]
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

app.listen(4000);
