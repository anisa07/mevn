<template>
    <div class="aboutContainer" :class="$mq">
        <div class="bg-half deep-purple"></div>
        <div class="contentContainer lighten-5">
            <p class="aboutTitle section_title transparent" :class="$mq">About me</p>
            <div class="aboutContent">
                <div v-for="item,i in items" class="item">
                    <div class="titleContainer"><img :src="getImgUrl(item.icon)" class="itemImg"/> <span
                            class="itemTitle">{{item.title}}</span></div>
                    <p @click="changeText(i)" class="itemText">{{item.text[item.index]}}</p>
                </div>
                <!--<v-layout row wrap>-->
                <!--<v-flex v-for="i in items.slice(0, 5)" :key="i.tooltip">-->
                <!--<v-tooltip top>-->
                <!--<div slot="activator" class="imageContainer">-->
                <!--<img :src="getImgUrl(i.pic)"/>-->
                <!--<span class="label">{{i.label}}</span>-->
                <!--</div>-->
                <!--<span>{{i.tooltip}}</span>-->
                <!--</v-tooltip>-->
                <!--</v-flex>-->
                <!--</v-layout>-->
                <!--<v-layout row wrap>-->
                <!--<v-flex v-for="i in items.slice(5)" :key="i.tooltip">-->
                <!--<v-tooltip top>-->
                <!--<div slot="activator" class="imageContainer">-->
                <!--<img :src="getImgUrl(i.pic)"/>-->
                <!--<span class="label">{{i.label}}</span>-->
                <!--</div>-->
                <!--<span>{{i.tooltip}}</span>-->
                <!--</v-tooltip>-->
                <!--</v-flex>-->
                <!--</v-layout>-->
            </div>
        </div>
    </div>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		name: "about",
		data () {
			return {
				items: [],
			}
		},
		methods: {
			getImgUrl (icon) {
				const images = require.context('../../images/', false, /\.png$/);
				return images('./' + icon + ".png")
			},
			changeText (i) {
				let copy = JSON.parse(JSON.stringify(this.items));
				let index = copy[i].index;
				if (index + 1 < copy[i].text.length) {
					index += 1;
				} else {
					index = 0;
				}
				copy[i].index = index;
				this.items = copy;
			}
		},
		computed: {
			...mapGetters({
				getAboutMe: 'getAboutMe'
			})
		},
		mounted () {
			this.$store.dispatch('getAboutMeAsync').then(data => {
				this.$store.commit('setAboutMe', data);
			}).then(() => {
				this.items = this.getAboutMe.map(about => {
					about.index = 0;
					return about;
				});
			})
		}
	}
</script>

<style lang="scss" scoped>
    @import 'about.scss';
</style>