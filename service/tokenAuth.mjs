import { initializeApp } from "firebase/app";
import {
    getFirestore,
    getDoc,
    doc,
    collection,
    query,
    where,
} from "firebase/firestore";
import * as constants from "./constants.mjs";
import "dotenv/config";
import jwt from "jsonwebtoken";

const { sign, verify } = jwt;

const app = initializeApp(constants.firebaseConfig);
const db = getFirestore(app);

const register = async (object) => {
    var isExist = await isExists(username);
    if (isExist !== false) {
        return {
            code: "300",
            message: "User already existed!",
        };
    }

    try {
        const docRef = await addDoc(
            collection(db, constants.UserRepostiory),
            object.toJson(),
            object.username
        );
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        return "Error";
    }
};

const authorize = async (username, password) => {
    var user = await isExists(username);
    if (user === false) {
        return {
            code: "300",
            message: "no such document",
        };
    }

    console.log(user.data());

    const secret = process.env.JWT_SECRET;
    const payload = {
        user: user.id,
        role: user.data().role,
    };
    const options = { expiresIn: "2d" };

    const token = jwt.sign(payload, secret, options);

    return {
        code: "200",
        token: "Bearer " + token,
    };
};

const isExists = async (username) => {
    const docRef = doc(db, constants.UserRepostiory, username);
    const querySnapshot = await getDoc(docRef);
    if (querySnapshot.exists()) {
        return querySnapshot;
    } else {
        return false;
    }
};

export { authorize, register };
