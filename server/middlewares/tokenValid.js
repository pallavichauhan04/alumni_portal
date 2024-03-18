var jwt = require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
const JWT_KEY2=process.env.JWT_KEY2


const tokenValid = async (req, res, next) => {
    const token = await req.header('token');
    if (!token) {
        res.send("please have a valid token");
    }
    try {
        const data = jwt.verify(token, JWT_KEY2);
        req.alum = data.alum
        next();

    } catch (error) {
        return res.send("please have a valid token");
    }
}

module.exports=tokenValid