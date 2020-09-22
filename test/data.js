const { User } = require("../models/User.model");

function getProfile() {
    return { code: 'se000000', name: 'Student', role: '0' }
}

function  getAllUsers() {
    return  [
      {
        active: true,
        code: 'admin123',
        name: 'Admin',
        role: '2'
      },
      {
        active: true,
        code: 'mentor00',
        name: 'Mentor',
        role: '1'
      },
      {
        active: true,
        code: 'se000000',
        name: 'Student',
        role: '0'
      }
            ];
}

function getAllCourses(params) {
  return [
    {
      active: true,
      createdTime: '',
      _id: '',
      name: 'learning c'
    }
  ]  
}

module.exports.getProfile = getProfile;
module.exports.getAllUsers = getAllUsers;
module.exports.getAllCourses = getAllCourses;