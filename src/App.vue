<template>
	<div class="container">	
		<Weather/>
	</div>
</template>

<script>
	import Weather from './components/Weather/Weather.vue'

	export default {
		name: 'App',
		components: {
			Weather
		}
	}
</script>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap');

	body {
		background-color:rgb(13,17,23);
		box-sizing: border-box;
		font-family: 'Lato', sans-serif;
		margin: 0;
	}

	ul{
		list-style-type: none;
		padding: 0;
	}

	p{
		margin: 0;
	}

	.container{
		max-width: 1200px;
		display: flex;
		justify-content: center;
		margin: auto;
		height: 100vh;
	}
</style>