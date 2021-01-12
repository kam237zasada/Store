const { validateBrand } = require('../models/brand');


describe('Nazwa marki jest pusta', () => {
        [
            {name: ''},
            {name: '       '},
            {name: '    '}
        ]
        .map(givenData => {
        test(givenData.name, () => {
            expect(() => validateBrand(givenData)).toThrowError(`Podaj poprawną nazwę marki!`)
    })
        })
})

describe('Poprawna nazwa marki', () => {
    [
        {name: 'Jack'},
        {name: 'Sony Ericsson'},
        {name: 'Coca-Cola'},
        {name: 'Procter&Gamble'}
    ]
    .map(givenData => {
    test(givenData.name, () => {
        expect(validateBrand(givenData)).toBe(givenData)
})
    })
})