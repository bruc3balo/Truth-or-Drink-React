
export function usernameHasError(username) {
    let min = 3
    let max = 16

    if(!username) return "Username cannot be empty"
    if(!isOfLength({string: username, min: min, max: max})) return `Username to be between ${min} and ${max} characters`;
    if(hasWhiteSpace(username)) return "Whitespaces not allowed in username"
    return null;
}
export function passwordHasError(password) {
    let min = 6;
    let max = 16;

    let blacklist = ["password"]

    if(!password) return "Password cannot be empty"
    if(blacklist.includes(password)) return "Password is too common, You can do better";
    if(!isOfLength({string: password, min: min, max: max})) return `Password to be between ${min} and ${max} characters`;
    if(!hasUpperCase(password)) return "Password needs to have at least 1 uppercase character";
    if(!hasLowerCase(password)) return "Password needs to have at least 1 lowercase character";
    if(hasWhiteSpace(password)) return "Whitespace not allowed in password";
    if(!hasSpecialCharacter(password)) return "Password requires one special character";
    if(!hasDigit(password)) return "Password requires one digit";
    return null;
}
export function gamerTagHasError(gamerTag) {
    if(!gamerTag) return "Gamer tag required";
    return null;
}
export function emailHasError(email, {skip}) {
    if(skip && !email) return null
    if(!email) return "Email cannot be empty"
    if(!email.includes("@")) return "Invalid email"
    if(!hasAlphabetCharacters(email)) return "Must container alphabetical characters"
    if(email.length < 5) return "Email is too short"
    return null
}
export function maxNoOfDrinksHasError(drinks) {
    if(!drinks || isNumber(drinks)) return "Enter a number"
    if(drinks < 1) return "Enter a number more than 0 or uncheck limitations"
    return null
}

function isOfLength({string, min, max}) {
    let l = string.length
    return min <= l && l <= max;
}
function hasUpperCase(string) {
    let regExp = /[A-Z]/
    return regExp.test(string)
}
function hasLowerCase(string) {
    let regExp = /[a-z]/
    return regExp.test(string)
}
function hasWhiteSpace(string) {
    let regExp = /\s/g
    return regExp.test(string)
}
function hasSpecialCharacter(string) {
    let regExp = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/
    return regExp.test(string)
}

// eslint-disable-next-line no-unused-vars
function hasAlphabetCharacters(string) {
    return hasUpperCase(string) || hasLowerCase(string)
}
function hasDigit (string) {
    let regExp = /\d/
    return regExp.test(string)
}

function isNumber(string) {
    return /^[0-9]$/.test(string);
}




