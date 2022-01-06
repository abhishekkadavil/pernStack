const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/user-dashboard", authorization, async(req, res) => {
    try {
        
        const user = await pool.query(
            "SELECT user_name FROM public.morpheus_users WHERE user_email = $1",
            [req.user] 
          );
          res.json(user.rows[0]); 
        
    } catch (err) {
        console.error(err);
        res.status(500).json("Server error");
    }
});

module.exports = router;