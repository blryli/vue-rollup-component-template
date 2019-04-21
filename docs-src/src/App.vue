<template>
  <div id="app">
    <div class="group">
      <center>
        <h1>vue-form-layer</h1>
        <p>解决：复杂布局、多重标记（前后端校验、标记信息等）方案。</p>
        <p>特点：高度灵活性、可控性、扩展性。</p>
        <a class="link" href="https://github.com/blryli/vue-form-layer">文档</a>
      </center>
      <!-- <vue-form ref="testform" :model="testform" :layer="testlayer" rowledge="0" label-width="120px">
        <table style="width: 100%">
          <tbody id="contentArea">
            <tr v-for="(d, i) in 200" :key="i" :class="`/testform/${i}/popover`">
              <vue-form-line :cols="[{ span: 12, label: '气泡展示', prop: `/testform/${i}/popover` },{ span: 12, label: '自定义内容模板', prop: `/testform/${i}/templateFn` }]">
                <el-button>{{`/testform/${i}/popover`}}</el-button>
                <el-button>{{`/testform/${i}/templateFn`}}</el-button>
              </vue-form-line>
            </tr>
            <tr :class="`/testform/10000/popover`">
              <vue-form-line :cols="[{ span: 12, label: '气泡展示', prop: `/testform/10000/popover` },{ span: 12, label: '自定义内容模板', prop: `/testform/20000/templateFn` }]">
                <el-button>{{`/testform/10000/popover`}}</el-button>
                <el-button>{{`/testform/20000/templateFn`}}</el-button>
              </vue-form-line>
            </tr>
          </tbody>
        </table>
      </vue-form> -->
      <h2>apply to form layou</h2>
      <el-radio-group v-model="radio" style="margin-bottom: 20px;">
        <el-radio-button label="top"></el-radio-button>
        <el-radio-button label="right"></el-radio-button>
        <el-radio-button label="left"></el-radio-button>
      </el-radio-group>
      <vue-form ref="formLayou" :model="formLayou" :label-position="radio" :item-gutter="24">
        <vue-form-line :cols="[{ label: '产品' },{ label: '类型' }]">
          <el-input type="text" v-model="formLayou.product" placeholder="product" />
          <el-input type="text" v-model="formLayou.type" placeholder="type" />
        </vue-form-line>
        <vue-form-line label="尺寸" :span="12">
          <el-input type="text" placeholder="long" v-model="formLayou.long" />
          <el-input type="text" placeholder="width" v-model="formLayou.width" />
          <el-input type="text" placeholder="height" v-model="formLayou.height" />
        </vue-form-line>
        <vue-form-line label='联系人' :cols="[{ span: 9 },{ span: 15 }]" :span="12">
          <el-input type="text" v-model="formLayou.name" placeholder="name" />
          <el-input type="text" v-model="formLayou.phone" placeholder="phone" />
        </vue-form-line>
      </vue-form>
      <h2>apply to form layer show</h2>
      <p>
        <el-switch v-model="value" @change="$refs['form2'].changeShow('layerTooltip')" inactive-text="layer visible" />
      </p>
      <vue-form ref="form2" :model="form2" :layer="layerShow" rowledge="24px" label-width="120px">
        <vue-form-line :cols="[{ span: 12, label: '气泡展示', prop: '/form/popover' },{ span: 12, label: '自定义内容模板', prop: '/form/templateFn' }]">
          <el-input type="text" v-model="form2.popover" />
          <el-input type="text" v-model="form2.templateFn" />
        </vue-form-line>
        <vue-form-line :cols="[{ span: 12, label: '参考点自定义', prop: '/form/referenceFn' },{ span: 12, label: '多重标记', prop: '/form/concurrence' }]">
          <el-input type="text" v-model="form2.referenceFn" />
          <el-input type="text" v-model="form2.concurrence" />
        </vue-form-line>
        <vue-form-line :cols="[{ span: 12, label: '多方向', prop: '/form/multilayer' },{ span: 12, label: '边界', prop: '/form/boundary' }]">
          <el-input type="text" v-model="form2.multilayer" />
          <el-input type="text" v-model="form2.boundary" />
        </vue-form-line>
      </vue-form>
      <br />
      <h2>apply to form validate</h2>
      <vue-form ref="form1" :model="form1" :layer="layer1" rowledge="24px">
        <vue-form-line :cols="[{ span: 12, label: 'name', prop: '/form/name' },{ span: 12, label: 'age', prop: '/form/age' }]">
          <el-input type="text" v-model="form1.name" @blur="recalculateField('/form/name')" />
          <el-input type="text" v-model="form1.age" @blur="recalculateField('/form/age')" />
        </vue-form-line>
      </vue-form>
      <p>
        <el-button type="primary" @click="submitForm('form1')">submit form</el-button>
        <el-button @click="$refs['form1'].clearCalculate('formLayer')">clearCalculate</el-button>
        <el-button @click="$refs['form1'].resetFields('formLayer')">resetFields</el-button>
      </p>
      <br />
      <h2>apply to table validate</h2>
      <vue-form ref="table" :model="tableData" :layer="tableLayer" rowledge="0">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="id">
            <template slot-scope="scope">
              <vue-form-line :cols="[{prop: `/tableData/${scope.$index}/id`}]">
                <el-input type="text" v-model="scope.row.id" @blur="tableRecalculateField(`/tableData/${scope.$index}/id`)" />
              </vue-form-line>
            </template>
          </el-table-column>
          <el-table-column label="name">
            <template slot-scope="scope">
              <vue-form-line :cols="[{prop: `/tableData/${scope.$index}/name`}]">
                <el-input type="text" v-model="scope.row.name" @blur="tableRecalculateField(`/tableData/${scope.$index}/name`)" />
              </vue-form-line>
            </template>
          </el-table-column>
          <el-table-column label="address">
            <template slot-scope="scope">
              <vue-form-line :cols="[{prop: `/tableData/${scope.$index}/address`}]">
                <el-input type="text" v-model="scope.row.address" @blur="tableRecalculateField(`/tableData/${scope.$index}/address`)" />
              </vue-form-line>
            </template>
          </el-table-column>
        </el-table>
      </vue-form>
      <p>
        <el-button type="primary" @click="submitTable('table')">submit table</el-button>
        <el-button @click="$refs['table'].clearCalculate('tableLayer')">clearCalculate</el-button>
        <el-button @click="$refs['table'].resetFields('tableLayer')">resetFields</el-button>
      </p>
    </div>
    <!-- <el-switch v-model="testvalue" @change="$refs['testform'].changeShow('testId')" inactive-text="layer visible" /> -->
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    const successValidate = {
      disabled: true,
      referenceBorderColor: "#67c23a"
    };
    const errorValidate = message => {
      return {
        message: message,
        disabled: false,
        referenceBorderColor: "#F56C6C"
      };
    };
    const recalculateName = value => {
      if (value === "") {
        return errorValidate("name is required");
      } else {
        return successValidate;
      }
    };
    const recalculateAge = value => {
      if (value === "") {
        return errorValidate("age is required");
      } else if (value < 18) {
        return errorValidate("age not less then 18");
      } else {
        return successValidate;
      }
    };
    const referenceFn = () => {
      return <i class="el-icon-question" />;
    };
    const boundaryTemplateFn = (data, prop) => {
      return (
        <div>
          <p>placement: {data.placement}</p>
          <p>content: {data.content}</p>
        </div>
      );
    };
    const templateFn = (data, prop) => {
      return (
        <div>
          <p>{data.title}</p>
          <p>{data.template}</p>
          <p>{data.content}</p>
        </div>
      );
    };

    const recalculateTableId = value => {
      if (value === "") {
        return errorValidate("id is required");
      } else {
        return successValidate;
      }
    };
    const recalculateTableName = value => {
      if (value === "") {
        return errorValidate("name is required");
      } else {
        return successValidate;
      }
    };
    const recalculateTableAddress = value => {
      if (value === "") {
        return errorValidate("address is required");
      } else if (value.length < 18) {
        return errorValidate("not less than 18 characters");
      } else {
        return successValidate;
      }
    };
    return {
      testform: {},
      testlayer: Object.freeze([]),
      radio: "right",
      value: true,
      formLayou: {},
      form1: { name: "laowang" },
      form2: {},
      layerShow: [
        {
          id: "layerTooltip",
          show: true,
          view: {
            // reference: referenceFn,
            // template: templateFn
          },
          data: [
            {
              prop: "/form/popover",
              data: "气泡"
            },
            {
              template: templateFn,
              prop: "/form/templateFn",
              data: {
                title: "内容展示模板自定义",
                template: `template: templateFn = (data, prop) => {
                  return <div>
                    <p>{data.title}</p>
                    <p>{data.template}</p>
                    <p>{data.content}</p>
                  </div>;
                }`,
                content: `data: {
                  title: 'templateFn',
                  content: 'templateFn'
                }`
              }
            },
            {
              reference: referenceFn,
              prop: "/form/referenceFn",
              data: `data: referenceFn = () => {
                return <i class="el-icon-question" />;
              }`
            },
            {
              effect: "orange",
              prop: "/form/concurrence",
              data: "前端校验"
            },
            {
              effect: "red",
              prop: "/form/concurrence",
              data: "后端校验"
            },
            {
              effect: "blue",
              prop: "/form/concurrence",
              data: "标记错误"
            },
            {
              type: "text",
              prop: "/form/text",
              data: "layer text"
            },
            {
              effect: "orange",
              placement: "top",
              prop: "/form/multilayer",
              data: "multilayer"
            },
            {
              effect: "orange",
              placement: "top",
              prop: "/form/multilayer",
              data: "multilayer"
            },
            {
              effect: "#E6A23C",
              placement: "right",
              prop: "/form/multilayer",
              data: "multilayer"
            },
            {
              effect: "#E6A23C",
              placement: "right",
              prop: "/form/multilayer",
              data: "multilayer"
            },
            {
              effect: "green",
              placement: "bottom",
              prop: "/form/multilayer",
              data: "multilayer"
            },
            {
              effect: "green",
              placement: "bottom",
              prop: "/form/multilayer",
              data: "multilayer"
            },
            {
              effect: "#F56C6C",
              placement: "left",
              prop: "/form/multilayer",
              data: "multilayer"
            },
            {
              effect: "#F56C6C",
              placement: "left",
              prop: "/form/multilayer",
              data: "multilayer"
            },
            {
              effect: "#139bd2",
              placement: "top",
              prop: "/form/boundary",
              template: boundaryTemplateFn,
              data: {
                placement: "top",
                content: "boundary"
              }
            },
            {
              effect: "#139bd2",
              placement: "top",
              prop: "/form/boundary",
              template: boundaryTemplateFn,
              data: {
                placement: "top",
                content: "boundary"
              }
            },
            {
              effect: "#139bd2",
              placement: "top",
              prop: "/form/boundary",
              template: boundaryTemplateFn,
              data: {
                placement: "top",
                content: "boundary"
              }
            },
            {
              effect: "#139bd2",
              placement: "top",
              prop: "/form/boundary",
              template: boundaryTemplateFn,
              data: {
                placement: "top",
                content: "boundary"
              }
            },
            {
              effect: "#139bd2",
              placement: "top",
              prop: "/form/boundary",
              template: boundaryTemplateFn,
              data: {
                placement: "top",
                content: "boundary"
              }
            },
            {
              effect: "#F56C6C",
              placement: "right",
              prop: "/form/boundary",
              template: boundaryTemplateFn,
              data: {
                placement: "right",
                content: "boundary"
              }
            },
            {
              effect: "#F56C6C",
              placement: "right",
              prop: "/form/boundary",
              template: boundaryTemplateFn,
              data: {
                placement: "right",
                content: "boundary"
              }
            },
            {
              effect: "#F56C6C",
              placement: "right",
              prop: "/form/boundary",
              template: boundaryTemplateFn,
              data: {
                placement: "right",
                content: "boundary"
              }
            },
            {
              effect: "#F56C6C",
              placement: "right",
              prop: "/form/boundary",
              template: boundaryTemplateFn,
              data: {
                placement: "right",
                content: "boundary"
              }
            },
            {
              effect: "#E6A23C",
              placement: "bottom",
              prop: "/form/boundary",
              template: boundaryTemplateFn,
              data: {
                placement: "bottom",
                content: "boundary"
              }
            },
            {
              effect: "#E6A23C",
              placement: "bottom",
              prop: "/form/boundary",
              template: boundaryTemplateFn,
              data: {
                placement: "bottom",
                content: "boundary"
              }
            },
            {
              effect: "#E6A23C",
              placement: "bottom",
              prop: "/form/boundary",
              template: boundaryTemplateFn,
              data: {
                placement: "bottom",
                content: "boundary"
              }
            },
            {
              effect: "#67C23A",
              placement: "left",
              prop: "/form/boundary",
              template: boundaryTemplateFn,
              data: {
                placement: "left",
                content: "boundary"
              }
            },
            {
              effect: "#67C23A",
              placement: "left",
              prop: "/form/boundary",
              template: boundaryTemplateFn,
              data: {
                placement: "left",
                content: "boundary"
              }
            }
          ]
        }
      ],
      layer1: [
        {
          id: "formLayer",
          show: true,
          view: {
            disabled: true,
            effect: "#F56C6C",
            type: "text"
          },
          data: [
            {
              prop: "/form/name",
              recalculate: recalculateName,
              data: ""
            },
            {
              prop: "/form/age",
              recalculate: recalculateAge,
              data: ""
            }
          ]
        }
      ],
      tableLayer: [
        {
          id: "tableLayer",
          show: true,
          view: {
            disabled: true,
            effect: "#F56C6C"
          },
          data: [
            {
              prop: "/tableData/0/id",
              recalculate: recalculateTableId,
              data: ""
            },
            {
              prop: "/tableData/0/name",
              recalculate: recalculateTableName,
              data: ""
            },
            {
              prop: "/tableData/0/address",
              recalculate: recalculateTableAddress,
              data: ""
            },
            {
              prop: "/tableData/1/id",
              recalculate: recalculateTableId,
              data: ""
            },
            {
              prop: "/tableData/1/name",
              recalculate: recalculateTableName,
              data: ""
            },
            {
              prop: "/tableData/1/address",
              recalculate: recalculateTableAddress,
              data: ""
            }
          ]
        }
      ],
      tableData: [
        {
          id: "",
          name: "",
          address: "Guangdong Shenzhen Baoan"
        },
        {
          id: "6666",
          name: "",
          address: ""
        }
      ]
    };
  },
  methods: {
    recalculateField(prop) {
      this.$refs["form1"].recalculateField("formLayer", prop);
    },
    submitForm(formName) {
      this.$refs[formName].recalculate("formLayer", valid => {
        if (valid) {
          console.log("form submit");
        } else {
          console.log("form error submit!!");
        }
      });
    },
    tableRecalculateField(prop) {
      this.$refs["table"].recalculateField("tableLayer", prop);
    },
    submitTable(formName) {
      this.$refs[formName].recalculate("tableLayer", valid => {
        if (valid) {
          console.log("table submit");
        } else {
          console.log("table error submit!!");
        }
      });
    }
  },
  mounted() {
    let data = [];
    for (let i = 0; i < 200; i++) {
      data.push({
        prop: `/testform/${i}/popover`,
        data: `/testform/${i}/popover`
      });
      data.push({
        prop: `/testform/${i}/templateFn`,
        data: `/testform/${i}/templateFn`
      });
    }
    this.testlayer = Object.freeze([
      {
        id: "testId",
        show: true,
        view: {
          trigger: "click"
        },
        data: data
      }
    ]);
    setTimeout(() => {
      this.layer1.push({data: [{
        prop: "/form/name",
        data: "第三方斯蒂芬斯蒂芬"
      }]});
      setTimeout(() => {
        this.layer1.push({data: [{
          prop: "/form/name",
          data: "第三方斯蒂芬斯蒂芬"
        }]});
      }, 2000);
    }, 2000);
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
}
#app {
  background-color: #f5f5f5;
  overflow: auto;
}

.group {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 1px 15px rgba(0, 0, 0, .1);
}

.link {
  color: #409eff;
}

.el-select {
  display: block;
}
@media (min-width: 768px) {
  #app {
    padding: 40px;
  }
}
#scrollArea {
  min-height: 500px;
}
</style>

