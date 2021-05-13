<template>
	<div class="dashboard">
		首页
		<a-button type="primary" @click="handleLogout">退出</a-button>
	</div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { userStore } from '/@/store/modules/user';

export default defineComponent({
	name: 'Login',
	setup: () => {
		const count = ref(0)
		return { count }
	},
	methods: {
		async handleLogout() {
			await userStore.confirmLoginOut();
		}
	}
})
</script>