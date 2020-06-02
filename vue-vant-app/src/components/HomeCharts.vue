<template>
  <div>
    <!-- chart图表 -->
    <div :id="itemid" class="chart-trend" style="height: 10rem"></div>
    <div class="tip"></div>
     <van-loading class="loading" v-show="loadShow" type="spinner" color="#016763" />
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      chartOption: {
        title: {
          text: "压力趋势图",
          show: false,
          left: "center",
          top: 0,
          textStyle: {
            fontSize: 13
          }
        },
        tooltip: {
          triggerOn: "click", //触发方式
          enterable: true, // 鼠标可移入tooltip中
          trigger: "axis",
          axisPointer: {
            animation: false
          }
        },
        grid: {
          top: 40,
          left: 10,
          right: 20,
          bottom: 40,
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: []
        },
        yAxis: {
          type: "value",
          name: "单位:bar",
          nameTextStyle: {
            fontSize: 11,
            align: "center"
          }
        },
        toolbox: {
          show: false
        },
        dataZoom: [
          {
            show: false,
            id: "dataZoomX",
            start: 0,
            end: 100,
            height: "26",
            handleIcon:
              "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            handleSize: "80%",
            handleStyle: {
              color: "#fff",
              shadowBlur: 3,
              shadowColor: "rgba(0, 0, 0, 0.6)",
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          },
          {
            type: "inside",
            start: 0,
            end: 0
          },
          {
            show: false,
            id: "dataZoomY",
            type: "slider",
            yAxisIndex: [0],
            filterMode: "empty",
            width: "24",
            handleIcon:
              "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            handleSize: "80%",
            handleStyle: {
              color: "#fff",
              shadowBlur: 3,
              shadowColor: "rgba(0, 0, 0, 0.6)",
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            left: 0,
            start: 0,
            end: 100
          }
        ],
        legend: {
          show: false,
          left: "right",
          top: 3
        },
        color: ["#008000"],
        series: [
          {
            type: "line",
            smooth: true,
            showSymbol: true,
            data: []
          }
        ]
      },
      paramsObj: {
        meterId: "",
        updateTime: ""
      },
      meterId: "",
      updateTime: "",
      picValue: "",
      meterName: "",
      pressure: "",
      picUpdateTime: "",
      loadShow:false,
    };
  },
  props: ["itemid", "itemdata", "meterThreshold","meterList"],
  created() {
    let _this = this;
    window.chartClick = _this.chartClick;
  },
  mounted() {
    let myChart = echarts.init($(`#${this.itemid}`).get(0));
    $(".tip").text("加载数据中...");
    let listData = this.itemdata.meterHistList.map(function(item) {
      return item.pressure;
    });
    let xAxisList = this.itemdata.meterHistList.map(function(item) {
      return item.updateTime;
    });
    
    listData = listData.map(item => {
      return item > 3.5 ? 3.5 : item;
    });

    xAxisList = xAxisList.map(item => {
      return item.substring(0, item.length - 3);
    });

    let topAttention = this.meterThreshold.codeAttention; //注意
    let topAlarm = this.meterThreshold.codeAlarm; //告警
    let downAttention = this.meterThreshold.downAttention; //注意
    let downAlarm = this.meterThreshold.downAlarm; //告警
    this.setChatData(
      myChart,
      this.chartOption,
      listData,
      xAxisList,
      topAttention,
      topAlarm,
      downAttention,
      downAlarm
    );
  },
  methods: {
    setChatData(
      chart,
      chartOption,
      listData,
      xAxisList,
      topAttention,
      topAlarm,
      downAttention,
      downAlarm
    ) {
      if (typeof listData == "undefined" || listData.length === 0) {
        $(".tip").text("暂无数据");
      } else {
        $(".tip").text("");
        /**
         * true是温度
         */
        if (
          topAttention != undefined &&
          topAttention != 0 &&
          topAlarm != undefined &&
          topAlarm != 0
        ) {
          chartOption.visualMap = {
            show: false,
            top: 10,
            right: 10,
            pieces: [
              {
                lte: 50,
                color: "#C23531"
              },
              {
                gt: 50,
                lte: 100,
                color: "#FFD700"
              },
              {
                gt: 100,
                lte: 150,
                color: "#53A0E9"
              },
              {
                gt: 150,
                lte: 200,
                color: "#FFD700"
              },
              {
                gt: 200,
                color: "#C23531"
              }
            ],
            outOfRange: {
              color: "#999"
            }
          };
          chartOption.visualMap.pieces[0].lte = downAlarm;
          chartOption.visualMap.pieces[1].gt = downAlarm;
          chartOption.visualMap.pieces[1].lte = downAttention;
          chartOption.visualMap.pieces[2].gt = downAttention;
          chartOption.visualMap.pieces[2].lte = topAttention;
          chartOption.visualMap.pieces[3].gt = topAttention;
          chartOption.visualMap.pieces[3].lte = topAlarm;
          chartOption.visualMap.pieces[4].gt = topAlarm;

          // chartOption.series[0].markLine.data[0].yAxis = "" + downAlarm;
          // chartOption.series[0].markLine.data[1].yAxis = "" + downAttention;
          // chartOption.series[0].markLine.data[2].yAxis = "" + topAttention;
          // chartOption.series[0].markLine.data[3].yAxis = "" + topAlarm;
        } else {
          chartOption.visualMap = "";
        }
        chartOption.series[0].data = listData;
        chartOption.xAxis.data = xAxisList;
        chartOption.yAxis.min = 0;
        chartOption.yAxis.max = 3.5;
        chartOption.dataZoom[0].show = true;
        chartOption.dataZoom[2].show = false;
        chartOption.tooltip.formatter = this.showTipMsg(listData);
        chart.setOption(chartOption, true);
      }
    },
    showTipMsg(listData) {
      return params => {
        var html = "";
        if (params.length > 0) {
          html += params[0].name + "<br>";
          for (var int = 0; int < params.length; int++) {
            if (int == 0) {
              let meterId = this.itemdata.meterId;
              let updateTime = this.itemdata.updateTime;
              html +=
                params[0].marker +
                '<span class="valueSpan"> ' +
                listData[params[0].dataIndex] +
                " bar</span><br>" +
                '<div onclick="chartClick(' +params[0].dataIndex +','+this.itemid+')" class="imgDiv" style="height: 2.5rem; text-align: center;">' +
                '<img class="divImg"  style="display: inline-block; max-width: 80%; max-height: 100%; width: 6rem; height: 2.5rem; text-align: center; vertical-align: middle;" src="http://220.189.213.2:44045/pressure-meter/meterController/download?meterId=' +
                meterId +
                "&updateTime=" +
                updateTime +
                '" data-type ="' +
                params[0].dataIndex +
                '" id="specialLook"></img></div>';
            }
          }
        }
        return html;
      };
    },
    chartClick(index,itemid) {
      let itemData;
      this.meterList.forEach((item,index)=>{
          if(item.meterId === itemid){
              console.log(itemid)
              itemData = item;
          }
      })
      let meterId = itemData.meterHistList[index].meterId;
      let updateTime = itemData.meterHistList[index].updateTime;
      let pressure = itemData.meterHistList[index].pressure;
      let title = itemData.meterHistList[index].meterName;

      this.paramsObj.meterId = meterId;
      this.paramsObj.updateTime = updateTime;
      this.updateTime = updateTime;
      this.meterId = meterId;
      this.picValue = pressure;
      this.meterName = title;
      this.getPicValue();
    },
    getPicValue() {
       this.loadShow = true;
      this.$http
        .get("/getPicValue", { params: this.paramsObj })
        .then(response => {
          if (response.data) {
            if (response.status === 200) {
              this.loadShow = false;
              this.pressure = response.data.data;
              this.picUpdateTime = response.data.picUpdateTime;
              this.toPressuer();
            } else {
              this.loadShow = false;
              this.$toast("接口请求失败1");
            }
          }
        })
        .catch(err => {
           this.loadShow = false;
          this.$toast("接口请求失败2");
        });
    },
    toPressuer() {
      this.$router.push({
        name: "pressure",
        params: {
           meterThreshold:this.meterThreshold,
          meterId: this.meterId,
          updateTime: this.updateTime,
          meterName: this.meterName,
          pressure: this.pressure,
          picUpdateTime: this.picUpdateTime,
          picValue: this.picValue
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.tip {
  position: absolute;
  left: 50%;
  font-size: 0.6rem;
  color: #333333;
  transform: translate(-50%, -5.5rem);
}
.loading {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>