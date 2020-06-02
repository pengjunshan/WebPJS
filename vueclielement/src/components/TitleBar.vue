<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{yj}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ej}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'titlebar',
  data() {
    return {}
  },
  props: ['yj', 'ej']
}
</script>

<style lang="less" scoped>
</style>