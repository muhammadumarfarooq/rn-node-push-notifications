const Express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");

const serviceAccount = require("./firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const tokens = ['fgqa-baERZy4Z_Bi312Z2j:APA91bF56TONyrkPjGQektlPssjg1Cm5z6WbvtbASdbKcJyINzZE4FWKaAiSPsDNLPdj7UD7zm7nzPdR-gDIkMmhtaPx07HGjjL8Rr-PtUZo4iQPPD_cnZv53fJLJIxSWgf6bKI3Wytf'];

const app = new Express();
const router = Express.Router();

app.use(bodyParser.json());
app.use("/", router);

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});

router.post("/register", (req, res) => {
    tokens.push(req.body.token);
    res.status(200).json({ message: "Successfully registered FCM Token!" });
});

router.get("/notifications", async (req, res) => {
    try {
        await admin.messaging().sendMulticast({
            tokens,
            notification: {
                title: 'Node js Notification',
                body: 'Notification is generated from server',
            },
        });
        res.status(200).json({ message: "Successfully sent notifications!" });
    } catch (err) {
        res
            .status(err.status || 500)
            .json({ message: err.message || "Something went wrong!" });
    }
});