<template>
  <el-row v-if='CurrentIndex < ArrData.length - 1'>
    <el-col :span="24"><div class="quests-progress"><el-progress :percentage='QPPercentage' :format='() => ShowIndex + " / " + (ArrData.length - 1)' /></div></el-col>
    <el-col v-for="(item, index) in ArrData" :key="item.id" :span="24">
      <VSpellWord 
        ref='RefVSpellWord' 
        v-if='index == CurrentIndex'
        :data='item.data' 
        :status="item.status" @update:status="item.status = $event" 
        :match="item.match"   @update:match="item.match = $event"
        @onEnterUp="onVSpellWordEnterUp"
        @onMatch="onVSpellWordMatch"></VSpellWord>
    </el-col>
    <el-col :span="24"><div class="grid-content">
      <el-button @click="playWord()     ">撥放單字</el-button>
      <el-button @click="playSentence() ">撥放句子</el-button>
      <el-button v-if="!ArrData[CurrentIndex].match"   type="primary"  @click="confirmAnswer()">確認</el-button>
      <el-button v-if="!ArrData[CurrentIndex].match"                   @click="showAnswer()   ">看答案</el-button>
      <el-button v-if="ArrData[CurrentIndex].match && CurrentIndex  < ArrData.length - 2"    type="primary"  @click="next()">下一題</el-button>
      <el-button v-if="ArrData[CurrentIndex].match && CurrentIndex == ArrData.length - 2"    type="primary"  @click="result()">看結果</el-button>
    </div></el-col>
  </el-row>
  <el-row v-if='CurrentIndex == ArrData.length - 1'>
    <el-col :span="24">
      <div class="grid-content">
        <h1>結果</h1>
        <p>正確: {{ArrData.filter(x => x.status == VSpellWord_status.correct).length}}</p>
        <p>錯誤: {{ArrData.filter(x => x.status == VSpellWord_status.incorrect).length}}</p>
      </div>
    </el-col>
    <el-col :span="24"><div class="grid-content">
      <el-button type="primary" @click="again()">重新測驗</el-button>
      <el-button type="primary" v-if="ArrData.filter(x => x.status == VSpellWord_status.incorrect).length > 0"  @click="againwithfailed()">針對錯誤及未做再次測驗</el-button>
    </div></el-col>
  </el-row>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { VSpellWord_status, SpellWord_Types, SpellWord_Status, SpellWord } from "../models/SpellWord";
import VSpellWord from "@/components/VSpellWord.vue"; // @ is an alias to /src

