
export const SpellWord_Types = {
  normal: 0,
  rank1: 1,
  rank2: 2,
}

export const SpellWord_Status = {
  Disable: 0,
  WaitForApprove: 1,
  Enable: 2,
  Banned: 3
};

export const VSpellWord_status = {
  none: -1,
  failure: 0,
  success: 1
};

export class SpellWord  {
  id: number;
  type: number;
  status: number;
  quest: string;            //題目 = null 為空表示僅Relation with
  quest_desc: string;       //與題目相同 = null 
  word: string;  
  word_desc: string; 
  partOfSpeech: string;
  _prefix: string | null;        
  _prefix_desc: string | null;     
  _suffix: string | null;  
  _suffix_desc: string | null; 
  _root: string | null;   
  _root_desc: string | null;              
  audio: string | null;
  link1: string | null;
  link2: string | null;
  link3: string | null;
}