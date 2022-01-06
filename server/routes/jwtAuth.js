const router = require("express").Router();

const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validReginfo = require("../middleware/validRegInfo");
const authorization = require("../middleware/authorization");

//register
router.post("/register", validReginfo, async(req,res) => {
    try {

        //destructure - json parser
        const {name, email, password} = req.body;

        //check if the user exist
        const user = await pool.query("SELECT * FROM public.morpheus_users WHERE user_email = $1",[email]);

        if(user.rows.length !== 0) {
            return res.status(401).send("user already exist");

        }

        //if not exist then bcrypt the user
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptpassword = await bcrypt.hash(password, salt);

        //insert new user into DB
        const newUser = await pool.query(
            "INSERT INTO public.morpheus_users (user_name, user_email, user_password) VALUES($1, $2, $3) RETURNING *",[name, email, bcryptpassword]
            );
        
        //return inserted data using RETURNING * in the query
        //res.json(newUser.rows[0]);

        //generate jwt token
        const token = jwtGenerator(newUser.rows[0].user_email);
        res.json({token});


        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

//login route
router.post("/login", validReginfo, async (req,res) => {
    try {

        //destructure - json parser
        const {email, password} = req.body;

        //check if the user exist
        const user = await pool.query("SELECT * FROM public.morpheus_users WHERE user_email = $1",[email]);
        if(user.rows.length === 0) {
            return res.status(401).send("user doesnt exist");

        }

        //password validation
        const validPassword = await bcrypt.compare(password,user.rows[0].user_password);
        if(!validPassword)
        {
            return res.status(400).send("email or password is not correct");
        }

        //generate jwt token
        const token = jwtGenerator(user.rows[0].user_email);
        res.json({token});
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

//verify
router.post("/verify", authorization, async(req,res) => {
    try {
        res.json(true);
        
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
        
    }
});

module.exports = router;