
"use strict";


function showAlert( message )
{
    if ( giMode == DEBUG_MODE )
    {
        alert( message );
    }
}




// ex. 340 -> 05:40:00
function getTimeStringFromMinute( allMinute )
{
    var hour = Math.floor( allMinute / 60 );
    var minute = allMinute - hour * 60;

    var hourString = hour > 9 ? "" + hour : "0" + hour;
    var minuteString = minute > 9 ? "" + minute : "0" + minute;

    return hourString + ":" + minuteString + ":" + "00";
}

function isNumber( numberOrNot )
{
    return typeof numberOrNot == 123;
}

// replace the native api (parseInt) cause the browser change 09 to 0 in Android ...
// ex. 09 -> 9
function getNumber( sNumber )
{
    if ( isNumber( sNumber ) )
        return sNumber;

    var iNumber = 0;

    for ( var i = 0; i < sNumber.length; i ++ )
    {
        var sToken = sNumber.substring( i, i + 1 );
        var iToken = 0;
        for ( var j = 0; j < 10; j ++ )
        {
            if ( sToken == "" + j )
                iToken = j;
        }

        iNumber = iNumber * 10 + iToken;
    }

    return iNumber;
}

// ex. 15 -> 15:00:00
function getTimeStringFromID( timeID )
{
    if ( timeID < 0 || timeID > 24 )
        timeID = 24; // indicate that no need to care about time

    return timeID + ":00:00";
}



// output: string
function getStandardDateText( dateString )
{
    var tokens = dateString.split( DIVISION_WORD_2 );

    return tokens[0] + "(" + getWeekText( tokens[1] ) + ")";
}

// ex. 2013.12.08=3 -> 3
// output: integer

// ex. 5 -> 5:00
function getTimeString( clockNum )
{
    return clockNum + S_CLOCK[gLanguageIndex];
}

// ex. 2012/10 -> daysInMonth( 2012, 9 ) -> 31
function daysInMonth( year, month )
{
    return new Date( year, month + 1, 0 ).getDate();
}

// ex. new Date() , 5 -> 2014.1.6_1
function getDateStringFromDate( baseDate, offset )
{
    var year = baseDate.getFullYear();
    var month = baseDate.getMonth();
    var date = baseDate.getDate();

    offset = parseInt( offset );

    var dayCount = daysInMonth( year, month );
    var thisDate;
    if ( date + offset <= dayCount )
    {
        date += offset;

    }
    else
    {
        month ++;
        date = date + offset - dayCount;
    }

    thisDate = new Date( year, month, date );

    var day = thisDate.getDay();

    return year + "." + ( month + 1 ) + "." + date + DIVISION_WORD_2 + day;
}

function getWeekText( day )
{
    return S_WEEK_ARRAY[day][gLanguageIndex];
}

// for the date select page
function getDateText()
{
    if ( gsDate == "" )
        gsDate = getDateStringFromDate( new Date(), 0 );

    return S_CHOSEN_DATE[gLanguageIndex] + COLON_WORD + getStandardDateText( gsDate );
}

// for the time select page
function getTimeText()
{
    if ( giTimeEarliestID < 0 )
        giTimeEarliestID = DEFAULT_TIME_EARLIEST_ID;
    if ( giTimeLatestID < 0 )
        giTimeLatestID = DEFAULT_TIME_LATEST_ID;

    return S_CHOSEN_TIME[gLanguageIndex] + COLON_WORD + getTimeString( parseInt( giTimeEarliestID ) ) + " ~ " + getTimeString( parseInt( giTimeLatestID ) );
}


function initData()
{
// --------------GWAI-----------------

}


function checkLocale()
{
    if ( navigator.globalization == undefined )
    {
        alert( "NOT SUPPORT navigator.globalization" );
        return;
    }

    navigator.globalization.getLocaleName(
        function ( locale )
        {
            //alert('locale: ' + locale.value + '\n');
            var sLocale = locale.value.toLowerCase();;

            if ( sLocale.indexOf( "zw" ) >= 0 ||
                 sLocale.indexOf( "tw" ) >= 0 ||
                 sLocale.indexOf( "hk" ) >= 0 )
            {
                gLocalLanguageIndex = ZH;
            }
            else if ( sLocale.indexOf( "cn" ) >= 0 )
            {
                gLocalLanguageIndex = CN;
            }
            else if ( sLocale.indexOf( "ja" ) >= 0 ||
                      sLocale.indexOf( "jp" ) >= 0 )
            {
                gLocalLanguageIndex = JA;
            }
            else if ( sLocale.indexOf( "ko" ) >= 0 ||
                      sLocale.indexOf( "kr" ) >= 0 )
            {
                gLocalLanguageIndex = KO;
            }
            else
            {
                gLocalLanguageIndex = EN; // English for default
            }

        },
        function ()
        {
            //alert('Error getting locale\n');
        }
    );
}


