import { db } from './server.js';

//to get all users
export const getUsers = (req, res) => {
  console.log(db.data);
  res.send(db.data.users);
};


//to add new user
export const addNewUser = async (req, res) => {
  const newUser = req.body;
  db.data.users.push(newUser);
  await db.write();
  res.send(db.data.users);
};


//delete user
export const deleteUser = async (req, res) => {
  db.data.users = db.data.users.filter((u) => u.id != req.body.id);
  await db.write();
  res.send(db.data);
};


//update user
export const updateUser = async (req, res) => {
  //to read the parameter userid
  let userid = req.params.userid;
  //loop on users array
  //find the user with given userid
  //update it
  db.data.users = db.data.users.map((user) => {
    if (user.id == userid) {
      user.name = req.body.name;
    }
    return user;
  });

  await db.write();

  res.send(db.data.users);
};