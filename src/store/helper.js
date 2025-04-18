import { getCurrentInstance, computed } from 'vue';

export const useStoreHelper = (stores) => {
  const instance = getCurrentInstance();

  if (!instance) {
    throw new Error('useStoreHelper must be called within a setup function.');
  }

  stores.forEach(({ store, getters = [], actions = [] }) => {
    const storeInstance = store(); // 调用 store 函数获取 store 实例

    // 提取需要的 getters
    getters.forEach((getter) => {
      instance.proxy[getter] = computed(() => storeInstance[getter]);
    });

    // 提取需要的 actions
    actions.forEach((action) => {
      instance.proxy[action] = (...args) => storeInstance[action](...args);
    });
  });
  return instance.proxy;
}