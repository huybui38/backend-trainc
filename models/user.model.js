const Joi = require("@hapi/joi");
const { ObjectId } = require("mongodb");

const { getDB } = require("../app/db");
const { compareHashingString, hashingString } = require("../helper/bcrypt.helper");

class User {
    _id;
    // role = {
    //     ADMIN: "admin",
    //     MENTOR: "mentor",
    //     STUDENT: "student",
    // };
    point;
    listExercise = [];
    listCourse = [];

    constructor({ mssv, password = "", name, role }) {
        this._mssv = mssv;
        this._password = password;
        this._name = name;
        this._role = role;
    }

    //---------------------Setter--Getter---------------------
    get _getUserDB() {
        return {
            mssv: this.mssv,
            password: this.password,
            name: this.name,
            role: this.role,
        };
    }

    set _mssv(value) {
        this.mssv = value.toLowerCase();
    }

    get _mssv() {
        return this.mssv.toUpperCase();
    }

    set _password(value) {
        this.password = value;
    }

    set _name(value) {
        this.name = value.toLowerCase();
    }

    get _name() {
        return this.name
            .split(" ")
            .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
            .join(" ");
    }

    set _role(value) {
        this.role = value;
    }

    //-------------static-method-------------------------------------------
    static async isUnique(field, value) {
        const isUnique = await this.getByField(field, value);
        if (!isUnique) return true;

        return false;
    }

    static async loginUser({ mssv, password }) {
        const isExist = await this.getByField("mssv", mssv);
        if (!isExist) return null;

        const isCorrect = await compareHashingString(password, isExist.password);
        if (!isCorrect) return null;

        return this.getClassById(isExist._id);
    }

    //-----------------------------validator-------------------------------
    static validator(field) {
        switch (field) {
            case "mssv":
                return Joi.string()
                    .min(8)
                    .regex(/^[a-zA-Z0-9]/)
                    .max(8)
                    .required();
            case "password":
                return Joi.string()
                    .min(5)
                    .max(255)
                    .regex(/^[a-zA-Z0-9]/)
                    .required();
            case "name":
                return Joi.string()
                    .regex(/^[a-zA-Z0-9]/)
                    .required();
            case "role":
                return Joi.string().valid("mentor", "student").required();
        }
    }

    static validateLogin(param) {
        const schema = Joi.object({
            mssv: this.validator("mssv"),
            password: this.validator("password"),
        });
        return schema.validate(param);
    }

    static validateCreate(param) {
        const schema = Joi.object({
            mssv: this.validator("mssv"),
            name: this.validator("name"),
            password: this.validator("password"),
            confirm: this.validator("password").valid(Joi.ref("password")),
            role: this.validator("role"),
        });
        return schema.validate(param);
    }

    //-----------------------Repository--method-----------------------------
    static async getClassById(_id) {
        const userInDB = await this.getByField("_id", new ObjectId(_id));
        if (!userInDB) return null;

        //get user instance
        const user = new User(userInDB);
        user._id = userInDB._id;
        user._mssv = userInDB._mssv;

        return user;
    }

    static async getByField(field, value) {
        return await getDB()
            .collection("user")
            .findOne({ [`${field}`]: value });
    }

    async createNewUser() {
        const user = this._getUserDB;
        user.password = await hashingString(user.password, 10);

        const userDB = await getDB().collection("user").insertOne(user);
        if (!userDB) return logger.error("Server error, Can't insert new User");

        return userDB;
    }
}

module.exports.User = User;
