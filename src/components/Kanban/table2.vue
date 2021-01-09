<template>
  <div>
    <div class="Tb-box"  v-if="domConfig.legend && domConfig.data.length > 0">
      <div class="Tb-title">
        <el-row>
          <!--注释部分是平均宽度，现用麦吉丽的需求，宽度第一列多12%-->
          <!--<el-col :style="{'width':parseInt(100/domConfig.legend.length)+'%'}" v-for="item in domConfig.legend">{{item}}</el-col>-->
          <el-col :style="{'width':key == 0 ? parseInt(100/domConfig.legend.length + 12)+'%' : parseInt(100/domConfig.legend.length - (12/(domConfig.legend.length-1)))+'%'}" v-for="(item,key) in domConfig.legend">{{item}}</el-col>
        </el-row>
      </div>
      <vue-seamless-scroll :data="domConfig.data" :class-option="optionSingleHeight" class="seamless-warp">
         <div class="Tb-content">
             <el-row v-for="item in domConfig.data">
             <!--  <el-col :style="{'width':parseInt(100/domConfig.legend.length)+'%'}" v-for="it in item" :title="it">{{it==""?"...":it}}</el-col>-->
               <el-col :style="{'width':key == 0 ? parseInt(100/domConfig.legend.length + 12)+'%' : parseInt(100/domConfig.legend.length - (12/(domConfig.legend.length-1)))+'%'}" v-for="(it,key) in item" :title="it">{{it==""?"...":it}}</el-col>
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
    name: 'table2',
    data(){
      return {
        options: {
          "mainCell": ".bd ul",
          "autoPlay": true,
          "effect": "topMarquee",
          "vis": 5,
          "interTime": 50,
          "trigger": "click"
        }
      }
    },
    props: {
      domConfig: {
        default: []
      }
    },
    computed: {
      optionSingleHeight () {
        return {
          singleHeight: 70
        }
      }
    },
  }
</script>

<style scoped>

</style>
