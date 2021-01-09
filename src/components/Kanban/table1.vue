<template>
  <div>
   <!-- <vue-seamless-scroll :data="domConfig" :class-option="optionSingleHeight" class="seamless-warps">-->
    <div class="seamless-warps" v-if="domConfig.legend && domConfig.data.length > 0">
      <el-row>
        <el-col v-for="item in domConfig.legend" :style="{'width':parseInt(100/domConfig.legend.length)+'%'}">
          <p><span></span>{{item}}</p>
        </el-col>
      </el-row>
      <el-row>
          <el-col v-for="item in domConfig.data[0]"  :style="{'width':parseInt(100/domConfig.legend.length)+'%'}">
            <div><span>{{item}}</span></div>
          </el-col>
      </el-row>
    </div>
    <!--</vue-seamless-scroll>-->
  </div>
</template>

<script>
  /**/
  export default {
    name: 'table1',
    props: {
      domConfig: {
        default: []
      }
    },
    computed: {
      optionSingleHeight () {
        return {
          singleHeight: 75
        }
      }
    },
  }
</script>

<style scoped>
  .firstLeftTop .el-row{
    height: auto;
    margin-top:.5rem;
    padding-top: 0;
  }
</style>
