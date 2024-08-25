import express from "express";
import JournalEntry from "../models/entry-model.js";

const newEntry = async (req, res) => {
    try {
        const {userID, challenge, solving, moments, gratitude, smile, madeSmile} = req.body;
        const newEntry = await JournalEntry.create({userID, challenge, solving, moments, gratitude, smile, madeSmile});
        res.status(200).json({msg: "Journal Entry Created", entry: newEntry});
    }
    catch (err) {
        const status = 401;
        const message = "User Token Does Not Exist";
        const extraDetails = err.errors[0].message.toString();
        const errorDetails = {
            message,
            status,
            extraDetails
        }
        next(errorDetails);
    }
}

const getEntries = async (req, res) => {
    try {
        const {userID} = req.body;
        const output = await JournalEntry.find({userID});
        res.status(200).json({msg: "All Entries Returned", allEntries: output});
    }
    catch (err) {
        const status = 401;
        const message = "User Token Does Not Exist";
        const extraDetails = err.errors[0].message.toString();
        const errorDetails = {
            message,
            status,
            extraDetails
        }
        next(errorDetails);
    }
}

const delEntry = async (req, res) => {
    try {
        const {entryID} = req.body;
        const output = await JournalEntry.deleteOne({_id: entryID});
        res.status(200).json({msg: "Successfully Deleted"});
    }
    catch (err) {
        const status = 401;
        const message = "User Token Does Not Exist";
        const extraDetails = err.errors[0].message.toString();
        const errorDetails = {
            message,
            status,
            extraDetails
        }
        next(errorDetails);
    }
}

export {newEntry, getEntries, delEntry};