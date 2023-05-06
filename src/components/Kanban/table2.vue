<template>
  <div>
    <div v-if="domConfig.legend && domConfig.data.length > 0" class="Tb-box">
      <div class="Tb-title">
        <el-row>
          <!--注释部分是平均宽度，现用麦吉丽的需求，宽度第一列多12%-->
          <!--<el-col :style="{'width':parseInt(100/domConfig.legend.length)+'%'}" v-for="item in domConfig.legend">{{item}}</el-col>-->
          <el-col v-for="(item,key) in domConfig.legend" :key="key" :style="{'width':key == 0 ? parseInt(100/domConfig.legend.length + 12)+'%' : parseInt(100/domConfig.legend.length - (12/(domConfig.legend.length-1)))+'%'}">{{ item }}</el-col>
        </el-row>
      </div>
      <vue-seamless-scroll :data="domConfig.data" :class-option="optionSingleHeight" class="seamless-warp">
        <div class="Tb-content">
          <el-row v-for="(item,index) in domConfig.data" :key="index">
            <!--  <el-col :style="{'width':parseInt(100/domConfig.legend.length)+'%'}" v-for="it in item" :title="it">{{it==""?"...":it}}</el-col>-->
            <!-- it==""?"...":it -->
            <el-col v-for="(it,key) in item" :key="key" :style="{'width':key == 0 ? parseInt(100/domConfig.legend.length + 12)+'%' : parseInt(100/domConfig.legend.length - (12/(domConfig.legend.length-1)))+'%'}" :title="it"><div v-html="formatList(it)"/></el-col>
          </el-row>
        </div>
      </vue-seamless-scroll>
      <!--<superslide :options="options" class="slideBox">
        <div class="bd">
          <ul>
            <li v-for="item in domConfig.data">
              <el-row>
                <el-col :span="(parseInt(24/item.length))" v-for="it in item" :title="it">{{it}}</el-col>
              </el-row>
            </li>
          </ul>
        </div>
      </superslide>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Table2',
  props: {
    // eslint-disable-next-line vue/require-prop-types
    domConfig: {
      default: []
    }
  },
  data() {
    return {
      options: {
        'mainCell': '.bd ul',
        'autoPlay': customCfg.list.vis,
        'effect': 'topMarquee',
        'vis': customCfg.list.vis,
        'interTime': customCfg.list.interTime,
        'trigger': customCfg.list.trigger
      }
    };
  },
  computed: {
    optionSingleHeight() {
      return {
        singleHeight: customCfg.list.singleHeight,
        limitMoveNum: customCfg.list.singleHeight,
        step: customCfg.list.step
      };
    }
  },
  methods: {
    formatList(text) {
      if (!text) return '';
      if (customCfg.list.format[text]) {
        return '<span class="list-item-fmt" style="background:' + customCfg.list.format[text] + '">' + text + '</span>';
      } else {
        return text;
      }
    }
  }
};
</script>

<style scoped>

</style>