function initSetting()
{
    //removeAllItem(); // for recovery when the wrong items are stored
    //removeItem( KEY_TICKET_CATEGORY_INDEXS );



    // set language
    //giLanguageSelectedIndex = getLanguageIndex();
    //gLanguageIndex = giLanguageSelectedIndex;

    // set font size
    giFontSizeSelectedIndex = getFontSizeIndex();
    giFontRatio = 100 + giFontSizeSelectedIndex * 10;



    // set color and image
    gsFontColor = getFontColor();
    gsBackgroundColor = getBackgroundColor();
    gsBackgroundImage = getBackgroundImage();

    showFontColor( gsFontColor );
    showBackgroundColor( gsBackgroundColor );
    showBackgroundImage( gsBackgroundImage );




}


function log( text )
{
    if ( console != null )
        console.log( text );
}

// ex. ID_STYLE -> aStyleSlectedIndex
function getSelectArrayByID( sDivID )
{
    var abSelected = new Array();

    if ( sDivID === ID_STYLE )
    {
        for ( var i = 0; i < S_STYLE_ARRAY.length; i ++ )
        {
            abSelected[i] = ( i == giStyleSelectedIndex );
        }
    }
    else if ( sDivID === ID_LANGUAGE )
    {
        for ( var i = 0; i < S_LANGUAGE_ARRAY.length; i ++ )
        {
            abSelected[i] = ( i == giLanguageSelectedIndex );
        }
    }
    else if ( sDivID === ID_RESULT_LIMIT )
    {
        for ( var i = 0; i < S_RESULT_LIMIT_ARRAY.length; i ++ )
        {
            abSelected[i] = ( i == giResultLimitSelectedIndex );
        }
    }

    return abSelected;
}

function getRelatedUrlByIndex( index )
{
    if ( S_RELATED_LINKS_ARRAY[index].toString() === S_GOOGLE_PLAY.toString() )
    {
        return "https://play.google.com/store/apps/details?id=sk.phonegap.timetable";
    }
    else if ( S_RELATED_LINKS_ARRAY[index].toString() === S_CHROME_WEB_STORE.toString() )
    {
        return "https://chrome.google.com/webstore";
    }
    else if ( S_RELATED_LINKS_ARRAY[index].toString() === S_FIREFOX_MARKETPLACE.toString() )
    {
        return "https://marketplace.firefox.com/app/offlinetimetable";
    }
    else if ( S_RELATED_LINKS_ARRAY[index].toString() === S_GITHUB.toString() )
    {
        return "https://github.com/abc9070410/OfflineTimetable";
    }
    else if ( S_RELATED_LINKS_ARRAY[index].toString() === S_TRA_OFFICE_SITE.toString() )
    {
        return "http://twtraffic.tra.gov.tw/twrail/";
    }
    else if ( S_RELATED_LINKS_ARRAY[index].toString() === S_THSR_OFFICE_SITE.toString() )
    {
        return "http://www.thsrc.com.tw/tw/TimeTable/SearchResult";
    }
    else if ( S_RELATED_LINKS_ARRAY[index].toString() === S_KINGBUS_OFFICE_SITE.toString() )
    {
        return "http://www.kingbus.com.tw/time&price.php";
    }
    else if ( S_RELATED_LINKS_ARRAY[index].toString() === S_UBUS_OFFICE_SITE.toString() )
    {
        return "http://www.ubus.com.tw/html/line/search_list.php";
    }
    else
    {
        showAlert( "no such related link index: " + index );

        return "";
    }
}

// return a random color between #000000 to #FFFFFF
function getRandomColor()
{
    var asSeed = new Array( "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F" );

    var sColor = "#";
    for ( var i = 0; i < 6; i ++ )
    {
        sColor += asSeed[Math.floor( Math.random() * 16 )];
    }

    return sColor;
}










function saveTextFile( text )
{

    var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "hello world.txt");
}

