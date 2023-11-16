import { data as carsData} from "./data.js";
const tbody = document.querySelector('tbody');

let data = [...carsData];
let colorSelect = document.getElementById('color');

const searchInput = document.querySelector('input[name="search"]');
const select = document.getElementById('carName');
const carNames = [];
const carColors = [];
const carYearStart = document.getElementById('carYearStart');
const priceStart = document.getElementById('carPriceStart');
const priceEnd = document.getElementById('carPriceEnd');
const statusSelect = document.getElementById('carStatus');
data.forEach(element => {
    element.status = element.status == 'active' ? "Sotuvda" : 'Sotuvda emas' 
})

displayDataOnTable(data);





searchInput.addEventListener('input', function() {
    displayFilterResults(searchInput.value)
})




data.forEach(element => {
    carNames.push(element.name);
    carColors.push(element.color);
})

handleOptionsInSelect();
handleOptionsForColorSelect();


function filterByName(data, target, isAll) {
    if (!data.length) return [];
    if (isAll) {
        return data;
    }
    const newDataSet = []; 
    data.forEach(element => {
        if (element.name == target) {
            newDataSet.push(element);
        }
    })
    return newDataSet;
}



function filterByYear(data, target, isAll) {
    if (!data.length) return [];
    if (isAll) return data;
    const newDataSet = [];
    data.forEach(element => {
        if (element.year >= target) {
            newDataSet.push(element);
        }
    })
    return newDataSet;
}
function filterByColor(data, target, isAll) {
    if (!data.length) return [];
    if (isAll) return data;
    const newDataSet = [];
    data.forEach(element => {
        if (element.color == target) {
            newDataSet.push(element);
        }
    })
    return newDataSet;
}

function filterByPrice(data, from, to, isAll) {
    if (!data.length) return [];
    if (isAll) return data;
    const newDataSet = [];
    data.forEach(element => {
        if (element.price >= from && element.price <= to) {
            newDataSet.push(element);
        }
    })
    return newDataSet;
}

function filterByStatus(data, target, isAll) {
    if (!data.length) return [];
    if (isAll) return data;
    const newDataSet = [];
    data.forEach(element => {
        if (element.status == target) {
            newDataSet.push(element);
        }
    })
    return newDataSet;
}


select.addEventListener('change', function() {
    let isAll = false;
    if (this.value == 'Hammasi') {
        isAll = true;
    }
    const newDataSet = filterByName(data, this.value, isAll);
    displayDataOnTable(newDataSet);
})

carYearStart.addEventListener('input', function() {
    let isAll = false;
    if (!this.value) {
        isAll = true;
    }
    const newDataSet = filterByYear(data, this.value, isAll);
    displayDataOnTable(newDataSet)
})


colorSelect.addEventListener('change', function() {

    let isAll = false;
    if (this.value == 'Hammasi') {
        isAll = true;
    }
    const newDataSet = filterByColor(data, this.value, isAll);
    displayDataOnTable(newDataSet)
})


priceStart.addEventListener('input', function() {
   this.value = this.value;
   let value = this.value.toLocaleString();
   console.log(value);
})
priceEnd.addEventListener('input', function() {
    
})


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

// ! Functions 

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