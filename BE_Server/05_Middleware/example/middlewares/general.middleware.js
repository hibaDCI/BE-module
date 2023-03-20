

// first middleware
export const print_get_request = (req, res, next) => {
    console.log(`The server received a request with Method: ${req.method} URL: ${req.url} Original_URL:${req.originalUrl}`);
    
    next();
}


export const first_MW = (req, res, next) => {
    console.log('first Middleware!');
    //check the username and pass
    let isUserAuthenticated = false;
    
    if (isUserAuthenticated) {
        
        next();
    } else {
        res.status(403).send('You are not authenticated 🤨')
    }
    
}

export const second_MW = (req, res, next) => {
    console.log('second Middleware!');
    console.log('is user authenticated:', req.isUserAuthenticated);
    next()
}