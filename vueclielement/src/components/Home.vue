<template>
  <el-container>
    <el-header>
      <div>
        <img src="../assets/img/icon_title.png" />
        <span>杭州柯林电气操作系统</span>
      </div>
      <el-button type="info" round @click="logout">退出登录</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse? '64px':'200px' ">
        <!-- 左侧菜单开关按钮 -->
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 左侧菜单区域 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="activePath"
          router
        >
          <!-- 一级菜单 :index设置不同的id打开一个一级菜单其它的菜单都关闭 -->
          <el-submenu :index="item.id + '' " v-for="item in menulist" :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/'+subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/'+subItem.path)"
            >
              <!-- 二级菜单的模板区域 -->
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容区域 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单数据
      menulist: [],
      //一级菜单图标
      iconsObj: {
        "125": "el-icon-user-solid",
        "103": "el-icon-s-help",
        "101": "el-icon-ship",
        "102": "el-icon-truck",
        "145": "el-icon-set-up"
      },
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: ""
    };
  },
  created() {
    this.getMenuList();
    //获取需要激活菜单的index
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    /**
     * 退出时 需要把token和当前高亮菜单index从sessionStorage中移除掉
     */
    logout() {
      window.sessionStorage.removeItem("vuetoken");
      window.sessionStorage.removeItem("activePath");
      this.$router.push("/login");
    },
    // 获取菜单接口
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      console.log(res);
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.menulist = res.data;
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    }
  }
};
</script>
<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    img{
      width: 50px;
      height: 50px;
    }
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  height: 100%;
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>