<template>
  <div>
    <Header breadcrumb="字典信息" title="字典信息" />
    <div class="dictionary-information-container">
      <div class="form">
        Name:
        <el-input class="keyword" placeholder="请输入" clearable v-model="req.name">
        </el-input>
      </div>

      <!-- <el-row class="buttons-container">
      <el-col :span="24">
        <el-button type="primary" size="small" icon="el-icon-plus"
          >新建</el-button
        >
        <el-button type="warning" icon="el-icon-s-operation" size="small"
          >批量编辑</el-button
        >
        <el-button type="danger" icon="el-icon-s-operation" size="small"
          >批量删除</el-button
        >
      </el-col>
    </el-row> -->

      <!-- <el-alert title="成功提示的文案" type="success" effect="dark"> </el-alert> -->

      <vxe-table keep-source border resizable show-overflow ref="xTable1" class="vxe-table" empty-text="没有更多数据了！" :scroll-y="{ enabled: false }" :loading="loading" :data="tableData" :edit-config="{
        trigger: 'dblclick',
        mode: 'cell',
        showStatus: true,
        icon: 'el-icon-s-tools',
      }" @checkbox-all="selectAllEvent" @checkbox-change="selectChangeEvent">
         <!-- <vxe-column type="seq" width="60"></vxe-column> -->
        <vxe-column sortable field="name" title="Name"></vxe-column>
        <vxe-column field="format" title="FORMAT"></vxe-column>
        <vxe-column field="len" title="LEN"></vxe-column>
        <vxe-column field="comment" title="备注"></vxe-column>
        <!-- <vxe-column sortable field="date" title="创建时间"></vxe-column> -->
      </vxe-table>

      <vxe-pager background @page-change="handlePageChange" :current-page.sync="page.currentPage" :page-size.sync="page.pageSize" :total="page.totalResult" :layouts="[
        'PrevJump',
        'PrevPage',
        'JumpNumber',
        'NextPage',
        'NextJump',
        'Sizes',
        'FullJump',
        'Total',
      ]">
      </vxe-pager>
    </div>
  </div>
</template>

<script>
import Header from './common/Header.vue';
import { findDidByName } from '@/api/request';

export default {
  name: 'ModuleNetworkConfiguration',
  data() {
    return {
      loading: false,
      page: {
        currentPage: 1,
        pageSize: 20,
        totalResult: 124,
      },
      req: {
        name: '',
      },
      deleteButton: {
        event: this.deleteButtonEvent,
        length: 0,
      },
      newButton: {
        event: this.newButtonEvent,
      },
      tableData: [],
    };
  },
  methods: {
    getData() {
      this.loading = true;
      findDidByName(this.req)
        .then((res) => {
          this.tableData = res.data || [];
        })
        .finally(() => {
          this.loading = false;
        });
    },
    selectAllEvent() {
      console.log('selectAllEvent');
    },
    selectChangeEvent() {
      console.log('selectChangeEvent');
    },
    // 翻页
    handlePageChange() {
      console.log('handlePageChange');
    },
    //  新建的操作
    newButtonEvent() {
      this.tableData.unshift({
        p1: '',
        p2: '',
        SVID: '',
        NAME: '',
        FORMAT: '',
        LEN: 0,
        UNITS: '0',
        DEF: 0,
        MIN: 0,
        MAX: 0,
        PLC_TYPE: '',
        PLC_Address: '',
        REMARK: '',
        CURRENTVALUE: '',
      });
    },
    // 删除表格数据
    deleteButtonEvent(list) {
      console.log(list);
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.handleSelectionChange([]);
        this.$refs.xTable1.clearCheckboxRow();
      }, 1500);
    },
  },

  mounted() {
    this.getData();
  },
  watch: {
    'req.name': {
      handler() {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.getData();
        }, 1000);
      },
      deep: true,
    },
  },
  components: {
    Header,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.dictionary-information-container {
  padding: 1rem;
  .form {
    .keyword {
      display: inline-block;
      width: 200px;
      margin-left: 1rem;
    }
  }
  .vxe-table {
    margin-top: 20px;
  }
}
</style>
