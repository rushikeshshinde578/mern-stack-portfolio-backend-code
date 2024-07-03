import express from "express"; //import express
import dotenv  from "dotenv"; //import dotenv
import cors from "cors"; //import cors
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dbConnection from "./database/dbConnection.js";
import {errorMiddleware} from "./middlewares/error.js"
import messageRouter from "./router/messageRoutes.js";
import userRouter from "./router/userRoutes.js";
import timelineRouter from "./router/timelineRoutes.js";
import applicationRouter from "./router/softwareApplicationRoutes.js";
import skillRouter from "./router/skillRoutes.js";
import projectRouter from "./router/projectRoutes.js";



const app = express(); //create an instance of express
dotenv.config({ path: "./config/config.env" }); //load the .env file

// console.log(process.env.PORT)

//for connecting frontend and backend use middleware called cors
app.use(cors({
    origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"], //allow all methods
    credentials: true, //allow cookies
}));

//One more middleware
app.use(cookieParser());
app.use(express.json());   // for parse the data
app.use(express.urlencoded({ extended: true }));

//used to get the files from frontend
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/timeline", timelineRouter);
app.use("/api/v1/softwareapplication", applicationRouter);
app.use("/api/v1/skill", skillRouter);
app.use("/api/v1/project", projectRouter);



dbConnection();
app.use(errorMiddleware);

export  default app; //export the app instance
