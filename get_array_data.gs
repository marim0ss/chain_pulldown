//　基本操作のまとめ、おさらい
const SHEET_NAME = 'list',
    ss = SpreadsheetApp.getActiveSpreadsheet();
let sheet = ss.getSheetByName(SHEET_NAME),
// 最終行（＝横軸）
    sheet_lastRow = sheet.getLastRow();

// 列ごと、行ごとなど範囲データの取得方法
function simpleGetCol() {
  // -------------------------------------------------------------------------------------  
  // 方法1：（単純に座標指定で）A列の値をまとめて取得する
  // -------------------------------------------------------------------------------------
  for(var k = 1; k <= sheet_lastRow; k++) {
   console.log(sheet.getRange(k, 7).getValue());  // i行目, ７列目セルから最終行までの値を取得できる
  }
}


function myFunction() {  
  // -------------------------------------------------------------------------------------
  // 方法2：全体を範囲として取得する  getDataRange -> getValue "s"
  // -------------------------------------------------------------------------------------
  
  let values = sheet.getDataRange().getValues();
  //console.log(values); -> 二次元配列
  //console.log(typeof values)   // ->データ型確認
  
  // 格納用
  let array_col_A = [],
      array_col_D = [];
  
  //valuesから行ごとでーたへ
  // その多次元配列の行の数だけループを回す
  for (var i = 0; i < values.length; i++) {  // 範囲データの行数の分だけループ
    // そのまま取り出すと行ごとデータになる。
    console.log('values[i]の中身は： ' + values[i])
    
    var row = "";      // 行数の分だけ、行ごとの値を格納する変数を用意。（今回は、ループのたびにを初期化）
    // ------------------------------------------------------
    // 列ごとに配列にする
    // ------------------------------------------------------
    array_col_A.push(values[i][0]);　// A列の値
    array_col_D.push(values[i][3]);　// D列の値
    
    // ------------------------------------------------------
    // さらに１行の要素の数だけなんかするなら
    // ------------------------------------------------------
    for (var j = 0; j < values[i].length; j++) { // その中で、１行データが持つ要素の数だけループ
      // 値が存在する場合
      if (values[i][j]) {
        //console.log('values[i][j]（i行目, j列目）のデータ： ' + values[i][j])　
        console.log('values[0][0]（0行目, 0列目）' + values[0][0]) // A1の値
        console.log('values[0][1]（0行目, 1列目）' + values[0][1]) // A2の値
        console.log('values[1][0]（1行目, 0列目）' + values[1][0]) // B1の値
        console.log('values[0][1]（1行目, 1列目）' + values[1][1]) // B2の値

        // 値を格納
        row = row + values[i][j];
      }
      // カンマを付与
      row = row + ",";
    }
    // ------------------------------------------------------
    console.log('row変数の中身：' + row);// 行ごとにrow変数に値が持たせられる
  }
  console.log('A列の値を配列で' + array_col_A)   // A列の値を配列で
  console.log('D列の値を配列で' + array_col_D)   // D列の値を配列で
  
  // ------------------------------------------------------
  //2つの配列を比べて、重複しているもの、そうでないものをチェックしたい場合
  // ------------------------------------------------------
  console.log("重複しないものは")
  let diff_array = getArrayDiff(array_col_A, array_col_D)
  console.log(diff_array)　
}
/*
https://gsuiteguide.jp/sheets/getdatarange/
*/

// 重複しないものを配列にして返す
function getArrayDiff(arr1, arr2) {
  let arr = arr1.concat(arr2);
  return arr.filter((v, i)=> {
    return !(arr1.indexOf(v) !== -1 && arr2.indexOf(v) !== -1);
  });
}
// https://chaika.hatenablog.com/entry/2017/04/26/084500
