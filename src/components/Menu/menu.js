(function () {
    'use strict';

    class Menu {
        constructor() {
            this.menu = document.querySelector('.list');
            this.inputSimple = document.querySelector('.form-control');
            this.btnClick = document.querySelector('.btn-click');

            this.init();
        }

        init() {
            this.bindBtn();
        }

        /**
         * Add Menu item
         */

        addItem() {
            let inputValue = this.inputSimple.value;
            let listItem = document.createElement('li');
            let removeIcon = document.createElement('i');

            listItem.className='list-item';
            removeIcon.className='icon-remove';

            listItem.innerText = inputValue;

            listItem.appendChild(removeIcon);
            this.menu.appendChild(listItem);

            this.inputSimple.value = '';

            return removeIcon;
        }

        /**
         * Bind addItem method to the button
         */

        bindBtn() {
            this.btnClick.addEventListener('click', () => {
                var item = this.addItem();
                this.bindEvent(item);
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
    }

    // Export
    window.Menu = Menu;
})(window);
