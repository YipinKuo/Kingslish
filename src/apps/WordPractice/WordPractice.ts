
export const WordPractice_Types = {
  normal: 0,
  rank1: 1,
  rank2: 2,
}

export const WordPractice_Status = {
  Disable: 0,
  WaitForApprove: 1,
  Enable: 2,
  Banned: 3
};

export const C_WordPractice_status = {
  none: -1,
  incorrect: 0, //1: 0-99,  
                  //2: 000, 100, 010, 001, 110, 011, 101
  correct: 111   //111
};

export class WordPractice  {
  id: number;
  type: number;
  status: number;
  quest: string;            //題目 = null 為空表示僅Relation with
  quest_desc: string;       //與題目相同 = null 
  word: string;  
  word_desc_tw: string; 
  word_desc_en: string; 
  partOfSpeech: string;
  
  _prefix: string | null;        
  _prefix_desc: string | null;     
  _suffix: string | null;  
  _suffix_desc: string | null; 
  _root: string | null;   
  _root_desc: string | null;   
  
  audio: string | null; // 
  link1: string | null; // https://www.etymonline.com/search?q=good
  link2: string | null; //
  link3: string | null; //
}