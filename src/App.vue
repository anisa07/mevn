<template>
    <v-app>
        <div id="app">
            <!--<a @click="moveTo('about')">About</a>-->
            <!--<a @click="moveTo('exp')">Experience</a>-->
            <!--<a @click="moveTo('projects')">Projects</a>-->
            <!--<a @click="moveTo('awards')">Awards</a>-->
            <!--<a @click="moveTo('contacts')">Contacts</a>-->
            <routers/>
            <router-view/>
            <!--<div v-if="checkRoute" ref="about">-->
                <!--<about/>-->
            <!--</div>-->
        </div>
    </v-app>
</template>
<script>
	import routers from './components/routers/Routers.vue';
	import about from './components/about/About';

	export default {
		components: {
			routers,
			about
		},
		data () {
			return {
				portfolio: false,
				refName: ""
			}
		},
		methods: {
			navigate () {
				const element = this.$refs[this.refName];
				const top = element.offsetTop;
				window.scrollTo(0, top);
			},
			moveTo (ref) {
				this.refName = ref;
				const timerId = () => window.setTimeout(this.navigate, 600);
				if (this.$route.path !== '/') {
					this.$router.push('/');
					timerId();
				} else {
					this.navigate();
				}
				window.clearTimeout(timerId);
			},
		},
		computed: {
			checkRoute () {
				return this.portfolio = this.$route.path === '/';
			}
		},
	};
</script>
<style lang="scss" scoped>
</style>