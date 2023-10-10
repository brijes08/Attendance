const express = require('express');
const bcrypt = require("bcryptjs");
const authentications = require("../middleware/authenticate");
const router = express.Router();

require("../db/db");
const User = require('../model/schema');

router.get('/', (req, res) => {
    res.send("Home Page")
})

router.post('/students', async (req, res) => {
    const { id, inputName, inputEmail, inputAttendence, inputDate, inputTime, password } = req.body;

    if (!id || !inputName || !inputEmail || !inputAttendence || !inputDate || !inputTime || !password) {
        return res.status(422).json({ error: "Please Fill the field form" });
    }
    try {
        const userExist = await User.findOne({ inputEmail });
        if (userExist) {
            return res.status(422).send({ error: "Email Allready Exist" });
        } else {
            const user = new User({ id, inputName, inputEmail, inputAttendence, inputDate, inputTime, password });
            await user.save();
            res.status(201).json({ message: "User Registration Succesfull" });
        }

    } catch (err) {
        console.log(err);
    }
})

router.get('/students', async (req, res) => {
    try {
        const data = await User.find();
        res.send(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/students/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const datats = await User.findOne({ id });
        await User.deleteOne(datats._id)
        res.send("Deleted Data")
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

})

router.put('/students/:id', async (req, res) => {
    const { id } = req.params;
    const { inputName, inputEmail, inputAttendence } = req.body;
    try {
        const datats = await User.findOne({ id });
        await User.findByIdAndUpdate({ _id: datats._id }, { inputName, inputEmail, inputAttendence })
        res.status(201).json({ message: "User Updated" });
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

})


//Login Page
router.post('/login', async (req, res) => {
    try {
        let token;
        const { inputEmail, password } = req.body;
        if (!inputEmail || !password) {
            return res.status(400).json({ error: "Please fill The Data" });
        }
        if (inputEmail === 'brijes08@gmail.com' || password === 'brijes08') {
            res.status(201).send({message:'Admin is login' })
        } else {
            const userEmail = await User.findOne({inputEmail});
            if (userEmail) {
                const isMatch = await bcrypt.compare(password, userEmail.password);
                token = await userEmail.generateAuthToken();
                res.header("Access-Control-Allow-Origin", "http://localhost:3000");
                res.cookie("jwtToken", token, {
                    domain:"http://localhost:3000",
                    path:"/",
                    expires: new Date(Date.now() + 86400000),  //24Hour k bad apne aap Log Out ho jayega (86400000 Milliseconds, 86400 Second, 1440 Minut, 24 Hours)
                    sameSite:"none",
                    secure:true,
                    httpOnly: true,
                })

                if (!isMatch) {
                    return res.status(400).json({ err: "Invalid Detailes" });
                } else {
                   return res.status(200).send({ message: "Stuendt Login Successfull", token: token });
                }
            } else {
                return res.status(400).json({ err: "Invalid Detailes" });
            }
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;