import { clock } from './utils/clock.utils.js';
import { Desk } from './Desk.js';

clock();
setInterval(clock, 1000);

new Desk(1).initialRender();
