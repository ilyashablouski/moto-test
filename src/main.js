import './styles/main.scss';
import '@styles/components.styles.js';
import Alpine from 'alpinejs';

import mockedJsonData from './db/db.json';

window.Alpine = Alpine;
Alpine.store('content', mockedJsonData);
Alpine.start();
