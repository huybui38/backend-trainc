const { User } = require("../models/User.model");

function getProfile() {
    return { code: 'se000000', name: 'Test', role: '0' }
}

function  getAllUsers() {
    return  [
              {
                active: true,
                point: 0,
                courses: [],
                groups: [],
                exercises: [],
                code: 'admin123',
                name: 'Admin',
                role: '2'
              },
              {
                active: true,
                point: 0,
                courses: [],
                groups: [],
                exercises: [],
                code: 'se000000',
                name: 'Test',
                role: '0'
              }
            ];
}

module.exports.getProfile = getProfile;
module.exports.getAllUsers = getAllUsers;