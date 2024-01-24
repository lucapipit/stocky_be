
const signinAuth = (req, res, next) => {
    const { companyName, email, pssw, country, address, city, zipCode, phone, manufacturer, dealer } = req.body;
    const validEmail = () => { return email.includes("@") };
    const numbers = ["+", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    const validPhone = () => { return numbers.some(i=>phone.includes(i)) };
    const validZipCode = () => { return numbers.some(i=>zipCode.includes(i)) };
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
    if (!validZipCode()) {
        errors.push("insert a correct zip code! ")
    }
    if (!validPhone()) {
        errors.push("insert a correct phone number! ")
    }
    if (errors.length > 0) {
        res.status(401).json({ message: errors, statusCode: 401 })
    }
    else {
        next()
    }
}
export default signinAuth;