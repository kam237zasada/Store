const { validateProduct } = require('../models/product');


describe('Id kategorii', () => {
        [
            {brandId: '111122223333444455556666'},
            {brandId: '5ff388505b988b4144e60094'}
        ]
        .map(givenData => {
        test(givenData.brandId, () => {
            expect(() => validateProduct(givenData)).toThrowError(`Podaj poprawną nazwę marki!`)
    })
        })
})