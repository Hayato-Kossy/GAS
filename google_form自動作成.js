  class Sheet{
    constructor(target_sheet){
      this.target_sheet = target_sheet
    }
  }
  const sheet = new Sheet(SpreadsheetApp.getActiveSpreadsheet());
  
  class Processing_Sheet_System{
    static get_lastRow(target_sheet){
      return target_sheet.getLastRow();
    }  
  
    static get_Question_List(target_sheet){
      let lastRow = this.get_lastRow(target_sheet) + 1;
      let question_List = [];
  
      for (let i = 2; i < lastRow; i++) {
        let question = target_sheet.getRange('A' + i).getValue();
        question_List.push(question);
      }
  
      return question_List;
    }
  
    static get_is_Required_List(target_sheet){
      let lastRow = this.get_lastRow(target_sheet) + 1;
      let is_Requierd_List = [];
  
      for (let i = 2; i < lastRow; i++) {
        let boolean = target_sheet.getRange('D' + i).getValue();
        is_Requierd_List.push(boolean);
      }
  
      return is_Requierd_List;
    } 
  
    static get_answer_method_List(target_sheet){
      let lastRow = this.get_lastRow(target_sheet) + 1;
      let answer_method_List = [];
  
      for (let i = 2; i < lastRow; i++) {
        let answer_method = target_sheet.getRange('C' + i).getValue();
        answer_method_List.push(answer_method);
      }
  
      return answer_method_List;
    }
  }
  
  class G_Form{
    static create_Gform(title){
      return FormApp.create(title);
    }
  
    static create_Form_Description(description){
      return this.create_Gform.setDescription(description);
    }
  
    static create_Question(title, target_sheet){
      let question_form = this.create_Gform(title);
      let is_Requierd_List = Processing_Sheet_System.get_is_Required_List(target_sheet);
      let question_List = Processing_Sheet_System.get_Question_List(target_sheet);
      let answer_method_List = Processing_Sheet_System.get_answer_method_List(target_sheet);
  
      for (let i = 0; i < question_List.length; i++) {
        if (answer_method_List[i] == "プルダウンリスト"){
          let question = question_form.addListItem();
          question.setTitle(question_List[i]);
          question.setRequired(is_Requierd_List[i]);
        } else if (answer_method_List[i] == "チェックボックス"){
          let question = question_form.addCheckboxItem();
          question.setTitle(question_List[i]);
          question.setRequired(is_Requierd_List[i]);
        } else if (answer_method_List[i] == "ラジオボタン"){
          let question = question_form.addMultipleChoiceItem();
          question.setTitle(question_List[i]);
          question.setRequired(is_Requierd_List[i]);
        } else if (answer_method_List[i] == "自由記述"){
          let question = question_form.addTextItem();
          question.setTitle(question_List[i]);
          question.setRequired(is_Requierd_List[i]);
        } else {
          let question = question_form.addListItem();
          question.setTitle(question_List[i]);
          question.setRequired(is_Requierd_List[i]);
        }
      }
    }
  }
  
  function test(){
    let list = Processing_Sheet_System.get_answer_method_List(sheet.target_sheet);
    console.log(list);
  }
  
  
  function execute(){
    //console.log(Processing_Sheet_System.get_Question_List(sheet.target_sheet))
        
    //console.log(sheet.target_sheet)
  
    G_Form.create_Question("フィットネスジムに関するアンケート2", sheet.target_sheet);
  }