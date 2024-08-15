import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
    userID: {
        type: String,
        require: true
    },

    date: {
        type: Date,
        default: Date.now()
    },  

    challenge: {
        type: String,
        require: true
    },

    solving: {
        type: String,
        require: true
    },

    moments: {
        type: String,
        require: true
    },

    gratitude: {
        type: String,
        require: true
    },

    smile: {
        type: String,
        require: true
    },

    madeSmile: {
        type: String, 
        require: true
    }
});

const JournalEntry = mongoose.model("entries", entrySchema);
export default JournalEntry;