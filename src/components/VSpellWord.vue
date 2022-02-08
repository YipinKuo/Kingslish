<template>
  <el-card class="SpellWord">
	<div>
		<span class="tag-group__title m-1"> {{ showRequest(0, data.quest) }}</span>
    <!-- 
      題目狀態：
        尚未答題：VSpellWord_status.none 
        答題正確：VSpellWord_status.correct
        答題錯誤：VSpellWord_status.incorrect 
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
                   "input-none": status === VSpellWord_status.none,
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
	<div class="mb-10" v-if="data._prefix && status != VSpellWord_status.none" />
	<div class="tag-group" v-if="data._prefix && status != VSpellWord_status.none">
		<el-tag class="tag mr-5" effect="dark">字首</el-tag>
		<span class="tag-group__title m-1"> {{ data._prefix }} {{ data._prefix_desc }}</span>
	</div>
	<div class="mb-10" v-if="data._root && status != VSpellWord_status.none" />
	<div class="tag-group" v-if="data._root && status != VSpellWord_status.none">
		<el-tag class="tag mr-5" effect="dark">字根</el-tag>
		<span class="tag-group__title m-1"> {{ data._root }} {{ data._root_desc }}</span>
	</div>
	<div class="mb-10" v-if="data._suffix && status != VSpellWord_status.none" />
	<div class="tag-group" v-if="data._suffix && status != VSpellWord_status.none">
		<el-tag class="tag mr-5" effect="dark">字尾</el-tag>
		<span class="tag-group__title m-1"> {{ data._suffix }} {{ data._suffix_desc }}</span>
	</div>
  </el-card>
</template>

<script lang="ts">
import { toRefs, ref, defineComponent, watch } from "vue";
import { VSpellWord_status, SpellWord_Types, SpellWord_Status, SpellWord } from "../models/SpellWord";

let SpellWordDefault = new SpellWord();
SpellWordDefault.quest = " Loading Quest...";
SpellWordDefault.quest_desc = "題目載入中";
SpellWordDefault.type = SpellWord_Types.normal;
SpellWordDefault.status = SpellWord_Status.Enable;
SpellWordDefault.word = "UNKNOWN";
SpellWordDefault.word_desc_tw = "UNKNOWN";
SpellWordDefault.word_desc_en = "UNKNOWN";
SpellWordDefault.partOfSpeech = "UNKNOWN";
SpellWordDefault._prefix = null;          
SpellWordDefault._prefix_desc = null;     
SpellWordDefault._suffix = null;          
SpellWordDefault._suffix_desc = null;        
SpellWordDefault._root = null;   
SpellWordDefault._root_desc = null;              
SpellWordDefault.audio = null;
SpellWordDefault.link1 = null;
SpellWordDefault.link2 = null;
SpellWordDefault.link3 = null;

let input_value = ref('');
let input_placeholder = ref('');
let input_readonly = ref(false);
let input_style = ref({ width: '0px'});

export default defineComponent({
  name: "VSpellWord",
  props: {
    // 題目資料 Model
    data:         { type: SpellWord,  default: SpellWordDefault       },
    /*  題目狀態：
        尚未答題：VSpellWord_status.none 
        答題正確：VSpellWord_status.correct
        答題錯誤：VSpellWord_status.incorrect 
    */
    status:       { type: Number,     default: VSpellWord_status.none },
    /* 答案與正解是否相同：
        一旦 status 從 VSpellWord_status.none 進入到 VSpellWord_status.incorrect 或 VSpellWord_status.correct 則 status 不變， match 仍改變。
     */
    match:        { type: Boolean,    default: false                  },
    text:         { type: String,     default: ''                     },
    placeholder:  { type: String,     default: ''                     },
    readonly:     { type: Boolean,    default: false                  }
  },
  emits: ['update:status','update:match','update:input_value','onEnterUp','onMatch'],
  data(){ 
    return {
      VSpellWord_status,
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
      console.log(newmatch, input_value.value, data.value.word);
      emit('update:match', newmatch);
      if (newmatch) { emit('onMatch', true); }
      
      if(status.value === VSpellWord_status.none)
      {
        let newstatus = VSpellWord_status.none;
        if(input_value.value === data.value.word)
          newstatus = VSpellWord_status.correct;
        else
          newstatus = VSpellWord_status.incorrect;
        emit('update:status', newstatus);
      }
      
      if(!newmatch)
      {
        input_placeholder.value = data.value.word;
        input_value.value = '';
      }
    }
    
    const show = () => {
      emit('update:status', VSpellWord_status.incorrect);
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
