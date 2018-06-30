<template>
    <v-data-table
            :items="items"
            hide-actions
            class="elevation-1"
    >
        <template slot="items" slot-scope="props">
            <td class="text-xs-center" width="150px"><a :href="props.item.company.link"><img :src="getImgUrl(props.item.company.img)" width="70px"/></a></td>
            <td class="text-xs-justify grid-text indigo--text" width="250px">
                <div class="profession" v-for="profession in props.item.professions">{{profession}}</div>
            </td>
            <td class="text-xs-justify grid-text indigo--text" width="70px">{{ props.item.years }}</td>
        </template>
    </v-data-table>
</template>

<script>
	export default {
		name: "TableCompany",
		props: ['items'],
		methods: {
			getImgUrl (icon) {
				const images = require.context('../../images/', false, /\.png$/);
				return images('./' + icon + ".png")

			}
		}
	}
</script>

<style lang="scss" scoped>
    @import "../../components/variables.scss";

    .grid-text {
        font-size: 1.25em;
        font-family: $common-font;
    }
</style>