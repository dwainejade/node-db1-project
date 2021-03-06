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
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        }

        const [newAccount] = await db.insert(payload).into("accounts")
        const account = await db("accounts").where("id", newAccount).first()
        res.json(account)
    } catch (err) {
        next(err)
    }
})

// update account
router.put("/:id", async (req, res, next) => {
    try {
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        }
        await db("accounts").where("id", req.params.id).update(payload)

        const account = await db("accounts").where("id", req.params.id).first()
        res.json(account)

    } catch (err) {
        next()
    }
})

// delete account
router.delete("/:id", async (req, res, next) => {
    try {
        await db("accounts").where("id", req.params.id).del()
        res.json({
            message: `We erased account ${req.params.id} from the books`
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router