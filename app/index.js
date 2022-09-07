import { headerTitle } from './elements.js';
import { Desks } from './Desks.js';
import { Modal } from './Modal.js';
import { clock } from './utils/clock.util.js';

clock();
setInterval(clock, 1000);

const desks = new Desks(1);

headerTitle.addEvent('click', () => {
    Modal.addUsersListLayout(desks);
});

Modal.addUsersListLayout(desks);
