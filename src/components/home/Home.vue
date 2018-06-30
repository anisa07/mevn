<template>
    <div>
        <div class="homeContainer" :class="$mq">
            <p class="homeTitle" :class="$mq">Hi I'm <span class="emf" :class="$mq">Roman Iovlev</span> master of <span
                    class="emf" :class="$mq">JDI</span></p>
            <p class="homeSubtitle" :class="$mq">I'm a Test Automation Chief in EPAM. This is my portfolio and blog.
                Here I'm sharing thoughts,
                experience, ideas,
                and some useful stuff. Thanks for visiting, hope you enjoy this!</p>
            <div class="homeContacts" :class="$mq">
                <p class="copyTitle">Left click to copy contact</p>
                <a v-clipboard:copy="facebook"><img src="../../images/facebook.png"/></a>
                <a v-clipboard:copy="skype"><img src="../../images/skype.png"/></a>
                <a v-clipboard:copy="vk"><img src="../../images/vk.png"/></a>
                <a v-clipboard:copy="gmail"><img src="../../images/gmail.png"/></a>
            </div>
        </div>
        <div ref="about">
            <about/>
        </div>
        <div ref="experience">
            <experience/>
        </div>
        <div ref="projects">
            <projects/>
        </div>
        <div ref="awards">
            <awards/>
        </div>
        <div ref="contacts">
            <contacts/>
        </div>
    </div>
</template>

<script>
	import about from '../about/About';
	import experience from '../experience/Experience';
	import projects from '../projects/Projects';
	import awards from '../awards/Awards';
	import contacts from '../contacts/Contacts';

	export default {
		name: "home",
		components: {
			about,
			awards,
			experience,
			projects,
			contacts,
		},
		methods: {
			navigate (refName) {
				const element = this.$refs[refName];
				const top = element.offsetTop;
				window.scrollTo(0, top);
			},
			onCopy: function (e) {
				alert('You just copied: ' + e.text)
			},
			handleCopyStatus (status) {
				console.log(status);
				this.copySucceeded = status;
			}
		},
		data () {
			return {
				facebook: `https://www.facebook.com/romanyister`,
				vk: `https://vk.com/riovlev`,
                gmail: `roman.Iovlev.jdi@gmail.com`,
                skype: `roman.iovlev`,
				copySucceeded: null
			}
		}
	}
</script>

<style lang="scss" scoped>
    @import 'home.scss';
</style>