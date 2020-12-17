const express = require("express")
const router = express.Router()

router.get("/", (req, res, next)=>{
    try {
		res.json({
			message: "Hey there!",
		})
	} catch (err) {
		next(err)
	}
})

module.exports = router