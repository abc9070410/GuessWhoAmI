
"use strict";

//
// variable prefix :
//
// e: Element
// i: integer
// f: float
// s: string
// b: boolean
// a: array
// g: global
//

function setTitle( sTitle )
{
    $.ui.setTitle( sTitle );
}

function addDiv( sDivID, sHTML, sTitle )
{
    $.ui.addContentDiv( "#" + sDivID, sDivHTML, sTitle );
}

function updateDiv( sDivID, sDivHTML )
{
    if ( $.os.desktop )
    {
        document.getElementById( sDivID ).innerHTML = sDivHTML;
    }
    else
    {
        //$.ui.showMask("Wait");
        $.ui.updateContentDiv( "#" + sDivID, sDivHTML );
        //$.ui.hideMask();
    }
    
    showInneractiveAD( sDivID );
}

function setDivTitle( eDiv, sTitle )
{
    eDiv.setAttribute( "title", sTitle );
}

function clearHistory()
{
    $.ui.clearHistory(); // not allow user go back
}

// ex. search ( without '#' )
function updateHash( sHash )
{
    $.ui.updateHash( sHash );
}

function isResultID( sDivID )
{
    return false;
}

function changeHash( sPageID )
{
    //var eContent = document.getElementById( ID_CONTENT );

    //confirm( "XX" );

    console.log( "changeHash: " + sPageID );

    var eDiv = document.getElementById( sPageID );

    var iClickItemIndex = parseInt( gsLastItemDivID.substring( ID_ITEM.length, gsLastItemDivID.length ) ); // for record and favourite

    // disable the sort option
    if ( isResultID( gsLastDivID ) && !isResultID( sPageID ) && sPageID.indexOf( ID_ITEM ) != 0 )
    {
        //if ( navSupported() )
        {
            updateDiv( ID_HEADER, getHTMLOfHeaderDiv() );
            updateDiv( ID_NAV, getHTMLOfNavDiv() );
        }

        //updateDiv( ID_NAV, getHTMLOfNavbarsDiv() );
        gMergeResultsList = null; // clean the result

        console.log( "set nav & header to back to normal" );
    }

    if ( sPageID.indexOf( ID_ITEM ) === 0 )
    {
        giItemStack++;

        var iClickIndex = parseInt( sPageID.substring( ID_ITEM.length, sPageID.length ) );




        if ( gsLastDivID === ID_TIME )
        {
            clearHistory();

            if ( giItemStack > 1 ) // chose time done
            {
                giTimeEarliestID = giStartTimeID - 1;
                giTimeLatestID = iClickIndex;

                // recover
                giStartTimeID = 0;
                giEndTimeID = 24;

                console.log( "time choose done" );
            }
            else
            {
                giStartTimeID = iClickIndex + 1;
                giEndTimeID = 25;

                updateDiv( sPageID, getHTMLOfTimeDiv() );
            }

        }
        else if ( gsLastDivID === ID_DATE )
        {
            gsDate = getDateStringFromDate( new Date(), iClickIndex );
        }

        else if ( gsLastDivID === ID_STYLE )
        {
            removeFontColor(); // show the default font color when the style change
            gsFontColor = "";

            setStyeIndex( iClickIndex );
            
            setStyle();
            
            updateDiv( ID_HEADER, getHTMLOfHeaderDiv() ); // supoort nav or not
            updateDiv( sPageID, getHTMLOfDoneDiv() );
        }
        else if ( gsLastDivID === ID_LANGUAGE )
        {
            setLanguageIndex( iClickIndex );
            window.location.hash = "#" + ID_LANGUAGE;
            window.location.reload(); // update the theme
        }
        else if ( gsLastDivID === ID_FONT_SIZE )
        {
            setFontSizeIndex( iClickIndex );
            giFontSizeSelectedIndex = iClickIndex;
            giFontRatio = 100 + giFontSizeSelectedIndex * 10;

            updateDiv( sPageID, getHTMLOfDoneDiv() );
        }
        else if ( gsLastDivID === ID_FONT_COLOR )
        {
            gsFontColor = gasTempColor[iClickIndex];
            setFontColor( gsFontColor );
            showFontColor( gsFontColor );
            updateDiv( sPageID, getHTMLOfDoneDiv() );
        }
        else if ( gsLastDivID === ID_BACKGROUND_COLOR )
        {
            gsBackgroundColor = gasTempColor[iClickIndex];
            setBackgroundColor( gsBackgroundColor );
            showBackgroundColor( gsBackgroundColor );
            updateDiv( sPageID, getHTMLOfDoneDiv() );
        }
        else if ( gsLastDivID === ID_BACKGROUND_IMAGE )
        {
            updateDiv( sPageID, getHTMLOfDoneDiv() );
        }



        else if ( gsLastDivID === ID_RELATED_LINKS )
        {
            var url = getRelatedUrlByIndex( iClickIndex );

            // _self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            // _blank: Opens in the InAppBrowser.
            // _system: Opens in the system's web browser.
            window.open( url, "_system", "location=yes" );
            updateDiv( sPageID, getHTMLOfDoneDiv() );
        }

        gsLastItemDivID = sPageID; // remember the last item div ID
    }
    else
    {
        giItemStack = 0;


        if ( sPageID === ID_MAIN )
        {
            //clearHistory();
            //updateDiv( sPageID, getHTMLOfMainDiv() );
            //if ( gsLastDivID == ID_SCORE )
                
            initQuestion();
        }

        else if ( sPageID === ID_QUESTION )
        {
            clearHistory();
            cleanCurrentData();
            updateDiv( sPageID, getHTMLOfQuestionDiv() );
            
        }
        else if ( sPageID === ID_QUESTION_2 )
        {
            clearHistory();
            cleanCurrentData();
            updateDiv( sPageID, getHTMLOfQuestionDiv() );
        }
        else if ( sPageID === ID_SCORE )
        {
            clearHistory();
            updateDiv( sPageID, getHTMLOfScoreDiv() );
        }

        else if ( getSelectedNumber( sPageID ) >= 0 )
        {
            clearHistory();


            countScore( sPageID );

            updateDiv( sPageID, getHTMLOfAnswerDiv() );

        }
        else if ( sPageID === ID_INTRODUCTION )
        {
            clearHistory();
            //setTitle( S_I_AM[gLanguageIndex] + getCurrentName() );

            updateDiv( sPageID, getHTMLOfIntroductionDiv() );
            //setDivTitle( document.getElementById( ID_INTRODUCTION ), S_I_AM[gLanguageIndex] + getCurrentName() );
        }
        else if ( sPageID === ID_CONTENT_ABOUT )
        {
            //clearHistory();
            updateDiv( sPageID, getHTMLOfContentAboutDiv() );
        }
        else if ( sPageID === ID_LINK_WIKI )
        {
            window.open( gsCurrentURL, "_system" );
            updateDiv( sPageID, getHTMLOfNavContentDiv() );
        }
        else if ( sPageID === ID_LINK_CC )
        {
            window.open( gsCCURL, "_system" );
            updateDiv( sPageID, getHTMLOfNavContentDiv() );
        }
        else if ( sPageID === ID_LINK_GOOGLE )
        {
            window.open( getGoogleURL(), "_system" );
            updateDiv( sPageID, getHTMLOfNavContentDiv() );
        }
        else if ( isContentPage( sPageID ) )
        {
            //clearHistory();
            updateDiv( sPageID, getHTMLOfContentDiv( getContentIndex( sPageID ) ) );
        }

        // -----------------------

        else if ( sPageID === ID_MENU )
        {
            if ( isContentPage( gsLastDivID ) || 
                 gsLastDivID == ID_INTRODUCTION ||
                 gsLastDivID == ID_CONTENT_ABOUT )
            {
                updateDiv( sPageID, getHTMLOfNavContentDiv() );
            }
            else
            {
                updateDiv( sPageID, getHTMLOfNavDiv() );
            }
        }
        else if ( sPageID === ID_OPTION )
        {
            //clearHistory();
            updateDiv( sPageID, getHTMLOfOptionDiv() );
            //initQuestion();
        }
        else if ( sPageID === ID_Q_AND_A )
        {
            updateDiv( sPageID, getHTMLOfQAndADiv() );
        }
        else if ( sPageID === ID_DATE )
        {
            updateDiv( sPageID, getHTMLOfDateDiv() );
        }
        else if ( sPageID === ID_TIME )
        {
            updateDiv( ID_TIME, getHTMLOfTimeDiv() );
        }

        else if ( sPageID === ID_STYLE )
        {
            updateDiv( ID_STYLE, getHTMLOfCommonSettingDiv( S_STYLE_ARRAY, getSelectArrayByID( ID_STYLE ) ) );
        }
        else if ( sPageID === ID_LANGUAGE )
        {
            updateDiv( ID_LANGUAGE, getHTMLOfCommonSettingDiv( S_LANGUAGE_ARRAY, getSelectArrayByID( ID_LANGUAGE ) ) );
        }
        else if ( sPageID === ID_FONT_SIZE )
        {
            updateDiv( ID_FONT_SIZE, getHTMLOfFontSizeDiv() );
        }
        else if ( sPageID === ID_FONT_COLOR )
        {
            updateDiv( sPageID, getHTMLOfColorDiv() );
        }
        else if ( sPageID === ID_BACKGROUND_COLOR )
        {
            updateDiv( sPageID, getHTMLOfColorDiv() );
        }
        else if ( sPageID === ID_BACKGROUND_IMAGE )
        {
            updateDiv( sPageID, getHTMLOfLoadImageDiv() );
        }

        else if ( sPageID === ID_BACK_TO_DEFAULT )
        {
            clearHistory();

            var ok = window.confirm( S_ARE_YOU_SURE[gLanguageIndex] + S_CLEAN_ALL_RECORDS[gLanguageIndex].toLowerCase() + QUESTION_MARK );

            if ( ok )
            {
                console.log( "select YES" );
                removeAllSetting();
            }
            else
            {
                console.log( "select NO" );
            }

            window.location.hash = "#" + ID_OPTION;
            window.location.reload();
        }


        else if ( sPageID === ID_ABOUT_AUTHOR )
        {
            updateDiv( sPageID, getHTMLOfAuthorDiv() );
        }
        else if ( sPageID === ID_EMAIL_TO_AUTHOR )
        {
            window.open( "mailto:abc9070410@gmail.com", "_system" );
            updateDiv( sPageID, getHTMLOfAuthorDiv() );
        }
        else if ( sPageID === ID_ABOUT_APP )
        {
            updateDiv( sPageID, getHTMLOfAppDiv() );
        }
        else if ( sPageID === ID_RELATED_LINKS )
        {
            updateDiv( ID_RELATED_LINKS, getHTMLOfCommonDiv( S_RELATED_LINKS_ARRAY, "icon info", 0 ) ); // getHTMLOfRelatedLinks
        }
        else if ( sPageID === ID_DELETE_BACKGROUND_IMAGE )
        {
            var ok = window.confirm( S_ARE_YOU_SURE[gLanguageIndex] + S_DELETE_BACKGROUND_IMAGE[gLanguageIndex].toLowerCase() + QUESTION_MARK );

            if ( ok )
            {
                deleteBackgroundImage();

                window.location.hash = "#" + ID_BACKGROUND_IMAGE;
                window.location.reload();
            }
        }




        gsLastDivID = sPageID; // only record the non-item or non-result
    }
}

