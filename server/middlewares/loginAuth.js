
const loginAuth = (req, res, next) => {
    const { email, pssw } = req.body;
    const validEmail = () => { return email.includes("@") };
    const errors = [];

    if (typeof email !== "string" || !validEmail()) {
        errors.push("email is not valid! ")
    }
    if (pssw.length < 6) {
        
        errors.push("password must be longer than 6 characters! ")
    }
    if (errors.length > 0) {
        res.status(401).json({ message: errors, statusCode: 401 })
    } else {
        next()
    }
}
export default loginAuth
