<template>
    <img v-bind="$attrs" :src="`/public/assets/images/${name}`" />
</template>
<script lang="js" setup>
defineProps(['name']);
</script>