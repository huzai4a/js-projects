function filesPayloadExists(req, res, next) {
    if (!req.files){
        return res.status(400).json({status:'error', message:'Missing files'});
    }

    // if there is files
    next();
}

module.exports = filesPayloadExists;
