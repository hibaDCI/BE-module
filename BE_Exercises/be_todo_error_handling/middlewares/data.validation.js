import createError from "http-errors";

//validate user data
export const validateUser = async (req, res, next) => {
  const { fullname, username, password, email } = req.body;
  const validationErrors = [];

  //check required fields
  if (!fullname || !username || !password || !email) {
    return next(createError(400, "Required fields are missed. 🚨"));
  }


  //validate fullname
  const fullname_regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  if (!fullname_regex.test(fullname)) {
    validationErrors.push({
      pattern: "fullname",
      message: "Please use a valid fullname. e.g John Doe",
    });
  }

  //validate username
  const username_regex = /^[a-zA-Z0-9_]{3,20}$/;
  if (!username_regex.test(username)) {
    validationErrors.push({
      pattern: "username",
      message:
        "Please provide a username with 3-20 chars. (including letters and numbers)",
    });
  }

  //validate password
  const password_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  if (!password_regex.test(password)) {
    validationErrors.push({
      pattern: "password",
      message:
        "Password should be at least 8 chars, one lowercase, one uppercase, one digit and one special character (!@#$%^&*)",
    });
  }
    
    //validate email
    const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email_regex.test(email)) {
        validationErrors.push({
            pattern: "email",
            message: "Please provide a valid email!"
        })
    }

    req.validationErrors = validationErrors;
    next()
};
