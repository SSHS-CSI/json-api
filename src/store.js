const fortune = require("fortune");
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
        times: Array("time"),
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

module.exports = store;
