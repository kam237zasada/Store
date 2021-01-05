const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 100
    },
    ID: {
        type: Number
    },
    dateCreated: {
        type: Number,
        default: Date.now()
    }
})

const User = mongoose.model("User", userSchema);

function validateUser(user) {
    
    //funkcje sprawdzające login

    if(user.login || user.login==='') {
        if(user.login.length<5) { throw `Długość loginu musi być pomiędzy 5 a 50 znaków`};
        if(user.login.length>50) { throw `Długość loginu musi być pomiędzy 5 a 50 znaków`};
        if(user.login.includes(' ')) { throw `Login nie może zawierać spacji`}
        if(!user.login.match(/^[a-z0-9]+$/i)) {throw `Login nie może zawierać żadnych znaków specjalnych`}
    }
    // funkcje sprawdzające email
    if(user.email || user.email==='') {
        if(!/^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i.test(user.email)) { throw 'Podaj poprawny adres e-mail'}
        if(user.email.includes(' ')) { throw `Email nie może zawierać spacji`}
        if(user.email==='') { throw `Musisz podać adres e-mail`}
    }
    

    //funkcja sprawdzająca hasło
    if(user.password || user.password==='') {
        if(user.password.length<8) { throw 'Hasło musi zawierać co najmniej 8 znaków'}
        if(user.password.includes(' ')) { throw 'Hasło nie może zawierać spacji'}
        if(!/\d/.test(user.password)) { throw `Hasło powinno zawierać co najmniej jedną liczbę, jedną małą i jedną dużą literę`}
        if(!/.*[a-z]/.test(user.password)) { throw `Hasło powinno zawierać co najmniej jedną liczbę, jedną małą i jedną dużą literę`}
        if(!/.*[A-Z]/.test(user.password)) { throw `Hasło powinno zawierać co najmniej jedną liczbę, jedną małą i jedną dużą literę`}
    }
    //funkcja sprawdzająca czy hasła są takie same
    if(user.confirmPassword || user.confirmPassword==='') {
        if(user.password!==user.confirmPassword) { throw `Hasła w polach 'hasło' i 'potwierdź hasło' muszą być identyczne`}
    }

    return user
}



exports.User = User;
exports.validateUser = validateUser;
