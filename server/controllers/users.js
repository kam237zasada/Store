const { User, validateUser } = require('../models/user');
const { setID } = require('../js/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateTokens } = require('./auth')

getUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    if(!user) {return res.status(404).send("Brak takiego użytkownika")};

    res.send(user);
};

getUsers = async (req, res) => {
    const users = await User.find().select('-password').sort('dateCreated');

    if(users.length<1) {return res.status(404).send("Brak użytkowników")};

    res.send(users);
};

addUser = async (req, res) => {
    try {
        validateUser(req.body)
    } catch(err) {
        return res.status(400).send(err)
    }

    let loginRegistered = await User.findOne({login: req.body.login});
    if(loginRegistered) {return res.status(400).send("Użytkownik o takim loginie już istnieje, podaj inny!")};

    let emailRegistered = await User.findOne({email: req.body.email});
    if(emailRegistered) {return res.status(400).send("Użytkownik o takim adresie email już istnieje, podaj inny!")};
    let users = await User.find();
    let ID = setID(users);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
        login: req.body.login,
        email: req.body.email,
        password: hashedPassword,
        ID: ID
    });

    try {
        await newUser.save();
        res.send({
            message: "Nowy użytkownik dodany.",
            login: newUser.login,
            email: newUser.email,
            ID: newUser.ID,
            _id: newUser._id
        });
    
    } catch (error) { res.status(500).send("Coś poszło nie tak");}

}

signInUser = async (req, res) => {
    const user = await User.findOne({login: req.body.login});
    if(!user) { return res.status(400).send("Podany email lub hasło są niepoprawne.")};

    const checkPassword = await bcrypt.compare(req.body.password, user.password);
    if(!checkPassword) { return res.status(400).send("Podany email lub hasło są niepoprawne.")};
    let tokens = generateTokens(req, user);

    res.send({
        message: `Cześć ${user.login}, zostałeś poprawnie zalogowany!`,
        login: user.login,
        email: user.email,
        _id: user._id,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
    })

}

updatePassword = async (req, res) => {

    let encoded = jwt.decode(req.headers.token)

    let user = await User.findById(encoded.sub);
    if(!user) { return res.status(404).send("Nie ma takiego użytkownika")}

    const password = await bcrypt.compare(req.body.currentPassword, user.password);
    if(!password) return res.status(400).send("Aktualne hasło jest niepoprawne.");

    try {
        validateUser(req.body)
    } catch(err) {
        return res.status(400).send(err)
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user.set({
        password: hashedPassword
    });

    try {
        await user.save();
        res.send({
            message: "Hasło zaktualizowane."
        });
    } catch (error) { res.status(500).send("Coś poszło nie tak"); }
}

updateUser = async (req, res) => {

    let encoded = jwt.decode(req.headers.token)

    let user = await User.findById(encoded.sub);
    if(!user) { return res.status(404).send("Nie ma takiego użytkownika")}

    try {
        validateUser(req.body)
    } catch(err) {
        return res.status(400).send(err)
    }

    const login = await User.findOne({login: req.body.login});
    if(login && login._id != encoded.sub) { return res.status(400).send("Istnieje już użytkownik o takim loginie, proszę podać inny.")};
    
    const email = await User.findOne({email: req.body.email});
    if(email && email._id != encoded.sub) { return res.status(400).send("Istnieje już użytkownik o takim adresie email, proszę podać inny.")};

    const password = await bcrypt.compare(req.body.password, user.password);
    if(!password) return res.status(400).send("Błędne dane autoryzacji. Użytkownik nie został zaktualizowany.");

    user.set({
        login: req.body.login,
        email: req.body.email
    });

    try {
        await user.save();
        res.send({
            login: user.login,
            email: user.email,
            message: "Dane poprawnie zaktualizowane."
        });
    } catch (error) { res.status(500).send("Coś poszło nie tak"); }
};

module.exports = {
    getUser,
    getUsers,
    addUser,
    signInUser,
    updatePassword,
    updateUser
}




