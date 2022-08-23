import { Modal } from "./Modal.js";

export class API {
    static route = 'https://62d4f182cd960e45d45df2e7.mockapi.io/users/';

    static async getUsers() {
        const response = await fetch(this.route);
        if (response.ok) {
            const users = await response.json();
            return users;
        } else {
            throw new Error(response.statusText);
        }
    }

    static async getUser(id) {
        Modal.addLoading();

        const response = await fetch(this.route + id);

        if (response.ok) {
            const user = await response.json();
            setTimeout(() => Modal.removeLoading(), 700);
            return user;
        } else {
            throw new Error(response.statusText);
        }
      }

    static async putUser(id, body) {
        const bodyContent = JSON.stringify(body);
        const headersList = {
            "Content-Type": "application/json"
        };
        const options = {
            method: "PUT",
            body: bodyContent,
            headers: headersList
        }

        const response = await fetch(this.route + id, options);

        if (response.ok) {
            const user = await response.json();
            return user;
        } else {
            throw new Error(response.statusText);
        }
    }
}