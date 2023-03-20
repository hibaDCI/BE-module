import { db } from '../server.js';

export const register = async (req, res) => {
    let newUser = req.body;
    // newUser.id = db.data.users[db.data.users.length - 1]?.id + 1 || 1;
    if (db.data.users.length) {
        newUser.id = db.data.users[db.data.users.length - 1].id + 1;
    } else {
        newUser.id = 1;
    }

    db.data.users.push(newUser);
    await db.write();
    res.json({
        message: "successfully registered",
        new_user: newUser
    })
}