<template>
  <div class="menu-demo">
    <a-menu
      :style="{ width: '200px', height: '100%' }"
      show-collapse-button
      :default-open-keys="openMenuKeys"
      :default-selected-keys="selectedKeys"
      breakpoint="xl"
      @collapse="onCollapse"
    >
      <a-sub-menu v-for="(menu, index) in menuTree" :key="menu.name">
        <template #icon><icon :name="menu.meta.icon" /></template>
        <template #title>{{ $t(menu.meta.locale) }}</template>
        <template
          v-for="(menuSub, indexSub) in menu.children"
          :key="menuSub.name"
        >
          <a-menu-item @click="handleMenuClick(menuSub, menu)">{{
            $t(menuSub.meta.locale)
          }}</a-menu-item>
        </template>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Message } from "@arco-design/web-vue";
import useMenuTree from "./use-menu-tree.js";
import icon from "./icon.vue";

const router = useRouter();
const openMenuKeys = ref(["Dashboard"]);
const selectedKeys = ref(["Workplace"]);
const { menuTree } = useMenuTree();

const onCollapse = (val, type) => {
  const content = type === "responsive" ? "触发响应式收缩" : "点击触发收缩";
  Message.info({
    content,
    duration: 2000,
  });
};

const handleMenuClick = (item, parent) => {
  // openMenuKeys.value = [parent.name]
  // selectedKeys.value = [item.name]
  console.log(openMenuKeys.value, selectedKeys.value);
  router.push({
    name: item.name,
  });
};
onMounted(() => {
  router.push({
    name: selectedKeys.value[0],
  });
});
</script>
<style scoped>
.menu-demo {
  height: calc(100vh - 61px);
  box-sizing: border-box;
  width: 100%;
  background-color: var(--color-neutral-2);
}
</style>
