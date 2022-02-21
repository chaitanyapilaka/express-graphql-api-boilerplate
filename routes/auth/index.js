const { Router } = require('@awaitjs/express');
const bodyParser = require('body-parser');
const multer = require('multer');
const router = Router();
const cookieParser = require('cookie-parser');

const { setTokenCookie,removeTokenCookie } = require('./../../lib/cookie');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(multer().array());
router.use(cookieParser());


const authService = require("./../../services/auth");

router.postAsync('/login', async (req,res) => {
    const {email} = req.body;
    const response = await authService.login(email);
    res.send(response);
});

router.getAsync('/login/callback', async (req,res) => {
    const {token} = req.query;
    const jwt = await authService.loginCallback(token);
    if(jwt){
        setTokenCookie(res,jwt);
    }
    res.redirect(302, process.env.DASHBOARD_URL);
});

router.getAsync('/validate',async (req,res) => {
    let accessToken = req.cookies[process.env.ACCESS_TOKEN_COOKIE_KEY];
    if(!accessToken){
       return res.send({
            valid: false
        })
    }

    let valid = await authService.validateAccessToken(accessToken);
    res.send({
        valid
    });
});


router.get('/hello', async (req,res) => {
    res.send(`${process.env.PROJECT_NAME}: Auth Service`);
});

module.exports = router;