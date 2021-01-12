const { validateModel } = require('../models/model');


describe('Nazwa modelu jest pusta', () => {
        [
            {name: ''},
            {name: '      '},
            {name: '    '}
        ]
        .map(givenData => {
        test(givenData.name, () => {
            expect(() => validateModel(givenData)).toThrowError(`Podaj poprawną nazwę modelu!`)
    })
        })
})

describe('Poprawna nazwa modelu', () => {
    [
        {name: 'model'},
        {name: 'XCR-45'},
        {name: 'Band 4'},
        {name: '$$&'}
    ]
    .map(givenData => {
    test(givenData.name, () => {
        expect(validateModel(givenData)).toBe(givenData)
})
    })
})