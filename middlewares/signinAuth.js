
const SinginAuth = (req, res, next) => {
    const { companyName, email, pssw, country, address, city, zipCode, phone, manufacturer, dealer } = req.body;
    const validEmail = () => { return email.includes("@") };
    const errors = [];

    if (typeof email !== "string" || !validEmail()) {
        errors.push("email is not valid! ")
    }
    if (pssw.length < 7) {
        errors.push("password must be longer than 6 characters! ")
    }

    if (typeof companyName !== "string") {
        errors.push("company name must be a string! ")
    }
    if (typeof country !== "string") {
        errors.push("country must be a string! ")
    }
    if (typeof address !== "string") {
        errors.push("address must be a string! ")
    }
    if (typeof city !== "string") {
        errors.push("city must be a string! ")
    }
    if (typeof zipCode !== "integer") {
        errors.push("zip code must be a integer! ")
    }
    if (typeof phone !== "string") {
        errors.push("phone must be a string! ")
    }
    // if (typeof manufacturer !== "tinyint") {
    //     errors.push("manufacturer must be a tinyint (0 or 1)")
    // }
    // if (typeof dealer !== "string") {
    //     errors.push("dealer must be a string! ")
    // }
    if (errors.length > 0) {
        res.status(401).json({ message: errors, statusCode: 401 })
    }
    else {
        next()
    }
}
export default SinginAuth;