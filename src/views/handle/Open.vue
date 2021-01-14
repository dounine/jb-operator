<template>
  <el-row>
    <el-col :span="2">
      <span class="title">运行开关</span>
    </el-col>
    <el-col :span="21">
      <el-switch @change="runUpdate" active-value="true" inactive-value="false" v-model="slider.open.run" :loading="slider.open.runLoading"></el-switch>
    </el-col>
  </el-row>
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
          @change="reboundUpdate"
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
          @change="spreadUpdate"
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
          @change="schedulingUpdate"
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
          @change="timeoutUpdate"
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
          v-if="slider.open.config && slider.open.config.volume"
          :disabled="slider.open.config.volume.disable"
          :min="slider.open.config.volume.min"
          :max="slider.open.config.volume.max"
          :setup="slider.open.config.volume.setup"
          :marks="slider.open.config.volume.marks"
          :show-input="slider.open.config.volume.input"
          @change="volumeUpdate"
          v-model="slider.open.volume"
      >
      </el-slider>
    </el-col>
  </el-row>
</template>

<script>
import {mapState, mapActions} from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(['slider']),
  },
  methods: {
    ...mapActions(['update']),
    runUpdate(value) {
      const params = this.$route.params;
      this.update({
        symbol: params.symbol,
        contractType: params.contractType,
        platform: params.platform,
        direction: params.direction,
        name: "run",
        value: `${value}`
      })
    },
    volumeUpdate(value) {
      const params = this.$route.params;
      const offset = params.offset;
      this.update({
        symbol: params.symbol,
        contractType: params.contractType,
        platform: params.platform,
        direction: params.direction,
        name: `${offset}Volume`,
        value: `${value}`
      })
    },
    schedulingUpdate(value) {
      const params = this.$route.params;
      const offset = params.offset;
      this.update({
        symbol: params.symbol,
        contractType: params.contractType,
        platform: params.platform,
        direction: params.direction,
        name: `${offset}Scheduling`,
        value: `${value}`
      })
    },
    timeoutUpdate(value) {
      const params = this.$route.params;
      const offset = params.offset;
      this.update({
        symbol: params.symbol,
        contractType: params.contractType,
        platform: params.platform,
        direction: params.direction,
        name: `${offset}EntrustTimeout`,
        value: `${value}`
      })
    },
    spreadUpdate(value) {
      const params = this.$route.params;
      const offset = params.offset;
      this.update({
        symbol: params.symbol,
        contractType: params.contractType,
        platform: params.platform,
        direction: params.direction,
        name: `${offset}TriggerPriceSpread`,
        value: `${value}`
      })
    },
    reboundUpdate(value) {
      const params = this.$route.params;
      const offset = params.offset;
      this.update({
        symbol: params.symbol,
        contractType: params.contractType,
        platform: params.platform,
        direction: params.direction,
        name: `${offset}ReboundPrice`,
        value: `${value}`
      })
    }
  },
  created() {
    console.log("open createed");
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
