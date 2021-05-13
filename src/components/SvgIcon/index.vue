<template>
	<div v-if="isExt" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$attrs" />
	<svg v-else :class="svgClass" aria-hidden="true" v-on="$attrs">
		<use :xlink:href="iconName" />
	</svg>
</template>

<!--script lang="ts" setup>
import { isExternal } from '/utils/validate'
import { defineProps, computed } from 'vue'
const props = defineProps({
	iconName: {
		type: String,
		required: true
	},
	className: {
		type: String,
		default: ''
	}
})

const isExt = computed(() => isExternal(props.iconName))
const iconName = computed(() => `#icon-${props.iconName}`)
const svgClass = computed(() => ['svg-icon', props.className].join(' '))
const styleExternalIcon = computed(() => ({
	mask: `url(${props.iconName}) no-repeat 50% 50%`,
	'-webkit-mask': `url(${props.iconName}) no-repeat 50% 50%`
}))
</!--script-->

 <script lang="ts">
import { isExternal } from '/utils/validate'
import { defineComponent, computed } from 'vue'

interface SvgIcon {
	iconName: string;
	className?: string;
}

export default defineComponent({
	name: 'SvgIcon',
	props: {
		iconName: {
			type: String,
			required: true
		},
		className: {
			type: String,
			default: ''
		}
	},
	setup(props: SvgIcon) {
		const isExt = computed(() => isExternal(props.iconName))
		const iconName = computed(() => `#icon-${props.iconName}`)
		const svgClass = computed(() => ['svg-icon', props.className].join(' '))
		const styleExternalIcon = computed(() => ({
			mask: `url(${props.iconName}) no-repeat 50% 50%`,
			'-webkit-mask': `url(${props.iconName}) no-repeat 50% 50%`
		}))
		return {
			isExt,
			iconName,
			svgClass,
			styleExternalIcon
		}
	}
})
</script>

<style scoped>
.svg-icon {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}

.svg-external-icon {
	background-color: currentColor;
	mask-size: cover !important;
	display: inline-block;
}
</style>
