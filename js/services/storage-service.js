export const storage={
    saveToStorage,
    loadFromStorage
}

function saveToStorage(key, value) {

    var str = JSON.stringify(value);
    localStorage.setItem(key, str);
}

function loadFromStorage(key) {
    var str = localStorage.getItem(key)
    console.log(str);
    console.log(key);

    return JSON.parse(str)
}

function clearStorage() {
    localStorage.clear()
}