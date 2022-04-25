const jwt = require('jsonwebtoken')
const User = require('../models/User/User')

exports.isAuthorized = async (req, res, next) => {
    if(!req.headers.authorization){
        return res.json({
            code: 1,
            data: "Энэ үйлдлийг хийхэд таны эрх хүрэхгүй байна. Нэвтэрч орно уу."
        })
    }

    const token = req.headers.authorization.split(" ")[1];

    if(!token)
        return res.json({
            code: 1,
            data: 'Токен байхгүй байна.'
        })

    const tokenObj = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(tokenObj.id);

    next()
}