function blockUI()
{
    $.ui.blockUI(0.3);

    setTimeout(function(){
        $.ui.unblockUI()
    },3000);
}


function initUI()
{
    var string = "";

    // header
    string += "<div id='" + ID_HEADER + "'>";
    string += getHTMLOfHeaderDiv();
    string += "</div>";

    // content
    string += "<div id='" + ID_CONTENT + "'>";

    // -----GWAI-----------------
    string += getEmptyDiv( ID_SCORE, S_FINAL_SCORE[gLanguageIndex] );
    string += getEmptyDiv( ID_QUESTION, S_WHO_AM_I[gLanguageIndex] );
    string += getEmptyDiv( ID_QUESTION_2, S_WHO_AM_I[gLanguageIndex] );
    for ( var i = 0; i < ID_SELECTION_ARRAY.length; i ++ )
    {
        string += getEmptyDiv( ID_SELECTION_ARRAY[i], S_APP_NAME[gLanguageIndex] );
    }
    string += getEmptyDiv( ID_INTRODUCTION, S_APP_NAME[gLanguageIndex] );

    for ( var i = 0; i < ID_CONTENT_ARRAY.length; i ++ )
    {
        string += getEmptyDiv( ID_CONTENT_ARRAY[i], S_APP_NAME[gLanguageIndex] );
    }
    
    string += getEmptyDiv( ID_CONTENT_ABOUT, S_APP_NAME[gLanguageIndex] );
    string += getEmptyDiv( ID_LINK_WIKI, S_APP_NAME[gLanguageIndex] );
    string += getEmptyDiv( ID_LINK_CC, S_APP_NAME[gLanguageIndex] );
    string += getEmptyDiv( ID_LINK_GOOGLE, S_APP_NAME[gLanguageIndex] );
    string += getEmptyDiv( ID_MENU, S_MENU[gLanguageIndex] );

    // -------------------------

    string += getEmptyDiv( ID_OPTION, S_OPTION[gLanguageIndex] );
    string += getEmptyDiv( ID_Q_AND_A, S_Q_AND_A[gLanguageIndex] );



    string += getEmptyDiv( ID_STYLE, S_STYLE[gLanguageIndex] );
    string += getEmptyDiv( ID_LANGUAGE, S_LANGUAGE[gLanguageIndex] );
    string += getEmptyDiv( ID_FONT_SIZE, S_FONT_SIZE[gLanguageIndex] );
    string += getEmptyDiv( ID_FONT_COLOR, S_FONT_COLOR[gLanguageIndex] );

    string += getEmptyDiv( ID_UPDATE, S_UPDATE[gLanguageIndex] );
    string += getEmptyDiv( ID_DISPLAY, S_DISPLAY[gLanguageIndex] );

    string += getEmptyDiv( ID_RECOVERY, S_RECOVERY[gLanguageIndex] );
    string += getEmptyDiv( ID_BACK_TO_DEFAULT, S_BACK_TO_DEFAULT_SETTING[gLanguageIndex] );

    string += getEmptyDiv( ID_ABOUT, S_ABOUT[gLanguageIndex] );
    string += getEmptyDiv( ID_ABOUT_APP, S_ABOUT_APP[gLanguageIndex] );
    string += getEmptyDiv( ID_ABOUT_AUTHOR, S_ABOUT_AUTHOR[gLanguageIndex] );
    string += getEmptyDiv( ID_EMAIL_TO_AUTHOR, S_ABOUT_AUTHOR[gLanguageIndex] );
    string += getEmptyDiv( ID_RELATED_LINKS, S_RELATED_LINKS[gLanguageIndex] );

    string += getEmptyDiv( ID_SETTING_DONE, S_SETTING_DONE[gLanguageIndex] );

    string += getEmptyDiv( ID_DELETE_BACKGROUND_IMAGE, S_DELETE_BACKGROUND_IMAGE[gLanguageIndex] );


    for ( var i = 0; i < 100; i ++ )
    {
        string += getEmptyDiv( ID_ITEM + i, S_APP_NAME[gLanguageIndex] );
    }

    for ( var i = 0; i < 100; i ++ )
    {
        string += getEmptyDiv( ID_RESULT + i, S_SEARCH_RESULT[gLanguageIndex] );
    }

    // first page
    string += getPrefixDiv( ID_MAIN, S_APP_NAME[gLanguageIndex] );
    string += getHTMLOfMainDiv();
    string += "</div>";

    string += "</div>";



    // navbar (footer)
    string += "<div id='" + ID_NAVBAR + "'>";
    string += getHTMLOfNavbarDiv();
    string += "</div>";


    // left side nav menu
    string += "<nav id='" + ID_NAV + "'>";
    string += getHTMLOfNavDiv();
    string += "</nav>";
    
    setStyle();

    //eAfui.innerHTML = string;
    updateDiv( "afui", string );

    //initAllContentDiv();
}

