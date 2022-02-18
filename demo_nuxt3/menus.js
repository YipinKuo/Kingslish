const menus =  [
  { type: "工具", path: "/AppWordbrowserTemplateA",       name: "e4f單字瀏覽"                },  
  { type: "練習", path: "/PracticeWordTemplateA",         name: "字卡練習(樣式一)"           }, 
  { type: "工具", path: "/ToolsTestingWithTextToSpeech",  name: "[測試]文字轉語音"           },   
  { type: "編輯", path: "/EditorWithPracticeWord",        name: "[編輯器]字卡練習－測試一"   }
];

export default ({ app }, inject) => {
  inject('menus', menus)
}