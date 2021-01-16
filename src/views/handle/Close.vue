<template>
  <el-row align="middle" type="flex" class="row">
    <el-col :span="2">
      <span class="title">信息</span>
    </el-col>
    <el-col :span="21">
      <span class="title" v-if="slider.close.profix">收益率：<span
          :style="slider.close.profix.indexOf('-')===-1?'color:green':'color:red'">{{
          slider.close.profix
        }}%</span></span>
    </el-col>
  </el-row>
  <el-row align="middle" type="flex" class="row">
    <el-col :span="2">
      <span class="title">实时(u)</span>
    </el-col>
    <el-col :span="21">
      <i class="el-icon-loading"
         v-if="!slider.close.config || !slider.close.config.online || slider.close.online.length ===0"></i>
      <el-slider
          v-if="slider.close.config && slider.close.config.online && slider.close.online.length >0"
          :disabled="slider.close.config.online.disable"
          :min="slider.close.config.online.min"
          :max="slider.close.config.online.max"
          :setup="slider.close.config.online.setup"
          :marks="slider.close.config.online.marks"
          :show-input="slider.close.config.online.input"
          v-model="slider.close.online"
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
          v-if="slider.close.config && slider.close.config.rebound"
          :disabled="slider.close.config.rebound.disable"
          :min="slider.close.config.rebound.min"
          :max="slider.close.config.rebound.max"
          :setup="slider.close.config.rebound.setup"
          :marks="slider.close.config.rebound.marks"
          :show-input="slider.close.config.rebound.input"
          @change="reboundUpdate"
          v-model="slider.close.rebound"
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
          v-if="slider.close.config && slider.close.config.spread"
          :disabled="slider.close.config.spread.disable"
          :min="slider.close.config.spread.min"
          :max="slider.close.config.spread.max"
          :setup="slider.close.config.spread.setup"
          :marks="slider.close.config.spread.marks"
          :show-input="slider.close.config.spread.input"
          @change="spreadUpdate"
          v-model="slider.close.spread"
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
          v-if="slider.close.config && slider.close.config.timeout"
          :disabled="slider.close.config.timeout.disable"
          :min="slider.close.config.timeout.min"
          :max="slider.close.config.timeout.max"
          :setup="slider.close.config.timeout.setup"
          :marks="slider.close.config.timeout.marks"
          :show-input="slider.close.config.timeout.input"
          @change="timeoutUpdate"
          v-model="slider.close.timeout"
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
          v-if="slider.close.config && slider.close.config.volume"
          :disabled="slider.close.config.volume.disable"
          :min="slider.close.config.volume.min"
          :max="slider.close.config.volume.max"
          :setup="slider.close.config.volume.setup"
          :marks="slider.close.config.volume.marks"
          :show-input="slider.close.config.volume.input"
          @change="volumeUpdate"
          v-model="slider.close.volume"
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
    console.log("close createed");
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
