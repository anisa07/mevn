<template>
    <div class="contacts deep-purple">
        <v-layout row wrap>
            <v-flex v-for="i in items" :key="i.name">
                <a class="white--text" :href="i.contact">{{i.name}}</a>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
	export default {
		name: "contacts",
		data () {
			return {
				items: [
					{ name: "LinkedIn", contact: "https://www.linkedin.com/in/roman-iovlev-6995ba13/" },
					{ name: "YouTube", contact: "https://www.youtube.com/channel/UCmm1PvQLCI1kXLXol07WKNw" },
					{ name: "GitHub", contact: "https://github.com/RomanIovlev/" },
					{ name: "GitHub Epam", contact: "https://github.com/jdi-testing" }
				]
			}
		}
	}
</script>

<style scoped lang="scss">
    .contacts{
        text-align: center;
        padding: 20px 10%;
        height: 50px
    }
</style>