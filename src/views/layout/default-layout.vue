<template>
  <a-layout class="layout">
    <NavBar />
    <a-layout>
      <a-layout-sider
        v-if="renderMenu"
        v-show="!hideMenu"
        class="layout-sider"
        breakpoint="xl"
        :collapsed="collapsed"
        :collapsible="true"
        :width="menuWidth"
        style="width: fit-content"
        :hide-trigger="true"
      >
        <Menu />
      </a-layout-sider>
      <a-layout-content>
        <transition name="fade">
          <div><router-view /></div>
        </transition>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { computed } from "vue";
import NavBar from "@/components/navbar/index.vue";
import Menu from "@/components/menu/index.vue";
import { useAppStore } from "@/store";

const appStore = useAppStore();
const renderMenu = computed(() => appStore.menu && !appStore.topMenu);
const hideMenu = computed(() => appStore.hideMenu);
const collapsed = computed(() => {
  return appStore.menuCollapse;
});
const navbar = computed(() => appStore.navbar);

const menuWidth = computed(() => {
  return appStore.menuCollapse ? 48 : appStore.menuWidth;
});

</script>
<style lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
