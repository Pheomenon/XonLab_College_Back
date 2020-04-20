<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>

    <el-button type="text" @click="openChapterDialog()">添加章节</el-button>

    <!-- 章节 -->
    <ul class="chanpterList">
      <li v-for="chapter in chapterVideoList" :key="chapter.id">
        <p>
          {{ chapter.title }}
          <span>
            <el-button type="text" @click="openEditChapter(chapter.id)">编辑</el-button>
            <el-button type="text">删除</el-button>
          </span>
        </p>

        <!-- 视频 -->
        <ul class="chanpterList videoList">
          <li v-for="video in chapter.children" :key="video.id">
            <p>
              {{ video.title }}
              <span class="acts">
                <el-button type="text">编辑</el-button>
                <el-button type="text">删除</el-button>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>

    <el-form label-width="120px">
      <el-form-item>
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
      </el-form-item>
    </el-form>

    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title" />
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number v-model="chapter.sort" :min="0" controls-position="right" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import chapterApi from "@/api/edu/chapter";
export default {
  data() {
    return {
      saveBtnDisabled: false,
      courseId: "",
      chapterVideoList: [],
      chapter: {}, //封装章节数据
      dialogChapterFormVisible: false
    };
  },
  created() {
    //获取路由的Id值
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id;
      this.getChapterVideo();
    }
  },
  methods: {
    openEditChapter(chapterId) {
      this.dialogChapterFormVisible = true;

      chapterApi.getChapter(chapterId).then(response => {
        this.chapter = response.data.chapter;
      });
    },
    openChapterDialog() {
      this.dialogChapterFormVisible = true;
      this.chapter.title = "";
      this.chapter.sort = 0;
    },
    addChapter() {
      this.chapter.courseId = this.courseId;
      chapterApi.addChapter(this.chapter).then(response => {
        //关闭弹框
        this.dialogChapterFormVisible = false;
        this.$message({
          type: "success",
          message: "添加章节成功!"
        });
        this.getChapterVideo();
      });
    },
    saveOrUpdate() {
      if(!this.chapter.id){
        this.addChapter();
      }else{
        this.updateChapter();
      }
      
    },
    updateChapter(){
      chapterApi.updateChapter(this.chapter).then(response =>{
        this.dialogChapterFormVisible = false;
        this.$message({
          type: "success",
          message: "修改章节成功!"
        });
        this.getChapterVideo()
      })
    },
    //根据课程Id查询章节和小节的课程列表
    getChapterVideo() {
      chapterApi.getAllChapterVideo(this.courseId).then(response => {
        this.chapterVideoList = response.data.allChapterVideo;
      });
    },
    previous() {
      this.$router.push({ path: "/course/info/" + this.courseId });
    },
    next() {
      this.$router.push({ path: "/course/publish/" + this.courseId });
    }
  }
};
</script>
<style scoped>
.chanpterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chanpterList li {
  position: relative;
}
.chanpterList p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #ddd;
}
.chanpterList .acts {
  float: right;
  font-size: 14px;
}

.videoList {
  padding-left: 50px;
}
.videoList p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #ddd;
}
</style>