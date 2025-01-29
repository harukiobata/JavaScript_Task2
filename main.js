$(document).ready(function(){
    let SumNumber ="";  //表示する文字列
    let flag=0; //記号を管理する為のフラグ(記号の連続入力時後に入力された記号に置き換え記号を連続してdisplayに表示しないようにする為に導入)
    let count=-1;  //文字列の最後尾の値で色々判断するのでその為に導入(-1スタートなのはカウントを入力した初めにインクリメントするため)
    let Dotflag=0;  //Dotボタンによる入力の管理のためのフラグ(連続入力を防ぐため導入)
    let Zeroflag=0; //0を管理するためのフラグ(記号後の0や初手の0入力後dotボタンを押さないと入力を受け付けなくするために導入)
    function sliceSum(number){  //slice関数で一番後ろの値を返す(countと併用でしか使ってない)
        let last = SumNumber.slice(number);
        return last;
    }
    function sumString(value){  //sumnumberに文字を追加しdisplayに表示する
        SumNumber +=value;
        $("div").text(SumNumber);
    }
    function stringDiscrimination(value){ //この関数がこのプログラムの核。入力されたボタンの種類とflagの有無で行動を変える関数(記号(あり・なし)かflag(あり・なし)か00か否かで判定しcountの調整、flagの調整などをする)
        if(flag == 0&&(value =="+"||value =="-"||value =="*"||value =="/")){
            count++;
            flag = 1;
            return value;
        }else if(flag == 1&&(value =="+"||value =="-"||value =="*"||value =="/")){
            let ap =SumNumber.slice(0,-1);
            ap+=value;
            SumNumber = ap;
            $("div").text(SumNumber);
            flag = 0;
            return value;
        }
        if(value =="00"){
            count +=2;
            return value;
        }
        if(value !="+"||value !="-"||value !="*"||value !="/"){
            count++;
            return value;
        }
    }
    $(".Number").click(function(){  
        if(count <= -1){    //最初かつ0が入力されたかどうかを判別。0が入力された時その後、.が入力されるようにzeroflagで調整する
            let value = stringDiscrimination($(this).text());
            sumString(value);
            let Hantei=SumNumber.slice(count);
            if(Hantei == "0"){
                Zeroflag = 1;
            }
            flag =0;
        }else 
         if( 0 <= count&&Zeroflag == 0){   
            let Hantei =SumNumber.slice(count)
            let value = stringDiscrimination($(this).text());
            sumString(value);
            let Hantei2=SumNumber.slice(count);
            flag =0;
            if((Hantei =="+"||Hantei =="-"||Hantei =="*"||Hantei =="/")&&Hantei2 == 0){
                Zeroflag = 1;
            }
        }
    })
    $(".Kigou").click(function(){
        if(0 <= count && Zeroflag == 0){
            let Hantei = sliceSum(count);
            if(Hantei =="+"||Hantei =="-"||Hantei =="/"||Hantei =="*"||Hantei =="."){
                flag = 1;  
                stringDiscrimination($(this).text());
            } else{
                let value =stringDiscrimination($(this).text());
                sumString(value); 
            }
        }
        if(count == -1){    //最初に入力されたボタンが-の時だけ反映されるようにする
            let minus = stringDiscrimination($(this).text());
            if(minus == "-"){  
                sumString(minus);
                flag = 1;   
            }
        }
        Dotflag = 0;
    })
    $("#ZeroZero").click(function(){    //最初に入力された場合反映されないようにかつ0のすぐ後に反映されないようにする
        if(0 <= count && Zeroflag == 0){
            let Hantei = sliceSum(count);
            console.log(Hantei);
            if(Hantei !="+" && Hantei !="-" && Hantei !="/" && Hantei !="*"){
                let value = stringDiscrimination($(this).text());
                sumString(value);
                flag = 0;
            }
        }
    })
    $("#Dot").click(function(){     //最初に入力された場合反映されないようにかつ記号(演算子)のすぐ後に反映されないようにする
        if(0 <= count){
        let Hantei = sliceSum(count);
        if(Dotflag == 0 && (Hantei !="*"&&Hantei !="-"&&Hantei !="/"&&Hantei !="+")){
            let value = stringDiscrimination($(this).text());
            sumString(value);
            Dotflag =1;
        }
        if(Hantei == 0){
            Zeroflag = 0;
        }
        }
    })
    $("#Ac").click(function(){    //押された時にリセットがかかる
        SumNumber ="";
        $("div").text(SumNumber);
        flag = 0;
        count = -1;
        Dotflag = 0;
        Zeroflag = 0;
    })
    $("#Equal").click(function(){   //文字列を数式に変え答えを出す
            let string = SumNumber.replace(/--/g,"+")
            let resalt = Function('return ('+string+');')();  //eval関数を使っていたが危険らしいのでfunctionに変更
            $("div").text(Math.round(resalt * 1000000)/1000000);  //小数点の計算で有効桁数の調整の為math関数を導入(有効桁数は６)
            SumNumber ="";
            flag = 0;
            count = -1;
            Dotflag = 0;
            Zeroflag = 0;
    })
})