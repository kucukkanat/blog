<template>
    <div style="text-align: center">
        <img v-bind:src="$withBase('/images/'+imageSrc)" />
    </div>
</template>
<style scoped>
    img {
        border-radius: 1000px;
        max-height: 300px;
    }
</style>

<script>
export default {
    props: {
        imageSrc: ""
    }
}
</script>
