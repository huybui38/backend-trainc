const Joi = require("@hapi/joi");
const { getDB } = require("../app/db");

class Course {
    _id;
    listClass = [];
    listExercise = [];
    constructor({ courseName }) {
        this._courseName = courseName;
    }

    //----------------------------Setter -- Getter--------------------

    get _getCourseDB() {
        return {
            courseName: this.courseName,
            listClass: this.listClass,
            listExercise: this.listExercise,
        };
    }

    set _courseName(value) {
        this.courseName = value.toLowerCase();
    }

    get _courseName() {
        return this.courseName;
    }

    //---------------------------validator---------------------------
    static validator(field) {
        switch (field) {
            case "courseName":
                return Joi.string()
                    .trim()
                    .lowercase()
                    .regex(/^[a-zA-Z ]/)
                    .required();
        }
    }

    static validateCreate(param) {
        const schema = Joi.object({
            courseName: this.validator("courseName"),
        });
        return schema.validate(param);
    }

    //-----------------------Repository--method-----------------------------

    async createNewCourse() {
        const course = this._getCourseDB;

        const courseDB = await getDB().collection("course").insertOne(course);
        if (!courseDB) return logger.error("Server error, Can't insert new Course");

        return courseDB;
    }
}

module.exports.Course = Course;
