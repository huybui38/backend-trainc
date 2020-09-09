const {AsyncCatch }= require("../../helpers/utils.helper")
const {DefaultError,BadRequest, STATUS_CODE} = require("../../helpers/errors.helper");

const updateUser = AsyncCatch(async (req, res, next) =>{
    console.log(req.params.user_id);
    //todo find id and update, read more at https://mongoosejs.com/docs/queries.html

    // throw new DefaultError('Message'); //Message with default status code
    // throw new DefaultError('Message' , STATUS_CODE.UNAUTHORIZED); //Message with specific status code
    // throw new BadRequest('Message');  //specific error instance

    res.send('hello world');
})

module.exports = updateUser;