<template>
  <router-view :key="$route.path" />
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
};
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  height: 100%;
}
html,
body,
.el-container {
  height: 100%;
  margin: 0px;
  padding: 0px;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  /* text-align: center; */
  /* line-height: 60px; */
}

.el-aside {
  /* background-color: #d3dce6; */
  color: #333;
  /* text-align: center; */
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  /* text-align: center; */
}

body > .el-container {
  /* height: 100%; */
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  /* line-height: 260px; */
}

.el-container:nth-child(7) .el-aside {
  /* line-height: 320px; */
}
a {
  text-decoration: none;
  color: #303133;
}
.router-link-active {
  color: #9cf;
}
</style>
