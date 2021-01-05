function setID(collection) {
    let currentNumber;
    if(collection.length===0) { currentNumber = 1} else {
        let lastElementIndex = collection.length -1;
        currentNumber = collection[lastElementIndex].ID +1;
    }
    return currentNumber
}

exports.setID = setID;