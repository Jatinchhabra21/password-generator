const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];
const password1El = document.getElementById("password-1");
const password2El = document.getElementById("password-2");
const lowercase = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const uppercase = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const specialChars = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];
const labelEl = document.getElementById("length");
const sliderEl = document.getElementById("length-slider");
const numberCheckBoxEl = document.getElementById("number-checkbox");
const symbolCheckBoxEl = document.getElementById("symbol-checkbox");

function generatePasswords() {
    let chars = [...uppercase, ...lowercase];
    if(numberCheckBoxEl.checked) {
        chars = [...chars, ...nums];
    }
    if(symbolCheckBoxEl.checked) {
        chars = [...chars, ...specialChars];
    }
    const length = sliderEl.value;
    let password1 = "";
    let password2 = "";
    for(let i=0; i<length; i++) {
        let randomIndex1 = Math.floor(Math.random() * chars.length);
        let randomIndex2 = Math.floor(Math.random() * chars.length);

        password1 += chars[randomIndex1];
        password2 += chars[randomIndex2];
    }

    if(!validatePassword(password1) || !validatePassword(password2)) {
        generatePasswords();
    }

    password1El.textContent = password1;
    password2El.textContent = password2;
}

function validatePassword(password) {
    let containsLowercase = false;
    let containsUppercase = false;
    let containsDigit = false;
    let containsSpecialChar = false; 
    if(numberCheckBoxEl.checked) {
        containsDigit = false;
    }
    else {
        containsDigit = true;
    }
    if(symbolCheckBoxEl.checked) {
        containsSpecialChar = false;
    }
    else {
        containsSpecialChar = true;
    } 
    for (let i=0; i<password.length; i++) {
        if (lowercase.includes(password[i]))
            containsLowercase = true;
        else if(uppercase.includes(password[i]))
            containsUppercase = true;
        else if(nums.includes(password[i]))
            containsDigit = true;
        else if(specialChars.includes(password[i]))
            containsSpecialChar = true;
    }
    return containsDigit && containsLowercase && containsSpecialChar && containsUppercase? true : false;
}

function copyToClipboard(num) {
    const passwordEl = document.getElementById("password-"+num);
    navigator.clipboard.writeText(passwordEl.textContent);
    console.log("Copied password to clipboard");
    const messageEl = document.getElementById("message");
    messageEl.textContent = "Copied to clipboard!";
    setTimeout(function () {
        messageEl.textContent = "";
    },1000)
}

sliderEl.addEventListener("input", event => {
    labelEl.textContent = sliderEl.value;
});