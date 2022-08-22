import { $ } from "./DOM.js";
import { root } from "./elements.js";

export class Modal {
    static #loaderLayout;
    static #errorLayout;

    static addLoading() {
        Modal.removeError();

        const modalLoading = $(document.createElement('div'));
        modalLoading.addClass('modal', 'modal--toggle');
        modalLoading.$el.dataset.loader = '';

        modalLoading.insertHTML('afterbegin', `
            <div class="lds-spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
        `);

        Modal.#loaderLayout = modalLoading;
        root.insertElement('afterend', modalLoading);
    }

    static removeLoading() {
        if (Modal.#loaderLayout) {
            Modal.#loaderLayout.remove();
            Modal.#loaderLayout = '';
        }
    }

    static addError(message) {
        Modal.removeLoading();

        const modalError = $(document.createElement('div'));
        modalError.addClass('modal', 'error', 'modal--toggle');
        modalError.$el.dataset.error = '';
        modalError.insertHTML('afterbegin', `<p>${message}</p>`);
        root.insertElement('afterend', modalError);

        Modal.#errorLayout = modalError;

        modalError.addEvent('click', (e) => {
            if (e.target.classList.contains('modal--toggle')) {
                Modal.removeError();
            }
        });
    }

    static removeError() {
        if (Modal.#errorLayout) {
            Modal.#errorLayout.remove();
            Modal.#errorLayout = '';
        }
    }
}