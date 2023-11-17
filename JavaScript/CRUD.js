import { displayDataOnTable } from "./app.js";

const ADD_NEW_SECTION = document.querySelector('.addNew-section');
const ADD_NEW_BUTTON = document.querySelector('.add-new');

ADD_NEW_BUTTON.addEventListener('click', function() {
    ADD_NEW_SECTION.classList.toggle('display-block');
})

const CANCEL = document.querySelector('.addNew-cancel');

CANCEL.addEventListener('click', function() {
    ADD_NEW_SECTION.classList.toggle('display-block');
})

const SUBMIT_NEW_INFO = document.querySelector('.addNew-submit');

const CAR_NAME = document.getElementById('car-name');
const CAR_YEAR = document.getElementById('car-year');
const CAR_COLOR = document.getElementById("car-color");
const CAR_PRICE = document.getElementById('car-price');

function getFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('cars')) ?? [];
    return data;
}

function validate() {
    if (!CAR_NAME.value) {
        CAR_NAME.style.outlineColor = 'red';
        CAR_NAME.focus();
        return false;
    }
    if (!CAR_YEAR.value || CAR_YEAR.value >= new Date().getFullYear + 1 || CAR_YEAR.value <= 1950) {
        CAR_YEAR.style.outlineColor = 'red';
        CAR_YEAR.focus();
        return false;
    }

    if (!CAR_COLOR.value) {
        CAR_COLOR.style.outlineColor = 'red';
        CAR_COLOR.focus();
        return false;
    }
    if (!CAR_PRICE.value) {
        CAR_PRICE.style.outlineColor = 'red';
        CAR_PRICE.focus();
        return false;
    }
    return true;
}

function saveToLocalStorage(data) {
    data = JSON.stringify(data);
    localStorage.setItem('cars', data);
}

SUBMIT_NEW_INFO.addEventListener('click', function() {
    if (!validate()) {
        return;
    }
    const car = {
        id: Date.now(),
        name: CAR_NAME.value,
        year: CAR_YEAR.value,
        color: CAR_COLOR.value,
        price: CAR_PRICE.value,
        status: "active"
    }
    const carData = getFromLocalStorage();
    carData.push(car);
    saveToLocalStorage(carData);
    ADD_NEW_SECTION.classList.remove('display-block');
    carData.forEach(element => {
        element.status = element.status == 'active' ? "Sotuvda" : 'Sotuvda emas' 
    })
    displayDataOnTable(carData);
    const EDIT_BUTTONS = document.querySelectorAll('.edit');
    const DELETE_BUTTONS = document.querySelectorAll('.delete');
    addListenerToDeleteButtons(DELETE_BUTTONS);
    addListenerToEditButtons(EDIT_BUTTONS);
})

const EDIT_BUTTONS = document.querySelectorAll('.edit');
const DELETE_BUTTONS = document.querySelectorAll('.delete');


const EDIT_SECTION = document.querySelector('.edit-section');
const EDIT_CANCEL = document.querySelector('.edit-cancel');
const EDIT_SUBMIT = document.querySelector('.edit-submit');
const EDITED_NAME = document.getElementById('edited-name');
const EDITED_YEAR = document.getElementById('edited-year');
const EDITED_COLOR = document.getElementById('edited-color');
const EDITED_PRICE = document.getElementById('edited-price');
const EDITED_STATUS = document.querySelector('.edited-status');

let carBeingEdited;

EDIT_CANCEL.addEventListener('click', () => {
    EDIT_SECTION.classList.remove('display-block');
})

EDIT_SUBMIT.addEventListener('click', () => {
    EDIT_SECTION.classList.remove('display-block');
    let editedName = EDITED_NAME.value;
    let editedYear = EDITED_YEAR.value;
    let editedColor = EDITED_COLOR.value;
    let editedPrice = EDITED_PRICE.value;
    let editedStatus = EDITED_STATUS.selectedIndex == 0 ? EDITED_STATUS.children[0].value : EDITED_STATUS.children[1].value;
    const data = getFromLocalStorage();
    for (let i = 0; i < data.length; i++) {
        let element = data[i];
        if (element.id == carBeingEdited) {
            if (EDITED_COLOR.value) {
                element.color = editedColor;
            }
            if (EDITED_PRICE.value) {
                element.price = editedPrice;
            }
            if (EDITED_YEAR.value) {
                element.year = editedYear;
            }
            if (EDITED_NAME.value){
                element.name = editedName;
            }
            element.status = editedStatus;
            break;
        }
    }
    saveToLocalStorage(data);
    data.forEach(element => {
        element.status = element.status == 'active'? "Sotuvda" : 'Sotuvda emas'
    })
    displayDataOnTable(data);
    const EDIT_BUTTONS = document.querySelectorAll('.edit');
    const DELETE_BUTTONS = document.querySelectorAll('.delete');
    addListenerToDeleteButtons(DELETE_BUTTONS);
    addListenerToEditButtons(EDIT_BUTTONS);
})

addListenerToEditButtons(EDIT_BUTTONS);
addListenerToDeleteButtons(DELETE_BUTTONS);

export function addListenerToEditButtons(editButtons = EDIT_BUTTONS) {
    console.log('listeners attached to element');
    editButtons.forEach(element => {
        element.addEventListener('click', function() {
            EDIT_SECTION.classList.toggle('display-block');
            let id = this.getAttribute('class');
            id = id.slice(id.indexOf('_') + 1, id.length);
            carBeingEdited = id;
            const data = getFromLocalStorage();
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                if (element.id == id) {
                    EDITED_NAME.value = element.name;
                    EDITED_YEAR.value = element.year;
                    EDITED_COLOR.value = element.color;
                    EDITED_PRICE.value = element.price;
                    if (element.status == 'active') {
                        EDITED_STATUS.children[0].setAttribute('selected','selected');
                        EDITED_STATUS.children[1].removeAttribute('selected');
                    } else {
                        EDITED_STATUS.children[0].removeAttribute('selected');
                        EDITED_STATUS.children[1].setAttribute('selected','selected');
                    }
                }
            }
        });
    });
}


export function addListenerToDeleteButtons(deleteButtons = DELETE_BUTTONS) {
    deleteButtons.forEach(element => {
        element.addEventListener('click', function() {
            let id = this.getAttribute('class');
            id = id.slice(id.indexOf('_') + 1, id.length);
            const data = getFromLocalStorage();
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                if (element.id == id) {
                    data.splice(i, 1);
                    break;
                }
            }
            saveToLocalStorage(data);
            data.forEach(element => {
                element.status = element.status == 'active'? "Sotuvda" : 'Sotuvda emas'
            })
            displayDataOnTable(data);
            const EDIT_BUTTONS = document.querySelectorAll('.edit');
            const DELETE_BUTTONS = document.querySelectorAll('.delete');
            addListenerToDeleteButtons(DELETE_BUTTONS);
            addListenerToEditButtons(EDIT_BUTTONS);
        });
    });
}