<template>
  <el-row type="flex" justify="end">
    <div style="height: 40px" class="status">
      <div
          :class="'statusItem' + (status === s.value ? ' active' : '')"
          v-for="(s, index) in statusList"
          :key="s.value"
      >
        <span>{{ s.name }}</span>
        <el-divider direction="vertical" v-if="index !== statusList.length - 1"></el-divider>
      </div>
    </div>
  </el-row>
  <div>
    <el-tabs v-model="offset" @tab-click="offsetHandleClick">
      <el-tab-pane label="开仓" name="open">
        <Open/>
      </el-tab-pane>
      <el-tab-pane label="平仓" name="close">
        <Close/>
      </el-tab-pane>
      <el-tab-pane label="计划委托" name="triggerEntrust">计划委托</el-tab-pane>
      <el-tab-pane label="委托" name="entrust">委托</el-tab-pane>
      <el-tab-pane label="设置" name="settings">设置</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Open from "./Open.vue";
import Close from "./Close.vue";
import {mapActions, mapState} from 'vuex';

export default {
  data() {
    return {
      // status: "Closed",
      statusList: [
        {
          value: "Stoped",
          name: "已停止",
        },
        {
          value: "Stopping",
          name: "停止中",
        },
        {
          value: "OpenTriggering",
          name: "开仓中",
        },
        {
          value: "OpenEntrusted",
          name: "开仓已委托",
        },
        {
          value: "OpenMatched",
          name: "开仓已匹配",
        },
        {
          value: "Opened",
          name: "已开仓",
        },
        {
          value: "OpenErrored",
          name: "开仓错误"
        },
        {
          value: "CloseTriggering",
          name: "平仓中",
        },
        {
          value: "CloseEntrusted",
          name: "平仓已委托",
        },
        {
          value: "CloseMatched",
          name: "平仓已经匹配",
        },
        {
          value: "Closed",
          name: "已平仓",
        },
        {
          value: "CloseErrored",
          name: "平仓错误"
        },
      ],
      offset: this.$route.params.offset,
      symbolInfo: {},
    };
  },
  computed: {
    ...mapState(['status']),
  },
  methods: {
    ...mapActions(['infoChange']),
    offsetHandleClick(tab) {
      const params = this.$route.params;
      this.$router.push({
        path: `/${params.platform}/${params.symbol}/${params.contractType}/${params.direction}/${tab.props.name}`,
      });
      this.infoChange({
        platform: params.platform,
        symbol: params.symbol,
        contractType: params.contractType,
        direction: params.direction,
        offset: tab.props.name
      })
    },
  },
  components: {
    Open,
    Close
  },
};
</script>
<style>
.statusItem {
  float: left;
  font-size: 13px;
  /* margin: 4px; */
  color: #cccccc;
}

.active {
  color: #52c41a;
}
</style>
