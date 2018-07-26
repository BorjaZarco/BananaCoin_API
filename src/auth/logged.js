token = [ "_gc38zyk80" ]

const checkLogged = (req, res, next) => {
    const logged = req.headers['authorization']
    if (logged){
        if (!token.includes(logged)) {
            return res.status(403).json(makeResponseError(401, "You dont have a valid token (Authentication Error)"));
        }
        next()
    } else {
        return res.status(403).json(makeResponseError(401, "You need to send valid token (Authentication Error)"));
    }
 }

function makeResponseError(error) {
    return {
        status: "Forbidden",
        error: error
    }
}
 
 module.exports = checkLogged