function initAllContentDiv()
{
    addDiv( ID_DATE, "", S_DATE[gLanguageIndex] );
    addDiv( ID_TIME, "", S_TIME[gLanguageIndex] );

    addDiv( ID_OPTION, "", S_OPTION[gLanguageIndex] );
    addDiv( ID_Q_AND_A, "", S_Q_AND_A[gLanguageIndex] );

    addDiv( ID_CONDITION, "", S_CONDITION[gLanguageIndex] );
    addDiv( ID_STYLE, "", S_STYLE[gLanguageIndex] );
    addDiv( ID_UPDATE, "", S_UPDATE[gLanguageIndex] );
    addDiv( ID_DISPLAY, "", S_DISPLAY[gLanguageIndex] );
    addDiv( ID_RECOVERY, "", S_RECOVERY[gLanguageIndex] );
    addDiv( ID_ABOUT, "", S_ABOUT[gLanguageIndex] );
}

// ex. <ul><li ><a class='button next icon home' href='#main'>Home</a></li></ul>
function getHTMLOfListItem( sClass, sHashTag, sText )
{
    return "<ul class='list inset' style='font-size:" + giFontRatio + "%' ><li><a class='" + sClass + "' href='#" + sHashTag + "' data-transition='" + gsTransition + "' >" + sText + "</a></li></ul>";
}

function getHTMLOfListItemWithColor( sClass, sHashTag, sColor )
{
    return "<ul class='list inset' style='color:" + sColor + "; font-size:" + giFontRatio + "%'><li><a class='" + sClass + "' href='#" + sHashTag + "'><strong>" + " " + sColor + "</strong></a></li></ul>";
}

// list item without link
function getHTMLOfListText( sClass, sText )
{
    return "<ul class='list inset'><li><p class='" + sClass + "' style='font-size:" + giFontRatio + "%'>" + sText + "</p></li></ul>";
}

function getHTMLOfListTextWithSameLine( sClass, sLeftText, sRightText )
{
    return "<h3><strong><ul class='list'><li><p class='" + sClass + "' style='text-align:left;font-size:" + ( giFontRatio * 3 / 4 ) + "%'>" + sLeftText + "<span style='float:right;'>" + sRightText + "</span></p></li></ul></strong></h3>";
}

// ex. <div title='Title' id='search' class='panel' selected='true' style='word-wrap:break-word;'>
function getPrefixDiv( sID, sTitle )
{
    return "<div title='" + sTitle + "' id='" + sID + "' class='panel' selected='false' style='word-wrap:break-word;'>";
}

// ex. <div id='search'></div>
function getEmptyDiv( sID, sTitle )
{
    return getPrefixDiv( sID, sTitle ) + "</div>";
    //return "<div id='empty_" + sID + "'><div id='" + sID + "'></div></div>";
}

