const { User } = require("../models/User.model");

function getProfile() {
    return { code: 'se000000', name: 'Student', role: '0' }
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
                code: 'mentor00',
                name: 'Mentor',
                role: '1'
              },
              {
                active: true,
                point: 0,
                courses: [],
                groups: [],
                exercises: [],
                code: 'se000000',
                name: 'Student',
                role: '0'
              }
            ];
}

module.exports.getProfile = getProfile;
module.exports.getAllUsers = getAllUsers;