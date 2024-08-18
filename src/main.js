import './styles/main.scss';
import '@styles/components.styles.js';
import Alpine from 'alpinejs';

import mockedJsonData from './db/db.json';
import animateBorder from './components/page/alpine.js';

window.Alpine = Alpine;
Alpine.store('content', mockedJsonData);

//Components registration
Alpine.data('animateBorder', animateBorder);
Alpine.start();
