<template>
    <div class="projectsContainer">
        <p class="projectsTitle section_title">Projects</p>
        <v-carousel class="white" light interval=10000 hide-delimiters>
            <v-carousel-item v-for="item in items" :key="item.title">
                <div class="projects">
                    <p class="itemTitle">
                        {{item.title}}
                        <img width="100"
                             :src="getImgUrl('dummy')"
                             class="stamp"/>
                    </p>
                    <ul class="listOfPlus">
                        <li v-for="text in item.text" :key="text">{{text}}</li>
                    </ul>
                    <a :href="item.link" class="linkCat">
                        <span>{{item.title2}}</span>
                        <img width="50"
                             :src="getImgUrl('oktocat')"
                             class=""/>
                    </a>
                </div>
            </v-carousel-item>
        </v-carousel>
    </div>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		name: "projects",
		data () {
			return {
				items: []
			}
		},
		methods: {
			getImgUrl (icon) {
				const images = require.context('../../images/', false, /\.png$/);
				return images('./' + icon + ".png")
			}
		},
		computed: {
			...mapGetters({
				getProjects: 'getProjects'
			})
		},
		mounted () {
			this.$store.dispatch('getProjectsAsync').then(data => {
				this.$store.commit('setProjects', data);
			}).then(() => {
				this.items = this.getProjects;
			})
		}
	}
</script>

<style scoped lang="scss">
    @import "projects.scss";
</style>