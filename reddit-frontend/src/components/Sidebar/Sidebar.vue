<template>
	<div id="sidebar">
		<TopCommunities :communities="topCommunities"></TopCommunities>
		<TrendingCommunities :communities="trendingCommunities"></TrendingCommunities>
	</div>
</template>

<script>
import TopCommunities from './TopCommunities.vue'
import TrendingCommunities from './TrendingCommunities.vue'
import axios from 'axios'
// import HelloWorld from './components/HelloWorld.vue'

export default {
	name: 'Sidebar',
	components: {
		TopCommunities,
		TrendingCommunities
	},
	data() {
		return {
			product: null,
			topCommunities: null,
			trendingCommunities: null
		}
	},
	mounted() {
		axios
		.get('http://localhost:8080/api/community/top?count=5')
		.then( response => (this.topCommunities = response.data) )
		axios
		.get('http://localhost:8080/api/community/trending?count=5')
		.then( response => (this.trendingCommunities = response.data) )
	}
}
</script>

<style>
#sidebar {
	margin-left: 24px;
	margin-top: 28px;
	display: block;
	flex: 0 0 312px;
	width: 312px;
	flex-direction: column;
    font-family: IBMPlexSans, Arial, sans-serif;
    text-align: left;
}
li {
	display: list-item;
}
ol {
	margin: 0;
	padding: 0;
	list-style: none;
}
h2 {
	margin-top: 0px;
}
.nolinebreak {
	display: flex;
}
</style>
