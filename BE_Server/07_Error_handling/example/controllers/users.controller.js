import { db } from "../server.js";

//REGISTER
export const addUser = async (req, res, next) => {
  const newUser = { ...req.body, id: db.data.users.slice(-1)[0]?.id + 1 || 1 };
  //check required fields
  if (!newUser.username || !newUser.password) {
    return res.status(400).json({ message: "required fields are missed! 🚨" });
  }

  //add newUser to array of users in db
  db.data.users.push(newUser);
  await db.write();
  //remove password from newUser for security
  delete newUser.password;
  res.status(200).json({ message: "successful regsiter! ✅", user: newUser });
};
/* ---------------------------------------------------------------- */

//PROFILE
export const getUser = async (req, res, next) => {
  const userid = parseInt(req.params.uid);

  //check if uid is valid
  if (isNaN(userid)) {
    return res.status(400).json({ message: "userid in url is not valid. 🚨" });
  }

  //find user with given uid
  const user = db.data.users.find((u) => u.id === userid);
  if (!user) {
    return res
      .status(404)
      .json({ message: "There is no user with given userid. 🚨" });
  }

  res.status(200).json({ message: "user fetched! ✅", user: user });
};
/* ---------------------------------------------------------------- */

//UPDATE PROFILE
export const updateUser = async (req, res, next) => {
  const userid = parseInt(req.params.uid);

  //check if uid is valid
  if (isNaN(userid)) {
    return res.status(400).json({ message: "userid in url is not valid. 🚨" });
  }

  //find user with given uid
  const userIndex = db.data.users.findIndex((u) => u.id === userid);
  if (userIndex === -1) {
    return res
      .status(404)
      .json({ message: "There is no user with given userid. 🚨" });
  }

  //update user
  db.data.users[userIndex] = { ...db.data.users[userIndex], ...req.body };
  await db.write();
  res
    .status(200)
    .json({ message: "successful update! ✅", user: db.data.users[userIndex] });
};
/* ---------------------------------------------------------------- */

//DELETE PROFILE
export const deleteUser = async (req, res, next) => {
  const userid = parseInt(req.params.uid);
  //check if uid is valid
  if (isNaN(userid)) {
    return res.status(400).json({ message: "userid in url is not valid. 🚨" });
  }

  //find user with given uid
  const userIndex = db.data.users.findIndex((u) => u.id === userid);
  if (userIndex === -1) {
    return res
      .status(404)
      .json({ message: "There is no user with given userid. 🚨" });
  }

  //delete user from array users
  db.data.users.splice(userIndex, 1);
  await db.write();
  res.status(200).json({ message: "User deleted! ✅" });
};
/* ---------------------------------------------------------------- */

//LOGIN
export const login = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide username and password! 🚨" });
  }

  const user = db.data.users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    return res
      .status(404)
      .json({ message: "There is no user with given credentials. 🚨" });
  }

  delete user.password;
  res.status(200).json({ message: "login success! ✅", user: user });
};
