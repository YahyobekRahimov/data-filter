import { data as carsData} from "./data.js";
const tbody = document.querySelector('tbody');

let data = carsData;
let colorSelect = document.getElementById('color');

data.forEach(element => {
    element.status = element.status == 'active' ? "Sotuvda" : 'Sotuvda emas' 
})

displayDataOnTable(data);

function displayDataOnTable(dataSet) {
    let dataToBeDisplayed = ``;
    dataSet.forEach((item, index) => {
       const carData = `
       <tr>
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.year}</td>
            <td>${item.color}</td>
            <td>$${item.price.toLocaleString()}</td>
            <td>${item.status}</td>
        </tr>`;
       dataToBeDisplayed += carData; 
    })
    tbody.innerHTML = dataToBeDisplayed;
}


const searchInput = document.querySelector('input[name="search"]');

searchInput.addEventListener('input', function() {
    displayFilterResults(searchInput.value)
})

function displayFilterResults(input) {
    const searchLength = input.trim().length;
    let dataToBeDisplayed = '';
    data.forEach((element, index) => {
        if (element.name.slice(0, searchLength).toLocaleLowerCase() == input.trim().toLocaleLowerCase()) {
            const carData = `
            <tr>
                <td>${index + 1}</td>
                <td>${element.name}</td>
                <td>${element.year}</td>
                <td>${element.color}</td>
                <td>$${element.price.toLocaleString()}</td>
                <td>${element.status}</td>
            </tr>`
            dataToBeDisplayed += carData;
        }
    })
    tbody.innerHTML = dataToBeDisplayed;
}

const select = document.getElementById('carName');

const carNames = [];
const carColors = [];

data.forEach(element => {
    carNames.push(element.name);
    carColors.push(element.color);
})

handleOptionsInSelect();
handleOptionsForColorSelect();

function handleOptionsInSelect() {
    const optionsAlreadyEntered = [];
    for (let i = 0; i < carNames.length; i++) {
        const element = carNames[i];
        if (optionsAlreadyEntered.includes(element)) {
            continue;
        };
        optionsAlreadyEntered.push(element);
        displayOption(element);
    }
}

function displayOption(carName) {
    let str = `<option value="${carName}">${carName}</option>`
    select.innerHTML += str;
}

select.addEventListener('change', function() {
    data = carsData;
    if (select.value == 'Hammasi') return displayDataOnTable(data);
    const newDataSet = [];
    data.forEach(element => {
        if (element.name == select.value) {
            newDataSet.push(element);
        }
    })
    displayDataOnTable(newDataSet);
    data = newDataSet;
})

const carYearStart = document.getElementById('carYearStart');
carYearStart.addEventListener('input', function() {
    const newDataSet = data.filter(element => {
        return carYearStart.value <= element.year;
    });
    displayDataOnTable(newDataSet);
    data = newDataSet;
})


colorSelect.addEventListener('change', function() {
    data = carsData;
    if (colorSelect.value == 'Hammasi') return displayDataOnTable(data);
    const newDataSet = [];
    data.forEach(element => {
        if (element.color == colorSelect.value) {
            newDataSet.push(element);
        }
    })
    displayDataOnTable(newDataSet);
    data = newDataSet;
})

function handleOptionsForColorSelect() {
    const optionsAlreadyEntered = [];
    for (let i = 0; i < carColors.length; i++) {
        const element = carColors[i];
        if (optionsAlreadyEntered.includes(element)) {
            continue;
        };
        optionsAlreadyEntered.push(element);
        displayOptionInColorSelect(element);
    }
}

function displayOptionInColorSelect(carColor) {
    let str = `<option value="${carColor}">${carColor}</option>`
    colorSelect.innerHTML += str;
}

const priceStart = document.getElementById('carPriceStart');
const priceEnd = document.getElementById('carPriceEnd');

priceStart.addEventListener('input', function() {
    const newDataSet = data.filter((element, index) => {
        return element.price >= parseInt(priceStart.value) && element.price <= parseInt(priceEnd.value);
    })
    displayDataOnTable(newDataSet);
})
priceEnd.addEventListener('input', function() {
    const newDataSet = data.filter((element, index) => {
        return element.price >= parseInt(priceStart.value) && element.price <= parseInt(priceEnd.value);
    })
    displayDataOnTable(newDataSet);
})

const statusSelect = document.getElementById('carStatus');

statusSelect.addEventListener('change', function() {
    const newDataSet = [];
    data.forEach(element => {
        console.log(element.status + statusSelect.value);
        if (element.status == statusSelect.value) {
            newDataSet.push(element);
        }
    })
    displayDataOnTable(newDataSet);
})