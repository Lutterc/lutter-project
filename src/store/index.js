import { createPinia } from 'pinia';
import useAppStore from './modules/app';
import useUserStore from './modules/user';
// import useTabBarStore from './modules/tab-bar';

const pinia = createPinia();

export { useAppStore, useUserStore };
export default pinia;