function getHTMLOfHeaderDiv()
{
    var string = "";

    if ( navSupported() )
    {
        string += "<a href='javascript:toggleNormalSideMenu( true )' class='button icon stack' style='float:right'>" + S_MENU[gLanguageIndex] + "</a>";
    }
    else
    {
        //gsTransition = "up";
        string += "<a href='#" + ID_MENU + "' class='button icon stack' style='float:right' data-transition='up'>" + S_MENU[gLanguageIndex] + "</a>";
    }
    

    return string;
}


// should enable Navbar (footer menu) if the platorm does not support Nav
function navSupported()
{
    var sStyle = S_STYLE_ARRAY[getStyleIndex()].toString();
    
    // not support nav for Win UI Style or WP7/8 platform 
    return ( sStyle != S_WINDOWS_8.toString() && 
             sStyle != S_WINDOWS_8_LIGHT.toString() &&
             giPlatform != PLATFORM_WP &&
             giPlatform != PLATFORM_FIREFOXOS );
}

function toggleNormalSideMenu( bReflash )
{
    if ( bReflash && navSupported() )
    {
        updateDiv( ID_NAV, getHTMLOfNavDiv() );
        //updateDiv( ID_NAVBAR, getHTMLOfNavbarDiv() );
    }

    $.ui.toggleSideMenu();
}

function getHTMLOfLinkItem( sClass, sHashTag, sText )
{
    return "<a href='#" + sHashTag+ "' id='" + sHashTag + "_id' class='" + sClass + "'>" + sText + "</a>";
}

// for those platforms which do not support Nav
function getHTMLOfLinkItemInHeader( sClass, sHashTag, sText )
{
    return "<a href='#" + sHashTag+ "' id='" + sHashTag + "_id' class='" + sClass + "' style='float:right'>" + sText + "</a>";
}

// for footer menu
function getHTMLOfNavbarDiv()
{
    var string = "";

    string += getHTMLOfLinkItem( "icon key mini", ID_MAIN, S_MAIN[gLanguageIndex] );
    string += getHTMLOfLinkItem( "icon settings mini", ID_OPTION, S_OPTION[gLanguageIndex] );

    return string;
}

function getHTMLOfNavDiv()
{
    var string = "";

    string += getHTMLOfListItem( "icon lamp mini", ID_MAIN, S_MAIN[gLanguageIndex] );
    string += getHTMLOfListItem( "icon settings mini", ID_OPTION, S_OPTION[gLanguageIndex] );
    
    if ( !navSupported() )
    {
        string += getHTMLOfListItem( "icon refresh mini", gsLastDivID, S_BACK[gLanguageIndex] );
    }
    
    return string;
}


// ----------------------







// -------------------------





function getHTMLOfQAndADiv()
{
    var string = "";

    for ( var i = 0; i < S_QUESTION_ARRAY.length; i ++ )
    {
        string += "<p></p>";
        string += getHTMLOfListText( "icon question", S_QUESTION_ARRAY[i][gLanguageIndex] );
        string += "<p></p>";
        string += getHTMLOfListText( "icon lamp", S_ANSWER_ARRAY[i][gLanguageIndex] );
        string += "<p></p>";
        //string += "<p></p>";
    }


    return string;
}

// ex. <div title='Welcome' id="main" class="panel" selected="true">This is a basic skeleton UI sample</div>
function getHTMLOfOptionDiv()
{
    var string = "";

    // display
    string += getHTMLOfListText( "icon tag", S_DISPLAY[gLanguageIndex] );
    string += "<p></p>";
    string += getHTMLOfListItem( "icon settings", ID_STYLE, S_STYLE[gLanguageIndex] );
    //string += getHTMLOfListItem( "icon settings", ID_LANGUAGE, S_LANGUAGE[gLanguageIndex] );
    string += getHTMLOfListItem( "icon settings", ID_FONT_SIZE, S_FONT_SIZE[gLanguageIndex] );


    if ( giPlatform == PLATFORM_DESKTOP )
    {
        string += getHTMLOfListItem( "icon settings", ID_FONT_COLOR, S_FONT_COLOR[gLanguageIndex] );
        //string += getHTMLOfListItem( "icon settings", ID_BACKGROUND_COLOR, S_BACKGROUND_COLOR[gLanguageIndex] );
        string += getHTMLOfListItem( "icon settings", ID_BACKGROUND_IMAGE, S_BACKGROUND_IMAGE[gLanguageIndex] );
    }

    string += "<br>";

    if ( giPlatform != PLATFORM_WP )
    {
        // recovery
        string += getHTMLOfListText( "icon tag", S_RECOVERY[gLanguageIndex] );
        string += "<p></p>";
        string += getHTMLOfListItem( "icon settings", ID_BACK_TO_DEFAULT, S_BACK_TO_DEFAULT_SETTING[gLanguageIndex] );
        string += "<br>";
    }
    
    // about
    //string += getHTMLOfListText( "icon tag", S_ABOUT[gLanguageIndex] );
    string += "<p></p>";
    //string += getHTMLOfListItem( "icon info", ID_ABOUT_APP, S_ABOUT_APP[gLanguageIndex] );

    if ( giPlatform == PLATFORM_DESKTOP )
    {
        string += getHTMLOfListItem( "icon info", ID_ABOUT_AUTHOR, S_ABOUT_AUTHOR[gLanguageIndex] );
        string += getHTMLOfListItem( "icon info", ID_RELATED_LINKS, S_RELATED_LINKS[gLanguageIndex] );
        string += "<br>";
    }

    return string;
}

function getHTMLOfDoneDiv()
{
    var string = "";

    string += getHTMLOfListText( "icon tag", S_SETTING_DONE[gLanguageIndex] );
    string += getHTMLOfListItem( "icon settings", gsLastDivID, S_BACK[gLanguageIndex] );
    string += getHTMLOfListItem( "icon settings", ID_OPTION, S_GO_BACK_TO[gLanguageIndex] + S_OPTION[gLanguageIndex] );
    string += getHTMLOfListItem( "icon key", ID_MAIN, S_GO_BACK_TO[gLanguageIndex] + S_MAIN[gLanguageIndex] );

    return string;
}


function getHTMLOfTimeDiv()
{
    var string = "";

    for ( var i = giStartTimeID; i < giEndTimeID; i ++ )
    {
        string += getHTMLOfListItem( "icon clock", ID_ITEM + i, getTimeStringFromID( i ) );
    }
    return string;
}


