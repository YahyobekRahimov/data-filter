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

data.forEach(element => {
    carNames.push(element.name);
    carColors.push(element.color);
})

handleOptionsInSelect();
handleOptionsForColorSelect();


function filterByName(data, target, isAll) {
    if (target == 'Hammasi') return data;
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
    if (!target) return data;
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
    if (target == 'Hammasi') return data;
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
    if (!from && !to) return data;
    if (!data.length) return [];
    if (isAll) return data;
    const newDataSet = [];
    data.forEach(element => {
        console.log('element.price :', element.price);
        console.log('from :', from);
        console.log('to :', to);
        if (element.price >= from && element.price <= to) {
            newDataSet.push(element);
        }
    })
    return newDataSet;
}

function filterByStatus(data, target, isAll) {
    if (target == 'Hammasi') return data;
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
    let from = removeCommaBetween(priceStart.value);
    let to = removeCommaBetween(priceEnd.value);
    let isAll = false;
    if (this.value == 'Hammasi') {
        isAll = true;
    }
    let newDataSet = filterByName(data, this.value, isAll);
    newDataSet = filterByColor(newDataSet, colorSelect.value);
    newDataSet = filterByPrice(newDataSet, from, to);
    newDataSet = filterByYear(newDataSet, carYearStart.value);
    newDataSet = filterByStatus(newDataSet, statusSelect.value);
    displayDataOnTable(newDataSet);
})

carYearStart.addEventListener('input', function() {
    let from = removeCommaBetween(priceStart.value);
    let to = removeCommaBetween(priceEnd.value);
    let isAll = false;
    if (!this.value) {
        isAll = true;
    }
    let newDataSet = filterByYear(data, this.value, isAll);
    newDataSet = filterByName(newDataSet, select.value);
    newDataSet = filterByColor(newDataSet, colorSelect.value);
    newDataSet = filterByPrice(newDataSet, from, to);
    newDataSet = filterByStatus(newDataSet, statusSelect.value);
    displayDataOnTable(newDataSet)
})


colorSelect.addEventListener('change', function() {
    let from = removeCommaBetween(priceStart.value);
    let to = removeCommaBetween(priceEnd.value);
    let isAll = false;
    if (this.value == 'Hammasi') {
        isAll = true;
    }
    let newDataSet = filterByColor(data, this.value, isAll);
    newDataSet = filterByYear(newDataSet, carYearStart.value);
    newDataSet = filterByName(newDataSet, select.value);
    newDataSet = filterByPrice(newDataSet, from, to);
    newDataSet = filterByStatus(newDataSet, statusSelect.value);
    displayDataOnTable(newDataSet)
})


priceStart.addEventListener('input', function() {
   this.value = putCommaBetween(this.value)
   let from = removeCommaBetween(priceStart.value);
   let to = removeCommaBetween(priceEnd.value);
   let isAll;
   if (!priceStart.value || !priceEnd.value) {
    isAll = true;
   } else {
    isAll = false;
   }
   let newDataSet = filterByPrice(data, from, to, isAll);
    newDataSet = filterByColor(newDataSet, colorSelect.value);
    newDataSet = filterByYear(newDataSet, carYearStart.value);
    newDataSet = filterByName(newDataSet, select.value);
    newDataSet = filterByStatus(newDataSet, statusSelect.value);
   displayDataOnTable(newDataSet);
})

priceEnd.addEventListener('input', function() {
    this.value = putCommaBetween(this.value)
    let from = removeCommaBetween(priceStart.value);
    let to = removeCommaBetween(priceEnd.value);
    let isAll;
    if (!priceStart.value || !priceEnd.value) {
     isAll = true;
    } else {
      isAll = false;
    }
    let newDataSet = filterByPrice(data, from, to, isAll);
    console.log(newDataSet);
    newDataSet = filterByColor(newDataSet, colorSelect.value);
    newDataSet = filterByYear(newDataSet, carYearStart.value);
    newDataSet = filterByName(newDataSet, select.value);
    newDataSet = filterByStatus(newDataSet, statusSelect.value);
    displayDataOnTable(newDataSet);
})

statusSelect.addEventListener('change', function() {
    let isAll = false;
    if (this.value == 'Hammasi') {
        isAll = true;
    }
    let from = removeCommaBetween(priceStart.value);
    let to = removeCommaBetween(priceEnd.value);     
    let newDataSet = filterByStatus(data, this.value, isAll);
    newDataSet = filterByPrice(newDataSet, from, to);
    newDataSet = filterByColor(newDataSet, colorSelect.value);
    newDataSet = filterByYear(newDataSet, carYearStart.value);
    newDataSet = filterByName(newDataSet, select.value);
    displayDataOnTable(newDataSet);
})

// ! Functions 
function putCommaBetween(value) {
   if (isNaN(value[value.length - 1])) {
    return value.slice(0, -1)
    
   }
    value = value.split(',');
    let number = Number(value.join(''));
    return number.toLocaleString();
}

function removeCommaBetween(value) {
    let arr = value.split(',');
    let number = arr.join('');
    return number;
}
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