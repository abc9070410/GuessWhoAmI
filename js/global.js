
"use strict";

//<access origin="http://127.0.0.1*" />

// 繁 英 簡 日 韓
// [gLanguageIndex]
var ZH = 0;
var EN = 1;
var CN = 2;
var JA = 3;
var KO = 4;
var gLanguageIndex = EN; // default language
var gSupportLanguageCount = 5; // UI .
var gStationNameSupportLanguageCount = 2; // station name (now support ZH and EN) .
var gLocalLanguageIndex = -1; // get the platform local index by Phonegap API

var LOCATION_COUNT = 19;
var STATION_COUNT = 222;

var PLATFORM_WP = 0;
var PLATFORM_ANDROID = 1;
var PLATFORM_IOS = 2;
var PLATFORM_IOS_7 = 3;
var PLATFORM_FIREFOXOS = 4;
var PLATFORM_DESKTOP = 5;
var giPlatform = PLATFORM_ANDROID;

var B_ON_DEVICE = true;

// all county


// id front name
var ID_HEADER = "header";
var ID_CONTENT = "content";
var ID_FOOTER = "footer";
var ID_NAV = "nav";
var ID_NAVBAR = "navbar";


// ---------------
var ID_MAIN = "main";
var ID_QUESTION = "question";
var ID_QUESTION_2 = "question2";
var ID_SELECTION_0 = "selection0";
var ID_SELECTION_1 = "selection1";
var ID_SELECTION_2 = "selection2";
var ID_SELECTION_3 = "selection3";
var ID_SELECTION_4 = "selection4";
var ID_SELECTION_5 = "selection5";
var ID_SELECTION_6 = "selection6";
var ID_SELECTION_7 = "selection7";
var ID_SELECTION_8 = "selection8";
var ID_SELECTION_9 = "selection9";
var ID_SELECTION_ARRAY = new Array( ID_SELECTION_0, ID_SELECTION_1, ID_SELECTION_2, ID_SELECTION_3, ID_SELECTION_4, ID_SELECTION_5, ID_SELECTION_6, ID_SELECTION_7, ID_SELECTION_8, ID_SELECTION_9 );
var ID_ANSWER = "answer1";
var ID_SCORE = "score1";
var ID_INTRODUCTION = "introduction";
var ID_CONTENT_0 = "introduction0";
var ID_CONTENT_1 = "introduction1";
var ID_CONTENT_2 = "introduction2";
var ID_CONTENT_3 = "introduction3";
var ID_CONTENT_4 = "introduction4";
var ID_CONTENT_5 = "introduction5";
var ID_CONTENT_6 = "introduction6";
var ID_CONTENT_7 = "introduction7";
var ID_CONTENT_8 = "introduction8";
var ID_CONTENT_9 = "introduction9";
var ID_CONTENT_10 = "introduction10";
var ID_CONTENT_11 = "introduction11";
var ID_CONTENT_12 = "introduction12";
var ID_CONTENT_13 = "introduction13";
var ID_CONTENT_14 = "introduction14";
var ID_CONTENT_15 = "introduction15";
var ID_CONTENT_16 = "introduction16";
var ID_CONTENT_ARRAY = new Array( ID_CONTENT_0, ID_CONTENT_1, ID_CONTENT_2, ID_CONTENT_3, ID_CONTENT_4, ID_CONTENT_5, ID_CONTENT_6, ID_CONTENT_7, ID_CONTENT_8, ID_CONTENT_9, ID_CONTENT_10, ID_CONTENT_11, ID_CONTENT_12, ID_CONTENT_13, ID_CONTENT_14, ID_CONTENT_15, ID_CONTENT_16 );
var ID_CONTENT_ABOUT = "contentAbout";
var ID_LINK_WIKI = "wiki1";
var ID_LINK_CC = "cc3";
var ID_LINK_GOOGLE = "google1";
var ID_MENU = "menuwithnav1"; // for windows 8 and windows 8 light only

// ---------------

var ID_ITEM = "item1";
var ID_TOWNSHIP = "township1";
var ID_DATE = "date1";
var ID_TIME = "time1";
var ID_OPTION = "option1";
var ID_Q_AND_A = "qanda1";




var ID_CONDITION = "condition";

var ID_DISPLAY = "display";
var ID_STYLE = "style";
var ID_FONT_SIZE = "fontSize";
var ID_FONT_COLOR = "fontColor";
var ID_BACKGROUND_COLOR = "backgroundColor";
var ID_BACKGROUND_IMAGE = "backgroundImage";
var ID_LANGUAGE = "language";
var ID_RESULT_LIMIT = "resultLimit";
var ID_RECORD_LIMIT = "recordLimit";

var ID_RECOVERY = "recovery";
var ID_BACK_TO_DEFAULT = "backToDefault";

var ID_ABOUT = "about";
var ID_ABOUT_APP = "aboutApp";
var ID_ABOUT_AUTHOR = "aboutAuthor";
var ID_RELATED_LINKS = "relatedLinks";

var ID_UPDATE = "update";
var ID_RESULT = "result";
var ID_SETTING_DONE = "settingDone";
var ID_EMAIL_TO_AUTHOR = "emailToAuthor";