let EmptyData:SpellWord = new SpellWord();
let ArrData:any[] = [
	{ status: VSpellWord_status.none, match: false, data: { id:  1, quest:  "1. I'm taking _ for a throat infection.", quest_desc: "因為喉嚨發炎我正服用抗生素。", type: SpellWord_Types.normal, status: SpellWord_Status.Enable, word: "antibiotic", word_desc: "抗生素", partOfSpeech: "n.", _prefix: "anti-", _suffix_desc: null, _root: "biotic", _root_desc: "生物", audio: null, link1: null, link2: null, link3: null } },
  { status: VSpellWord_status.none, match: false, data: { id:  2, quest:  "2. I'm taking _ for a throat infection.", quest_desc: "因為喉嚨發炎我正服用抗生素。", type: SpellWord_Types.normal, status: SpellWord_Status.Enable, word: "antibiotic", word_desc: "抗生素", partOfSpeech: "n.", _prefix: "anti-", _suffix_desc: null, _root: "biotic", _root_desc: "生物", audio: null, link1: null, link2: null, link3: null } },
  { status: VSpellWord_status.none, match: false, data: { id:  3, quest:  "3. I'm taking _ for a throat infection.", quest_desc: "因為喉嚨發炎我正服用抗生素。", type: SpellWord_Types.normal, status: SpellWord_Status.Enable, word: "antibiotic", word_desc: "抗生素", partOfSpeech: "n.", _prefix: "anti-", _suffix_desc: null, _root: "biotic", _root_desc: "生物", audio: null, link1: null, link2: null, link3: null } },
 // { status: VSpellWord_status.none, match: false, data: { id:  4, quest:  "4. I'm taking _ for a throat infection.", quest_desc: "因為喉嚨發炎我正服用抗生素。", type: SpellWord_Types.normal, status: SpellWord_Status.Enable, word: "antibiotic", word_desc: "抗生素", partOfSpeech: "n.", _prefix: "anti-", _suffix_desc: null, _root: "biotic", _root_desc: "生物", audio: null, link1: null, link2: null, link3: null } },
 // { status: VSpellWord_status.none, match: false, data: { id:  5, quest:  "5. I'm taking _ for a throat infection.", quest_desc: "因為喉嚨發炎我正服用抗生素。", type: SpellWord_Types.normal, status: SpellWord_Status.Enable, word: "antibiotic", word_desc: "抗生素", partOfSpeech: "n.", _prefix: "anti-", _suffix_desc: null, _root: "biotic", _root_desc: "生物", audio: null, link1: null, link2: null, link3: null } },
 // { status: VSpellWord_status.none, match: false, data: { id:  6, quest:  "6. I'm taking _ for a throat infection.", quest_desc: "因為喉嚨發炎我正服用抗生素。", type: SpellWord_Types.normal, status: SpellWord_Status.Enable, word: "antibiotic", word_desc: "抗生素", partOfSpeech: "n.", _prefix: "anti-", _suffix_desc: null, _root: "biotic", _root_desc: "生物", audio: null, link1: null, link2: null, link3: null } },
 // { status: VSpellWord_status.none, match: false, data: { id:  7, quest:  "7. I'm taking _ for a throat infection.", quest_desc: "因為喉嚨發炎我正服用抗生素。", type: SpellWord_Types.normal, status: SpellWord_Status.Enable, word: "antibiotic", word_desc: "抗生素", partOfSpeech: "n.", _prefix: "anti-", _suffix_desc: null, _root: "biotic", _root_desc: "生物", audio: null, link1: null, link2: null, link3: null } },
 // { status: VSpellWord_status.none, match: false, data: { id:  8, quest:  "8. I'm taking _ for a throat infection.", quest_desc: "因為喉嚨發炎我正服用抗生素。", type: SpellWord_Types.normal, status: SpellWord_Status.Enable, word: "antibiotic", word_desc: "抗生素", partOfSpeech: "n.", _prefix: "anti-", _suffix_desc: null, _root: "biotic", _root_desc: "生物", audio: null, link1: null, link2: null, link3: null } },
 // { status: VSpellWord_status.none, match: false, data: { id:  9, quest:  "9. I'm taking _ for a throat infection.", quest_desc: "因為喉嚨發炎我正服用抗生素。", type: SpellWord_Types.normal, status: SpellWord_Status.Enable, word: "antibiotic", word_desc: "抗生素", partOfSpeech: "n.", _prefix: "anti-", _suffix_desc: null, _root: "biotic", _root_desc: "生物", audio: null, link1: null, link2: null, link3: null } },
 // { status: VSpellWord_status.none, match: false, data: { id: 10, quest: "10. I'm taking _ for a throat infection.", quest_desc: "因為喉嚨發炎我正服用抗生素。", type: SpellWord_Types.normal, status: SpellWord_Status.Enable, word: "antibiotic", word_desc: "抗生素", partOfSpeech: "n.", _prefix: "anti-", _suffix_desc: null, _root: "biotic", _root_desc: "生物", audio: null, link1: null, link2: null, link3: null } }
];
ArrData.push(EmptyData);

let OrgArrData = [...ArrData];
let CurrentIndex: number;
let ShowIndex: number;
let QPPercentage: number;

let RefVSpellWord: any[];
let SSU = new SpeechSynthesisUtterance();

export default defineComponent({
  name: "Quest",
  data(){ 
    CurrentIndex = 0;
    ShowIndex = 0;
    QPPercentage = 0;
    
    return {
      RefVSpellWord,
      VSpellWord_status,
      SpellWord_Types,
      SpellWord_Status,
      ArrData,
      EmptyData,    
      CurrentIndex,
      ShowIndex,
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
    confirmAnswer: function() {
      (this.$refs.RefVSpellWord as any[])[0].confirm();
    },
    showAnswer: function() {
      (this.$refs.RefVSpellWord as any[])[0].show();
    },
    next: function() {
      this.CurrentIndex++; 
    },
    result: function() {
      this.CurrentIndex++;
      this.QPPercentage = 100;
    }, 
    again: function() {
    this.ArrData =  [...OrgArrData];
      for(let i = 0; i < this.ArrData.length; i++) {
        this.ArrData[i].status = VSpellWord_status.none;
        this.ArrData[i].match = false;
      }
      this.CurrentIndex = 0; 
      this.ShowIndex = 0;
      this.QPPercentage = 0;
    },
    againwithfailed: function() {
      this.ArrData = this.ArrData.filter(x => x.status === VSpellWord_status.incorrect);
      for(let i = 0; i < this.ArrData.length; i++) {
        this.ArrData[i].status = VSpellWord_status.none;
        this.ArrData[i].match = false;
      }
      this.ArrData.push(this.EmptyData);
      this.CurrentIndex = 0; 
      this.ShowIndex = 0;
      this.QPPercentage = 0;
    },
    onVSpellWordEnterUp() {
      (this.$refs.RefVSpellWord as any[])[0].confirm();
    },
    onVSpellWordMatch() {
      this.ShowIndex++;
      this.QPPercentage = (this.ShowIndex) / (ArrData.length - 1) * 100;
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
