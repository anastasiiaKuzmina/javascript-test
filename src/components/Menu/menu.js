'use strict';

import Styles from './menu.css';

let data = {
    items: [
        {
            id: 1,
            title: 'mail.ru'
        },
        {
            id: 2,
            title: 'yandex.ru'
        },
        {
            id: 3,
            title: 'google.com'
        },
    ],

    id: 4
};

class Menu {
    constructor() {
        this.menu = document.querySelector('.list');
        this.inputSimple = document.querySelector('.form-control');
        this.btnClick = document.querySelector('.btn-click');

        this.render();
        this.init();
    }

    init() {
        this.bindBtn();
        this.remove();
        this.edit()
    }

    getElements(selector, method) {
        let elements = document.querySelectorAll(selector);
        for(let i = 0; i < elements.length; i++) {
            let editIconItem = elements[i];
            editIconItem.addEventListener('click', function() {
                method(this);
            });
        }
    }

    /**
     * Add Menu item
     */

    addItem(item) {
        data.items.push({id: data.id++,title: item});
        this.render();
        this.remove();
        this.edit();
    }

    /**
     * Bind addItem method to the button
     */

    bindBtn() {
        this.btnClick.addEventListener('click', () => {
            let inputValue = this.inputSimple.value;
            if(inputValue) {
                this.addItem(inputValue);
                this.inputSimple.value = '';
            }
        });
    }

    /**
     * Remove Menu Item
     * @param  {Object} item
     */

    removeItem(item) {
        let itemID = item.getAttribute("data-index");
        data.items = data.items.filter(i => i.id != itemID);
        this.render();
        this.remove();
        this.edit();
    }

    remove() {
        this.getElements('.icon-remove', this.removeItem.bind(this));
    }

    editItem(item) {
        let itemID = item.getAttribute("data-index");
        let itemText = document.querySelector(item.getAttribute("data-text"));
        let itemEditField = document.querySelector(item.getAttribute("data-edit"));
        let btnSave = document.querySelector(item.getAttribute("data-save")) ;
        let inputText = document.getElementById(item.getAttribute("data-input")) ;
        let _this = this;

        itemText.style.display = "none";
        itemEditField.style.display = "inline-block";

        btnSave.addEventListener('click', function() {
            let inputTextValue = inputText.value;
            if(inputTextValue) {
                itemText.style.display = 'inline-block';
                itemEditField.style.display = 'none';

                data.items = data.items.map((elem) => {
                    if(elem.id === Number(itemID)) {
                        elem.title = inputTextValue;
                    }
                    return elem;
                });
                _this.render();
                _this.edit();
                _this.remove();
            }
        });

    }

    edit() {
        this.getElements('.icon-edit', this.editItem.bind(this));
    }

    /**
     * Render HTML
     */

    generateItemHTML(item) {
        return `
            <li class="list-item">
                <span class="list-item-text" id="item-text-${item.id}">${item.title}</span>
                <span class="list-item-edit" id="item-edit-${item.id}">
                    <input type="text" class="text-field" id="input-text-${item.id}">
                    <i class="icon-save" data-index="${item.id}" id="item-save-${item.id}">Save</i>
                </span>
                <i class="icon-remove" data-index="${item.id}" id="item-save-${item.id}"></i>
                <i class="icon-edit" data-text="#item-text-${item.id}" data-edit="#item-edit-${item.id}" data-save="#item-save-${item.id}" data-input="input-text-${item.id}" data-index="${item.id}">Edit</i>
            </li>`;
    }

    getItems(items) {
        return items.map(this.generateItemHTML.bind(this)).join("");
    }

    render() {
        this.menu.innerHTML = this.getItems(data.items);
    }
}

// Export
export default Menu;