//var ID_SORT_BY = "2300";
var ID_DIALOG = "9900";
var ID_LOADING = "1111000";
var ID_BUTTON = "444";

var ID_OPTION_STYLE = "option_style_select_id";
var ID_OPTION_UPDATE = "option_update_select_id";
var ID_OPTION_DISPLAY = "option_display_select_id";
var ID_OPTION_RECOVERY = "option_recovery_select_id";
var ID_OPTION_OTHER = "option_other_select_id";
var ID_OPTION_ABOUT = "option_about_select_id";

var ID_DELETE_BACKGROUND_IMAGE = "delete_background_image";



// all keys for local storage
var KEY_SEARCH_RECORD_INDEX = "key_search_record_index_";
var KEY_SEARCH_RECORD = "key_search_record_";
var KEY_SEARCH_FAVOURITE_INDEX = "key_search_favourite_index_";
var KEY_SEARCH_FAVOURITE = "key_search_favourite_";
var KEY_OPTION_STYLE = "key_option_style_";
var KEY_RESULT_LIMIT_INDEX = "key_result_limit_index_";
var KEY_RECORD_LIMIT_INDEX = "key_record_limit_index_";
var KEY_TRANSPORT_CATEGORY_INDEXS = "key_transport_category_indexs_";
var KEY_TICKET_CATEGORY_INDEXS = "key_ticket_category_indexs_";
var KEY_SORT_BY_INDEX = "key_sort_by_index_";
var KEY_STYLE_INDEX = "key_style_index_";
var KEY_LANGUAGE_INDEX = "key_language_index_";
var KEY_FONT_SIZE_INDEX = "key_font_size_index_";
var KEY_FONT_COLOR = "key_font_color_";
var KEY_BACKGROUND_COLOR = "key_background_color_";
var KEY_BACKGROUND_IMAGE = "key_background_image_";
var KEY_SAME_PLATFORM_TIME_GAP_INDEX = "key_same_platform_time_gap_index_";
var KEY_DIFFERENT_PLATFORM_TIME_GAP_INDEX = "key_different_platform_time_gap_index_";

var KEY_ALL_ARRAY = new Array( KEY_SEARCH_RECORD_INDEX, KEY_SEARCH_RECORD, KEY_SEARCH_FAVOURITE_INDEX, KEY_SEARCH_FAVOURITE, KEY_OPTION_STYLE, KEY_RESULT_LIMIT_INDEX, KEY_RECORD_LIMIT_INDEX, KEY_SORT_BY_INDEX, KEY_TRANSPORT_CATEGORY_INDEXS, KEY_TICKET_CATEGORY_INDEXS, KEY_STYLE_INDEX, KEY_LANGUAGE_INDEX, KEY_FONT_SIZE_INDEX, KEY_FONT_COLOR, KEY_BACKGROUND_COLOR, KEY_BACKGROUND_IMAGE, KEY_SAME_PLATFORM_TIME_GAP_INDEX, KEY_DIFFERENT_PLATFORM_TIME_GAP_INDEX );


var VALUE_NOT_FOUND = "VALUE_NOT_FOUND";

// line type
var LINE_WEST_MOUNTAIN = 0;
var LINE_WEST_SEA = 1;
var LINE_WEST_MOUNTAIN_SEA = 102;
var LINE_EAST = 2;
var LINE_NORTH = 104;
var LINE_SOUTH = 105;
var LINE_PINGTUNG = 3;
var LINE_SOUTH_PINGTUNG = 107;
var LINE_NEIWAN = 5;
var LINE_GIGI = 6;
var LINE_SHALUN = 7;
var LINE_HUALIEN = 1010;
var LINE_YILAN = 1011;
var LINE_PINGSI = 4;
var LINE_YILAN_PINGSI = 1013;


// dialog choose
var CONFIRM = "1";
var CANCEL = "0";


// used for ResultFromAtoB
var TIME_INFO_A = 0;
var TIME_INFO_B = 1;

var STATION_A = 0;
var STATION_B = 1;

// pic category
var PIC_EVERYDAY = 0;
var PIC_ADDITION = 1;
var PIC_TAROKO = 2;
var PIC_OVER_NIGHT = 3;
var PIC_DINNING = 4;
var PIC_CRIPPLE = 5;
var PIC_PACKAGE = 6;
var PIC_ARRAY = new Array( PIC_EVERYDAY, PIC_ADDITION, PIC_TAROKO, PIC_OVER_NIGHT, PIC_DINNING, PIC_CRIPPLE, PIC_PACKAGE );


// -----------------------------

var WHITE_SPACE = "﹍";
var DIVISION_WORD = "_";
var DIVISION_WORD_2 = "=";
var PAGE_DIVISION = "-"; // ex. 1000-34 -> the 34nd page change is PAGE_SEARCH
var COLON_WORD = " : ";
var QUESTION_MARK = " ?";
var RIGHT_ARROW = " → ";
var DASHED_RIGHT_ARROW = " ↝ ";
var RIGHT_ARROW_2 = " ➠ ";
var LEFT_BRACKET = "【";
var RIGHT_BRACKET = "】";
var LEFT_BRACKET_2 = "〔";
var RIGHT_BRACKET_2 = "〕";
var LEFT_BRACKET_3 = "﹝";
var RIGHT_BRACKET_3 = "﹞";
var SYMBOL_SQUARE = "■";



