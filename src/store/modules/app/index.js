import { defineStore } from 'pinia';
import { Notification } from '@arco-design/web-vue';
// import { getMenuList } from '@/api/user';

const defaultSettings = {
  "theme": "light",
  "colorWeak": false,
  "navbar": true,
  "menu": true,
  "topMenu": false,
  "hideMenu": false,
  "menuCollapse": false,
  "footer": true,
  "themeColor": "#165DFF",
  "menuWidth": 220,
  "globalSettings": false,
  "device": "desktop",
  "tabBar": false,
  "menuFromServer": false,
  "serverMenu": []
}

const useAppStore = defineStore('app', {
  state: () => ({ ...defaultSettings }),

  getters: {
    appCurrentSetting(state) {
      return { ...state };
    },
    appDevice(state) {
      return state.device;
    },
    appAsyncMenus(state) {
      return state.serverMenu;
    },
  },

  actions: {
    // Update app settings
    updateSettings(partial) {
      // @ts-ignore-next-line
      this.$patch(partial);
    },

    // Change theme color
    toggleTheme(dark) {
      if (dark) {
        this.theme = 'dark';
        document.body.setAttribute('arco-theme', 'dark');
      } else {
        this.theme = 'light';
        document.body.removeAttribute('arco-theme');
      }
    },
    toggleDevice(device) {
      this.device = device;
    },
    toggleMenu(value) {
      this.hideMenu = value;
    },
    // async fetchServerMenuConfig() {
    //   let notifyInstance = null;
    //   try {
    //     notifyInstance = Notification.info({
    //       id: 'menuNotice', // Keep the instance id the same
    //       content: 'loading',
    //       closable: true,
    //     });
    //     const { data } = await getMenuList();
    //     this.serverMenu = data;
    //     notifyInstance = Notification.success({
    //       id: 'menuNotice',
    //       content: 'success',
    //       closable: true,
    //     });
    //   } catch (error) {
    //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //     notifyInstance = Notification.error({
    //       id: 'menuNotice',
    //       content: 'error',
    //       closable: true,
    //     });
    //   }
    // },
    clearServerMenu() {
      this.serverMenu = [];
    },
  },
});

export default useAppStore;
