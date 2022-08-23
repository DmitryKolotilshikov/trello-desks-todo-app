
export const $ = (el) => new DOM(el);

export class DOM {
    static create(tagName, ...classes) {
        const el = document.createElement(tagName);
        if (classes.length) {
            el.classList.add(...classes);
        }
        return $(el);
    }

    static findInDoc(selector) {
        return document.querySelector(selector);
    }

    constructor(selector) {
        this.$el = typeof selector === 'string'
            ? DOM.findInDoc(selector)
            : selector;
    }

    find(selector) {
        return $(this.$el.querySelector(selector));
    }

    clear() {
        this.$el.innerHTML = '';
    }

    remove() {
        this.$el.remove();
    }

    addClass(...classNames) {
        if (classNames.length) {
            this.$el.classList.add(...classNames);
        }
    }

    removeClass(className) {
        if (className) {
            this.$el.classList.remove(className);
        }
    }

    text(text) {
        if (typeof text === 'string' || typeof text === 'number') {
            this.$el.textContent = text;
        }
    }

    append(element) {
        if (element instanceof DOM) {
            element = element.$el;
        }
        this.$el.append(element);
        return this;
    }

    insertHTML(place, html) {
        this.$el.insertAdjacentHTML(place, html);
        return this;
    }

    insertElement(place, element) {
        if (element instanceof DOM) {
            element = element.$el;
        }
        this.$el.insertAdjacentElement(place, element);
        return this;
    }

    getSibling(type) {
        switch(type) {
            case 'next':
                return $(this.$el.nextElementSibling);
            case 'previous':
                return $(this.$el.previousElementSibling);
            default: 
                return null;
        }
    }

    addEvent(eventType, callback) {
        this.$el.addEventListener(eventType, callback);
    }

    removeEvent(eventType, callback) {
        this.$el.removeEventListener(eventType, callback);
    }
}
