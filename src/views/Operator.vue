<template>
  <div v-loading="!socket.connected">
    <el-row align="middle" type="flex" class="row">
      <el-col :span="2">
        <span class="title">初始化：</span>
      </el-col>
      <el-col :span="4">
        <el-input placeholder="请输入具体数量" @change="change('init.clients',$event)" :disabled="init.disabled"
                  v-model="init.clients">
          <template #prepend>客户端数</template>
        </el-input>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="4">
        <el-input
            placeholder="请输入时间"
            v-model="init.loadTime"
            @change="change('init.loadTime',$event)"
            :disabled="init.disabled"
            class="input-with-select"
        >
          <template #prepend>
            <el-select :disabled="init.disabled" @change="change('init.loadTimeType',$event)"
                       v-model="init.loadTimeType" placeholder="请选择">
              <el-option label="秒" value="second"></el-option>
              <el-option label="分" value="minute"></el-option>
              <el-option label="时" value="hour"></el-option>
            </el-select>
          </template>
          <template #append>
            启动预热
          </template>
        </el-input>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="4">
        <el-input :disabled="true" v-model="init.standbys">
          <template #prepend>就绪</template>
        </el-input>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="4">
        <el-switch v-model="init.start" :disabled="init.runDisabled" @change="change('init.start',$event)"
                   active-text="启动" inactive-text="停止" v-loading="init.startLoading"></el-switch>
      </el-col>
    </el-row>

    <div style="margin-top:40px"></div>
    <el-row align="middle" type="flex" class="row">
      <el-col :span="2">
        <span class="title">压测：</span>
      </el-col>
      <el-col :span="4">
        <el-input placeholder="localhost" @change="change('pressing.host',$event)"
                  :disabled="pressing.disabled" v-model="pressing.host">
          <template #prepend>Host</template>
        </el-input>
        <div style="height:20px"></div>
        <el-input placeholder="8080" @change="change('pressing.port',$event)"
                  :disabled="pressing.disabled" v-model="pressing.port">
          <template #prepend>Port</template>
        </el-input>
        <div style="height:20px"></div>
        <el-input disabled v-model="init.workings">
          <template #prepend>Workings</template>
        </el-input>

      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="4">
        <el-input
            placeholder="请输入时间"
            v-model="pressing.loadTime"
            @change="change('pressing.loadTime',$event)"

            :disabled="pressing.disabled"
            class="input-with-select"
        >
          <template #prepend>
            <el-select v-model="pressing.loadTimeType" @change="change('pressing.loadTimeType',$event)"
                       :disabled="pressing.disabled" placeholder="请选择">
              <el-option label="秒" value="second"></el-option>
              <el-option label="分" value="minute"></el-option>
              <el-option label="时" value="hour"></el-option>
            </el-select>
          </template>
          <template #append>
            压测预热
          </template>
        </el-input>
        <div style="height:20px"></div>
        <el-input placeholder="0" @change="change('pressing.dataLength',$event)"
                  :disabled="pressing.disabled" v-model="pressing.dataLength">
          <template #prepend>数据长度</template>
        </el-input>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="4">
        <el-input
            placeholder="每时间发送"
            v-model="pressing.betweenTime"
            @change="change('pressing.betweenTime',$event)"

            :disabled="pressing.disabled"
            class="input-with-select"
        >
          <template #prepend>
            <el-select v-model="pressing.betweenTimeType" @change="change('pressing.betweenTimeType',$event)"
                       :disabled="pressing.disabled" placeholder="请选择">
              <el-option label="秒" value="second"></el-option>
              <el-option label="分" value="minute"></el-option>
              <el-option label="时" value="hour"></el-option>
            </el-select>
          </template>
          <template #append>
            时间之内
          </template>
        </el-input>
        <div style="height:20px"></div>
        <el-input placeholder="elements" @change="change('pressing.sendElements',$event)"
                  :disabled="pressing.disabled" v-model="pressing.sendElements">
          <template #prepend>发送N条数据</template>
        </el-input>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="4">
        <el-switch v-model="pressing.start" @change="change('pressing.start',$event)"
                   :disabled="pressing.runDisabled" active-text="运行" inactive-text="停止"
                   v-loading="pressing.startLoading"></el-switch>
      </el-col>
    </el-row>

    <div style="margin-top:40px"></div>
    <el-row align="middle" type="flex" class="row">
      <el-col :span="2">
        <span class="title">释放：</span>
      </el-col>
      <el-col :span="4">
        <el-input
            placeholder="每时间发送"
            v-model="release.time"
            @change="change('release.time',$event)"

            :disabled="release.disabled"
            class="input-with-select"
        >
          <template #prepend>
            <el-select v-model="release.timeType" @change="change('release.timeType',$event)"
                       :disabled="release.disabled" placeholder="请选择">
              <el-option label="秒" value="second"></el-option>
              <el-option label="分" value="minute"></el-option>
              <el-option label="时" value="hour"></el-option>
            </el-select>
          </template>
          <template #append>
            时间
          </template>
        </el-input>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="4">
        <el-input placeholder="elements" @change="change('release.clients',$event)"
                  :disabled="release.disabled" v-model="release.clients">
          <template #prepend>释放N个客户端</template>
        </el-input>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="4">
        <el-switch v-model="release.start" @change="change('release.start',$event)"
                   :disabled="release.runDisabled" active-text="执行" inactive-text="停止"
                   v-loading="release.startLoading"></el-switch>
      </el-col>
    </el-row>


    <div style="margin-top:40px"></div>
    <el-row align="middle" type="flex" class="row">
      <el-col :span="2">
        <span class="title">曲线：</span>
      </el-col>
      <el-col :span="4">
        <el-input
            placeholder="每时间发送"
            v-model="online.online"
            @change="change('online.online',$event)"
            :disabled="online.disabled"
            class="input-with-select"
        >
          <template #prepend>
            <el-select v-model="online.timeType" @change="change('online.timeType',$event)"
                       :disabled="online.disabled" placeholder="请选择">
              <el-option label="秒" value="second"></el-option>
            </el-select>
          </template>
          <template #append>
            统计一次
          </template>
        </el-input>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="4">
        <el-input placeholder="limit" @change="change('online.onlineLimit',$event)" v-model="online.onlineLimit">
          <template #prepend>历史曲线</template>
        </el-input>
      </el-col>

    </el-row>


    <div style="margin-top:20px"></div>
    <el-row align="middle" type="flex" class="row">
      <v-chart v-if="option.show" class="chart" :option="option"/>
    </el-row>
  </div>

