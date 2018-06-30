<template>
    <div class="expContainer">
        <p class="expTitle section_title">My experience</p>
        <v-tabs color="white" slider-color="deep-purple" class="tab3">
            <v-tab v-for="n in tabs" :key="n.title" ripple class="deep-purple--text">
                {{ n.title }}
            </v-tab>
            <v-tab-item>
                <v-card flat>
                    <table-personal :items="personalExperience"></table-personal>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <table-company :items="companyExperience"></table-company>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat></v-card>
            </v-tab-item>
        </v-tabs>
        <skills-cloud :items="skills" class="skills"></skills-cloud>
    </div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import TablePersonal from "../../controls/table/TablePersonal";
	import TableCompany from "../../controls/table/TableCompany";
	import SkillsCloud from "../../controls/tag-cloud/SkillsCloud";

	export default {
		name: "experience",

		components: {
			TableCompany,
			"table-personal": TablePersonal, "table-company": TableCompany, "skills-cloud": SkillsCloud
		},
		data () {
			return {
				tabs: [{ title: "Personal" }, { title: "Company" }, { title: "Skills" }],
				personalExperience: [],
				companyExperience: [],
				skills: []
			}
		},
		computed: {
			...mapGetters({
				getPersonalExperience: 'getPersonalExperience',
				getCompanyExperience: 'getCompanyExperience',
				getSkills: 'getSkills',
			}),
		},
		mounted () {
			this.$store.dispatch('getPersonalExperienceAsync').then(data => {
				this.$store.commit('setPersonalExperience', data);
			}).then(() => {
				this.personalExperience = this.getPersonalExperience
			});
			this.$store.dispatch('getCompanyExperienceAsync').then(data => {
				this.$store.commit('setCompanyExperience', data);
			}).then(() => {
				this.companyExperience = this.getCompanyExperience
			});
			this.$store.dispatch('getSkillsAsync').then(data => {
				this.$store.commit('setSkills', data);
			}).then(() => {
				this.skills = this.getSkills
			});
		},
	}
</script>

<style lang="scss" scoped>
    @import 'experience.scss';
</style>