const { AsyncCatch } = require("../../helpers/utils.helper");
const { Unauthorized } = require("../../helpers/errors.helper");
const { User } = require("../../models/User.model");
const { getUserToken } = require("../../helpers/jwt.helper");
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT);

module.exports = AsyncCatch(async (req, res, next) => {
    const { tokenId } = req.body;
    console.log(tokenId);
    client.verifyIdToken({ idToken: tokenId, audience: process.env.GOOGLE_CLIENT }).then(async (response) => {
        const { email_verified, name, email } = response.payload;
        console.log(response.payload);
        if (email_verified) {
            const user = await User.findOne({ email });
            if (!user) throw new Unauthorized("Email is not correct.");
            const token = getUserToken(user);

            if (process.env.NODE_ENV != "production") {
                res.cookie("token", token, { sameSite: "none" }).send("Login success."); //dev
            } else {
                // res.cookie("token", token, { sameSite: "none" }).send("Login success.");
                res.cookie("token", token, { sameSite: "none", secure: true }).send("Login success.");
            }
        }
    });
});
