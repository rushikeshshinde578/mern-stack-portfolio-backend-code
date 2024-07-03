class ErrorHandler extends Error{
    constructor(message,statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.ststusCode || 500;

        if(err.code === 11000){
           const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
           err = new ErrorHandler(message, 400); 
        }

        if(err.name === "JsonWebTokenError") {
            const message = `Json Web Token Is Invalid. Try Again!`;
            err = new ErrorHandler(message, 400);
        }

        if(err.name === "TokenExpiredError") {
            const message = `Json Web Token in Expired. Try To Login!`;
            err = new ErrorHandler(message, 400);
        }

        if(err.name === "CasteError") {
            const message = `Invalid ${err.path}`;
            err = new ErrorHandler(message, 400);
        }
        //used to know about the error
        //console.log(err);

        const errorMessage = err.errors 
            ? Object.values(err.errors)
                .map((error) => error.message)
                .join(" ") 
            : err.message;

        return res.status(err.statusCode).json({
            success: false,
            message: errorMessage,
        });
};

export default ErrorHandler;