<template>
	<div id="sidebar">
		<TopCommunities @forceRerender="topRerender" :key="topKey"></TopCommunities>
		<TrendingCommunities @forceRerender="trendingRerender" :key="trendingKey"></TrendingCommunities>
	</div>
</template>

<script>
import TopCommunities from './TopCommunities.vue'
import TrendingCommunities from './TrendingCommunities.vue'

export default {
	name: 'Sidebar',
	components: {
		TopCommunities,
		TrendingCommunities
	},
	data() {
		return {
			topKey: 0,
			trendingKey: 0
		}
	},
	mounted() {
		this.emitter.on('postVote', () => {
			this.trendingRerender();
		});
	},
	methods: {
		topRerender() {
			this.topKey++;
		},
		trendingRerender() {
			this.trendingKey++;
		}
	}
}
</script>

<style scoped>
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

</style>
