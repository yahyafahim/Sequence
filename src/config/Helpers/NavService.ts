import {
  CommonActions,
  StackActions,
  DrawerActions,
  type NavigationContainerRef,
  type ParamListBase,
} from '@react-navigation/native';
import {Keyboard} from 'react-native';

let _navigator: NavigationContainerRef<ParamListBase> | null = null;

function setTopLevelNavigator(
  navigatorRef: NavigationContainerRef<ParamListBase> | null,
) {
  _navigator = navigatorRef;
}

function navigate(name: string, params: Record<string, unknown> = {}) {
  _navigator?.dispatch(
    CommonActions.navigate({
      name,
      params,
    }),
  );
}

function goBack() {
  Keyboard.dismiss();
  setTimeout(() => {
    _navigator?.dispatch(CommonActions.goBack());
  }, 100);
}

function replace(routeName: string, params: Record<string, unknown> = {}) {
  _navigator?.dispatch(StackActions.replace(routeName, params));
}

function reset(
  index: number,
  routes: Array<{name: string; params?: object}>,
) {
  _navigator?.dispatch(
    CommonActions.reset({
      index,
      routes,
    }),
  );
}

function openDrawer() {
  _navigator?.dispatch(DrawerActions.openDrawer());
}

export default {
  navigate,
  goBack,
  replace,
  reset,
  setTopLevelNavigator,
  openDrawer,
};
