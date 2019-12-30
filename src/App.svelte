<script>
	import Tailwindcss from './Tailwindcss.svelte';
	import About from './About.svelte';
	import List from './List.svelte';
	import config from './config.js';
	
	$: showAbout = false;
	$: showFAQ = false;
</script>

<Tailwindcss />

<main class="container mx-auto text-center">
	<h1 class="text-{config.colour}-600 text-3xl">Destiny Countdown</h1>

	<About />

	<p><strong>Note:</strong> Tuesday's daily reset will be replaced by the weekly reset time</p>



	<List />
</main>

<style>

body {
	/* 
	background-image: url("https://www.transparenttextures.com/patterns/asfalt-dark.png"); */
	/* background-image: url("https://www.transparenttextures.com/patterns/asfalt-light.png"); */
	
}
main {
	font-family: 'Dosis', sans-serif;
	
}

h1, h2, h3 {
	font-weight: 500;
}
</style>