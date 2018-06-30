<template>
    <!--<v-navigation-drawer-->
    <!--width="150"-->
    <!--:mini-variant.sync="mini"-->
    <!--permanent-->
    <!--fixed-->
    <!--dark-->
    <!--hide-overlay-->
    <!--height="250px"-->
    <!--class="deep-purple base">-->
    <!--<v-toolbar flat class="transparent">-->
    <!--<v-list class="pa-0">-->
    <!--<v-list-tile>-->
    <!--<v-list-tile-action>-->
    <!--<v-btn icon @click.native.stop="mini = !mini">-->
    <!--<v-icon>menu</v-icon>-->
    <!--</v-btn>-->
    <!--</v-list-tile-action>-->
    <!--</v-list-tile>-->
    <!--</v-list>-->
    <!--</v-toolbar>-->
    <!--<v-list dense class="pt-0">-->
    <!--<v-list-tile v-for="item in items" :key="item.title" @click="" :to="item.path">-->
    <!--<v-list-tile-action>-->
    <!--<v-icon>{{ item.icon }}</v-icon>-->
    <!--</v-list-tile-action>-->
    <!--<v-list-tile-content>-->
    <!--<v-list-tile-title>{{ item.title }}</v-list-tile-title>-->
    <!--</v-list-tile-content>-->
    <!--</v-list-tile>-->
    <!--</v-list>-->
    <!--</v-navigation-drawer>-->

    <!--<v-container grid-list-md text-xs-center>-->
    <!--<v-layout row wrap>-->
    <!--<v-flex xs12 v-for="item in items" :key="item.title">-->
    <!--<router-link to="item.path">{{item.title}}</router-link>-->
    <!--</v-flex>-->
    <!--</v-layout>-->
    <!--</v-container>-->

    <v-toolbar class="deep-purple">
        <v-spacer></v-spacer>
        <v-toolbar-items class=" hidden-xs-and-down
    " v-for="item in items" :key="item.title">
    <router-link :to="item.path" :class="['routerItem', setActive === item.path ? 'active' : '' ]"
                 class="white--text">{{item.title}}
    </router-link>
    </v-toolbar-items>
    </v-toolbar>
</template>

<script>
	export default {
		name: "routers",
		data () {
			return {
				items: [
					{ title: 'Home', icon: 'home', path: "/" },
					// { title: 'Blog', icon: 'book', path: "/blog" },
					// { title: 'Lessons', icon: 'accessibility', path: "/lessons" },
					// { title: 'Events', icon: 'event', path: "/events" }
				],
				route: this.$route.path
			}
		},
		computed: {
			setActive () {
				return this.route = this.$route.path;
			}
		}
	}

</script>

<style lang="scss" scoped>
    @import 'routers.scss';
</style>