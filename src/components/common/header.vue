<template>
  <div class="nav flex-center" style="height: 40px">
    <van-icon name="arrow-left" class="icon" @click="$router.back()" />
    <p>{{title}}</p>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>
