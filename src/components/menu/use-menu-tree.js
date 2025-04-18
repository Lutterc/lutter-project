import { computed } from 'vue';
// import usePermission from '@/hooks/permission';
import { useAppStore } from '@/store';
import { cloneDeep } from 'lodash';
import { appRoutes } from '@/router/routes';

const appClientMenus = appRoutes.map((el) => {
  const { name, path, meta, redirect, children } = el;
  return {
    name,
    path,
    meta,
    redirect,
    children,
  };
});


export default function useMenuTree() {
  // const permission = usePermission();
  const appStore = useAppStore();
  const appRoute = computed(() => {
    if (appStore.menuFromServer) {
      return appStore.appAsyncMenus;
    }
    return appClientMenus;
  });
  const menuTree = computed(() => {
    const copyRouter = cloneDeep(appRoute.value);
    copyRouter.sort((a, b) => {
      return (a.meta.order || 0) - (b.meta.order || 0);
    });
    function travel(_routes, layer) {
      if (!_routes) return null;

      const collector = _routes.map((element) => {
        // no access
        // if (!permission.accessRouter(element)) {
        //   return null;
        // }

        // leaf node
        if (element.meta?.hideChildrenInMenu || !element.children) {
          element.children = [];
          return element;
        }

        // route filter hideInMenu true
        element.children = element.children.filter(
          (x) => x.meta?.hideInMenu !== true
        );

        // Associated child node
        const subItem = travel(element.children, layer + 1);

        if (subItem.length) {
          element.children = subItem;
          return element;
        }
        // the else logic
        if (layer > 1) {
          element.children = subItem;
          return element;
        }

        if (element.meta?.hideInMenu === false) {
          return element;
        }

        return null;
      });
      return collector.filter(Boolean);
    }
    return travel(copyRouter, 0);
  });

  return {
    menuTree,
  };
}