function getHTMLOfDateDiv()
{
    var string = "";

    var date = new Date();

    for ( var i = 0; i < 45; i ++ )
    {
        var dateString = getDateStringFromDate( date, i );
        var text = getStandardDateText( dateString );
        string += getHTMLOfListItem( "icon calendar", ID_ITEM + i, text );
    }

    return string;
}

function getHTMLOfSameLine( sLeftText, sRightText )
{
    return "<strong><p style='text-align:left;font-size:" + ( giFontRatio * 3 / 4 ) + "%'>" + sLeftText + "<span style='float:right;'>" + sRightText + "</span></p></strong>";
}

function getHTMLOfLoadImageDiv()
{
    var string = "";

    string += "<br><br><input type='file' onchange='loadImageFile( this )'></input>";

    string += "<br>";

    for ( var i = 0; i < gasImageInfo.length; i ++ )
    {
        string += getHTMLOfListText( "icon info", gasImageInfo[i] );
    }

    string += "<br>";

    string += getHTMLOfListItem( "icon settings", ID_DELETE_BACKGROUND_IMAGE, S_DELETE_BACKGROUND_IMAGE[gLanguageIndex] );
    string += getHTMLOfListItem( "icon settings", ID_OPTION, S_GO_BACK_TO[gLanguageIndex] + S_OPTION[gLanguageIndex] );
    string += getHTMLOfListItem( "icon key", ID_MAIN, S_GO_BACK_TO[gLanguageIndex] + S_MAIN[gLanguageIndex] );

    return string;
}

function getHTMLOfColorDiv()
{
    var sColor = "";
    var string = "";

    for ( var i = 0; i < 20; i ++ )
    {
        if ( i == 0 )
            sColor = "#000000"; // black
        else if ( i == 1 )
            sColor = "#FFFFFF"; // white
        else
            sColor = getRandomColor();

        gasTempColor[i] = sColor;
        string += getHTMLOfListItemWithColor( "icon settings", ID_ITEM + i, gasTempColor[i] );
    }
    return string;
}

function getHTMLOfAppDiv()
{
    var string = "";

    string += "<br>";


    var sInfo = "<br><ul>";

    for ( var i = 0; i < S_APP_INFO_ARRAY.length; i ++ )
    {
        sInfo += "<li><p style='font-size:" + giFontRatio + "%'>" + S_APP_INFO_ARRAY[i][gLanguageIndex] + "</p></li>";
    }

    sInfo += "</ul><br>";

    string += getHTMLOfListText( "", sInfo );

    return string;
}

function getHTMLOfAuthorDiv()
{
    var string = "";

    string += "<br>";

    /*
    var sInfo = "<br><ul>";
    for ( var i = 0; i < S_AUTHOR_INFO_ARRAY.length; i ++ )
    {
        sInfo += "<li><p style='font-size:" + giFontRatio + "%'>" + S_AUTHOR_INFO_ARRAY[i][gLanguageIndex] + "</p></li>";
    }

    sInfo += "</ul><br>";

    string += getHTMLOfListText( "", sInfo );
    */
    string += getHTMLOfListItem( "icon location", ID_EMAIL_TO_AUTHOR, S_EMAIL_TO_AUTHOR[gLanguageIndex] );
    string += getHTMLOfListItem( "icon location", ID_EMAIL_TO_AUTHOR, S_EMAIL_TO_AUTHOR[gLanguageIndex] );
    string += getHTMLOfListItem( "icon location", ID_EMAIL_TO_AUTHOR, S_EMAIL_TO_AUTHOR[gLanguageIndex] );

    return string;
}

function getHTMLOfRelatedLinks()
{
    return "";
}



// ex. markIndexs = { 2, 4 } -> items[2] & items[4] will be marked
function getHTMLOfTable( theads, items, markIndexs )
{
    var string = "";

    string += "<table width='100%' border='1' cellspacing='0' cellpadding='0' style='text-align:center;font-size:" + giFontRatio + "%;'><tbody>";

    string += "<thead><tr>";
    for ( var i = 0; i < theads.length; i ++ )
    {
        string+= "<th>" + theads[i] + "</th>";
    }
    string += "</tr></thead>";

    for ( var i = 0; i < items.length; i ++ )
    {
        string += "<tr>";

        if ( theads[0] === S_ORDER[gLanguageIndex] )
            string += "<th>" + ( i + 1 ) + "</th>";

        var marked = false;
        for ( var k = 0; k < markIndexs.length; k ++ )
        {
            if ( i == markIndexs[k] )
            {
                marked = true;
            }

        }

        for ( var j = 0; j < items[i].length; j ++ )
        {
            var tag1 = j == 0 ? "<th>" : "<td>";
            var tag2 = j == 0 ? "</th>" : "</td>";
            var item = items[i][j];

            if ( marked ) // start station & end station
            {
                if ( j == 0 ) // station name
                {
                    item = "★" + item + "";
                }
                item = "<strong>" + item + "</strong>";
            }

            string += tag1 + item + tag2;
        }

        string += "</tr>";
    }

    string += "</tbody></table>";

    return string;
}

// used for those common items (ex. S_DISPLAY_ARRAY)
function getHTMLOfCommonDiv( asItem, sIconClass, indexOffset )
{
    var string = "";

    for ( var i = 0; i < asItem.length; i ++ )
    {
        string += getHTMLOfListItem( sIconClass, ID_ITEM + ( indexOffset + i ), asItem[i][gLanguageIndex] );
    }

    return string;
}

// used for those option items (ex. S_RECORD_MAX_COUNT_ARRAY)
function getHTMLOfCommonSettingDiv( asSettingItem, abSelected )
{
    var string = "";
    
    for ( var i = 0; i < asSettingItem.length; i ++ )
    {
        var sIcon = abSelected[i] ? "icon check" : "icon target";
        string += getHTMLOfListItem( sIcon, ID_ITEM + i, asSettingItem[i][gLanguageIndex] );
    }

    return string;
}

function getHTMLOfFontSizeDiv()
{
    var string = "";
    var index = 0;

    for ( var i = 0; i <= 10; i ++ )
    {
        var icon = i == giFontSizeSelectedIndex ? "icon check" : "icon target";
        string += getHTMLOfListItem( icon, ID_ITEM + i, "" + ( 100 + i * 10 ) + "%" );
    }

    return string;
}

