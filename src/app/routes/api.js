/**
 * @todo implement a new pattern of json responses
 * @todo resolve the eslint's alerts
 */

const router = global.router;
const checkBodyAndQuery = global.checkBodyAndQuery;
const check = global.check;
const validationResult = global.validationResult;

let ScraperController = require('../controllers/ScraperController');
let ScraperControllerInstance = new ScraperController();

router.get('/products', function(req, res) {
    ScraperControllerInstance.search(req, res);
});

module.exports = router;