<template>
  <el-row>
    <el-col :span="24"><div class="quests-progress"><el-progress :percentage='QPPercentage' :format='() => CurrentIndex + " / " + (ArrData.length - 1)' /></div></el-col>
    <el-col v-for="(item, index) in ArrData" :key="item.id" :span="24">
      <VSpellWord 
        ref='RefVSpellWord' 
        v-if='index == CurrentIndex && CurrentIndex  < ArrData.length - 1' 
        :data='item.data' 
        :status="item.status" 
        @update:status="item.status = $event"
        @onEnterUp="onVSpellWordEnterUp"></VSpellWord>
    </el-col>
    <el-col :span="24">
      <div class="grid-content" v-if='CurrentIndex == ArrData.length - 1'>
        <h1>結果</h1>
        <p>正確: {{ArrData.filter(x => x.status == VSpellWord_status.success).length}}</p>
        <p>錯誤: {{ArrData.filter(x => x.status == VSpellWord_status.failure).length}}</p>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24"><div class="grid-content">
      <el-button v-if="ArrData[CurrentIndex].status == VSpellWord_status.none && CurrentIndex  < ArrData.length - 1" type="warning" @click="playWord()">撥放單字</el-button>
      <el-button v-if="ArrData[CurrentIndex].status != VSpellWord_status.none && CurrentIndex  < ArrData.length - 2" type="warning" @click="playSentence()">撥放句子</el-button>
      <el-button v-if="ArrData[CurrentIndex].status == VSpellWord_status.none && CurrentIndex  < ArrData.length - 1" @click="confirm()" type="primary">確認</el-button>
      <el-button v-if="ArrData[CurrentIndex].status == VSpellWord_status.none && CurrentIndex  < ArrData.length - 1" @click="ArrData[CurrentIndex].status = VSpellWord_status.failure">看答案</el-button>
      <el-button v-if="ArrData[CurrentIndex].status != VSpellWord_status.none && CurrentIndex  < ArrData.length - 2" type="primary" @click="next()">下一題</el-button>
      <el-button v-if="ArrData[CurrentIndex].status != VSpellWord_status.none && CurrentIndex == ArrData.length - 2" type="primary" @click="result()">看結果</el-button>
      <el-button v-if="CurrentIndex == ArrData.length - 1" type="primary" @click="again()">重新測驗</el-button>
      <el-button v-if="CurrentIndex == ArrData.length - 1" type="primary" @click="againwithfailed()">針對錯誤再次測驗</el-button>
    </div></el-col>
  </el-row>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { VSpellWord_status, SpellWord_Types, SpellWord_Status, SpellWord } from "../models/SpellWord";
import VSpellWord from "@/components/VSpellWord.vue"; // @ is an alias to /src


