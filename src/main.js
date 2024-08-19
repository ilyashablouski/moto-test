import './styles/main.scss';
import '@styles/components.styles.js';
import Alpine from 'alpinejs';

import mockedJsonData from './db/db.json';
import animateBorder from './animations/animateBorder';
import horizontalScrollWithDrag from './animations/horizontalScrollWithDrag';

window.Alpine = Alpine;
Alpine.store('content', mockedJsonData);

//Components registration
Alpine.data('animateBorder', animateBorder);
Alpine.data('horizontalScrollWithDrag', horizontalScrollWithDrag);

Alpine.start();
