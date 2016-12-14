
import { actions } from 'react-native-navigation-redux-helpers';
import { closeDrawer } from './drawer';

const {
    replaceAt,
    popRoute,
    pushRoute,
} = actions;

export default function navigateTo(route, homeRoute, data, data2) {
    console.log("ini di navigate to: ", data)
    return (dispatch, getState) => {
        const navigation = getState().cardNavigation;
        const currentRouteKey = navigation.routes[navigation.routes.length - 1].key;

        if (currentRouteKey !== homeRoute && route !== homeRoute) {
            dispatch(replaceAt(currentRouteKey, { key: route, index: 1, data: data, data2:data2 }, navigation.key));
        } else if (currentRouteKey !== homeRoute && route === homeRoute) {
            dispatch(popRoute(navigation.key));
        } else if (currentRouteKey === homeRoute && route !== homeRoute) {
            dispatch(pushRoute({ key: route, index: 1, data: data, data2: data2 }, navigation.key));
        }
    };
}