function setStyle()
{
    giStyleSelectedIndex = getStyleIndex();

    var sStyleClass = "ios7"; // default UI style
    var sStyle = S_STYLE_ARRAY[giStyleSelectedIndex].toString();

    if ( sStyle === S_WINDOWS_8.toString() )
    {
        sStyleClass = "win8";
    }
    else if ( sStyle === S_WINDOWS_8_LIGHT.toString() )
    {
        sStyleClass = "win8 light";
    }
    else if ( sStyle === S_ANDROID.toString() )
    {
        sStyleClass = "android";
    }
    else if ( sStyle === S_ANDROID_LIGHT.toString() )
    {
        sStyleClass = "android light";
    }
    else if ( sStyle === S_IOS.toString() )
    {
        sStyleClass = "ios";
    }
    else if ( sStyle === S_IOS_7.toString() )
    {
        sStyleClass = "ios7";
    }
    else if ( sStyle === S_BLACK_BERRY_10.toString() )
    {
        sStyleClass = "bb";
    }
    else if ( sStyle === S_TIZEN.toString() )
    {
        sStyleClass = "tizen";
    }
    
    var eAfui = document.getElementById("afui");
    eAfui.className = sStyleClass;
}

function loadImageFile( controller )
{
    var sImageType = "";
    var iCount = 0;
    gasImageInfo[iCount++] = S_IMAGE_NAME[gLanguageIndex] + ": " + controller.files[0].name;
    gasImageInfo[iCount++]  = S_IMAGE_TYPE[gLanguageIndex] + ": " + controller.files[0].type;
    gasImageInfo[iCount++] = S_IMAGE_SIZE[gLanguageIndex] + ": " + controller.files[0].size;

    if ( gasImageInfo[0].split( "." ).length == 2 )
    {
        sImageType = "image/" + gasImageInfo[0].split( "." )[1] + ";";
    }

    var reader = new FileReader();
    reader.readAsDataURL( controller.files[0] );

    reader.onloadend = function( event )
    {
        gsBackgroundImage = event.target.result;

        if ( gsBackgroundImage.indexOf( "image" ) < 0 )
        {
            var sBase64 = "base64";
            var sToken = gsBackgroundImage.split( sBase64 );

            if ( sToken.length == 2 )
                gsBackgroundImage = sToken[0] + sImageType + sBase64 + sToken[1];

            gasImageInfo[1]  = S_IMAGE_TYPE[gLanguageIndex] + ": " + sImageType;
        }

        setBackgroundImage( gsBackgroundImage );
        showBackgroundImage( gsBackgroundImage );
        updateDiv( ID_BACKGROUND_IMAGE, getHTMLOfLoadImageDiv() );

        if ( giPlatform == PLATFORM_FIREFOXOS )
        {
            setStyeIndex( INDEX_STYLE_WINDOWS_8 );
            window.location.reload(); // update the theme
        }
        else if ( giPlatform != PLATFORM_WP && // WP could show the background image
                  giStyleSelectedIndex != INDEX_STYLE_ANDROID )
        {
            setStyeIndex( INDEX_STYLE_ANDROID );
            window.location.reload(); // update the theme
        }
    }
}

function showFontColor( sColor )
{
    if ( sColor == null || sColor == "" )
        return;

    $("#afui").css("color", sColor );
}

function showBackgroundColor( sColor )
{
    if ( sColor == null || sColor == "" )
        return;

    $("#afui").css("background", sColor );
}

function showBackgroundImage( sBase64 )
{
    if ( sBase64 == null || sBase64 == "" )
        return;

    if ( true )
    {
        $("#afui").css("background", "url(" + sBase64 + ") no-repeat center center fixed" );
        /*
        $("#afui").css("-webkit-background-size", "cover" );
        $("#afui").css("-moz-background-size", "cover" );
        $("#afui").css("-o-background-size", "cover" );
        */
        //$("#afui").css("background-size", "100%" );
    }
    else
    {
        var eAfui = document.getElementById( "afui" );
        eAfui.style.backgroundImage = "url(" + sBase64 + ")";
        eAfui.style.backgroundPosition = "center center";
        eAfui.style.backgroundRepeat="no-repeat";
        eAfui.style.backgroundAttachment="fixed";
        eAfui.style.background.size="cover";
    }




}


// --------------GWAI-----------------

function getQuestionID()
{
    if ( gsQuestinID == ID_QUESTION ) 
        gsQuestinID = ID_QUESTION_2;
    else
        gsQuestinID = ID_QUESTION;
        
    return gsQuestinID;
}


function getHTMLOfMainDiv()
{
    var string = "";

    //restoreIndexPath();
    
    string += getHTMLOfImage( "resource/pic_question_mark_5.png", false );
    
    //string += getHTMLOfImage( "x-wmapp0:www/resource/pic_question_mark_2.png", false );

    string += getHTMLOfListItem( "icon lamp", getQuestionID(), S_NEW_GAME[gLanguageIndex] );
    string += getHTMLOfListItem( "icon settings", ID_OPTION, S_OPTION[gLanguageIndex] );

    return string;
}

function getHTMLOfQuestionDiv()
{
    var string = "";
    
    if ( navSupported() )
    {
        updateDiv( ID_NAV, getHTMLOfNavDiv() );
    }
    else
    {
        updateDiv( ID_MENU, getHTMLOfNavDiv() );
    }
    
    // cannot get picture, so go back to main page
    if ( !gbOnline )
    {
        deviceAlert( "Please connect to the Internet" );
        return getHTMLOfMainDiv();
    }
    
    if ( gbOnReady && !gbAdShowed )
    {
        gbAdShowed = true;
        showAD();
    }

    // do not change current name if we just up/down menu
    if ( gsLastDivID != ID_MENU )
    {
        setCurrentName();
    }

    addJS( getCurrentDirectory() + "/" + getCurrentFileName() );
    
    string += getHTMLOfCover();

    //string += getHTMLOfTextDetail( "Who am I ?<br><br>", giFontRatio, "text-align:center", true );

    var answerIndex = getRandom( giSelectionCount );
    var asAnotherName = getAnotherNames( giSelectionCount - 1 );
    var iAnotherIndex = 0;
    for ( var i = 0; i < giSelectionCount; i ++ )
    {
        if ( i == answerIndex )
            gasSelectionItem[i] = getCurrentName();
        else
            gasSelectionItem[i] = asAnotherName[iAnotherIndex++];
    }

    gsDebug += getCurrentName() + "__" + asAnotherName + "\n";
    //alert( gsDebug );

    giCorrectSelection = answerIndex;

    for ( var i = 0; i < giSelectionCount; i ++ )
    {
        string += getHTMLOfListItem( "icon location", ID_SELECTION_ARRAY[i], gasSelectionItem[i] );
    }
    string += getHTMLOfNewLine( 3 );

    return string;
}

