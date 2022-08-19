import { addLoadingLayout, removeLoadingLayout } from "./utils.js";

export class API {
    static route = 'https://62d4f182cd960e45d45df2e7.mockapi.io/users/';

    static async getUsers() {
        const res = await fetch(this.route);
        const users = await res.json();

        return users;
    }

    static async getUser(id) {
        addLoadingLayout();

        const res = await fetch(this.route + id);
        const user = await res.json();

        setTimeout(() => removeLoadingLayout(), 400);

        return user;
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
        const res = await fetch(this.route + id, options);
        const user = await res.json();

        console.log(user);
        return user;
    }
}