const Joi = require("@hapi/joi");
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const logger = require("morgan");
const { getDB } = require("../app/db");
const { compareHashingString, hashingString } = require("../helpers/bcrypt.helper");

const UserRoleEnum = {
    ADMIN: "2",
    MENTOR: "1",
    STUDENT: "0",
};

class User {
    _id;
    point = 0;
    listExercise = [];
    listCourse = [];
    listClass = [];
    active = true;

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
            point: this.point,
            listExercise: this.listExercise,
            listCourse: this.listCourse,
            listClass: this.listClass,
            active: this.active,
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

    get _role() {
        return this.role;
    }

    //-------------static-method-------------------------------------------

    static getToken({ _id, role, mssv }) {
        const token = jwt.sign({ _id, role, mssv }, process.env.JWT_SECRET_KEY);
        return token;
    }

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

    static async updateUser({ mssv, role, active }) {
        const isExist = await this.getByField("mssv", mssv);
        if (!isExist) return null;

        const user = await this.getClassById(isExist._id);
        await user.updateByField("active", active);
        return await user.updateByField("role", role);
    }

    //-----------------------------validator-------------------------------
    static validator(field) {
        switch (field) {
            case "mssv":
                return Joi.string().min(8).alphanum().trim().lowercase().max(8).required();
            case "password":
                return Joi.string()
                    .min(5)
                    .max(255)
                    .trim()
                    .regex(/^[a-zA-Z0-9]/)
                    .required();
            case "name":
                return Joi.string()
                    .regex(/^[a-zA-Z ]/)
                    .trim()
                    .lowercase()
                    .required();
            case "role":
                return Joi.string().valid(UserRoleEnum.MENTOR, UserRoleEnum.STUDENT).required();
            case "point":
                return Joi.string()
                    .regex(/^[0-9]/)
                    .trim()
                    .required();
            case "active":
                return Joi.boolean().required();
        }
    }

    static validateLogin(param) {
        const schema = Joi.object({
            mssv: this.validator("mssv"),
            password: this.validator("password"),
        });
        return schema.validate(param);
    }

    static validateAdminCreate(param) {
        const schema = Joi.object({
            mssv: this.validator("mssv"),
            name: this.validator("name"),
            password: this.validator("password"),
            confirm: this.validator("password").valid(Joi.ref("password")),
            role: this.validator("role"),
        });
        return schema.validate(param);
    }

    static validateAdminUpdate(param) {
        const schema = Joi.object({
            mssv: this.validator("mssv"),
            role: this.validator("role"),
            active: this.validator("active"),
        });
        return schema.validate(param);
    }

    static validateChangePassword(param) {
        const schema = Joi.object({
            currentPassword: this.validator("password"),
            newPassword: this.validator("password"),
            confirm: this.validator("password").valid(Joi.ref("newPassword")),
        });
        return schema.validate(param);
    }

    static validateChangeName(param) {
        const schema = Joi.object({
            name: this.validator("name"),
            password: this.validator("password"),
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
        return user;
    }

    static async getByField(field, value) {
        return await getDB()
            .collection("user")
            .findOne({ [`${field}`]: value });
    }

    async updateByField(field, value) {
        const user = await getDB()
            .collection("user")
            .updateOne({ _id: new ObjectId(this._id) }, { $set: { [`${field}`]: value } });
        if (!user) {
            logger.error("Server error during updating user");
            return null;
        }

        return user;
    }

    async createNewUser() {
        const user = this._getUserDB;
        user.password = await hashingString(user.password, 10);

        const userDB = await getDB().collection("user").insertOne(user);
        if (!userDB) return logger.error("Server error, Can't insert new User");

        return userDB;
    }

    //---------------------Class-method------------------------------------

    async changePassword({ currentPassword, newPassword }) {
        const isCorrect = await compareHashingString(currentPassword, this.password);
        if (!isCorrect) return null;

        const newHashingPassword = await hashingString(newPassword, 10);
        return await this.updateByField("password", newHashingPassword);
    }

    async changeName({ password, name }) {
        const isCorrect = await compareHashingString(password, this.password);
        if (!isCorrect) return null;
        return await this.updateByField("name", name);
    }
}

module.exports.User = User;
