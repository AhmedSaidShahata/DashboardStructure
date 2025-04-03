<template>
    <v-btn color="primary"  variant="flat" v-bind="$attrs" class="font-size-10 font-weight-bold">
        <Image v-if="icon" class="me-2" :name="icon" />
        <slot/>
    </v-btn>
</template>

<script setup>
defineProps(['icon'])
</script>