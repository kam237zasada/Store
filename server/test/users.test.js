const { validateUser, validateUserLogin, validateUserPassword } = require('../models/user');


describe('Login zawiera znak specjalny', () => {
        [
            {login: 'abcjjkljlkd?', email: 'login@wp.pl', password: 'Haslo123', confirmPassword: 'Haslo123'},
            {login: 'abcjjkljlkd!', email: 'login@wp.pl', password: 'Haslo123', confirmPassword: 'Haslo123'},
            {login: '!@#/*^%$^', email: 'login@wp.pl', password: 'Haslo123', confirmPassword: 'Haslo123'},

        ]
        .map(givenData => {
        test(givenData.login, () => {
            expect(() => validateUser(givenData)).toThrowError(`Login nie może zawierać żadnych znaków specjalnych`)
    })
        })
})

describe('Login zawiera spację', () => {
    [
        {login: '        ', email: 'login@wp.pl', password: 'Haslo123', confirmPassword: 'Haslo123'},
        {login: 'maciej nowak', email: 'login@wp.pl', password: 'Haslo123', confirmPassword: 'Haslo123'},
        {login: ' anna123', email: 'login@wp.pl', password: 'Haslo123', confirmPassword: 'Haslo123'},

    ]
    .map(givenData => {
    test(givenData.login, () => {
        expect(() => validateUser(givenData)).toThrowError(`Login nie może zawierać spacji`)
})
    })
})

describe('Zła długość loginu', () => {
    [
        {login: 'ancd', email: 'login@wp.pl', password: 'Haslo123', confirmPassword: 'Haslo123'},
        {login: 'aa', email: 'login@wp.pl', password: 'Haslo123', confirmPassword: 'Haslo123'},
        {login: '', email: 'login@wp.pl', password: 'Haslo123', confirmPassword: 'Haslo123'},
        {login: '012345678901234567890123456789012345678901234567890', email: 'login@wp.pl', password: 'Haslo123', confirmPassword: 'Haslo123'}

    ]
    .map(givenData => {
    test(givenData.login, () => {
        expect(() => validateUser(givenData)).toThrowError(`Długość loginu musi być pomiędzy 5 a 50 znaków`)
})
    })
})


describe('Zły mail', () => {
    [
        {login: 'login123', email: 'loginwp.pl', password: 'Haslo123', confirmPassword: 'Haslo123'},
        {login: 'login123', email: 'login@wppl', password: 'Haslo123', confirmPassword: 'Haslo123'},
        {login: 'Loginbezcyfr', email: 'loginwppl', password: 'Haslo123', confirmPassword: 'Haslo123'},
        {login: '12345678', email: 'login@wp.pl2', password: 'Haslo123', confirmPassword: 'Haslo123'},
        {login: '12345678', email: '-login@wp.pl2', password: 'Haslo123', confirmPassword: 'Haslo123'},
        {login: '12345678', email: 'l ogin@wp.pl2', password: 'Haslo123', confirmPassword: 'Haslo123'},
        {login: '12345678', email: 'logi@n@wp.pl2', password: 'Haslo123', confirmPassword: 'Haslo123'},
        {login: '12345678', email: 'login@wp.pl.2', password: 'Haslo123', confirmPassword: 'Haslo123'},
        {login: '12345678', email: 'lóąęgin@wp.pl.2', password: 'Haslo123', confirmPassword: 'Haslo123'}


    ]
    .map(givenData => {
    test(givenData.email, () => {
        expect(() => validateUser(givenData)).toThrowError(`Podaj poprawny adres e-mail`)
    })
    })
})

describe('Hasło za krótkie', () => {
    [
        {login: 'login123', email: 'login@wp.pl', password: 'Abc1234', confirmPassword: 'Abc1234'},
        {login: 'login123', email: 'login@wp.pl', password: '     ', confirmPassword: '     '},

    ]
    .map(givenData => {
    test(givenData.password, () => {
        expect(() => validateUser(givenData)).toThrowError(`Hasło musi zawierać co najmniej 8 znaków`)
    })
    })
})

describe('Hasło ze spacją', () => {
    [
        {login: 'login123', email: 'login@wp.pl', password: 'Abc12345 ', confirmPassword: 'Abc12345 '},
        {login: 'login123', email: 'login@wp.pl', password: '        ', confirmPassword: '        '},

    ]
    .map(givenData => {
    test(givenData.password, () => {
        expect(() => validateUser(givenData)).toThrowError(`Hasło nie może zawierać spacji`)
    })
    })
})

describe('Hasło bez conajmniej jednej dużej litery, jednaj małej litery i cyfry', () => {
    [
        {login: 'login123', email: 'login@wp.pl', password: 'haslo123', confirmPassword: 'haslo123'},
        {login: 'login123', email: 'login@wp.pl', password: 'Haslotrudne', confirmPassword: 'Haslotrudne'},
        {login: 'login123', email: 'login@wp.pl', password: 'haslotrudne', confirmPassword: 'haslotrudne'},
        {login: 'login123', email: 'login@wp.pl', password: 'HASŁO123', confirmPassword: 'HASŁO123'},


    ]
    .map(givenData => {
    test(givenData.password, () => {
        expect(() => validateUser(givenData)).toThrowError(`Hasło powinno zawierać co najmniej jedną liczbę, jedną małą i jedną dużą literę`)
    })
    })
})

describe('Hasło i potwierdź hasło', () => {
    [
        {login: 'login123', email: 'login@wp.pl', password: 'Abc123457', confirmPassword: 'Abc12346'},

    ]
    .map(givenData => {
    test(givenData.password, () => {
        expect(() => validateUser(givenData)).toThrowError(`Hasła w polach 'hasło' i 'potwierdź hasło' muszą być identyczne`)
    })
    })
})

describe('Niepełne poprawne dane', () => {
    [
        {login: 'login123', email: 'login@wp.pl'},
        {password: 'Hasło123', confirmPassword: 'Hasło123'}
    ]
    .map(givenData => {
    test('niepełne dane', () => {
        expect(validateUser(givenData)).toBe(givenData)
})
    })
})

describe('Poprawne dane', () => {
    [
        {login: 'login123', email: 'login@wp.pl', password: 'Haslo123', confirmPassword: 'Haslo123'},
        {login: 'Login123', email: 'login@wp.pl', password: 'Hasło123', confirmPassword: 'Hasło123'},
        {login: 'Loginbezcyfr', email: 'login@o2.pl', password: 'Haslo123', confirmPassword: 'Haslo123'},
        {login: '12345678', email: 'login_moj_maciek@gmail.com', password: 'Haslo123!', confirmPassword: 'Haslo123!'}

    ]
    .map(givenData => {
    test(givenData.login, () => {
        expect(validateUser(givenData)).toBe(givenData)
})
    })
})