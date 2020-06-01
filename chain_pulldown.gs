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
  let catgory2List = [],
      catgory3List = [],
      list_array = [catgory2List, catgory3List],
      count = 1;

  // 設定シート のデータの中から、「選択されたカテゴリ1」に対応するカテゴリ2を取り出すところ
  settingData.forEach( row => {
    if (row[0] === category1Value) {
      catgory2List.push(row[1]);
    console.log('row[count+1]:' + row[count+1])
      
    }
  });

  if(catgory2List.length === 0) return;
  console.log('list_array[0]は？' + list_array[0])
  console.log(list_array[0])
  console.log('list_array[0].length:' + list_array[0].length)
  
  // 編集されたセルの右のセルにカテゴリ2のプルダウンをセットする
  const range = useSheet.getRange(changedRow, changedCol + 1);
  console.log('changedCol + count: ' + (changedCol + count))  //21になってる
  console.log((changedCol + count))  //-> 3

  const rule  = SpreadsheetApp.newDataValidation().requireValueInList(catgory2List, true);
  rule.setAllowInvalid(false).build();
  range.setDataValidation(rule);
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