<template>
  <div class="nav">
    <el-page-header @back="goBack" content="操作页面" />
  </div>
  <div>
    <el-radio-group v-model="contractType" @change="switchContractType">
      <el-radio-button label="quarter"></el-radio-button>
      <el-radio-button label="next_quarter"></el-radio-button>
      <el-radio-button label="this_week"></el-radio-button>
      <el-radio-button label="next_week"></el-radio-button>
    </el-radio-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      contractType: this.$route.params.contractType || "quarter",
      symbolInfo: {},
    };
  },
  created() {
    // this.initContractType();
  },
  methods: {
    goBack() {
      this.$router.push({
        path: `/operator/${this.$route.params.platform}`,
      });
    },
    switchContractType(contractType) {
      this.contractType = contractType;
      const params = this.$route.params;
      this.$router.push({
        path: `/operator/${params.platform}/${params.symbol}/${contractType}/${params.direction}/${params.offset}`,
      });
    },
    initContractType() {
      this.contractType = this.$route.params.contractType || "quarter";
    },
  },
};
</script>
<style>
.nav {
  padding: 10px;
}
</style>