function getHTMLOfAnswerDiv()
{
    var string = "";

    giCurrentQuestion++;

    //addJS( getCurrentDirectory() + "/" + getCurrentFileName() );

    string += getHTMLOfCover();

    var sText = "I am <strong>" + getCurrentName() + "</strong>";
    if ( !B_ON_DEVICE )
    {
        sText += " (now score : " + giCurrentScore + ")<br><br>";
    }

    string += getHTMLOfTextDetail( sText, giFontRatio, "text-align:center", false );
    string += getHTMLOfListItem( "icon user", ID_INTRODUCTION, S_PERSONAL_INTRODUCTION[gLanguageIndex] );

    string += getHTMLOfListItem( "icon pencil", getNextQuestionID(), getNextQuestionText() );
    string += getHTMLOfNewLine( 3 );

    return string;
}

function getHTMLOfScoreDiv()
{
    var string = "";

    var sFileName1 = getNumberFileName( Math.floor( giCurrentScore / 10 ) );
    var sFileName2 = getNumberFileName( 0 );
    
    var iMarginLeft1 = B_ON_DEVICE ? 10 : 20;
    var iMarginLeft2 = B_ON_DEVICE ? 50 : 40;
    
    var iLineCount = 8;
    
    var sFilePath1 = "resource/" + sFileName1;
    var sFilePath2 = "resource/" + sFileName2;
    
    if ( giPlatform == PLATFORM_WP )
    {
        var sTempPath = getAbsolutePath();
        sFilePath1 = sTempPath + sFilePath1;
        sFilePath2 = sTempPath + sFilePath2;
        
        iLineCount = 10;
        
        //alert( sFilePath2 );
    }

    // show only one '0' if the final score is zero
    if ( sFileName1 != sFileName2 )
    {
    
        string += "<img src='" + sFilePath1 + "' alt='Loding...'  style='margin-left:" + iMarginLeft1 + "%; margin-top:5%; position:absolute;' width='40%' height='40%'>";
        string += "<img src='" + sFilePath2 + "' alt='Loding...' style='margin-left:" + iMarginLeft2 + "%;  margin-top:5%; position:absolute;' width='40%' height='40%'>";
    }
    else
    {
        string += "<img src='" + sFilePath2 + "' alt='Loding...' style='margin-left:" + 30 + "%;  margin-top:5%; position:absolute;' width='40%' height='40%'>";
    }
    

    //string += getHTMLOfImage( "resource/transparent_256x256.png", false );

    string += getHTMLOfNewLine( iLineCount );

    string += getHTMLOfListItem( "icon key", ID_MAIN, S_GO_BACK_TO[gLanguageIndex] + S_MAIN[gLanguageIndex] );
    string += getHTMLOfNewLine( 3 );
    
    initQuestion();

    return string;
}

function getHTMLOfText( sText, iFontSizeRatio )
{
    return getHTMLOfTextDetail( sText, iFontSizeRatio, "", true );
}

function getHTMLOfTextDetail( sText, iFontSizeRatio, sOtherStyle, bNewLine )
{
    var sHTML = "<p style='font-size:" + iFontSizeRatio + "% ; line-height: 160%;" + sOtherStyle + ";'>";
    
    sHTML += bNewLine ? "<br>" : "";
   
    return sHTML + sText + "</p>";
}

function getHTMLOfCover()
{
    //alert( getScreenHeight() + "x" + getScreenWidth() );
    return getHTMLOfImage( getCurrentCover(), true );
}

function getHTMLOfImage( sImageURL, bBorder )
{
    //alert( sImageURL );
    
    var iMarginLeft = Math.floor( ( 100 - giPicWidthRatio ) / 2 );
    
    // 960 x 540

    var reduceMultiple = 3;//getScreenHeight() > 1023 ? 3 : 4;

    var iMaxHeight = Math.floor( getScreenHeight() / reduceMultiple );

    if ( bBorder )
    {
        return "<div style='margin-left: " + iMarginLeft + "%; margin-top: 5%; margin-bottom: 5%; width:50%; height:" + iMaxHeight + "px; overflow:hidden; border:12px #E0E0E0 double'><img src='" + sImageURL + "' alt='Loading...' style='width:100%; height:100%;' ></div>";
    }

    return "<div style='margin-left: " + iMarginLeft + "%; margin-top: 5%; width:" + giPicWidthRatio + "%; height:" + iMaxHeight + "px;'><img src='" + sImageURL + "' style='width:100%; height:100%;' alt='Loading...'></div>";
}

function getHTMLOfImageCombine( sImageURL1, sImageURL2, iOverlapRatio )
{
    var iMarginLeft = Math.floor( ( 100 - giPicWidthRatio ) / 2 );

    return "<div style='margin-left: " + iMarginLeft + "%; margin-top: 5%; margin-bottom: 5%;'><img src='" + sImageURL1 + "' style='position:absolute; z-index:1; top:1%; width=" + giPicWidthRatio + "%; height:" + ( giPicHeightRatio * 1.5 ) + "%;' alt='Loading...'><img src='" + sImageURL2 + "' style='position:absolute; z-index:2; top:20%; margin-left: " + iOverlapRatio + "%; width=" + giPicWidthRatio + "%; height:" + Math.floor( giPicHeightRatio / 2.5 ) + "%;' alt='Loading...'></div>";
}

function getHTMLOfNewLine( iCount )
{
    var sHTML = "";
    for ( var i = 0; i < iCount; i ++ )
    {
        sHTML += getHTMLOfText( "", giFontRatio );
    }

    return sHTML;
}

function getHTMLOfIntroductionDiv()
{
    var string = "";

    string += getHTMLOfCover();

    string += getHTMLOfTextDetail( gsCurrentBasicIntroduction, giFontRatio, "", false );

    string += getHTMLOfReadMore()

    string += getHTMLOfListItem( "icon pencil", getNextQuestionID(), getNextQuestionText() );
    string += getHTMLOfNewLine( 3 );

    return string;
}