</template>
<script>
import {use} from "echarts/core";
import {CanvasRenderer} from "echarts/renderers";
import {PieChart, LineChart} from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import VChart, {THEME_KEY} from "vue-echarts";
import {ref, defineComponent} from "vue";
import * as echarts from 'echarts';

use([
  CanvasRenderer,
  PieChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

export default defineComponent({
  name: "UDP",
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: "auto"
  },
  setup: () => {
    const countries = ['client', 'server'];
    const datasetWithFilters = [];
    const seriesList = [];
    echarts.util.each(countries, function (country) {
      const datasetId = 'dataset_' + country;
      datasetWithFilters.push({
        id: datasetId,
        fromDatasetId: 'dataset_raw',
        transform: {
          type: 'filter',
          config: {
            and: [
              // {dimension: 'Year', gte: 1970},
              {dimension: 'Type', '=': country}
            ]
          }
        }
      });
      seriesList.push({
        type: 'line',
        datasetId: datasetId,
        showSymbol: false,
        name: country,
        endLabel: {
          show: true,
        },
        labelLayout: {
          moveOverlap: 'shiftY'
        },
        emphasis: {
          focus: 'series'
        },
        encode: {
          x: 'Time',
          y: 'Online',
          label: ['Type', 'Online'],
          itemName: 'Time',
          tooltip: ['Online'],
        }
      });
    });
    const option = ref({
      show: false,
      animationDuration: 1,
      dataset: [{
        id: 'dataset_raw',
        source: [["Online", "Type", "Time"]],
      }].concat(datasetWithFilters),
      title: {
        text: '在线人数'
      },
      tooltip: {
        order: 'valueDesc',
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        nameLocation: 'middle'
      },
      yAxis: {
        name: ''
      },
      grid: {
        right: 140
      },
      series: seriesList
    });

    const init = ref({
      disabled: true,
      runDisabled: false,
      start: false,
      startLoading: false,
      standbys: '0',
      workings: '0',
      clients: '1',
      loadTimeType: 'second',
      loadTime: '1'
    })
    const pressing = ref({
      disabled: true,
      runDisabled: false,
      start: false,
      startLoading: false,
      host: '',
      port: '',
      loadTimeType: 'second',
      loadTime: "1",
      dataLength: 0,
      betweenTimeType: 'second',
      betweenTime: "1",
      sendElements: "1"
    })
    const release = ref({
      disabled: true,
      runDisabled: false,
      start: false,
      startLoading: false,
      timeType: 'second',
      time: "1",
      clients: "1"
    })
    const socket = ref({
      connected: false
    })
    const online = ref({
      disable: false,
      online: "3",
      onlineLimit: "1000",
      timeType: "second"
    })

    return {option, init, pressing, release, socket, online};
  },
  methods: {
    connect(connect) {
      this.socket.connected = connect
    },
    change(key, e) {
      this[key] = e
      if (key.startsWith('init.')) {
        if (key.endsWith("start")) {
          this.ws.send(JSON.stringify({
            "type": "update",
            "data": {
              "initStart": e
            }
          }))
        } else {
          this.ws.send(JSON.stringify({
            "type": "update",
            "data": {
              "init": {
                "clients": parseInt(this.init.clients.toString()),
                "loadTime": {
                  "length": this.init.loadTime,
                  "unit": this.init.loadTimeType
                }
              }
            }
          }))
        }
      } else if (key.startsWith('pressing.')) {
        if (key.endsWith("start")) {
          this.ws.send(JSON.stringify({
            "type": "update",
            "data": {
              "pressingStart": e
            }
          }))
        } else {
          this.ws.send(JSON.stringify({
            "type": "update",
            "data": {
              "pressing": {
                "host": this.pressing.host,
                "port": parseInt(this.pressing.port.toString()),
                "loadTime": {
                  "length": parseInt(this.pressing.loadTime.toString()),
                  "unit": this.pressing.loadTimeType
                },
                "dataLength": parseInt(this.pressing.dataLength.toString()),
                "betweenTime": {
                  "length": parseInt(this.pressing.betweenTime.toString()),
                  "unit": this.pressing.betweenTimeType
                },
                "sendElements": parseInt(this.pressing.sendElements)
              }
            }
          }))
        }
      } else if (key.startsWith('release.')) {
        if (key.endsWith("start")) {
          this.ws.send(JSON.stringify({
            "type": "update",
            "data": {
              "releaseStart": e
            }
          }))
        } else {
          this.ws.send(JSON.stringify({
            "type": "update",
            "data": {
              "release": {
                "clients": this.release.clients,
                "time": {
                  "length": parseInt(this.release.time.toString()),
                  "unit": this.release.timeType
                }
              }
            }
          }))
        }
      } else if (key.startsWith('online.')) {
        this.ws.send(JSON.stringify({
          "type": "update",
          "data": {
            [key.split(".")[1]]: parseInt(e)
          }
        }))
      }
    },
    pushData(data) {
      if ("statistic" in data.data) {
        const dd = data.data.statistic;
        const source = [[dd.client, 'client', dd.time], [dd.server, 'server', dd.time]];
        if (!this.option.show) {
          this.option.show = true;
        }
        this.option.dataset = [{
          id: 'dataset_raw',
          source: this.option.dataset[0].source.concat(source),
        }, this.option.dataset[1], this.option.dataset[2]]
      }

      if (data.data.status === 'stop') {
        this.init.disabled = false;
        this.pressing.disabled = true;
        this.release.disabled = true;
        this.init.disabled = false;
        this.pressing.runDisabled = true;
        this.release.runDisabled = true;
      } else if (data.data.status === "init") {
        this.init.disabled = true;
        this.init.start = true;
        this.init.runDisabled = false;
        this.pressing.start = false;
        this.pressing.disabled = false;
        this.release.disabled = true;
        this.pressing.runDisabled = false;
        this.release.runDisabled = true;
      } else if (data.data.status === "pressing") {
        this.init.start = true;
        this.init.runDisabled = true;
        this.init.disabled = true;
        this.pressing.disabled = true;
        this.pressing.start = true;
        this.release.start = false;
        this.release.disabled = false;
        this.pressing.runDisabled = false;
        this.release.runDisabled = false;
      } else if (data.data.status === "release") {
        this.init.runDisabled = true;
        this.release.start = true;
        this.init.disabled = true;
        this.pressing.start = true;
        this.pressing.disabled = true;
        this.release.disabled = false;
      }

      if ("online" in data.data) {
        this.online.online = data.data.online;
      }
      if ("onlineLimit" in data.data) {
        this.online.onlineLimit = data.data.onlineLimit;
      }

      if ("standbys" in data.data) {
        this.init.standbys = data.data.standbys;
      }

      if ("workings" in data.data) {
        this.init.workings = data.data.workings;
      }

      if ("initInfo" in data.data) {
        const info = data.data.initInfo;
        this.init.clients = info.clients;
        this.init.loadTimeType = info.loadTime.unit;
        this.init.loadTime = info.loadTime.length;
      }

      if ("pressingInfo" in data.data) {
        const info = data.data.pressingInfo;
        this.pressing.host = info.hot;
        this.pressing.port = info.port;
        this.pressing.sendElements = info.sendElements;
        this.pressing.dataLength = info.dataLength;
        this.pressing.loadTime = info.loadTime.length;
        this.pressing.loadTimeType = info.loadTime.unit;
        this.pressing.betweenTime = info.betweenTime.length;
        this.pressing.betweenTimeType = info.betweenTime.unit;
      }

      if ("releaseInfo" in data.data) {
        const info = data.data.releaseInfo;
        this.release.time = info.time.length;
        this.release.timeType = info.time.unit;
        this.release.clients = info.clients;
      }

    },
    initData(data) {
      const source = [];
      data.data.statistics.forEach((s) => {
        source.push([
          s.client,
          'client',
          s.time
        ])
        source.push([
          s.server,
          'server',
          s.time
        ])
      })

      if (!this.option.show && data.data.statistics.length > 0) {
        this.option.show = true
        this.option.dataset = [{
          id: 'dataset_raw',
          source: this.option.dataset[0].source.concat(source),
        }, this.option.dataset[1], this.option.dataset[2]]
      }

      this.online.online = data.data.online;
      this.online.onlineLimit = data.data.onlineLimit;

      this.init.standbys = data.data.standbys;
      this.init.workings = data.data.workings;
      this.init.clients = data.data.infos.initInfo.clients;
      this.init.loadTimeType = data.data.infos.initInfo.loadTime.unit;
      this.init.loadTime = data.data.infos.initInfo.loadTime.length;

      this.pressing.host = data.data.infos.pressingInfo.host;
      this.pressing.port = data.data.infos.pressingInfo.port;
      this.pressing.sendElements = data.data.infos.pressingInfo.sendElements;
      this.pressing.loadTime = data.data.infos.pressingInfo.loadTime.length;
      this.pressing.loadTimeType = data.data.infos.pressingInfo.loadTime.unit;
      this.pressing.dataLength = data.data.infos.pressingInfo.dataLength;
      this.pressing.betweenTime = data.data.infos.pressingInfo.betweenTime.length;
      this.pressing.betweenTimeType = data.data.infos.pressingInfo.betweenTime.unit;

      this.release.time = data.data.infos.releaseInfo.time.length;
      this.release.timeType = data.data.infos.releaseInfo.time.unit;
      this.release.clients = data.data.infos.releaseInfo.clients;

      if (data.data.status === 'stop') {
        this.init.disabled = false;
        this.pressing.disabled = true;
        this.release.disabled = true;
        this.pressing.runDisabled = true;
        this.release.runDisabled = true;
      } else if (data.data.status === "init") {
        this.init.start = true;
        this.init.runDisabled = false;
        this.pressing.start = false;
        this.init.disabled = true;
        this.pressing.disabled = false;
        this.release.disabled = true;
      } else if (data.data.status === "pressing") {
        this.init.start = true;
        this.init.runDisabled = true;
        this.init.disabled = true;
        this.pressing.disabled = true;
        this.pressing.start = true;
        this.release.start = false;
        this.release.disabled = false;
      } else if (data.data.status === "release") {
        this.release.start = true;
        this.init.runDisabled = true;
        this.init.disabled = true;
        this.pressing.start = true;
        this.pressing.disabled = true;
        this.release.disabled = true;
      }
    }
  },
  created() {
    const host = window.location.host
    if(window.location.protocol === "http:"){
      console.log(`connect ws://${host}/ws/udp`)
      this.ws = new WebSocket(`ws://${host}/ws/udp`)
    }else{
      console.log(`connect wss://${host}/ws/udp`)
      this.ws = new WebSocket(`wss://${host}/ws/udp`)
    }
    this.ws.onmessage = (data) => {
      const dataJson = JSON.parse(data.data)
      console.log(dataJson)
      if (dataJson.type === "init") {
        this.initData(dataJson)
      } else if (dataJson.type === "push") {
        this.pushData(dataJson)
      }
    }
    this.ws.onopen = () => {
      console.log('open')
      this.connect(true)
    }
    this.ws.onclose = (e) => {
      console.log(e)
      this.connect(false)
    }
  }
});
</script>
<style>
.chart {
  height: 600px;
}

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

.el-select .el-input {
  width: 70px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
