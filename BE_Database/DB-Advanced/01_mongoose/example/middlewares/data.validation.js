import createError from "http-errors";

//validate user data
export const validateUser = async (req, res, next) => {
  const { firstname, lastname, password, email } = req.body;
  const validationErrors = [];

  //check required fields
  if (!firstname || !lastname || !password || !email) {
    return next(createError(400, "Required fields are missed. 🚨"));
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
