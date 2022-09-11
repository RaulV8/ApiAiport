const {Router} = require("express")
const router = Router()
const {createAirport, createLocation} = require("../controllers/controller");

router.post('/location', createLocation)
router.post('/aiport', createAirport)

module.exports = router