let EmptyData = { status: VSpellWord_status.none, data: { id: 11, quest: "", quest_desc: "。", type: SpellWord_Types.normal, status: SpellWord_Status.Enable, word: "", word_desc: "", partOfSpeech: "", _prefix: "", _suffix_desc: null, _root: "", _root_desc: "", audio: null, link1: null, link2: null, link3: null } };
let ArrData = [
	{ status: VSpellWord_status.none, data: { id:  1, quest:  "1. I'm taking _ for a throat infection.", quest_desc: "因為喉嚨發炎我正服用抗生素。", type: SpellWord_Types.normal, status: SpellWord_Status.Enable, word: "antibiotic", word_desc: "抗生素", partOfSpeech: "n.", _prefix: "anti-", _suffix_desc: null, _root: "biotic", _root_desc: "生物", audio: null, link1: null, link2: null, link3: null } },
  { status: VSpellWord_status.none, data: { id:  2, quest:  "2. I'm taking _ for a throat infection.", quest_desc: "因為喉嚨發炎我正服用抗生素。", type: SpellWord_Types.normal, status: SpellWord_Status.Enable, word: "antibiotic", word_desc: "抗生素", partOfSpeech: "n.", _prefix: "anti-", _suffix_desc: null, _root: "biotic", _root_desc: "生物", audio: null, link1: null, link2: null, link3: null } },
  { status: VSpellWord_status.none, data: { id:  3, quest:  "3. I'm taking _ for a throat infection.", quest_desc: "因為喉嚨發炎我正服用抗生素。", type: SpellWord_Types.normal, status: SpellWord_Status.Enable, word: "antibiotic", word_desc: "抗生素", partOfSpeech: "n.", _prefix: "anti-", _suffix_desc: null, _root: "biotic", _root_desc: "生物", audio: null, link1: null, link2: null, link3: null } },
  { status: VSpellWord_status.none, data: { id:  4, quest:  "4. I'm taking _ for a throat infection.", quest_desc: "因為喉嚨發炎我正服用抗生素。", type: SpellWord_Types.normal, status: SpellWord_Status.Enable, word: "antibiotic", word_desc: "抗生素", partOfSpeech: "n.", _prefix: "anti-", _suffix_desc: null, _root: "biotic", _root_desc: "生物", audio: null, link1: null, link2: null, link3: null } },
  { status: VSpellWord_status.none, data: { id:  5, quest:  "5. I'm taking _ for a throat infection.", quest_desc: "因為喉嚨發炎我正服用抗生素。", type: SpellWord_Types.normal, status: SpellWord_Status.Enable, word: "antibiotic", word_desc: "抗生素", partOfSpeech: "n.", _prefix: "anti-", _suffix_desc: null, _root: "biotic", _root_desc: "生物", audio: null, link1: null, link2: null, link3: null } },
  { status: VSpellWord_status.none, data: { id:  6, quest:  "6. I'm taking _ for a throat infection.", quest_desc: "因為喉嚨發炎我正服用抗生素。", type: SpellWord_Types.normal, status: SpellWord_Status.Enable, word: "antibiotic", word_desc: "抗生素", partOfSpeech: "n.", _prefix: "anti-", _suffix_desc: null, _root: "biotic", _root_desc: "生物", audio: null, link1: null, link2: null, link3: null } },
  { status: VSpellWord_status.none, data: { id:  7, quest:  "7. I'm taking _ for a throat infection.", quest_desc: "因為喉嚨發炎我正服用抗生素。", type: SpellWord_Types.normal, status: SpellWord_Status.Enable, word: "antibiotic", word_desc: "抗生素", partOfSpeech: "n.", _prefix: "anti-", _suffix_desc: null, _root: "biotic", _root_desc: "生物", audio: null, link1: null, link2: null, link3: null } },
  { status: VSpellWord_status.none, data: { id:  8, quest:  "8. I'm taking _ for a throat infection.", quest_desc: "因為喉嚨發炎我正服用抗生素。", type: SpellWord_Types.normal, status: SpellWord_Status.Enable, word: "antibiotic", word_desc: "抗生素", partOfSpeech: "n.", _prefix: "anti-", _suffix_desc: null, _root: "biotic", _root_desc: "生物", audio: null, link1: null, link2: null, link3: null } },
  { status: VSpellWord_status.none, data: { id:  9, quest:  "9. I'm taking _ for a throat infection.", quest_desc: "因為喉嚨發炎我正服用抗生素。", type: SpellWord_Types.normal, status: SpellWord_Status.Enable, word: "antibiotic", word_desc: "抗生素", partOfSpeech: "n.", _prefix: "anti-", _suffix_desc: null, _root: "biotic", _root_desc: "生物", audio: null, link1: null, link2: null, link3: null } },
  { status: VSpellWord_status.none, data: { id: 10, quest: "10. I'm taking _ for a throat infection.", quest_desc: "因為喉嚨發炎我正服用抗生素。", type: SpellWord_Types.normal, status: SpellWord_Status.Enable, word: "antibiotic", word_desc: "抗生素", partOfSpeech: "n.", _prefix: "anti-", _suffix_desc: null, _root: "biotic", _root_desc: "生物", audio: null, link1: null, link2: null, link3: null } }
];
ArrData.push(EmptyData);

let OrgArrData = [...ArrData];
let CurrentIndex: number;
let QPPercentage: number;

let RefVSpellWord: any[];
let SSU = new SpeechSynthesisUtterance();

export default defineComponent({
  name: "Quest",
  data(){ 
    CurrentIndex = 0;
    QPPercentage = 0;
    
    return {
      RefVSpellWord,
      VSpellWord_status,
      SpellWord_Types,
      SpellWord_Status,
      ArrData,
      CurrentIndex,
      QPPercentage,
      SSU
    }
  },
  components: {
    VSpellWord,
  },
  methods: {
    playWord: function() {
      this.SSU.text = (this.ArrData[this.CurrentIndex] as any).data.word;
      window.speechSynthesis.speak(this.SSU);
    },
    playSentence: function() {
      var q = (this.ArrData[this.CurrentIndex] as any).data;
      var q1 = q.quest.split('_');
      var q2 = q.word;
      var q3 = q.quest_desc;
      this.SSU.text = `${q1[0]} ${q2} ${q1[1]} ${q3}`;
      window.speechSynthesis.speak(this.SSU);
    },
    confirm: function() {
      (this.$refs.RefVSpellWord as any[])[0].confirm();
    },
    next: function() {
      this.CurrentIndex++; 
      this.QPPercentage = this.CurrentIndex / this.ArrData.length * 100;
    },
    result: function() {
      this.CurrentIndex++;
      this.QPPercentage = 100;
    }, 
    again: function() {
    this.ArrData =  [...OrgArrData];
      for(let i = 0; i < this.ArrData.length; i++) 
        this.ArrData[i].status = -1;
      this.CurrentIndex = 0; 
      this.QPPercentage = 0;
    },
    againwithfailed: function() {
      this.ArrData = this.ArrData.filter(x => x.status == VSpellWord_status.failure);
      for(let i = 0; i < this.ArrData.length; i++) 
        this.ArrData[i].status = -1;
      this.ArrData.push(EmptyData);
      this.CurrentIndex = 0; 
      this.QPPercentage = 0;
    },
    onVSpellWordEnterUp() {
      (this.$refs.RefVSpellWord as any[])[0].confirm();
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  margin: 5px 0;
}
.quests-progress {
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
}
</style>
