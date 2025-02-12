import express from "express";
import { initializeApp } from "firebase/app";
import {
    addDocument,
    fetchDocumentById,
    updateDocument,
    fetchAllDocuments,
} from "../service/firebaseHelper.mjs";

import { getFirestore, setDoc, doc } from "firebase/firestore";
import * as constants from "../utils/constants.mjs";

const app = initializeApp(constants.firebaseConfig);
const db = getFirestore(app);

const router = express.Router();
const collectionRef = "Category";

router.get("/", async (req, res) => {
    const categories = [];
    const snapshots = await fetchAllDocuments(collectionRef);
    for (let i = 0; i < snapshots.length; i++) {
        categories.push({
            id: snapshots[i].id,
            addedBy: snapshots[i].data()["addedBy"],
        });
    }
    res.status(200).json(categories);
});

router.delete("/", async (req, res) => {
    if (!req.query.id) {
        res.status(300).send({
            message: "No id was provided",
        });
    } else {
        const respond = await deleteDocument(collectionRef, req.query.id);
        console.log("Comment deleted, ID: " + req.query.id);
        res.status(respond.code).send({
            message: respond.message,
        });
    }
});

router.put("/", async (req, res) => {
    if (!req.body.id) {
        res.status(300).send({
            message: "No id was provided",
        });
    } else {
        const name = req.body.name;
        const adder = req.body.adder;
        await updateDocument(collectionRef, req.body.id, {
            name: name,
            adder: adder,
        });
        res.status(200);
    }
});

router.post("/", async (req, res) => {
    const name = req.body.name;
    const adder = req.body.adder;
    await setDoc(doc(db, collectionRef, name), {
        addedBy: adder,
    });
    res.status(200);
});

export default router;
