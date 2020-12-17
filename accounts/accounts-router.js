const express = require("express")
const db = require("../data/dbConfig")

const router = express.Router()

// get all accounts
router.get("/", async (req, res, next) => {
    try {
        // translates to `SELECT * FROM messages;`
        const accounts = await db.select("*").from("accounts")
        res.json(accounts)
    } catch (err) {
        next(err)
    }
})

// get account by ID
router.get("/:id", async (req, res, next) => {
    try {
        const [account] = await db("accounts").where("id", req.params.id).limit(1)
        res.json(account)
    } catch (err) {
        next(err)
    }
})

// post new account
router.post("/", async (req, res, next) => {
    try {
        const account = await db("accounts")
    } catch (err) {
        next(err)
    }
})

// update account

// delete account

module.exports = router