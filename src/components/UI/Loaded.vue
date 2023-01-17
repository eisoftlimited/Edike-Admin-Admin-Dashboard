<template>
	<div class="fixed top-0 left-0 w-full h-full bg-[#FFFFFF] flex items-center justify-center z-20" v-if="mainLoaderStatus">
		<div class="w-fit flex items-end">
			<img v-for="item in img" :key="item.img" :src="getImageUrl(item.type, item.img)" class="w-[30px] md:w-auto" alt="">
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUpdated } from 'vue';
import { useLoader } from '../../composables/LoaderController';

const { mainLoaderStatus } = useLoader()
let index = ref<number>(0)
const img = ref([
	{type: 'fade', img: 'e'},
	{type: 'fade', img: 'd'},
	{type: 'fade', img: 'i'},
	{type: 'fade', img: 'k'},
	{type: 'fade', img: 'e_small'}
])

const getImageUrl = (type:string, imgPath:string) => {
    return new URL(`../../assets/img/illustrations/loader/${type}/${imgPath}.svg`, import.meta.url).href
}

const clearLoader = () => {
	for (let i = 0; i < img.value.length; i++) {
		img.value[i].type = 'fade'
	}
}

const recurse = () => {
	if(index.value > 4) {
		clearLoader()
		setTimeout(() => {
			index.value = 0
			recurse()
		}, 1000);
	} else {
		img.value[index.value].type = 'filled'
		setTimeout(() => {
			index.value++
			recurse()
		}, 1000);
	}
}


// onMounted(() => {
	
// })

onUpdated(() => {
	index.value = 0
	recurse()
})
</script>