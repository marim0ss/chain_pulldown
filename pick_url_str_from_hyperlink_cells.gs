//　基本操作のまとめ、おさらい
const SHEET_NAME = 'getURL',
    ss = SpreadsheetApp.getActiveSpreadsheet();
let sheet = ss.getSheetByName(SHEET_NAME),
// 最終行（＝横軸）
    sheet_lastRow = sheet.getLastRow();

// 列ごと、行ごとなど範囲データの取得方法
function pickHyperLinkUrl() {
  
  let array_A_formula = [];
  // -------------------------------------------------------------------------------------  
  // 方法1：（単純に座標指定で）A列の値をまとめて取得する
  // -------------------------------------------------------------------------------------
  for(var k = 1; k <= sheet_lastRow; k++) {　　　　　　　　　　　//　GAS側では関数敷いてあるセルでも文字列認識らしい
    let col_a_value = sheet.getRange(k, 1);
    //console.log(sheet.getRange(k, 1).getValue());  // i行目, 1列目セルから最終行までの値を取得できる
    //console.log(a1.getFormula() );   // ->string  =HYPERLINK("https://prtimes.jp/main/html/searchrlp/company_id/33336","1010株式会社")
    array_A_formula.push( col_a_value.getFormula() );
  }
  //console.log(array_A_formula); // [aaa, bbb,  ]
  
  let reg = /=HYPERLINK\("(.+)",/;
  
  for(var i = 0; i < array_A_formula.length; i++) {
    //Logger.log(typeof array_A_formula[i])
      let link_str = "";
      link_str = array_A_formula[i].match(reg);
    
      if (link_str) {  // マッチしたとき
       console.log(link_str[1], typeof link_str[1]);  // link_str[1]で（）でマッチした部分を出力できる
       sheet.getRange(i+1, 3).setValue(link_str[1]);
      }else{
        continue;  // 次の処理へ
      }
  }
}
