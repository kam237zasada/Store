const { validateSingleSell } = require('../models/singleSell')

describe('zły format kwoty', () => {
    [
        {
            date: '12345678456',
            brandId: '5ff388505b988b4144e60094', 
            model: 'A5',
            serialNumber: 'AXC300054',
            buyNetPrice: '21.40',
            buyGrossPrice: '21.0',
            sellNetPrice: '0.15',
            sellGrossPrice: '100000000000000000000000.00',
        },
        {
            date: '12345678456',
            brandId: '5ff388505b988b4144e60094', 
            model: 'A5',
            serialNumber: 'AXC300054',
            buyNetPrice: '21.00',
            buyGrossPrice: '21,47',
            sellNetPrice: '0.15',
            sellGrossPrice: '100000000000000000000000,00',
        },
        {
            date: '12345678456',
            brandId: '5ff388505b988b4144e60094', 
            model: 'A5',
            serialNumber: 'AXC300054',
            buyGrossPrice: '21.47',
            sellNetPrice: '0.15',
            sellGrossPrice: '100000000000000000000000.00',
        },
        {
            date: '12345678456',
            brandId: '5ff388505b988b4144e60094', 
            model: 'A5',
            serialNumber: 'AXC300054',
            buyNetPrice: '21.47',
            buyGrossPrice: '2 1.47',
            sellNetPrice: '0.15',
            sellGrossPrice: '100000000000000000000000.00',
        }
    ]
    .map(givenData => {
    test(givenData.buyGrossPrice, () => {
        expect(() => validateSingleSell(givenData)).toThrowError(`Niepoprawny format kwoty!`)
})
    })
})

describe('wszystko poprawnie', () => {
    [
        {
            date: '12345678456',
            brandId: '5ff388505b988b4144e60094', 
            model: 'A5',
            serialNumber: 'poprawnie',
            buyNetPrice: '21.41',
            buyGrossPrice: '21.47',
            sellNetPrice: '0.15',
            sellGrossPrice: '10000000000000009999999999999999999999999999999900000000.00',
        }
    ]
    .map(givenData => {
    test(givenData.serialNumber, () => {
        expect(validateSingleSell(givenData)).toBe(givenData)
})
    })
})