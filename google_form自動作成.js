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
  
        let question_List = Processing_Sheet_System.get_Question_List(target_sheet);
  
        for (let i = 0; i < question_List.length; i++) {
            let question = question_form.addListItem();
            question.setTitle(question_List[i]);
        }
    }
}
  
  
function execute(){
    //console.log(Processing_Sheet_System.get_Question_List(sheet.target_sheet))
        
    //console.log(sheet.target_sheet)
    G_Form.create_Question("フィットネスジムに関するアンケート", sheet.target_sheet);
}

  