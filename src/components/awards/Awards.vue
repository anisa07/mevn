<template>
    <div class="awardsContainer">
        <p class="awardsTitle section_title">Awards</p>
        <!--<div class="circle">-->
        <!--<div class="item" :class="'item' + i" v-for="i in 8" :key="i">-->
        <!--<img class="img" src="../../images/star.png" width="100px"/>-->
        <!--<span>{{i}}</span>-->
        <!--</div>-->
        <!--</div>-->
        <div class="awards">
            <div v-for="item,i in items" :key="i">
                <div class="award" v-for="award in item" :key="award.text">
                    <img width="100px" :src="award.place === 1 ? getImgUrl('gold') : getImgUrl('silver')"/>
                    <p>{{award.text}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		name: "awards",
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
				getAwards: 'getAwards'
			})
		},
		mounted () {
			this.$store.dispatch('getAwardsAsync').then(data => {
				this.$store.commit('setAwards', data);
			}).then(() => {
				const data = this.getAwards;
				let i, j, temparray, chunk = 2;
				for (i = 0, j = data.length; i < j; i += chunk) {
					temparray = data.slice(i, i + chunk);
                    this.items.push(temparray);
				}
			})
		}
	}
</script>

<style scoped lang="scss">
    @import "awards";
</style>