const express = require('express')
const { getUserLandingPage, getStudentsInfo, saveFile, getAuthInfo, postAuthInfo, getAuthSignIn, postAuthSignIn, getNodeMailer } = require('../controllers/user.controller')
const router = express.Router()


router.get("/", getUserLandingPage)

router.get("/auth", getAuthInfo)

router.get("/signIn", getAuthSignIn)

router.post("/auth", postAuthInfo)

router.post("/signIn", postAuthSignIn)

router.post("/student", getStudentsInfo)

router.post("/cloud", saveFile)

router.get("/mail", getNodeMailer)

module.exports = router