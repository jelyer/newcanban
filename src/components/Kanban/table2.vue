<template>
  <div>
    <div class="Tb-box" v-if="domConfig != []">
      <div class="Tb-title">
        <el-row>
          <el-col :span="(parseInt(24/domConfig.legend.length))"  v-for="item in domConfig.legend">{{item}}</el-col>
        </el-row>
      </div>
      <vue-seamless-scroll :data="domConfig.data" :class-option="optionSingleHeight" class="seamless-warp">
      <div class="Tb-content">
          <el-row v-for="item in domConfig.data">
            <el-col :span="(parseInt(24/item.length))" v-for="it in item" :title="it">{{it}}</el-col>
          </el-row>
      </div>
      </vue-seamless-scroll>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'table1',
    props: {
      domConfig: {
        type: Object,
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
