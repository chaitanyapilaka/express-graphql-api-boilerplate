const { Router } = require('@awaitjs/express');
const bodyParser = require('body-parser');
const multer = require('multer');
const router = Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(multer().array());


router.get('/hello', async (req,res) => {
    res.send(`${process.env.PROJECT_NAME}: Webhook Service`);
});


module.exports = router;