<template>
  <router-view :key="$route.path"/>
  <div>
    <div class="operator-box" v-if="render">
      <div class="operator-title">
        <span class="operator-title-name">Operator list</span>
      </div>
      <div class="operator-divider"></div>
      <div class="operator-content">
        <div class="operator-item" v-for="item in positions" :key="item.name">
          <el-row type="flex" align="middle">
            <el-col :span="12">
              <el-row type="flex" align="middle">
                <el-col :span="3">
                  <el-row type="flex" justify="center" align="middle">
                    <img class="iconName" :src="item.icon" :alt="item.name"/>
                  </el-row>
                </el-col>
                <el-col :span="18">
                  <el-row>
                    <el-col :span="24"
                    ><span class="symbolName">{{ item.name }}</span></el-col
                    >
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      <i class="el-icon-price-tag symbolDetail"></i
                      ><span class="symbolDetail"> 19000.12 </span>
                    </el-col>
                    <el-col :span="6">
                      <i class="el-icon-price-tag symbolDetail"></i
                      ><span class="symbolDetail"> 19000.12 </span>
                    </el-col>
                    <el-col :span="6">
                      <i class="el-icon-price-tag symbolDetail"></i
                      ><span class="symbolDetail"> 19000.12 </span>
                    </el-col>
                    <el-col :span="6">
                      <i class="el-icon-price-tag symbolDetail"></i
                      ><span class="symbolDetail"> 19000.12 </span>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row justify="end" type="flex">
                <el-col :span="4">
                  <router-link
                      :to="`/${platform}/${item.name}/${item.contractTypes[0].value}/${item.directions[0].value}/open`"
                  >
                    <el-button icon="el-icon-s-operation" circle></el-button
                    >
                  </router-link>
                  <!-- <router-link to="/operator/virtual"><el-button icon="el-icon-s-operation" circle></el-button></router-link> -->
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
  <div v-if="loading" v-loading="true" element-loading-text="正在查询..."/>
</template>
<script>
import {mapState, mapActions} from "vuex";

export default {
  data() {
    return {};
  },
  created() {
    this.queryPositions({platform: this.$route.params.platform});
  },
  computed: {
    ...mapState(["positions", "loading"]),
    platform() {
      return this.$route.params.platform;
    },
    render() {
      return this.$route.params.symbol === undefined;
    },
  },
  methods: {
    ...mapActions(["queryPositions"]),
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
};
</script>
<style>
.operator-box {
  width: 100%;
  background-color: white;
}

.operator-box .operator-divider {
  height: 1px;
  background-color: #e4e7ed;
  margin-right: 20px;
}

.operator-box .operator-title .operator-title-name {
  color: #606266;
}

.operator-box .operator-title {
  height: 50px;
  line-height: 50px;
  text-indent: 30px;
  margin-right: 20px;
}

.operator-box .operator-content {
  margin-top: 20px;
  margin-right: 20px;
  padding-bottom: 20px;
}

.operator-box .operator-item {
  margin-top: 10px;
  margin-left: 10px;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.operator-box .operator-item .iconName {
  width: 40px;
  height: 40px;
}

.operator-box .operator-item .symbolName {
  font-size: 18px;
  color: #606266;
}

.operator-box .operator-item .symbolDetail {
  font-size: 14px;
  color: #909399;
}
</style>
