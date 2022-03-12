
class Routes {
    constructor(app) {
        this.app = app;
    }

    appRoutes() {
        this.app.use('/settings', require("./settings"));
        this.app.use('/auth', require('./auth'));
        this.app.use("/link",require("./link"));
        this.app.use("/user",require("./user"));
        this.app.use("/referral",require("./referral"))
        this.app.use("/appearance",require("./appearance"))
    }

    routesConfig() {
        this.appRoutes();
    }
}

module.exports = Routes;