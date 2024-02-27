const functions = require("firebase-functions");
const admin = require("firebase-admin");

const cors = require("cors")({ origin: true });

// initialize the admin firebase
admin.initializeApp();

// initialize the db instance
const db = admin.firestore();

// function to validate the user JWT token
exports.validateUserJwtToken = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    // Get the JWT token from the Authorization header
    const authorizationHeader = req.headers["authorization"];

    // Check if the token is present
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res.status(403).json({ error: "Unauthorized checking token" });
    }

    const token = authorizationHeader.split("Bearer ")[1];

    // Verify the JWT token
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);

      if (decodedToken) {
        const docRef = db.collection("users").doc(decodedToken.uid);
        const doc = await docRef.get();

        if (!doc.exists) {
          const userRef = db.collection("users").doc(decodedToken.uid);
          await userRef.set(decodedToken);
        }

        // Token is valid, return success
        res.status(200).json({ message: "Token is valid", user: decodedToken });
      }
    } catch (error) {
      // Token verification failed, return error
      console.error("Error verifying token:", error);
      res.status(403).json({ error: "Unauthorized decoding token" });
    }
  });
});