function downloadImageFile( fileURL )
{
    var beginIndex = fileURL.lastIndexOf( "/" ) + 1;
    var fileName = fileURL.substring( beginIndex, fileURL.length );


    var oReq = new XMLHttpRequest();
    oReq.open("GET", fileURL, true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function(oEvent) {
        var blob = new Blob([oReq.response], {type: "image/png"});
        saveAs(blob, fileName);
    };

    oReq.send();
}


















function GetHttpRequest()
{
    if ( window.XMLHttpRequest ) // Gecko
        return new XMLHttpRequest() ;
    else if ( window.ActiveXObject ) // IE
        return new ActiveXObject("MsXml2.XmlHttp") ;
}
function AjaxPage(sId, url){
    var oXmlHttp = GetHttpRequest() ;
    oXmlHttp.OnReadyStateChange = function()
    {
        if ( oXmlHttp.readyState == 4 )
        {
            if ( oXmlHttp.status == 200 || oXmlHttp.status == 304 )
            {
                IncludeJS( sId, url, oXmlHttp.responseText );
            }
            else
            {
                alert( 'XML request error: ' + oXmlHttp.statusText + ' (' + oXmlHttp.status + ')' ) ;
            }
        }
    }
    oXmlHttp.open('GET', url, true);
    oXmlHttp.send(null);
}
function IncludeJS(sId, fileUrl, source)
{
    if ( ( source != null ) && ( !document.getElementById( sId ) ) )
    {
        var oHead = document.getElementsByTagName('HEAD').item(0);
        var oScript = document.createElement( "script" );
        oScript.language = "javascript";
        oScript.type = "text/javascript";
        oScript.id = sId;
        oScript.defer = true;
        oScript.text = source;
        oHead.appendChild( oScript );
    }
}

function addJS( sJsFile, bLocalFile )
{
    var oHead = document.getElementsByTagName("head")[0];
    var oScript = document.createElement("script");
    
    giPrevListIndex = giCurrentListIndex;
    giPrevNameIndex = giCurrentNameIndex;
    
    lockWait();
    
    if ( giPlatform == PLATFORM_WP )
    {
        sJsFile = ( gbJSFileOnline && !bLocalFile ) ? sJsFile : getAbsolutePath() + sJsFile;
    }
    
    if ( oScript.onreadystatechange != undefined )
    {
        oScript.type = "text/javascript";
        oScript.src = sJsFile;
        oScript.onreadystatechange = function() {
            if (this.readyState == 'complete') 
            {
                //alert( "complete :" + gsCurrentBasicIntroduction );
                loadDone();
            }
            else if (this.readyState == 'loaded') 
            {
                loadDone();
            }
        };
        //head.appendChild(oScript);
        document.head.appendChild(oScript);
    }
    else
    {
        oScript.type = "text/javascript";
        oScript.src = sJsFile;
        oScript.async = true;
        //oHead.appendChild( oScript);
        oScript.onload = loadDone();
        document.head.appendChild(oScript);
        //unlockWait();
    }
}

function loadDone() 
{
    
    if ( giPrevListIndex == giCurrentListIndex && 
         giPrevNameIndex == giCurrentNameIndex )
    {
        backupCurrentData();
    }
    else
    {
        //alert( gsCurrentName + "->" + gsBackupName );
        restoreCurrentData();
        
    }
    
    unlockWait();
    //alert( getCurrentDirectory() + "/" + getCurrentFileName() + "\n\n" + gsCurrentBasicIntroduction );
}

function isLock()
{
    return gbLockWait;
}

function lockWait()
{
    gbLockWait = true;
    $.ui.showMask( "Wait" );
}

function unlockWait()
{
    gbLockWait = false;
    $.ui.hideMask();
}

function backupCurrentData()
{
    gsBackupName = gsCurrentName;
    gsBackupURL = gsCurrentURL;
    gsBackupPicURL = gsCurrentPicURL;
    gsBackupBasicIntroduction = gsCurrentBasicIntroduction;
    gasBackupContentTitle = gasCurrentContentTitle;
    gasBackupContent = gasCurrentContent;
    gasBackupContentClass = gasCurrentContentClass;
}

function restoreCurrentData()
{
    gsCurrentName = gsBackupName;
    gsCurrentURL = gsBackupURL;
    gsCurrentPicURL = gsBackupPicURL;
    gsCurrentBasicIntroduction = gsBackupBasicIntroduction;
    gasCurrentContentTitle = gasBackupContentTitle;
    gasCurrentContent = gasBackupContent;
    gasCurrentContentClass = gasBackupContentClass;
}

function cleanCurrentData()
{
    gsCurrentName = "";
    gsCurrentURL = "";
    gsCurrentPicURL = "";
    gsCurrentBasicIntroduction = "";
    gasCurrentContentTitle = new Array();
    gasCurrentContent = new Array();
    gasCurrentContentClass = new Array();
}

function backupIndexPath()
{
    gsIndexPath = window.location.href;
}

function restoreIndexPath()
{
    //alert( "Reset: " + gsIndexPath );
    //window.location.href = gsIndexPath;
    //window.location.reload();
    
    window.history.pushState( "CHANGE1", "Title", gsIndexPath );
}

function getAbsolutePath()
{
    var sFilePath1 = window.location.pathname;
    var sFilePath2 = window.location.href;
    
    //alert( sFilePath + "\n" + sFilePath2 );
    
    var iBeginIndex = sFilePath1.lastIndexOf(':') - 1;
    var iEndIndex = sFilePath1.lastIndexOf('/') + 1;
    var sAbsolutePath = sFilePath1.substring( iBeginIndex, iEndIndex );
    
    //alert( sFilePath );
    
    if ( gbOnReady )
    {
        // ex. x-wmapp0:www/index.html
        iEndIndex = sFilePath2.indexOf(':') + 1;
        var sHeadPart = sFilePath2.substring( 0, iEndIndex );
        var sTailPart = "www/";
        sAbsolutePath = sHeadPart + sTailPart;
    }
    
    return sAbsolutePath;
}

// --------------GWAI-----------------

// get 0 ~ number-1
function getRandom( number )
{
    return Math.floor(Math.random() * number);
}

function getRandomNameIndex( iListIndex )
{
    return getRandom( NAME_LIST[iListIndex].length );
}

function getRandomListIndex()
{
    return getRandom( NAME_LIST.length );
}

function getRandomName()
{
    var iListIndex = getRandomListIndex();
    return NAME_LIST[iListIndex][getRandomNameIndex( iListIndex )];
}

function getFullName( iListIndex, iNameIndex )
{
    return NAME_LIST[iListIndex][iNameIndex];
}

function getName( iListIndex, iNameIndex )
{
    var sName = getFullName( iListIndex, iNameIndex );
    
    var iEndIndex = sName.indexOf( "(" );
    
    if ( iEndIndex > 0 )
        return sName.substring( 0, iEndIndex );

    return sName;
}


function isUsedName( iListIndex, iNameIndex )
{
    var bListIndexUsed = false;
    var bNameIndexUsed = false;

    for ( var i = 0; i < gaiUsedListIndex.length; i ++ )
    {
        if ( gaiUsedListIndex[i] === iListIndex )
        {
            bListIndexUsed = true;
        }
    }
    
    if ( !bListIndexUsed )
        return false;
        
    for ( var i = 0; i < gaiUsedNameIndex.length; i ++ )
    {
        if ( gaiUsedNameIndex[i] === iNameIndex )
        {
            return true;
        }
    }
    
    return false;
}

function getAnotherNames( iNameAmount )
{
    var aiNameIndex = new Array();
    var iListIndex = giCurrentListIndex;
    var iNameIndex = 0;
    var bUsed = false;
    
    while ( true )
    {
        iNameIndex = getRandomNameIndex( iListIndex );

        bUsed = isUsedName( iListIndex, iNameIndex );

        for ( var i = 0; !bUsed && i < aiNameIndex.length; i ++ )
        {
            if ( aiNameIndex[i] == iNameIndex )
                bUsed = true;
        }

        if ( bUsed )
        {
            continue;
        }

        aiNameIndex[aiNameIndex.length] = iNameIndex;

        if ( aiNameIndex.length == iNameAmount )
            break;
    }

    /*
    var asAnotherName = new Array();

    for ( var i = 0; i < aiNameIndex.length; i ++ )
    {
        asAnotherName[i] = getName( iListIndex, aiNameIndex[i] );
    }
    */

    //alert( "->" + gaiUsedNameIndex + "___" + aiNameIndex);

    //return asAnotherName;
    return getNames( iListIndex, aiNameIndex );
}


function getNames( iListIndex, aiIndex )
{
    var asNames = new Array();

    for ( var i = 0; i < aiIndex.length; i ++ )
    {
        asNames[i] = getName( iListIndex, aiIndex[i] );
    }

    return asNames;
}

function getCover( iListIndex, iNameIndex )
{
    return COVER_LIST[iListIndex][iNameIndex];
}

function getCurrentFullName()
{
    return getFullName( giCurrentListIndex, giCurrentNameIndex );
}

function getCurrentName()
{
    return getName( giCurrentListIndex, giCurrentNameIndex );
}

function getCurrentCover()
{
    return COVER_LIST[giCurrentListIndex][giCurrentNameIndex];
}

function getCurrentDirectory()
{
    if ( gbJSFileOnline )
    {
        return "https://manymanysinger.googlecode.com/svn/trunk/" + DIRECTORY_LIST[giCurrentListIndex];
    }
    else
    {
        return "js/data/" + DIRECTORY_LIST[giCurrentListIndex];
    }
}

function getCurrentFileName()
{
    var asTemp = getCurrentFullName().split( " " );
    var sFileName = "";

    for ( var i = 0; i < asTemp.length; i ++ )
    {
        sFileName += asTemp[i];
    }

    return sFileName + ".js";
}

function initQuestion()
{
    giCurrentQuestion = 0;
    giCurrentScore = 0;
}

function getSelectedNumber( sPageID )
{
    for ( var i = 0; i < ID_SELECTION_ARRAY.length; i ++ )
    {
        if ( sPageID == ID_SELECTION_ARRAY[i] )
            return i;
    }

    return -1;
}

function countScore( sPageID )
{
    if ( giCorrectSelection == getSelectedNumber( sPageID ) )
        giCurrentScore += giScoreBasicUnit;
}

function setCurrentName()
{
    var bUsed;
    var iListIndex;
    var iNameIndex;

    while ( true )
    {
        bUsed = false;
        iListIndex = getRandomListIndex();
        iNameIndex = getRandomNameIndex( iListIndex );

        for ( var i = 0; !bUsed && i < gaiUsedNameIndex.length; i ++ )
        {
            if ( gaiUsedNameIndex[i] == iNameIndex && 
                 gaiUsedListIndex[i] == iListIndex )
                bUsed = true;
        }

        if ( bUsed )
        {
            //alert( "USED : " + getName( iListIndex, iNameIndex ) );
            continue;
        }
        break;
    }

    //iListIndex = 0;// for debug
    //iNameIndex = 1;// for debug

    giCurrentListIndex = iListIndex;
    giCurrentNameIndex = iNameIndex;
    gaiUsedNameIndex[gaiUsedNameIndex.length] = iNameIndex;
    gaiUsedListIndex[gaiUsedListIndex.length] = iListIndex;

    gsDebug += "  (" + getNames( iListIndex, iNameIndex ) + ")";
}

function getTitleLevel( iClassIndex )
{
    var sClass = gasCurrentContentClass[iClassIndex];

    if ( sClass.search( "1 " ) == 0 )
        return LEVEL_1;
    else if ( sClass.search( "2 " ) == 0 )
        return LEVEL_2;
    else if ( sClass.search( "3 " ) == 0 )
        return LEVEL_3;
    else
        return LEVEL_4;
}

function isLevelOne( iClassIndex )
{
    return ( LEVEL_1 == getTitleLevel( iClassIndex ) );
}

function getCurrentNameCount()
{
    return NAME_LIST[giCurrentListIndex].length;
}

function getNumberFileName( iNumber )
{
    var sFrontName = "";
    var sExtension = ".png";
    
    if ( iNumber == 0 )
        return sFrontName + "36" + sExtension;
    else
        return sFrontName + ( 26 + iNumber ) + sExtension;
}

function getGoogleURL()
{
    var sSearchName = "";
    var asNameToken = getCurrentName().split( " " );
    
    for ( var i = 0; i < asNameToken.length; i ++ )
    {
        if ( i > 0 )
            sSearchName += "+";
            
        sSearchName += asNameToken[i];
    }
    
    return gsGoogleURL + sSearchName;
}


function getScreenHeight()
{
    return window.screen.height;
}

function getScreenWidth()
{
    return window.screen.width;
}


function deviceAlert( sMessage )
{
    if (typeof navigator.notification == 'undefined')
        alert( sMessage );
    else
        navigator.notification.alert(
            sMessage,           // message
            null,               // callback
            'Alert Message',    // title
            'OK'                // buttonName
        );
}

