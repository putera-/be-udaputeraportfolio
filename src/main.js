import { app } from "./application/app.js";
// import { logger } from "./application/logging";

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    // logger.info("App start");
    console.log('Server Running at http://localhost:' + PORT);
});