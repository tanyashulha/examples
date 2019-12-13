import './styles/style.scss';
import './styles/weather-icons.min.scss';
import AppController from './controllers/AppController';
import AppModel from './models/AppModel';
import AppView from './views/AppView';

import weather from './services/weather';

weather.request();

const appModel = new AppModel();
const appView = new AppView(appModel);
const appController = new AppController(appView, appModel);

// appController.getC('bg').updateBg();
