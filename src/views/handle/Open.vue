<template>
  <el-row align="middle" type="flex" class="row">
    <el-col :span="2">
      <span class="title">实时(u)</span>
    </el-col>
    <el-col :span="21">
      <i class="el-icon-loading"
         v-if="!slider.open.config || !slider.open.config.online || slider.open.online.length ===0"></i>
      <el-slider
          v-if="slider.open.config && slider.open.config.online && slider.open.online.length >0"
          :disabled="slider.open.config.online.disable"
          :min="slider.open.config.online.min"
          :max="slider.open.config.online.max"
          :setup="slider.open.config.online.setup"
          :marks="slider.open.config.online.marks"
          :show-input="slider.open.config.online.input"
          v-model="slider.open.online"
          range
      >
      </el-slider>
    </el-col>
  </el-row>
  <el-row align="middle" type="flex" class="row">
    <el-col :span="2">
      <span class="title">反弹(u)</span>
    </el-col>
    <el-col :span="21">
      <el-slider
          v-if="slider.open.config && slider.open.config.rebound"
          :disabled="slider.open.config.rebound.disable"
          :min="slider.open.config.rebound.min"
          :max="slider.open.config.rebound.max"
          :setup="slider.open.config.rebound.setup"
          :marks="slider.open.config.rebound.marks"
          :show-input="slider.open.config.rebound.input"
          v-model="slider.open.rebound"
      >
      </el-slider>
    </el-col>
  </el-row>
  <el-row align="middle" type="flex" class="row">
    <el-col :span="2">
      <span class="title">差价(u)</span>
    </el-col>
    <el-col :span="21">
      <el-slider
          v-if="slider.open.config && slider.open.config.spread"
          :disabled="slider.open.config.spread.disable"
          :min="slider.open.config.spread.min"
          :max="slider.open.config.spread.max"
          :setup="slider.open.config.spread.setup"
          :marks="slider.open.config.spread.marks"
          :show-input="slider.open.config.spread.input"
          v-model="slider.open.spread"
      >
      </el-slider>
    </el-col>
  </el-row>
  <el-row align="middle" type="flex" class="row">
    <el-col :span="2">
      <span class="title">调度(s)</span>
    </el-col>
    <el-col :span="21">
      <el-slider
          v-if="slider.open.config && slider.open.config.scheduling"
          :disabled="slider.open.config.scheduling.disable"
          :min="slider.open.config.scheduling.min"
          :max="slider.open.config.scheduling.max"
          :setup="slider.open.config.scheduling.setup"
          :marks="slider.open.config.scheduling.marks"
          :show-input="slider.open.config.scheduling.input"
          v-model="slider.open.scheduling"
      >
      </el-slider>
    </el-col>
  </el-row>
  <el-row align="middle" type="flex" class="row">
    <el-col :span="2">
      <span class="title">超时(s)</span>
    </el-col>
    <el-col :span="21">
      <el-slider
          v-if="slider.open.config && slider.open.config.timeout"
          :disabled="slider.open.config.timeout.disable"
          :min="slider.open.config.timeout.min"
          :max="slider.open.config.timeout.max"
          :setup="slider.open.config.timeout.setup"
          :marks="slider.open.config.timeout.marks"
          :show-input="slider.open.config.timeout.input"
          v-model="slider.open.timeout"
      >
      </el-slider>
    </el-col>
  </el-row>
  <el-row align="middle" type="flex" class="row">
    <el-col :span="2">
      <span class="title">数量(张)</span>
    </el-col>
    <el-col :span="21">
      <el-slider
          v-if="slider.open.config && slider.open.config.volumn"
          :disabled="slider.open.config.volumn.disable"
          :min="slider.open.config.volumn.min"
          :max="slider.open.config.volumn.max"
          :setup="slider.open.config.volumn.setup"
          :marks="slider.open.config.volumn.marks"
          :show-input="slider.open.config.volumn.input"
          v-model="slider.open.volumn"
      >
      </el-slider>
    </el-col>
  </el-row>
</template>

<script>
import {mapState, mapActions} from "vuex";

export default {
  data() {
    return {
      // online: [30, 60],
      // onlineConfig: {
      //   min: 0,
      //   max: 100,
      //   setup: 0.5,
      //   disable: true,
      //   input: false,
      //   marks: {
      //     0: "0",
      //     50: "50",
      //     100: "100",
      //   },
      // },
      // rebound: 10,
      // reboundConfig: {
      //   min: 0,
      //   max: 50,
      //   setup: 1,
      //   disable: false,
      //   input: false,
      //   marks: {
      //     0: "0",
      //     50: "50",
      //   },
      // },
      // spread: 30,
      // spreadConfig: {
      //   min: 0,
      //   max: 50,
      //   setup: 1,
      //   disable: false,
      //   input: false,
      //   marks: {
      //     0: "0",
      //     50: "50",
      //   },
      // },
      // scheduling: 10,
      // schedulingConfig: {
      //   min: 0,
      //   max: 50,
      //   setup: 1,
      //   disable: false,
      //   input: false,
      //   marks: {
      //     0: "0",
      //     50: "50",
      //   },
      // },
      // timeout: 3,
      // timeoutConfig: {
      //   min: 0,
      //   max: 60,
      //   setup: 1,
      //   disable: false,
      //   input: false,
      //   marks: {
      //     0: "0",
      //     60: "60",
      //   },
      // },
      // volumn: 1,
      // volumnConfig: {
      //   min: 0,
      //   max: 50,
      //   setup: 1,
      //   disable: false,
      //   input: true,
      //   marks: {
      //     0: "0",
      //     50: "50",
      //   },
      // },
    };
  },
  computed: {
    ...mapState(['slider']),
  },
  created() {
    console.log("buy createed");
  },
};
</script>
<style scoped>
.row {
  min-height: 70px;
}

.title {
  font-size: 14px;
}
</style>
