<template>
<div @click="modalFunc()">
	<transition name="fade" appear>
		<div class="modal-overlay" v-if="showModal" @click="showModal = false"></div>
	</transition>
	<transition name="slide" appear>
		<div class="modal" v-if="showModal">
			<h2>Please Sign In</h2>
			<button class="button" @click="modalFunc()">Close</button>
		</div>
	</transition>
</div>
</template>

<script>
export default {
	name: 'AlertModal',
	props: ['show'],
	data() {
		return{
			showModal: false,
		}
	},
	methods: {
		modalFunc() {
			this.showModal = false
			this.$emit("showModal",false)
		}
	},
	mounted() {
		this.showModal = this.show
	}
}
</script>

<style scoped>
.button {
    width: 120px;
    height: 32px;
    border: 1px solid #0079d3;
	border-radius: 9999px;
    background-color: white;
    color: #0279d2;
    font-weight: 700;
    padding: 0px 16px 0px 16px;
	margin-top: 10px;
}
.modal-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 98;
	background-color: rgba(0, 0, 0, 0.3);
}
.modal {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 99;

	width: 100%;
	max-width: 400px;
	background-color: #FFF;
	border-radius: 16px;

	padding: 25px;
}
h2 {
	color: #222;
	font-size: 32px;
	font-weight: 900;
	margin-bottom: 15px;
}
p {
	color: #666;
	font-size: 18px;
	font-weight: 400;
	margin-bottom: 15px;
}
.fade-enter-active,.fade-leave-active {
	transition: opacity .5s;
}
.fade-enter,.fade-leave-to {
	opacity: 0;
}
.slide-enter-active,.slide-leave-active {
	transition: transform .5s;
}
.slide-enter,.slide-leave-to {
	transform: translateY(-50%) translateX(100vw);
}
</style>