const router = require('express-promise-router');
const artService = require('../../services/art');
const validateUser = require('../users/validateUser');
const checkCardId = require('../cards/checkCardId');
const checkUserId = require('../users/checkUserId');
const checkArtId = require('../art/checkArtId');
const { acceptFile, interpretFile } = require('../../services/acceptImage');

const artRouter = router(); //mounted to '/art'. 

//Anyone...
//...can retrieve all art info
artRouter.get('/', (req, res, next) => {
    try {
        
    } catch (error) {
        console.warn('error occured when getting art info');
        next(error);
    }
});

//...can retrieve art info by info ID
artRouter.get('/:artID', checkArtId, (req, res, next) => {
    try {
        
    } catch (error) {
        console.warn('error occured when getting art info');
        next(error);
    }
});

//...can retrieve all art info by card ID
artRouter.get('/cards/:cardID', checkCardId, (req, res, next) => {
    try {
        
    } catch (error) {
        console.warn('error occured when getting art info');
        next(error);
    }
});

//...can retrieve all art info by artist ID
artRouter.get('/users/:userID', checkUserId, (req, res, next) => {
    try {
        
    } catch (error) {
        console.warn('error occured when getting art info');
        next(error);
    }
});

//...can retrieve all art info by card ID *and* artist ID
artRouter.get('/cards/:cardID/users/:userID', checkCardId, checkUserId, (req, res, next) => {
    try {
        
    } catch (error) {
        console.warn('error occured when getting art info');
        next(error);
    }
});

//Users...
//...can submit a new art piece
artRouter.post('/', validateUser, acceptFile.single('submission'), interpretFile, (req, res, next) => {
    try {
        if (!req.body.cardID) {
            res.status(401).send();
        }
        const art = await artService.create(req.body.cardID, req.user.id, req.file);
        if (art) {
            res.status(201).send(art);
        } else {
            console.warn('error occured when processing art');
            next(new Error());
        }
    } catch (error) {
        console.warn('error occured when submitting art');
        next(error);
    }
});

//Art owners...
//...can delete an art piece by ID
artRouter.delete('/:artID', validateUser, checkArtId, (req, res, next) => {
    try {
        
    } catch (error) {
        console.warn('error occured when deleting art');
        next(error);
    }
});

module.exports = artRouter;