import {db} from '../server.js'

/* ---------------------------------------------------------------- */
/*                        Register controller                       */
/* ---------------------------------------------------------------- */
export const register = async (req, res, next) => {

    let newUser = { ...req.body, id: db.data.users.slice(-1)[0]?.id || 1 }
    if (!newUser) {
        return res.status(400).json({message: 'there is no new user in req.body 😕'})
    }


    db.data.users.push(newUser);
    await db.write();
    //for security purpose, remove password 
    delete newUser.password;
    res.status(200).json({ message: 'registered successfully!', user: newUser });
}




/* ---------------------------------------------------------------- */
/*                         login controller                         */
/* ---------------------------------------------------------------- */
export const login = async (req, res, next) => {
    
    const { username, password } = req.body;
    if (!username || !password) {   //if username or password not provided
        return res
          .status(400)
          .json({
            message:
              "The request body does not contain a username or password field. 😕",
          });
    }


    const foundUser = db.data.users.find(u => u.username === username && u.password === password);
    delete foundUser.password;
    //if no user exist with given credentials
    if (!foundUser) {
        return res.status(401).json({ message: 'Invalid username or password 😠' });
    }
    //if username and password are matched
    res.status(200).json({ message: 'Login successful! 😃', user: foundUser });
}



/* ---------------------------------------------------------------- */
/*                       update user's profile                      */
/* ---------------------------------------------------------------- */
export const updateProfile = async (req, res, next) => {
    const userid = req.params.uid;

    let userIndex = db.data.users.findIndex((u) => u.id === parseInt(userid));
    if (userIndex === -1) {
        return res.status(404).json({message: 'user not found! 😠'})
    }

    db.data.users[userIndex] = { ...db.data.users[userIndex], ...req.body };
    await db.write();
    
    res.status.json({
        message: "profile update successful!",
        user: db.data.users[userIndex]
    });
}