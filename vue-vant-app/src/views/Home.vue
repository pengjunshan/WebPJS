<template>
  <div class="home">
    <!-- titleBar -->
    <van-sticky>
      <div class="titleBar">
        <div class="pp1">
          <van-icon size="1.2rem" class="leftArrowIV" name="arrow-left" />
        </div>
        <div class="pp2">
          <span class="title-center">高抗表计监测</span>
        </div>
        <div class="pp3">
          <span class="right-one">其它</span>
          <span class="right-tow">确认</span>
        </div>
      </div>
    </van-sticky>

    <!-- 列表 -->
    <van-pull-refresh v-model="isLoading" :success-text="loadText" @refresh="onRefresh">
      <div class="list-div">
        <div class="item-div" v-for="(item,index) in meterCurr" :key="item.meterId">
          <!-- 头部信息 -->
          <div class="title-div">
            <div class="left-div">
              <span class="item-title">{{item.meterName}}：</span>
              <span v-if="item.pressure>meterThreshold.codeAlarm||item.pressure<meterThreshold.downAlarm" class="item-bar item-bar-alarm">{{item.pressure}} bar</span>
              <span v-else-if="item.pressure>meterThreshold.codeAttention||item.pressure<meterThreshold.downAttention" class="item-bar item-bar-attention">{{item.pressure}} bar</span>
              <span v-else class="item-bar">{{item.pressure}} bar</span>
            </div>
            <div class="item-time">{{item.picUpdateTime}}</div>
          </div>
          <div class="item-line"></div>
          <!-- Title&图片 -->
          <div class="chart-div">
            <van-row gutter="0">
              <van-col span="8"></van-col>
              <van-col class="chart-title" span="8" type="flex" align="center">压力趋势图</van-col>
              <van-col class="chart-img" span="8" type="flex" align="end">
                <van-image
                  radius="0.2rem"
                  width="4rem"
                  height="2.2rem"
                  :src="getImgUrl(item)"
                  @click="lookImg(item)"
                />
              </van-col>
            </van-row>
          </div>
          <!-- chart图表 -->
          <homecharts
            :itemid="item.meterId"
            :itemdata="meterList[index]"
            :meterThreshold="meterThreshold"
            :meterList="meterList"
          ></homecharts>
        </div>
      </div>
    </van-pull-refresh>

    <van-loading class="loading" v-show="loadShow" type="spinner" color="#016763" />
  </div>
</template>

<script>
import homecharts from "@/components/HomeCharts";
export default {
  name: "Home",
  data() {
    return {
      isLoading: false,
      loadText: "",
      loadShow: false,
      jsonData: "",
      //当前值集合
      meterCurr: [],
      //历史值集合
      meterList: [],
      //阈值信息
      meterThreshold: {},
      option: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
          }
        ]
      }
    };
  },
  components: { homecharts },
  created() {
    this.getRequest();
  },
  mounted() {},
  methods: {
    getRequest() {
      this.loadShow = true;
      this.$http
        .get("/getMeterList")
        .then(response => {
          if (response.data) {
            console.log(response.data);
            if (response.data.code === 1) {
              if (this.jsonData === JSON.stringify(response.data.data)) {
                this.$toast('暂无数据更新!');
              } else {
                this.jsonData = JSON.stringify(response.data.data);
                this.meterThreshold = response.data.data.meterThreshold;
                this.meterList = response.data.data.meterList;
                this.meterCurr = response.data.data.meterCurr;
              }
              this.isLoading = false;
              this.loadText = "刷新成功";
              this.loadShow = false;
            } else {
              this.loadShow = false;
              this.loadText = "刷新失败";
              this.$toast(response.data.message);
            }
          }
        })
        .catch(err => {
          this.loadShow = false;
          this.loadText = "刷新失败";
          this.$toast("接口请求失败");
        });
    },
    getImgUrl(item) {
      return `http://220.189.213.2:44045/pressure-meter/meterController/download?meterId=${item.meterId}+&updateTime=${item.updateTime}`;
    },
    lookImg(item) {
      this.$router.push({
        name: "pressure",
        params: {
          meterThreshold:this.meterThreshold,
          meterId: item.meterId,
          updateTime: item.updateTime,
          meterName: item.meterName,
          pressure: item.pressure,
          picUpdateTime: item.picUpdateTime,
          picValue: item.picValue
        }
      });
    },
    onRefresh() {
      this.getRequest();
    }
  }
};
</script>

<style lang="less" scoped>
.loading {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.leftArrowIV,
.right-one,
.right-tow {
  visibility: hidden;
}
html,
body,
#app,
.home,
.list-div {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: #f7f7f7;
}

.list-div {
  padding-bottom: 1rem;
}

.item-div {
  background-color: white;
  border-radius: 0.2rem;
  margin: 0.5rem;
  padding:0.5rem 0.5rem 0 0.5rem;
  box-sizing: border-box;

  .title-div {
    display: flex;
    justify-content: space-between;
    .item-title{
      font-size: 0.8rem;
      font-weight: bold;
    }
    .item-bar,
    .item-time {
      font-size: 0.7rem;
    }
    .item-bar {
      color: #016763;
    }
    .item-bar-alarm{
      color: #ff4843;
    }
    .item-bar-attention{
      color: #ffa500;
    }
  }

  .item-line {
    height: 0.04rem;
    background-color: #e8e8e8;
    margin-top: 0.4rem;
  }

  .chart-div {
    margin-top: 0.2rem;
    .chart-title {
      color: #000000;
      font-size: 0.8rem;
      margin-top: 0.3rem;
    }
  }
}
</style>
