<template>
    <v-data-table
            :items="items"
            hide-actions
            class="elevation-1"
    >
        <template slot="items" slot-scope="props">
            <td class="text-xs-justify grid-text indigo--text" width="150px">{{ props.item.profession }}</td>
            <td class="text-sm-center" width="250px"><a v-for="company in props.item.companies" :href="company.link"><img
                    :src="getImgUrl(company.img)" width="70px"/></a></td>
            <td class="text-xs-justify grid-text indigo--text years" width="70px">{{ props.item.years }}</td>
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
    @import "../../components/variables";
    .grid-text {
        font-size: 1.25em;
        font-family: $common-font;
    }
    .imgContainer {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto;
        justify-items: center;
        align-items: center;
    }
</style>