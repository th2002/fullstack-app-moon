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
      let userData;
      const decodedToken = await admin.auth().verifyIdToken(token);

      if (decodedToken) {
        const docRef = db.collection("users").doc(decodedToken.uid);
        const doc = await docRef.get();

        // If the user doesn't exist in the firestore, add them
        if (!doc.exists) {
          const userRef = db.collection("users").doc(decodedToken.uid);

          userData = decodedToken;
          // Add the default role
          userData.role = "member";

          await userRef.set(userData);

          // Done - return success
          res.status(200).json({ message: "Token is valid", user: userData });
        } else {
          // Token is valid, return success
          res.status(200).json({ message: "Token is valid", user: doc.data() });
        }
      }
    } catch (error) {
      // Token verification failed, return error
      console.error("Error verifying token:", error);
      res.status(403).json({ error: "Unauthorized decoding token" });
    }
  });
});

// fucntion to save the app data on the cloud
exports.createNewApp = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const data = req.body;
      const docRef = db.collection("apps").doc(req.body._id);
      await docRef.set(data);

      // retrieve the data from the cloud
      const appDetail = await docRef.get();
      res.status(200).json({ _id: docRef.id, data: appDetail.data() });
    } catch (error) {
      res.status(402).send("Error creating new App: " + error.message);
    }
  });
});

// funtioc get all the apps from the cloud
exports.getAllApps = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const apps = [];

      // use onSnapShot to list for real-time changes
      const unsubscribe = db
        .collection("apps")
        .orderBy("timeStamp", "desc")
        .onSnapshot((snapShot) => {
          apps.length = 0; // clear the existing array

          snapShot.forEach((doc) => {
            apps.push(doc.data());
          });

          res.status(200).json(apps);
        });

      res.on("finish", unsubscribe);
    } catch (error) {
      res.status(402).send("Error getting Apps: " + error.message);
    }
  });
});

// function to delete an app from the cloud
exports.deleteAnApp = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { id } = req.query;

      if (!id) return res.status(400).json({ error: "App Id is missing!" });

      await db.collection("apps").doc(id).delete();
      res.status(200).json({ message: "App deleted successfully" });
    } catch (error) {
      res.status(402).send("Error deleting App: " + error.message);
    }
  });
});

// funtioc get all the users from the cloud
exports.getAllUsers = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const users = [];

      // use onSnapShot to list for real-time changes
      const unsubscribe = db.collection("users").onSnapshot((snapShot) => {
        users.length = 0; // clear the existing array

        snapShot.forEach((doc) => {
          users.push(doc.data());
        });

        res.status(200).json(users);
      });

      res.on("finish", unsubscribe);
    } catch (error) {
      res.status(402).send("Error getting Users: " + error.message);
    }
  });
});

// function to update the user role
exports.updateTheUserRole = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { _id, ...data } = req.body;

      if (!_id) return res.status(400).json({ error: "User Id is missing!" });

      await db.collection("users").doc(_id).update(data);
      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      res.status(402).send("Error getting Users: " + error.message);
    }
  });
});

