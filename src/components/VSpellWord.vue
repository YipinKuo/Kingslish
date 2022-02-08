<template>
  <el-card class="SpellWord">
	<div>
		<span class="tag-group__title m-1"> {{ showquest(0, data.quest) }}</span>
		<el-input :style="so_inputanswer" 
              ref="refinput" 
              v-model="answer" 
              v-bind:class='{ 
                 hint: status != VSpellWord_status.none, 
                "input-success": status != VSpellWord_status.none && isMatch, 
                "input-failed": status != VSpellWord_status.none && isMatch === false, 
                "empty-hide": status != VSpellWord_status.none && isEmpty }' 
              @input="typeInput" 
              :readonly="status != VSpellWord_status.none" 
              :maxlength="data.word.length" 
              v-on:keypress.enter="onEnter"
              autocomplete="off" 
              class="input-answer ls-2" />
		<span class="tag-group__title m-1 answer" v-if="status != VSpellWord_status.none"> {{ data.word }}</span>
		<span class="tag-group__title m-1"> {{ showquest(1, data.quest) }}</span>
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
import { ref, defineComponent, watch } from "vue";
import { VSpellWord_status, SpellWord_Types, SpellWord_Status, SpellWord } from "../models/SpellWord";

let answer = ref('');
let so_inputanswer = { width: '0px'};
let self_data: SpellWord;
let isMatch: boolean;
let isEmpty: boolean;

let SpellWordDefault = new SpellWord();
SpellWordDefault.quest = " Loading Quest...";
SpellWordDefault.quest_desc = "題目載入中";
SpellWordDefault.type = SpellWord_Types.normal;
SpellWordDefault.status = SpellWord_Status.Enable;
SpellWordDefault.word = "UNKNOWN";
SpellWordDefault.word_desc = "UNKNOWN";
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

function showquest(index: number, quest: string) {
  return quest.split('_')[index];
}

export default defineComponent({
  name: "VSpellWord",
  props: {
    data: {
      type: SpellWord,
      default: SpellWordDefault
    },
    status: {
      type: Number,  //-1: 未做, 0: 作錯, 1: 作對
      default: VSpellWord_status.none
    }
  },
  emits: ['update:status','onEnterUp'],
  data(){ 
    isMatch = false;
    isEmpty = true;
    return {
      VSpellWord_status,
      showquest,
      answer,
      so_inputanswer,
      self_data,
      isMatch,
      isEmpty
    }
  },
  methods: {
    typeInput() {
      this.isMatch = this.data.word === this.answer;
      this.isEmpty = this.answer.length === 0;
      //console.log(this.data.word, this.answer, isMatch);
    },
    focusInput() {
      (this.$refs.refinput as any).focus();
    },
    onEnter() {
      this.$emit('onEnterUp', true);
    }
  },
  mounted() {
    this.focusInput();
  },
  setup(props, {attrs, slots, emit, expose}) {
    
    answer.value = '';
    let w = 0;
    for(let i = 0; i < props.data.word.length; i++)
    {
      w += 9;
    }
    so_inputanswer.width = w + 'px';
    
    const confirm = () => {
      let newstatus = (props.data.word === answer.value ? 1 : 0);
      //console.log('update:status', props.data.word, answer.value, newstatus);
      emit('update:status', newstatus);
    }
    
    return { confirm };
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
.tag-group {
  text-align: left;
}
.tag {
  font-size: inherit;
}
.input-answer {
  vertical-align: bottom;
}
.answer {
  text-decoration: underline;
  font-weight: bold;
}
.hint {
  position: absolute;
  top: 6px;
  margin-left: -4px;
}
.hint >>> input {
  border: none;
  background: transparent;
  font-weight: bold;
}
.input-success >>> input { color: white; background: green; }
.input-failed >>> input { color: white; background: red; }
.mb-10 { margin-bottom: 10px; }
.mr-5{ margin-right: 5px; }
.ls-2 >>> input { letter-spacing: 2px; padding: 0 5px; }
.inlineblock { display: inline-block; }
.empty-hide { display: none !important; }
</style>
