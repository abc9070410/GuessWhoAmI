
"use strict";

function setItem( key, value )
{
    if ( document.all && !window.localStorage )
        setCookie( key, value, 100 );
    else
        localStorage.setItem( key, value );
}

function getItem( key )
{
    if ( document.all && !window.localStorage )
        return getCookie( key );
    else
        return localStorage.getItem( key );
}


function setCookie(c_name,value,exdays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1)
    {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1)
    {
        c_value = null;
    }
    else
    {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1)
        {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start,c_end));
    }
    return c_value;
}

function setTheme( theme )
{
    setItem( KEY_OPTION_STYLE, theme );
}

function getTheme()
{
    return getItem( KEY_OPTION_STYLE );
}

function getHeaderTheme()
{
    return getTheme();
}

function getFooterTheme()
{
    return getTheme();
}

function getContentTheme()
{
    return getTheme();
}

function removeAllSetting()
{
    // first three items are related to record and favourite
    for ( var i = 4; i < KEY_ALL_ARRAY.length; i ++ )
    {
        removeItem( KEY_ALL_ARRAY[i] );
    }
}

function removeItem( key )
{
    if ( document.all && !window.localStorage )
    {
        document.cookie = key + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }
    else
    {
        localStorage.removeItem( key );
    }
}


function removeAllItem()
{
    if ( document.all && !window.localStorage )
    {
        for ( var i = 0; i < KEY_ALL_ARRAY.length; i ++ )
        {
            var key = KEY_ALL_ARRAY[i];
            document.cookie = key + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        }
        showAlert( "all cookie are clear" );
    }
    else
    {
        localStorage.clear();
        showAlert( "all local storage are clear" );
    }
}




// 

function setSortByIndex( index )
{
    setItem( KEY_SORT_BY_INDEX, index );
}

function getSortByIndex()
{
    var value = getItem( KEY_SORT_BY_INDEX );

    return value == null ? 1 : parseInt( value );
}

function setStyeIndex( index )
{
    setItem( KEY_STYLE_INDEX, index );
}

function getStyleIndex()
{
    var value = getItem( KEY_STYLE_INDEX );
    
    var iDefaultIndex = 5; // IOS7 Style as default 
    if ( giPlatform == PLATFORM_DESKTOP )
        iDefaultIndex = 0; // Android Style
    else if ( giPlatform == PLATFORM_WP )
        iDefaultIndex = 6; // black berry 10 style

    return value == null ? iDefaultIndex : parseInt( value );
}

function setLanguageIndex( index )
{
    setItem( KEY_LANGUAGE_INDEX, index );
}

function getLanguageIndex()
{
    var value = getItem( KEY_LANGUAGE_INDEX );
    
    var index = gLocalLanguageIndex >= 0 ? gLocalLanguageIndex : 0;

    return value == null ? index : parseInt( value );
}

function setFontSizeIndex( index )
{
    setItem( KEY_FONT_SIZE_INDEX, index );
}

function getFontSizeIndex()
{
    var value = getItem( KEY_FONT_SIZE_INDEX );
    
    if ( value == null )
    {
        if ( giPlatform == PLATFORM_WP )
            return 5; // 150%
        else
            return 1; // default:110%
    }

    return parseInt( value );
}

function removeFontColor()
{
    removeItem( KEY_FONT_COLOR );
}

function setFontColor( sColor )
{
    setItem( KEY_FONT_COLOR, sColor );
}

function getFontColor()
{
    var value = getItem( KEY_FONT_COLOR );

    return value == null ? null : value;
}

function setBackgroundColor( sColor )
{
    setItem( KEY_BACKGROUND_COLOR, sColor );
}

function getBackgroundColor()
{
    var value = getItem( KEY_BACKGROUND_COLOR );

    return value == null ? null : value;
}

function deleteBackgroundImage()
{
    removeItem( KEY_BACKGROUND_IMAGE );
}

function setBackgroundImage( sBase64 )
{
    setItem( KEY_BACKGROUND_IMAGE, sBase64 );
}

function getBackgroundImage()
{
    var value = getItem( KEY_BACKGROUND_IMAGE );

    return value == null ? null : value;
}

