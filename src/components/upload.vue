<template>
  <div class="upload">
    <el-row>
      <h2 class="title">书籍上传</h2>
    </el-row>
    <div class="form-box">
      <el-form :model="form" ref="form" label-width="150px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="书籍名称" prop="bname">
              <el-input size="small" v-model="form.bname" type="text"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="作者" prop="author">
              <el-input size="small" v-model="form.author" type="text"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="出版日期" prop="publishdate">
              <el-date-picker size="small" v-model="form.publishdate" :editable="false" class="date_picker"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="上传封面" prop="covering">
              <!-- <el-input size="small" type="text" v-model="form.covering"></el-input> -->
              <img class="pre-img" :src="src" alt="">
              <vue-core-image-upload :class="['pure-button','pure-button-primary','js-btn-crop']"
                :crop="false"
                text="上传图片"
                inputOfFile="file"
                url="http://ebookreader.zhengyuyan.com/covering"
                extensions="png,gif,jpeg,jpg"
                @imageuploaded="imageuploaded"
                @errorhandle="handleError"></vue-core-image-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="上传文件" prop="bookurl">
              <el-input size="small" type="text" v-model="form.bookurl"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
					<el-col>
						<el-form-item label-width="0">
							<el-button type="primary" @click="submitBookInfo">提交</el-button>
						</el-form-item>
					</el-col>
				</el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
  import VueCoreImageUpload from 'vue-core-image-upload'

  export default{
    name:'upload',
    components: { VueCoreImageUpload },
    data() {
      return {
        src: '',
        form: {
          bname: '',
          author: '',
          publishdate: '',
          covering: '',
          bookurl: ''
        }
      }
    },
    methods: {
      submitBookInfo() {
        console.log(this.form);
      },
      imageuploaded(res) {
        this.src=res;
      },
      handleError() {
        console.log("文件上传失败！");
      }
    }
  }
</script>

<style scoped>
.form-box {
  /* padding: 20px 100px; */
  position: absolute;
  left: 50%;
  width: 800px;
  margin-left: -400px;
}
.el-input {
  width: 300%;
}
</style>
