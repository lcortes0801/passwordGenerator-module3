// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


var boolAnswers = "(Enter Y, y, Yes, yes for yes, N, n, No, no for no)";
var yesNoAnswers = ['Y', 'YES', 'N', 'NO'];
var lowercase = "abcdefghijklmnopqrstuvwxyz";
var uppercase = lowercase.toUpperCase();
var numbers = "0123456789";
var specialCharacters = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
var alphabet = {
    'lower':lowercase,
    'upper':uppercase,
    'numbers':numbers,
    'special':specialCharacters
}

function generatePassword(){
    var len = getPasswordLength();
    if (len === null)
        return "";

    var hasLower = getLowerCaseOption();
    if(hasLower === null)
        return "";
    hasLower = yesNoAnswers.indexOf(hasLower.toUpperCase()) < 2;

    var hasUpper = getUpperCaseOption();
    if(hasUpper === null)
        return "";
    hasUpper = yesNoAnswers.indexOf(hasUpper.toUpperCase()) < 2;

    var hasNumbers = getNumberOption();
    if(hasNumbers === null)
        return "";
    hasNumbers = yesNoAnswers.indexOf(hasNumbers.toUpperCase()) < 2;

    var hasSpecial = getSpecialCharactersOption();
    if(hasSpecial === null)
        return "";
    hasSpecial = yesNoAnswers.indexOf(hasSpecial.toUpperCase()) < 2;

    if(!hasLower && !hasUpper && !hasNumbers && !hasSpecial){
        alert('You will need at least one type of character');
        return "";
    }

    options = [];
    if(hasLower===true)options.push('lower');
    if(hasUpper===true)options.push('upper');
    if(hasNumbers===true)options.push('numbers');
    if(hasSpecial===true)options.push('special');

    return createPassword(len, options);
}

function promptOption(promptText, condition){
    var result;
    do {
        result = window.prompt(promptText);
    } while(result !== null && !condition(result));
    return result;
}

function getPasswordLength(){
    return promptOption("Enter password length (minimum: 8, maximum: 128)", 
    (x)=>{
        return isInteger(x) && x >= 8 && x <= 128
    });
}

function isInteger(n){
    if(n === undefined || n === null)
    return false;
    if(n.toString().length === 0)
        return false;
    for(d of n)
        if(d < '0' || d > '9')
        return false;
    return true;
}

function getLowerCaseOption(){
    return getYesNoOption('lowercase');
}

function getUpperCaseOption(){
    return getYesNoOption('uppercase');
}

function getNumberOption(){
    return getYesNoOption('numbers');
}

function getSpecialCharactersOption(){
    return getYesNoOption('special caracters');
}

function getYesNoOption(option){
    return promptOption(`Include ${option}? ${boolAnswers} `, 
    (x)=>{
        return isYesNo(x)
    });
}

function isYesNo(x){
    return x !== undefined && x !== null && yesNoAnswers.includes(x.toUpperCase());
}

function createPassword(len, options){
    passwordChars = Array(Number(len));
    for(opt of options){
        let idx = getNextAvailableIndex(passwordChars);
        passwordChars[idx] = getRandomCharacter(alphabet, [opt])
    }
    
    let combinedAlphabet = "";
    for(opt of options)
        combinedAlphabet += alphabet[opt];

    for(let i = 0; i < len; ++i){
        if(passwordChars[i] === undefined)
        passwordChars[i] = getRandomCharacter(combinedAlphabet);
    }
    return passwordChars.join('');
}

function getRandomInt(max){
    return Math.floor(Math.random() * max);
}

function getNextAvailableIndex(a){
    let n = a.length;
    var idx = getRandomInt(n);
    while (a[idx] !== undefined)
        idx = (idx + 1) % n;
    return idx;
}

function getRandomCharacter(al){
    return al[getRandomInt(al.length)]
}
