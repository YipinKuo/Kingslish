<template>
  <el-card class="SpellWord">
	<div>
		<span class="tag-group__title m-1"> {{ showRequest(0, data.quest) }}</span>
    <!-- 
      題目狀態：
        尚未答題：C_WordPractice_status.none 
        答題正確：C_WordPractice_status.correct
        答題錯誤：C_WordPractice_status.incorrect 
    -->
		<el-input ref="ref_input" 
              v-model="input_value"             
              :placeholder="input_placeholder"
              :readonly="input_readonly" 
              :maxlength="data.word.length"
              @keyup.enter="onEnter"
              class="input-answer" 
              :style="input_style"   
              v-bind:class='{ 
                   "input-none": status === C_WordPractice_status.none,
                "input-correct": match,
              "input-incorrect": !match
              }'
              autocomplete="off"   />
		<span class="tag-group__title m-1"> {{ showRequest(1, data.quest) }}</span>
	</div>
  <div class="text item mb-10">{{ data.quest_desc }}</div>
	<div class="tag-group">
		<el-tag class="tag mr-5" type="warning" effect="dark">{{ data.partOfSpeech }}</el-tag>
		<span class="tag-group__title m-1"> {{ data.word_desc }}</span>
	</div>
	<div class="mb-10" v-if="data._prefix && status != C_WordPractice_status.none" />
	<div class="tag-group" v-if="data._prefix && status != C_WordPractice_status.none">
		<el-tag class="tag mr-5" effect="dark">字首</el-tag>
		<span class="tag-group__title m-1"> {{ data._prefix }} {{ data._prefix_desc }}</span>
	</div>
	<div class="mb-10" v-if="data._root && status != C_WordPractice_status.none" />
	<div class="tag-group" v-if="data._root && status != C_WordPractice_status.none">
		<el-tag class="tag mr-5" effect="dark">字根</el-tag>
		<span class="tag-group__title m-1"> {{ data._root }} {{ data._root_desc }}</span>
	</div>
	<div class="mb-10" v-if="data._suffix && status != C_WordPractice_status.none" />
	<div class="tag-group" v-if="data._suffix && status != C_WordPractice_status.none">
		<el-tag class="tag mr-5" effect="dark">字尾</el-tag>
		<span class="tag-group__title m-1"> {{ data._suffix }} {{ data._suffix_desc }}</span>
	</div>
  </el-card>
</template>

<script lang="ts">
import { toRefs, ref, defineComponent, watch } from "vue";
import { C_WordPractice_status, WordPractice_Types, WordPractice_Status, WordPractice } from "./WordPractice";

let Default = new WordPractice();
Default.quest = " Loading Quest...";
Default.quest_desc = "題目載入中";
Default.type = WordPractice_Types.normal;
Default.status = WordPractice_Status.Enable;
Default.word = "UNKNOWN";
Default.word_desc_tw = "UNKNOWN";
Default.word_desc_en = "UNKNOWN";
Default.partOfSpeech = "UNKNOWN";
Default._prefix = null;          
Default._prefix_desc = null;     
Default._suffix = null;          
Default._suffix_desc = null;        
Default._root = null;   
Default._root_desc = null;              
Default.audio = null;
Default.link1 = null;
Default.link2 = null;
Default.link3 = null;

let input_value = ref('');
let input_placeholder = ref('');
let input_readonly = ref(false);
let input_style = ref({ width: '0px'});

export default defineComponent({
  name: "C_WordPractice",
  props: {
    // 題目資料 Model
    data:         { type: WordPractice,  default: Default       },
    /*  題目狀態：
        尚未答題：C_WordPractice_status.none 
        答題正確：C_WordPractice_status.correct
        答題錯誤：C_WordPractice_status.incorrect 
    */
    status:       { type: Number,     default: C_WordPractice_status.none },
    /* 答案與正解是否相同：
        一旦 status 從 C_WordPractice_status.none 進入到 C_WordPractice_status.incorrect 或 C_WordPractice_status.correct 則 status 不變， match 仍改變。
     */
    match:        { type: Boolean,    default: false                  },
    text:         { type: String,     default: ''                     },
    placeholder:  { type: String,     default: ''                     },
    readonly:     { type: Boolean,    default: false                  }
  },
  emits: ['update:status','update:match','update:input_value','onEnterUp','onMatch'],
  data(){ 
    return {
      C_WordPractice_status,
      input_value,
      input_placeholder,
      input_readonly,
      input_style
    }
  },
  methods: {
    onFocus() { (this.$refs.ref_input as any).focus(); },
    onEnter() { this.$emit('onEnterUp', true); },
    showRequest(index: number, quest: string) { return quest.split('_')[index]; }
  },
  watch: {
    input_value: function(val, oldVal) {
      this.$emit('update:input_value', val);
    }
  },
  mounted() {
    this.onFocus();
  },
  setup(props, {emit}) {
    const { data, status, text, placeholder, readonly } = toRefs(props);
    
    input_value.value = text.value;
    input_placeholder.value = placeholder.value;
    input_readonly.value = readonly.value;
    
    let w = 0;
    for(let i = 0; i < data.value.word.length; i++)
      w += 9;
    input_style.value.width = w + 'px';
    
    const confirm = () => {
      let newmatch = input_value.value === data.value.word;
      emit('update:match', newmatch);
      if (newmatch) { emit('onMatch', true); }
      
      if(status.value === C_WordPractice_status.none)
      {
        let newstatus = C_WordPractice_status.none;
        if(input_value.value === data.value.word)
          newstatus = C_WordPractice_status.correct;
        else
          newstatus = C_WordPractice_status.incorrect;
        emit('update:status', newstatus);
      }
      
      if(!newmatch)
      {
        input_placeholder.value = data.value.word;
        input_value.value = '';
      }
    }
    
    const show = () => {
      emit('update:status', C_WordPractice_status.incorrect);
      input_placeholder.value = data.value.word;
      input_value.value = '';
    }
    return { confirm, show };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.SpellWord {
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  border-radius: 25px;
}
.SpellWord * {
  font-family: 微軟正黑體;
  letter-spacing: 1px;
}
.tag-group { text-align: left; }
.tag { font-size: inherit; }
.input-answer { vertical-align: bottom; }
.input-answer     >>> input { letter-spacing: 1.5px; padding: 13px 4px 0px 4px; }
.input-none       >>> input { color: #000; }
.input-correct    >>> input { font-weight: bold; color: green; }
/* .input-incorrect  >>> input { font-weight: bold; color: red; } */ 
.input-correct    >>> input::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: green;
  opacity: 1; /* Firefox */
}
.input-correct    >>> input:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: green;
}
.input-correct    >>> input::-ms-input-placeholder { /* Microsoft Edge */
  color: green;
}
.input-incorrect    >>> input::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: red;
  opacity: 1; /* Firefox */
}
.input-incorrect    >>> input:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: red;
}
.input-incorrect    >>> input::-ms-input-placeholder { /* Microsoft Edge */
  color: red;
}
.mb-10 { margin-bottom: 10px; }
.mr-5{ margin-right: 5px; }
.inlineblock { display: inline-block; }
</style>
