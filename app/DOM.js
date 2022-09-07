export const $ = (selector) => new DOM(selector);

export class DOM {
    static create = (tagName, ...classes) => {
        const el = document.createElement(tagName);
        if (classes.length) {
            el.classList.add(...classes)
        }
        return $(el);
    }

    constructor(selector) {
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector) 
            : selector; 
    }

    find(selector) {
        if (selector) {
            return $(this.$el.querySelector(selector))
        }
    }

    text(textContent) {
        if (typeof textContent === 'string' || typeof textContent === 'number') {
            this.$el.textContent = textContent;
        }
        return this.$el.textContent;
    }

    append(element) {
        if (element instanceof DOM) {
            element = element.$el;
        }
        this.$el.append(element)
    }

    addEvent(type, callback) {
        this.$el.addEventListener(type, callback);
    }

    removeEvent(type, callback) {
        this.$el.removeEventListener(type, callback);
    }

    insertHTML(place, html) {
        this.$el.insertAdjacentHTML(place, html);
    }

    insertElement(place, element) {
        if (element instanceof DOM) {
            element = element.$el;
        }
        this.$el.insertAdjacentElement(place, element);
    }

    clear() {
        this.$el.innerHTML = '';
    }

    remove() {
        this.$el.remove();
    }
}
