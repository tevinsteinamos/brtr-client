
import { combineReducers } from 'redux';

import drawer from './drawer';
import cardNavigation from './cardNavigation';
import auth from './auth';
import items from './items';

export default combineReducers({

    drawer,
    cardNavigation,
    auth,
    items

});
