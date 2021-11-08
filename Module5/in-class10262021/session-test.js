// Middleware functions for testing the session

module.exports = {
    // Function to log a count of requests in a session
    LogCount: (req, res, next) => {
        if(req.session.requestCount) {
            req.session.requestCount++;
            console.log(`You have sent ${req.session.requestCount} requests to the app during this session.`); 
        } else {
            req.session.requestCount = 1;
            console.log("This is your first request to the app in this session");
        }
        next();
    },

    LogData: (req, res, next) => {
        console.log("Session Id: ", req.session.id);
        console.log("Session Data: ", req.session);
        next();
    },

    Destroy: (req, res, next) => {
        if(req.session.requestCount === 5) {
            req.session.destroy();
            console.log("Session Destroyed!!");
        }
        next();
    }
}