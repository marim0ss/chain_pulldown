/**
https://qiita.com/sakaimo/items/689e9f3c516bb5a96c19
 * グローバル変数の定義
 */
const USE_SHEET_NAME     = "use";
const SETTING_SHEET_NAME = "settings";
const CATEGORY1_COL_NUM  = 2; // B列

/**
 * 本体
 */
function onEdit(e) {
  if (!isTargetCol(e)) return;

  const category1Value = e.value;
  const changedRow     = e.range.getRow();
  const changedCol     = e.range.getColumn();
  const useSheet       = e.source.getSheetByName(USE_SHEET_NAME);

  // 設定シート のデータ(二次元配列)
  const settingData = e.source.getSheetByName(SETTING_SHEET_NAME).getDataRange().getValues();

  // カテゴリ1に対応するカテゴリ2を入れておくところ
  let catgory2List = [];
  let catgory3List = [];
  
  // 設定シート のデータの中から、「選択されたカテゴリ1」に対応するカテゴリ2を取り出すところ
  settingData.forEach( row => {
    if (row[0] === category1Value) {
      catgory2List.push(row[1]);
      catgory3List.push(row[2]);  //カテゴリ3つめの内容入っている
  }
  console.log(catgory2List)
  console.log(catgory3List)
  });

  if(catgory2List.length === 0) return;

  // 編集されたセルの右のセルにカテゴリ2のプルダウンをセットする  // 関数化して分けた方がいい？OR　Forで回す
  const range = useSheet.getRange(changedRow, changedCol + 1);
  const rule  = SpreadsheetApp.newDataValidation().requireValueInList(catgory2List, true);
  rule.setAllowInvalid(false).build();
  range.setDataValidation(rule);

  // カテゴリ３のプルダウンをセットする
  const range_next = useSheet.getRange(changedRow, changedCol + 2);
  const rule_next  = SpreadsheetApp.newDataValidation().requireValueInList(catgory3List, true);
  rule_next.setAllowInvalid(false).build();
  range_next.setDataValidation(rule_next);
  
  // forで書いてみる
  /* 
  for (var i = 1; i < settingData.length; i++) {

  const range = useSheet.getRange(changedRow, changedCol + i　);
  const rule  = SpreadsheetApp.newDataValidation().requireValueInList("catgory" + i + "List", true);  //入れ物があるとき可変変数<-変数名でしか表示されない
  
  rule.setAllowInvalid(false).build();
  range.setDataValidation(rule);
  }
  }
  
  */
}

function test() {
  /*
  var b = {};
  b[v1set] = 1;
  b[v2set] = 2;
  b[v3set] = 3;

  
  for (var i = 1; i < 4; i++) {
    console.log("v" + i + "set");  //v1set, v2set, v3set
  }
  console.log(b[v1set])
  console.log(b[v2set])
  console.log(b[v3set])
  */
}

/**
 * プルダウン連動をさせる列かどうかの判断
 */
function isTargetCol(e) {
  // 値が削除されたときはvalueが undefになるので無視
  if (!e.range.getValue()) return false; // ※1

  // 関係ないシートのとき
  if (e.source.getSheetName() !== USE_SHEET_NAME) return false;

  // 列が違うとき
  if (e.range.getColumn() != CATEGORY1_COL_NUM) return false;

  return true;
}
