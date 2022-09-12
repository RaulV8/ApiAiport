const {Router} = require("express")
const router = Router()
const {createAirport, createLocation, getData,updateAirport,updateLocation, deleteAirport, getDataAirport, getDataLocation} = require("../controllers/controller");
const loginUser = require("../controllers/authenticationController")

router.post('/location',verifyToken, createLocation)
router.post('/airport',verifyToken, createAirport)
router.get('/data',verifyToken,getData)
router.get('/dataLocation',verifyToken,getDataLocation)
router.get('/dataAirport',verifyToken,getDataAirport)
router.put('/updateLocation/:id',verifyToken, updateLocation)
router.put('/updateAirport/:id',verifyToken, updateAirport)
router.patch('/deleteAirport/:id',verifyToken, deleteAirport)
router.post('/login',loginUser)

function verifyToken(req, res, next){
    const bearerHeader =  req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
         const bearerToken = bearerHeader.split(" ")[1];
         req.token  = bearerToken;
         next();
    }else{
        res.sendStatus(403);
    }
}

module.exports = router