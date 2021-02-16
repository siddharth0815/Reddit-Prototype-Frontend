<template>
	<div id="topCommunities">
		<div class="header">
			<h2 class="banner"> Top Communities </h2>
		</div>
		<ol>
			<li class="list" :key="item.id" v-for="(item,index) in communities">
				<TopItem :item="item" :index="index"></TopItem>
			</li>
		</ol>
	</div>
</template>

<script>
import TopItem from "./TopItem"

export default {
	name: 'TopCommunities',
	components: {
		TopItem
	},
    props: ["communities"],
   
}
</script>

<style>
#topCommunities {
	background-color: white;
	color: #1a1a1b;
	fill: #1a1a1b;
	border: 1px solid #ccc;
	border-radius: 4px;
	overflow: visible;
	justify-content: center;
	margin-bottom: 50px;
}
.list {
	border-bottom: thin solid #edeff1;
}
.header {
	background-color: #0079d3;
    background-position: 50%;
    background-repeat: no-repeat;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    height: 80px;
    position: relative;
}
.banner {
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    bottom: 8px;
    color: #fff;
    left: 16px;
    position: absolute;
    vertical-align: baseline;
    margin: 0;
    padding: 0;
    border: 0;
    line-height: 20px;
}
</style>