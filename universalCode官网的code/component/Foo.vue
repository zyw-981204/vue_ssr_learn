<template>
	<div>这里是Foo</div>
  <div>{{ item.title }}</div>
</template>

<script>
export default {
	asyncData({
		store, route
	}) {
		return store.dispatch("fetchItem", "zyww");
	},
	name: "Foo",
  computed: {
    // 从 store 的 state 对象中的获取 item。
    item () {
      return this.$store.state.items["zyww"]
    }
  }
};
</script>

<style lang="scss" scoped>
</style>