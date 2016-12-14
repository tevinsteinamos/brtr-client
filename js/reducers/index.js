
import { combineReducers } from 'redux';

import drawer from './drawer';
import cardNavigation from './cardNavigation';
import auth from './auth';
import items from './items';
import itemId from './itemId';
import categories from './categories';
import searchItem from './searchItem';
import categoryId from './categoryId';
import listMessage from './listMessage';
import createMessageItem from './createMessageItem';


import messageDetail from './messageDetail';

export default combineReducers({

    drawer,
    cardNavigation,
    auth,
    items,
    itemId,
    categories,
    searchItem,
    categoryId,
    listMessage,
    createMessageItem,
    messageDetail

});
