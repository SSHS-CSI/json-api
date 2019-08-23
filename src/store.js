const fortune = require("fortune");
const mongodbAdapter = require("fortune-mongodb");

const Times = function (times) {
    return Array.isArray(times) &&
        times.reduce((acc, time) => acc || time &&
                     Number.isInteger(time.weekday) &&
                     time.weekday >= 1 && time.weekday <= 5 &&
                     Number.isInteger(time.start) &&
                     time.start >= 1 && time.start <= 6 &&
                     Number.isInteger(time.end) &&
                     time.end >= 1 && time.end <= 6);
}

Times.prototype = new Object();

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
    class: {
        times: Times,
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
