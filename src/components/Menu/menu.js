'use strict';

import Styles from './menu.css';

let data = {
    items: [
        {
            title: 'mail.ru'
        },
        {
            title: 'yandex.ru'
        },
        {
            title: 'google.com'
        },
    ]
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
    }

    /**
     * Add Menu item
     */

    addItem(item) {
        data.items.push({title: item});
        this.render();
    }

    /**
     * Bind addItem method to the button
     */

    bindBtn() {
        this.btnClick.addEventListener('click', () => {
            let inputValue = this.inputSimple.value;
            this.addItem(inputValue);
            this.inputSimple.value = '';
        });
    }

    /**
     * Bind removeItem method to the every button remove
     * @param  {Object} item
     */

    bindEvent(item) {
        let _this = this;
        item.addEventListener('click', function() {
            return _this.removeItem(this);
        });
    }

    /**
     * Remove Menu Item
     * @param  {Object} item
     */

    removeItem(item) {
        let removeParentItem = item.parentNode;
        this.menu.removeChild(removeParentItem);
    }

    remove() {
        let removeIcon = document.querySelector('.icon-remove');
        this.bindEvent(removeIcon);
    }

    /**
     * Render HTML
     */

    generateItemHTML(item, index) {
        return `
            <li class="list-item" data-index="${index}">
                ${item.title}
                <i class="icon-remove" data-action="remove"></i>	
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
