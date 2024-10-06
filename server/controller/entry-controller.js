import express from "express";
import JournalEntry from "../models/entry-model.js";

const newEntry = async (req, res, next) => {
    try {
        const {userID, challenge, solving, moments, gratitude, smile, madeSmile} = req.body;
        const newEntry = await JournalEntry.create({userID, challenge, solving, moments, gratitude, smile, madeSmile});
        res.status(200).json({msg: "Journal Entry Created", entry: newEntry});
    }
    catch (err) {
        const status = 401;
        const message = "Error Creating Entry";
        const errorDetails = {
            message,
            status
        }
        next(errorDetails);
    }
}

const getEntries = async (req, res, next) => {
    try {
        const {userID} = req.body;
        const reversedOutput = await JournalEntry.find({userID});
        const output = reversedOutput.reverse();
        res.status(200).json({msg: "All Entries Returned", allEntries: output});
    }
    catch (err) {
        const status = 401;
        const message = "Error Fetching User Entries";
        const errorDetails = {
            message,
            status
        }
        next(errorDetails);
    }
}

const delEntry = async (req, res, next) => {
    try {
        const {entryID} = req.body;
        const output = await JournalEntry.deleteOne({_id: entryID});
        res.status(200).json({msg: "Successfully Deleted"});
    }
    catch (err) {
        const status = 401;
        const message = "Error Deleting Entry";
        const errorDetails = {
            message,
            status
        }
        next(errorDetails);
    }
}

export {newEntry, getEntries, delEntry};