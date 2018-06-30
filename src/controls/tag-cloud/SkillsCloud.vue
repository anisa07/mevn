<template>
    <wordcloud
            :data="items"
            nameKey="name"
            valueKey="value">
    </wordcloud>
</template>

<script>
	import wordcloud from 'vue-wordcloud';
		// let wordcloud;
		// if (process.browser) {
		// 	wordcloud = require('vue-wordcloud');
		// }


    export default {
      name: "skills-cloud",
      props: ['items'],
      components: {
        wordcloud
      },
	}
</script>

<style scoped>

</style>