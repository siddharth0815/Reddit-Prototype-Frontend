<template>
	<div id="trendingCommunities">
		<ol>
			<li class="list" :key="item.id" v-for="(item,index) in communities">
				<TrendingItem :item="item" :index="index"></TrendingItem>
			</li>
		</ol>
	</div>
</template>

<script>
import TrendingItem from "./TrendingItem"

export default {
	name: 'TrendingCommunities',
	components: {
		TrendingItem
	},
	props: ["communities"]
}
</script>

<style>
#trendingCommunities {
	background-color: white;
	color: #1a1a1b;
	fill: #1a1a1b;
	border: 1px solid #ccc;
	border-radius: 4px;
	overflow: visible;
}
.nolinebreak {
	display: flex;
}
.list {
	border-bottom: thin solid #edeff1;
}
</style>
