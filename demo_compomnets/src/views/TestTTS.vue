<template>
  <H1>請輸入內容：</H1>
  <el-input v-model="testmsg" 
            type="textarea" 
            rows=3
            autocomplete="off"  />
  <el-button @click="execute()" type="primary">播放</el-button>
</template>
<script lang="ts">
import { ref, defineComponent } from "vue";

let testmsg = ref('');

export default defineComponent({
  name: "TestTTS",
  methods: {
    execute: function() {
      var msg = new SpeechSynthesisUtterance();
      msg.text = this.testmsg;
      window.speechSynthesis.speak(msg);
    }
  },
  data(){ 
    testmsg.value = '測試 Hello World';
    return {
      testmsg
    }
  }
});
</script>