function getHTMLOfContentAboutDiv()
{
    var string = "";
    
    string += getHTMLOfText( "" );

    string += getHTMLOfListText( "icon question", S_DATA_SEARCH[gLanguageIndex] );
    string += getHTMLOfListItem( "icon lamp", ID_LINK_GOOGLE, getCurrentName() + " - " + S_GOOGLE[gLanguageIndex] );
    string += getHTMLOfListText( "icon question", S_DATA_SOURCE[gLanguageIndex] );
    string += getHTMLOfListItem( "icon lamp", ID_LINK_WIKI, getCurrentName() + " - " + S_WIKI[gLanguageIndex] );
    string += getHTMLOfListText( "icon question", S_DATA_LICENSE[gLanguageIndex] );
    string += getHTMLOfListItem( "icon lamp", ID_LINK_CC, S_CC[gLanguageIndex] );
    
    string += getHTMLOfText( "" );

    string += getHTMLOfReadMore();
    string += getHTMLOfListItem( "icon pencil", getNextQuestionID(), getNextQuestionText() );
    string += getHTMLOfNewLine( 3 );
    
    return string;
}

function getHTMLOfReadMore()
{
    var string = "";
   
    var sTempTransition = gsTransition;
    gsTransition = "up";
    
    if ( navSupported() )
    {
        string = getHTMLOfToggleContentItem( "icon info", S_READ_MORE[gLanguageIndex] );
    }
    else
    {
        string = getHTMLOfListItem( "icon info", ID_MENU, S_READ_MORE[gLanguageIndex] );
    }
    
    gsTransition = sTempTransition;
    
    return string;
}

function getHTMLOfContentDiv( iContentIndex )
{
    var string = "";

    //string += "I am " + gsCurrentName;

    //string += "<br><br>" + gsCurrentBasicIntroduction;
    var bIndexFound = false;
    var iFontSizeOfTitle = giFontRatio + 30;
    var iFontSizeOfContent = giFontRatio;
    string += getHTMLOfText( gasCurrentContentTitle[iContentIndex], iFontSizeOfTitle );

    for ( var i = 0; i < gasCurrentContentTitle.length; i ++ )
    {
        if ( i === iContentIndex )
        {
            string += getHTMLOfText( gasCurrentContent[i], iFontSizeOfContent );
            bIndexFound = true;
        }

        if ( i > iContentIndex && isLevelOne( i ) )
            break;

        if ( i > iContentIndex && bIndexFound )
        {
            string += getHTMLOfText( gasCurrentContentTitle[i], iFontSizeOfTitle );
            string += getHTMLOfText( gasCurrentContent[i], iFontSizeOfContent );
        }
    }

    string += getHTMLOfReadMore();
    string += getHTMLOfListItem( "icon pencil", getNextQuestionID(), getNextQuestionText() );
    string += getHTMLOfNewLine( 3 );

    return string;
}

function getContentIndex( sPageID )
{
    var iOrder = -1;

    for ( var i = 0; i < ID_CONTENT_ARRAY.length; i ++ )
    {
        if ( sPageID == ID_CONTENT_ARRAY[i] )
        {
            iOrder = i;
            break;
        }
    }

    if ( iOrder < 0 || iOrder >= gaiNavTitleRelatedIndex.length )
    {
        //alert( " -> " + sPageID + "(" + iOrder + "):" );
        return -1;
    }

    return gaiNavTitleRelatedIndex[iOrder];
}


function isContentPage( sPageID )
{
    return ( getContentIndex( sPageID ) >= 0 );
}

// ex. <ul><li ><a class='button next icon home' href='#main'>Home</a></li></ul>
function getHTMLOfToggleContentItem( sClass, sText )
{
    if (gasCurrentContentTitle.length < 1)
        return "";

    return "<ul class='list inset' style='font-size:" + giFontRatio + "%'><li><a class='" + sClass + "' href='javascript:toggleContentSideMenu()' >" + sText + "</a></li></ul>";
}

function toggleContentSideMenu()
{
    updateDiv( ID_NAV, getHTMLOfNavContentDiv() );
    //updateDiv( ID_NAVBAR, getHTMLOfNavbarSortDiv() );

    $.ui.toggleSideMenu();
}

function getHTMLOfNavContentDiv()
{
    var string = "";

    var iContentIndex = getContentIndex( gsLastDivID );
    var sIcon = iContentIndex < 0 ? "icon check" : "icon target";
    var iLevelOneNo = 0;

    gaiNavTitleRelatedIndex = new Array();

    string += getHTMLOfListItem( sIcon, ID_INTRODUCTION, S_INTRODUCTION[gLanguageIndex] );

    for ( var i = 0; i < gasCurrentContentTitle.length; i ++ )
    {
        sIcon = i == iContentIndex ? "icon check" : "icon target";

        //if ( gasCurrentContent[i] == "" )
          //  ;//string += getHTMLOfListText( sIcon, gasCurrentContentTitle[i]);
        if ( isLevelOne( i ) )
        {
            if ( gasCurrentContent[i] != "" ||
                 ( i + 1 < gasCurrentContentTitle.length &&
                   !isLevelOne( i + 1 ) &&
                   gasCurrentContent[i + 1] != "" ) )
            {
                string += getHTMLOfListItem( sIcon, ID_CONTENT_ARRAY[iLevelOneNo], gasCurrentContentTitle[i]);
                gaiNavTitleRelatedIndex[iLevelOneNo] = i;
                iLevelOneNo++;
            }
        }
    }

    string += getHTMLOfListItem( "icon info", ID_CONTENT_ABOUT, S_CONTENT_ABOUT[gLanguageIndex]);
    string += getHTMLOfNewLine( 3 );
    
    return string;

}

function getHTMLOfMenuDiv()
{
    return "XX";
}

function isGameEnd()
{
    return giCurrentQuestion >= 10 ? true : false;
}

function getNextQuestionText()
{
    if ( isGameEnd() )
    {
        return S_FINAL_SCORE[gLanguageIndex];
    }

    return S_NEXT_QUESTION[gLanguageIndex] + " (" + giCurrentQuestion + "/10)"
}

function getNextQuestionID()
{
    return isGameEnd() ? ID_SCORE : ID_QUESTION;
}

// -------------------------------
/*

protected override void OnBackKeyPress(System.ComponentModel.CancelEventArgs e) {
            e.Cancel = true;
            this.Dispatcher.BeginInvoke(() => { 
                MessageBoxResult result = MessageBox.Show("Do you want to exit ?", "Notification", MessageBoxButton.OKCancel);
                if (result == MessageBoxResult.OK) {
                    Application.Current.Terminate();
                }
            });
        }

*/