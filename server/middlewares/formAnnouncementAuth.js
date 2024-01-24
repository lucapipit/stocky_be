const formAnnouncementAuth = (req, res, next) => {
    const {
        brandName,
        manufacturerName,
        modelName,
        productSize,
        description,
        techDetail,
        pics,
        category,
        price,
        quantity,
        expireDate,
        textFocus,
        picsFocus,
        views,
        posClick,
        negClick} = req.body;
    const errors = [];

    if (typeof brandName !== "string") {
        errors.push("brand name must be a string! ")
}
    if (typeof manufacturerName !== "string") {
        errors.push("manufacturer name must be a string! ")
    }
    if (typeof modelName !== "string") {
        errors.push("model name must be a string! ")
    }
    if (typeof productSize !== "string") {
        errors.push("product size must be a string! ")
    }
    if (typeof description !== "string") {
        errors.push("description must be a string! ")
    }
    if (typeof techDetail !== "string") {
        errors.push("tech detail must be a string! ")
    }
    if (typeof pics !== "string") {
        errors.push("pics must be a string! ")
    }
    if (typeof category !== "string") {
        errors.push("category must be a string! ")
    }
    if (typeof price !== "number" || isNaN(price)) {
        errors.push("price must be a number! ")
    }
    if (typeof quantity !== "number"|| isNaN(quantity)) {
   errors.push("quantity must be valid  number!");
    }
    if (typeof expireDate !== "object" || !(expireDate instanceof Date)) {
        errors.push("expire date must be a date! ")
    }
    if (typeof textFocus !== "string") {
        errors.push("text focus must be a string! ")
    }
    if (typeof picsFocus !== "string") {
        errors.push("pics focus must be a string! ")
    }
    if (typeof views !== "string") {
        errors.push("views must be a string! ")
    }
    if (typeof posClick !== "string") {
        errors.push("pos click must be a string! ")
    }
    if (typeof negClick !== "string") {
        errors.push("neg click must be a string! ")
    }
    if(errors.length > 0){
        res.status(401).json({ message: errors, statusCode: 401 })
    }
    else{
        next()
    }
}
export default formAnnouncementAuth;



// const validateString = (value, fieldName) => {
//     if (typeof value !== "string") {
//         return `${fieldName} must be a string!`;
//     }
//     return null;
// };

// const formAnnouncementAuth = (req, res, next) => {
//     const {
//         brandName,
//         manufacturerName,
//         modelName,
//         productSize,
//         description,
//         techDetail,
//         pics,
//         category,
//         price,
//         quantity,
//         expireDate,
//         textFocus,
//         picsFocus,
//         views,
//         posClick,
//         negClick
//     } = req.body;
//     const errors = [];

//     errors.push(validateString(brandName, "brand name"));
//     errors.push(validateString(manufacturerName, "manufacturer name"));
//     errors.push(validateString(modelName, "model name"));
//     errors.push(validateString(productSize, "product size"));
//     errors.push(validateString(description, "description"));
//     errors.push(validateString(techDetail, "tech detail"));
//     errors.push(validateString(pics, "pics"));
//     errors.push(validateString(category, "category"));
//     errors.push(validateString(price, "price"));
//     errors.push(validateString(quantity, "quantity"));
//     errors.push(validateString(expireDate, "expire date"));
//     errors.push(validateString(textFocus, "text focus"));
//     errors.push(validateString(picsFocus, "pics focus"));
//     errors.push(validateString(views, "views"));
//     errors.push(validateString(posClick, "pos click"));
//     errors.push(validateString(negClick, "neg click"));

//     const filteredErrors = errors.filter(error => error !== null);

//     if (filteredErrors.length > 0) {
//         res.status(401).json({ message: filteredErrors, statusCode: 401 });
//     } else {
//         next();
//     }
// };