var DEBUG_MODE = 0;
var RELEASE_MODE = 1;
var giMode = RELEASE_MODE;

var giStartStationID = -1;
var giEndStationID = -1;
var gsDate = "";
var giTimeEarliestID = -1;
var giTimeLatestID = -1;

//var gShowDate = new Date(); // show on the date page

var gbScriptInserted = false;

var giPageChangeConut = 0;

var gsNowID = ""; // avoid duplicated onClick

var giDialogIndex = 0; // the dialog should use different id everytime cause the bowser would cache the page has appeared
var gsDialogText = ""; // the message shows on the dialog
var gsPageIDBeforeDialog = "";
var gsButtonIDBeforeDialog = ""; // the button which was triggered the dialog

// gAllResultList[giResultFirstIndex][giResultSecondIndex] is the touched result
var gAllResultList;
var giResultFirstIndex = -1;
var giResultSecondIndex = -1;

// display
var giAlwaysShowMenuIndex = 0;

var giMaxTimeGapForTransportChange = 60; // unit: minutes

var gbHashEnabled = false; // let the back button of browser works


// ----------------------

var giStartTimeID = 0;
var giEndTimeID = 24;

var gsLastDivID = ""; // for those un-item div
var gsLastItemDivID = ""; // for record and favourite

var giItemStack = 0;

var gaStationName = new Array();

var giRecordLinkIndex = 0;
var giFavouriteLinkIndex = 0;

// for those option allowed select only one
var giStyleSelectedIndex = 0;
var giLanguageSelectedIndex = 0;
var giFontSizeSelectedIndex = 0;

// for those option allowed select only one color or image
var gsFontColor = null;
var gsBackgroundColor = null;
var gsBackgroundImage = null;


var giFontRatio = 100;

var gMergeResultsList = null; // for speed up when the sort condition change
//var gSortedResultsList = null; // sort the merged result

var gsText = "";
var giCount = 0;
var gasTempColor = new Array(); // temporarily store all the colors in the color div
var gasImageInfo = new Array(); // temporarily store the image info after loading
//var gaiTempPrice = new Array(); // temporarily store the result sum price after searching




// --------------GWAI-----------------

var gasSelectionItem = new Array();

var gsCurrentName = "";
var gsCurrentURL = "";
var gsCurrentPicURL = "";
var gsCurrentBasicIntroduction = "";
var gasCurrentContentTitle = new Array();
var gasCurrentContent = new Array();
var gasCurrentContentClass = new Array();

var gsBackupName = "";
var gsBackupURL = "";
var gsBackupPicURL = "";
var gsBackupBasicIntroduction = "";
var gasBackupContentTitle = new Array();
var gasBackupContent = new Array();
var gasBackupContentClass = new Array();

var gScriptFile = document.createElement('script');
var gsCCURL = "http://creativecommons.org/licenses/by-sa/3.0/";
var gsGoogleURL = "https://www.google.com.tw/search?q=";

var LEVEL_1 = 1;
var LEVEL_2 = 2;
var LEVEL_3 = 3;
var LEVEL_4 = 4;


var NAME_LIST = new Array();
var COVER_LIST = new Array();
var DIRECTORY_LIST = new Array();
var giCurrentListIndex = 0;
var giCurrentNameIndex = 0;
var giCurrentQuestion = 0;
var giCurrentScore;
var giCorrectSelection;
var gaiUsedNameIndex = new Array();
var gaiUsedListIndex = new Array();

var giScoreBasicUnit = 10;
var giSelectionCount = 3;
var giPicWidthRatio = 50;
var giPicHeightRatio = 50;

var gaiNavTitleRelatedIndex = new Array();
var gbOnline = true; // device is connected to the Internet or not
var gsQuestinID = ID_QUESTION;
var gbOnReady = false; // for device 
var gsTransition = "slide";
var gsIndexPath = "";
var gbLockWait = false;
var gbJSLoadDone = true;
var gbCoverLoadDone = true;
var gbJSFileOnline = true; // all databasue stored in google code
var giPrevListIndex = giCurrentListIndex;
var giPrevNameIndex = giCurrentNameIndex;


var gbAdShowed = false; // false : show AD , true : do not show AD
var gsAndroidCodeOfAD = "ca-app-pub-5587953649122605/6300791896";
var gsIOSCodeOfAD = gsAndroidCodeOfAD;
var gsWPCodeOfAD = "ca-app-pub-5587953649122605/9254258298";


var gsDebug = "";
var geOptions = {
        TYPE: "Banner",
        REFRESH_RATE: 50,
        APP_ID: "MrQuiz_SingerQuiz_other"
    };
var geInneractiveAD = giPlatform == PLATFORM_FIREFOXOS ? Inneractive.createAd( geOptions ) : null;