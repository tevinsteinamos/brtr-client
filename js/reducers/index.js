
import { combineReducers } from 'redux';

import drawer from './drawer';
import cardNavigation from './cardNavigation';
import auth from './auth';

export default combineReducers({

    drawer,
    cardNavigation,
    auth

});
