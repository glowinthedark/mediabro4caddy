var IS_HIGHLIGHTER_ENABLED = true;
const IS_ALWAYS_USE_PDF_JS = false;
const USER_INDEX_JSON = '/index.json';
const SEP = '+!';
const _MB_CURR_VTT = 'mb_last_vtt';
const _MB_SHOW_HIDDEN = 'mb_show_hidden';
const _MB_SKIP_START = 'mb_skip_start';
const _MB_PDF_JS = 'mb_use_pdfjs';
const _MB_NOHL = 'mb_hohl';
const _MB_FILTER = 'mb_filter';

const REGEX_TYPE_AUDIO = /\.(mp3|m4a|aac|flac|ape|wav|ogg|oga)$/i;
const REGEX_TYPE_VIDEO = /\.(mp4|m4v|avi|mov|mpg|mpeg|webm|ogv|ogm|opus|mkv)/i;
const REGEX_TYPE_AUDIO_VIDEO = /(mp3|m4a|aac|flac|ape|wav|ogg|oga|ogv|mp4|m4v|avi|mov|mpg|mpeg|webm|mkv)$/i;
const REGEX_TYPE_IMAGE = /\.(gif|jpe?g|a?png|tiff?|bmp|eps|pcx|webp|ico|psd|xpm|wmf|svg|heic)$/i;
const REGEX_TYPE_CONTENT = /\.(pdf|html?|php|asp|js|py|sh|xml|txt|bat|docx?|xlsx?|s?css|java|c|log|rc|cpp|h|hpp|srt|vtt|cfg|conf|ini|gif|jpe?g|a?png|tiff?|bmp|eps|pcx|webp|ico|psd|xpm|wmf|svg|cs|pl)$/i;
const REGEX_TYPE_CODE = /\.(kt|go|ics|rst?|rb|dart|php|js|tsx?|py|cue|ipynb|z?sh|xml|plist|bat|css|json|java|c|cpp|h|m|hpp|conf|ini|pl|yaml|yml|groovy|swift|properties|gradle|srt|sql|lua|m3u8?)$/i;
const REGEX_TYPE_MARKDOWN = /\.(md)$/i;

const ICON_AUDIO = "&#x1F3A7;" // 🎧
const ICON_VIDEO = "&#x1F3A5;" // 🎥
const ICON_PDF = "&#128195;" // 📃
const ICON_DIR = "&#128193;" // 📁
const ICON_HTML = "&#x1F30D;" // 🌍
const ICON_IMAGE = "&#x1F305;" // 🌅
const ICON_UNKNOWN = "&#x2753;" // ❓
const ICON_BACK = "&#x21B0;" // ↰
const ICON_TEXT = "&#x1F4C3;" // 📃
const ICON_MISC = "&#x1F9E9;" // 🧩
const ICON_MARKDOWN = "&#x1F17C;" // 🅼

const ICONS_BY_TYPE = {
    'pdf': ICON_PDF,

    'aac': ICON_AUDIO,
    'ape': ICON_AUDIO,
    'flac': ICON_AUDIO,
    'm4a': ICON_AUDIO,
    'mp3': ICON_AUDIO,
    'oga': ICON_AUDIO,
    'ogg': ICON_AUDIO,
    'wav': ICON_AUDIO,

    '3gp': ICON_VIDEO,
    '3gpp': ICON_VIDEO,
    'm4v': ICON_VIDEO,
    'mkv': ICON_VIDEO,
    'mov': ICON_VIDEO,
    'mp4': ICON_VIDEO,
    'ogm': ICON_VIDEO,
    'ogv': ICON_VIDEO,
    'opus': ICON_VIDEO,
    'vob': ICON_VIDEO,
    'webm': ICON_VIDEO,

    'asp': ICON_HTML,
    'htm': ICON_HTML,
    'html': ICON_HTML,
    'mhtm': ICON_HTML,
    'php': ICON_HTML,

    'bmp': ICON_IMAGE,
    'gif': ICON_IMAGE,
    'heic': ICON_IMAGE,
    'jpeg': ICON_IMAGE,
    'jpg': ICON_IMAGE,
    'png': ICON_IMAGE,
    'svg': ICON_IMAGE,
    'webp': ICON_IMAGE,

    'md': ICON_MARKDOWN,

    'cfg': ICON_TEXT,
    'ics': ICON_TEXT,
    'ini': ICON_TEXT,
    'log': ICON_TEXT,
    'rst': ICON_TEXT,
    'srt': ICON_TEXT,
    'txt': ICON_TEXT,
    'vtt': ICON_TEXT,
    'cue': ICON_TEXT,

    'bat': ICON_MISC,
    'c': ICON_MISC,
    'conf': ICON_MISC,
    'cpp': ICON_MISC,
    'cs': ICON_MISC,
    'css': ICON_MISC,
    'dart': ICON_MISC,
    'go': ICON_MISC,
    'gradle': ICON_MISC,
    'groovy': ICON_MISC,
    'h': ICON_MISC,
    'hpp': ICON_MISC,
    'ipynb': ICON_MISC,
    'java': ICON_MISC,
    'js': ICON_MISC,
    'json': ICON_MISC,
    'kt': ICON_MISC,
    'lua': ICON_MISC,
    'm': ICON_MISC,
    'm3u': ICON_MISC,
    'm3u8': ICON_MISC,
    'pl': ICON_MISC,
    'plist': ICON_MISC,
    'properties': ICON_MISC,
    'py': ICON_MISC,
    'rb': ICON_MISC,
    'rs': ICON_MISC,
    'scss': ICON_MISC,
    'sh': ICON_MISC,
    'sql': ICON_MISC,
    'swift': ICON_MISC,
    'ts': ICON_MISC,
    'tsx': ICON_MISC,
    'xml': ICON_MISC,
    'yaml': ICON_MISC,
    'yml': ICON_MISC,
    'zsh': ICON_MISC,
}

AUTO_PLAY_NEXT = true;

const URL_TRANSFORMATIONS = [
    // LINK REGEX                                        MATCHING LINK REPLACEMENT
    [/clo_(\d{3}).*\.mp3/i, "../PDF/CLO_$1_Vocab.pdf"],
    // chinesepod content links (pdf, html)
    [/(.*chinesepod.*?)(?:_ex)?\.(pdf|html?)/i, "../$1pr.aac"],
    // chinesepod media links (aac, mp3..)
    [/(.*chinesepod.*?)(?:(dg|pr|rv))?\.(aac|mp3|m4a)/i, "pdf/$1\.pdf"],

    // chinese pod collection
    [/(.*?)pr+([^.]+)\.mp3/i, "$1$2.pdf"],
    [/([^\s,-]+)\b([^.]+)\.(pdf)/i, "$1pr$2.mp3"]
    // [/(.*).pdf/i,                     function (match, capture) {
    //     return match.replace(/-/g, ' ') + ' ';
    // }]
];

const SKIP_INTROS = [
    [/rv\./i, 5],
    [/dg\./i, 4],
    [/pr\./i, 10],
    [/whale/i, 20]
];

// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]"
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
    return p.toString() === "[object SafariRemoteNotification]";
})(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/ !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1 - 79
var isChrome = (/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)) || (!!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime));

// Edge (based on chromium) detection
var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") !== -1);

// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;

var isMobile = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);

var HEIGHT_AUDIO = 50;

if (isChrome) {
    HEIGHT_AUDIO = 50;
} else if (isOpera) {
    HEIGHT_AUDIO = 54;
} else if (isFirefox) {
    HEIGHT_AUDIO = 40;
}
const HEIGHT_VIDEO = 500;

function playNext(e) {
    var href = window.lastClicked.attr('href');

    if (AUTO_PLAY_NEXT && href && isPlayableLink(href)) {
        var nextLink = window.lastClicked;
        do {
            nextLink = nextLink.closest('li').next('li').find('a');
        } while (nextLink.length !== 0 && !isPlayableLink(nextLink.attr('href')));

        if (nextLink.length && isPlayableLink(nextLink.attr('href'))) {
            nextLink.click();
        }
    }
}

function isPlayableLink(href) {
    return REGEX_TYPE_AUDIO.test(href) || REGEX_TYPE_VIDEO.test(href);
}

function findMatchingFileByExtension(path, extension_regex, isReturnMultiple) {

    var pathUnescaped = decodeURIComponent(path),
        baseName, parentDir;

    if (pathUnescaped.indexOf('/') !== -1) {

        baseName = pathUnescaped.split('/').pop();
        parentDir = pathUnescaped.replace(baseName, '');
    } else {
        baseName = pathUnescaped;
        parentDir = '';
    }

    // handle special cases
    for (var i = 0, len = URL_TRANSFORMATIONS.length; i < len; i++) {
        var item = URL_TRANSFORMATIONS[i];

        var matcher = item[0].exec(path);

        if (matcher) {
            var matchedName = baseName.replace(item[0], item[1]);
            if (matchedName !== baseName) {
                return parentDir + matchedName;
            }
        }
    }

    // remove extension
    var base_path = path.substring(0, path.lastIndexOf('.'));

    // search for links fuzzy matching given URL
    var matched = $("[href*='" + base_path + "' i]");

    var media_entries = matched.filter(
        function () {
            return extension_regex.test(this);
        }
    );

    if (media_entries.length) {
        if (isReturnMultiple) {
            return media_entries.filter(function () {
                return this.href;
            });
        } else {
            return media_entries[0].href || media_entries[0];
        }
    }
}

function isValidUrl(url) {
    var isOk = false;
    $.ajax({
        type: "HEAD",
        async: false,
        cache: false,
        url: url
    }).done(function (message, text, jqXHR) {
        isOk = true;
    }).fail(function () {
        console.log(`ERROR:HEAD: ${url}`);
    });

    return isOk;
}
function fullscreenOn(p) {
    var fs = p.requestFullscreen || p.webkitRequestFullscreen || p.mozRequestFullScreen || p.oRequestFullscreen || p.msRequestFullscreen;
    fs.call(p);
}

function fullscreenOff(p) {
    var fsx = p.exitFullScreen || p.webkitExitFullScreen || p.mozExitFullScreen || p.oExitFullScreen || p.msExitFullScreen;
    fsx.call(p);
}

function attachEventListeners() {

    window.audioplayer = $('#audioplayer');
    window.videoplayer = $('#videoplayer');
    var contentPanel = $('#docview');

    // video play/pause on click (firefox and safari already do this OOTB)
    if (!window.safari && !window.netscape) {
        videoplayer.click(function (e) {
            this.paused ? this.play() : this.pause();
            e.preventDefault();
            e.stopImmediatePropagation();
        });
    }
    /*
    */
    // AUTOSKIP INTRO
    $('#audioplayer, #videoplayer').on('play', function (e) {
        if (e.target.src && e.target.currentTime === 0) {
            if (window._skipIntroGlobalSecs) {
                e.target.currentTime = window._skipIntroGlobalSecs;
            } else {
                for (var i = 0; i < SKIP_INTROS.length; i++) {
                    var regEx = SKIP_INTROS[i][0];
                    var skipSeconds = SKIP_INTROS[i][1];

                    if (regEx.test(decodeURIComponent(e.target.src)))
                        e.target.currentTime = skipSeconds;
                }
            }
        }
    });

    // handle key navigation
    document.onkeydown = function (e) {
        if ([37, 38, 39, 40, 32, 70].indexOf(e.which) !== -1) {
            e.preventDefault();
            e.stopImmediatePropagation();
        }

        var p = (audioplayer.is(':visible') ? audioplayer : videoplayer).get(0);

        switch (e.which) {
            case 37: // left
                p.currentTime = p.currentTime - 5;
                break;
            case 38: // up
                p.currentTime = p.currentTime + 10;
                break;
            case 39: //  right
                p.currentTime = p.currentTime + 5;
                break;
            case 40: // down
                p.currentTime = p.currentTime - 10;
                break;
            case 32: // space
                // chrome OOTB handles play/pause on space when the element is focused
                if (!window.chrome || document.activeElement !== p) {
                    p.paused ? p.play() : p.pause();
                }
                break;
            case 70: // f-key
                if (!(e.shiftKey || e.ctrlKey || e.altKey || e.metaKey)) {
                    if (!window.isFs) {
                        window.isFs = true;
                        fullscreenOn(p);
                    } else {
                        window.isFs = false;
                        fullscreenOff(p);
                    }
                }
                break;
        }
    };

    // href clicks
    $('a.fileinfo, a.imglnk, a.imglnk .preview img').click(function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var $link;

        if (e.target.tagName !== 'A') {
            $link = $(e.target).closest('a');

        } else {
            $link = $(e.target);
        }

        // set deeplink in URL
        if ($link.data('type') === 'file') {
            var name;
            if ($link.hasClass('fileinfo')) {
                name = $link.data('name');
            } else if ($link.hasClass('imglnk')) {
                name = $link.parent().find('.fileinfo').data('name');
            }
            if (name) {
                updateCurFile(name);
            }
        }

        // store the link for playNext()
        window.lastClicked = $link;

        $link.css({
            'color': '',
            'font-style': ''
        });

        var path = $link
            .css({
                'color': '#ff7d12',
                'font-weight': 'bold'
            })
            .attr('href');

        if ($link.data('type') === 'file') {
            document.title = path;
        } else {
            // it's a folder; navigate
            var goToDir = $link.attr("href").split('#')[1];
            document.title = decodeURIComponent(goToDir);
            loadData(goToDir);
            return false;
        }
        var mediaLink;
        var contentLink; // PDF or any other text file to be loaded into the frame
        var isMediaLinkClick;

        var isAudioDefined = false;
        var isVideoDefined = false;
        var inferredMediaLink;
        var inferredContentLink;

        if (path.match(REGEX_TYPE_CONTENT)) {
            contentLink = path;

            var matched_file = findMatchingFileByExtension(path, REGEX_TYPE_AUDIO_VIDEO);

            if (matched_file) {
                inferredMediaLink = matched_file;

                if (inferredMediaLink.match(REGEX_TYPE_AUDIO)) {
                    isAudioDefined = true;
                } else if (inferredMediaLink.match(REGEX_TYPE_VIDEO)) {
                    isVideoDefined = true;
                }
            }
        } else if (path.match(REGEX_TYPE_AUDIO)) {
            isMediaLinkClick = true;
            mediaLink = path;
            isAudioDefined = true;
        } else if (path.match(REGEX_TYPE_VIDEO)) {
            mediaLink = path;
            isMediaLinkClick = true;
            isVideoDefined = true;
        }

        if (!mediaLink && inferredMediaLink && isValidUrl(inferredMediaLink)) {
            mediaLink = inferredMediaLink;
        }

        // when audio or Video file is clicked then try to find the corresponding content file
        if (isMediaLinkClick) {
            var partial_path = path
                .replace('_video', '')
                .replace('_review', '')
                .replace('_dialog', '');

            matched_file = findMatchingFileByExtension(partial_path, REGEX_TYPE_CONTENT);

            if (matched_file) {
                inferredContentLink = matched_file;
            }
        }

        if (!contentLink && inferredContentLink && isValidUrl(inferredContentLink)) {
            contentLink = inferredContentLink;
        }

        var baseFile = mediaLink && mediaLink.split(/\//g).pop();
        var _scope = angular.element($("[ng-controller]")).scope();

        if (isAudioDefined) {

            if (audioplayer.attr('src') !== mediaLink) {

                if (videoplayer.attr('src')) {
                    videoplayer.attr('src', '');
                }
                videoplayer.hide();
                audioplayer
                    .attr('src', mediaLink)
                    .attr('title', decodeURIComponent(mediaLink))
                    .show();
            }
        } else if (isVideoDefined) {
            if (audioplayer.attr('src')) {
                audioplayer.attr('src', '');
            }
            audioplayer.hide();

            if (mediaLink && videoplayer.attr('src') !== mediaLink) {
                videoplayer.attr('title', decodeURIComponent(baseFile))
                    .attr('src', mediaLink)
                    .show();

                // ADD VTT SUBS
                var vttLinks = findMatchingFileByExtension(mediaLink, /.*\.vtt/, true);

                if (vttLinks) {
                    addVttSubtitleTracks(vttLinks, $link);
                } else {
                    var srtLinks = findMatchingFileByExtension(mediaLink, /.*\.srt/, true);

                    // ADD SRT SUBS if no VTT
                    if (srtLinks) {
                        addSRTSubtitleTracks(srtLinks, $link);
                    }

                    videoplayer.empty();
                }
                if (mediaLink.match(/\.mkv$/i)) {
                    // *TRY* to play matroska (only chrome and not properly supported)
                    videoplayer.attr('type', `type='video/x-matroska; codecs="theora, vorbis"'`);
                } else if (videoplayer.attr('type')) {
                    videoplayer.attr('type', '');
                }
            }
        }

        if (!mediaLink && !contentLink) {
            contentLink = path;
        }

        document.title = decodeURIComponent(path);

        if (mediaLink || !videoplayer.get(0).paused || !audioplayer.get(0).paused) {
            if (isAudioDefined || !audioplayer.get(0).paused) {
                _scope.setFirstComponent(HEIGHT_AUDIO);
            } else if (isVideoDefined || !videoplayer.get(0).paused) {
                _scope.setFirstComponent(contentLink ? HEIGHT_VIDEO : document.body.clientHeight);
            }
        } else if (contentLink) {
            _scope.setFirstComponent(0);
        } else if (!contentLink) {
            _scope.setLastComponent(0);
        }

        audioplayer.on('error', function () {
            console.log('AUDIO ERROR', this);

            if (!isVideoDefined) {
                _scope.setFirstComponent(0);
                _scope.$apply();
            }
        });

        _scope.$apply();

        if (contentLink && contentPanel.attr('src') !== contentLink) {
            contentPanel.attr('src', null);

            if (!isMobile && (IS_ALWAYS_USE_PDF_JS || window._forcePdfJs) && contentLink.match(/\.pdf/i)) {
                contentPanel.attr('src', `js/pdfjs/web/viewer.html?file=${encodeURIComponent(contentLink)}`);

                // SPECIAL treatment for Markdown
            } else if (contentLink.match(REGEX_TYPE_MARKDOWN) && window.marked) {
                $('#spinr_content').show();

                fetch(contentLink)
                    .then(resp => resp.text())
                    .then(data => {
                        var iframe_head = contentPanel.contents().find("head");

                        var path = window.parent ? parent.window.location.pathname : window.location.pathname;
                        path = path.replace(path.split('/').pop(), '');
                        path = path === '/' ? '' : path;

                        if (!iframe_head.length || !iframe_head.find('#flag_markdown').length) {
                            iframe_head.empty();
                            iframe_head.append($("<link/>", {
                                rel: "stylesheet",
                                id: 'flag_markdown',
                                href: `${path}css/Torpedo.css`, // https://github.com/ttscoff/MarkedCustomStyles/blob/master/Torpedo.css
                                type: "text/css"
                            })).append($("<link/>", {
                                rel: "stylesheet",
                                id: 'flag_highlight',
                                href: `${path}css/atelier-estuary-light.css`,
                                type: "text/css"
                            }));
                        }
                        return data;
                    })
                    .then(data => {
                        if (IS_HIGHLIGHTER_ENABLED) {
                            marked.setOptions({
                                highlight: function (code, lang) {
                                    if (window.hljs && lang) {
                                        return hljs.highlight(code, {language: lang}).value;
                                    }
                                }
                            });
                        }
                        var content;
                        try {
                            content = marked.parse(data);
                        } catch(err) {
                            console.error(err);
                            content = data;
                        } finally {
                            contentPanel.contents().find('body').html(content);
                            $('#spinr_content').hide();
                            contentPanel.contents().scrollTop(0);
                        }
                    });
                // SPECIAL treatment for XML, JS, CSS, JAVA, etc
            } else if (IS_HIGHLIGHTER_ENABLED && contentLink.match(REGEX_TYPE_CODE)) {
                $('#spinr_content').show();

                // refresh reference
                contentPanel.attr('src', null);

                fetch(contentLink)
                    .then(resp => resp.text())
                    .then(data => {
                        var head = contentPanel.contents().find("head");
                        // ONLY append if not already present
                        if (!head.length || !head.find('#flag_highlight').length) {
                            head.empty();
                            var path = window.parent ? parent.window.location.pathname : window.location.pathname;
                            path = path.replace(path.split('/').pop(), '');
                            path = path === '/' ? '' : path;

                            head.append($("<link/>", {
                                rel: "stylesheet",
                                id: 'flag_highlight',
                                href: `${path}css/atelier-estuary-light.css`,
                                type: "text/css"
                            }))
                            .append($('<script/>', {
                                src: `${path}js/highlight.min-11.7.0.js`
                            }));
                        }
                        return data;
                    })
                    .then(data => {
                        $(contentPanel).ready(function () {
                            var page_content = data,
                                body = contentPanel.contents().find('body');

                            if (contentLink.match(/\.(xml|plist)$/i)) {
                                body.html(`<pre><code id="xml__code"></code></pre>`);
                                body.find('#xml__code').get(0).innerText = page_content;
                            } else {
                                body.html(`<pre><code>${page_content}</code></pre>`);
                            }

                            body.append("<script>(window.hljs ? window.hljs.highlightAll() : console.error('nohljs!'));</" + "script>");
                            $('#spinr_content').hide();
                            contentPanel.contents().scrollTop(0);
                        });
                    });
            } else {
                contentPanel.contents().find("head").empty();
                // contentPanel.attr('type', null);
                contentPanel.attr('src', contentLink);
            }
        }
    });
}

/* https://stackoverflow.com/a/20463021/191246 */
function fileSizeIEC(a, b, c, d, e) {
    return (b = Math, c = b.log, d = 1024, e = c(a) / c(d) | 0, a / b.pow(d, e)).toFixed(e ? 2 : 0) +
        ' ' + (e ? 'KMGTPEZY'[--e] + 'B' : 'b');
}

function goUp() {
    var curdir = getUrlMetadata().curdir;

    if (curdir) {
        if (curdir.endsWith('/')) {
            curdir = curdir.slice(0, -1);
        }
        if (window.location.href.indexOf(USER_INDEX_JSON) != -1) {
            curdir = curdir.replace(USER_INDEX_JSON, '');
        }

        var parentDir = curdir.substring(0, curdir.lastIndexOf('/'));

        if (window.location.href.indexOf(USER_INDEX_JSON) != -1) {
            parentDir = `${parentDir}${USER_INDEX_JSON}`;
        }
        if (parentDir) {
            window.top.location.hash = parentDir;
            document.title = decodeURIComponent(parentDir);
            loadData(parentDir);
        }

    } else {
        window.history.back();
    }
}

function getCommonPrefix(mediaLinkEl) {
    return mediaLinkEl.data('name').replace(/\.[^/.]+$/, '');
}

function getTrackLabel(commonPrefix, mediaName) {
    return mediaName.replace(commonPrefix, '').replace('\.(mp4|m4v|ape|flac|wav|acc|mp3)', '').replace(/^[-._/=,]/, '');
}

function srtToVtt(srtRawData) {
    // Replace line breaks with \n
    srt = srtRawData.replace(/\r\n|\r|\n/g, '\n');
    // Add WEBVTT header
    srt = `WEBVTT

STYLE
::cue {
color: #ffc800;
border: 2px solid black;
}
::cue(b) {
color: rgb(51, 216, 18);
border: 2px solid black;
}
::cue(i) {
color: #00bafd;
}
::cue(u) {
text-decoration: none;
color: #ff00ee;
font-style: normal;
}
::cue(.w) {
color: white;
}
::cue(.b) {
color: aqua;
}
::cue(.p) {
color: rgb(255, 0, 255);
}

` + srt;
    // Replace commas with dots in timestamps
    srt = srt.replace(/(\d\d:\d\d:\d\d),(\d\d\d)/g, '$1.$2');
    // map of SRT font colors to VTT cue span classes
    var colorMap = {
        "ffffff": "w",
        "00ffff": "b",
        "d663fd": "p"
    };
    // Replace font tags with cue span tags using the map
    srt = srt.replace(/<font color="#([0-9a-fA-F]{6})">([\s\S]*?)<\/font>/g, function (match, color, text) {
        return `<c.${colorMap[color.toLowerCase()]}>${text.replace('\n','').trim()}</c>`;
    });

    srt = srt.replace(/<br\s*\/?>/g, '\n')

    return new Blob([srt], { type: 'text/vtt' });
}    

function addVttSubtitleTracks(vttLinks, mediaLink) {
    videoplayer.empty();
    // strip extension
    var commonPrefix = getCommonPrefix(mediaLink);
    var meta = [];

    vttLinks.each(function () {
        var trackLabel = getTrackLabel(commonPrefix, this.dataset.name);
        meta.push({ label: trackLabel, src: this.href });
    });
    // VTT_META is postprocessed on 'loadedmetadata'
    videoplayer.get(0).VTT_META = meta;
}

function addSRTSubtitleTracks(srtLinks, mediaLink) {
    videoplayer.empty();
    var commonPrefix = getCommonPrefix(mediaLink);
    srtLinks.each(function () {
        fetchConvertAttachSrt2Vtt(mediaLink, this, commonPrefix);
    });
}

function fetchConvertAttachSrt2Vtt(mediaLink, srtEl, commonPrefix) {
    var srtUrl = srtEl.href;
    var srtName = srtEl.dataset.name;
    fetch(srtUrl)
        .then(function (response) {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error(`Failed to fetch file: ${response.statusText}`);
            }
        })
        .then(function (srt) {
            var vtt = srtToVtt(srt);
            // Create a URL for the VTT Blob object
            var vttUrl = URL.createObjectURL(vtt);
            // Create a new track element
            var track = document.createElement('track');
            // Set the attributes of the track element
            track.kind = 'subtitles';
            var trackLabel = getTrackLabel(commonPrefix, srtName);
            track.label = trackLabel || ':Default:';
            track.srclang = 'en';
            track.src = vttUrl;
            
            if (!window.haveDefaultSubtitleTrack) {
                track.default = true;
                window.haveDefaultSubtitleTrack = true;
            }

            // Append the track element to the video element
            videoplayer.append(track);
        })
        .catch(function (error) {
            // Log the error
            console.error(error);
        });

}

function getPath() {
    var curdir = window.top.location.hash;
    if (curdir) {
        curdir = curdir.slice(1);
    }
    return curdir || '/';
}


function updateCurFile(currentFile) {
    var curHash = window.top.location.hash.slice(1);
    var posFileSep = curHash.indexOf(SEP);
    
    if (posFileSep !== -1) {
        var chunks = curHash.split(SEP);
        chunks[1] = currentFile;
        window.top.location.hash = chunks.join(SEP);
    } else {
        window.top.location.hash = `${curHash}${SEP}${currentFile}`;
    }
}

function getUrlMetadata() {
    var curFile, curDir, hash = window.top.location.hash.slice(1);
    if (hash) {

        var posFileSep = hash.indexOf(SEP);
        
        if (posFileSep !== -1) {
            [curDir, curFile] = hash.split(SEP);
        } else {
            curDir = hash;
        }
    }

    return {
        curdir: curDir || '/',
        selectedFile: curFile
    };
}

function isTrue(val) {
    return ["true", "1", "yes", "on"].indexOf(val) !== -1;
}

function loadData(path) {
    var urlMeta = getUrlMetadata();
    var curdir = path || urlMeta.curdir;
    var params = new URL(document.location.href).searchParams;
    var includeHidden = isTrue(params.get('hidden')) || isTrue(localStorage.getItem(_MB_SHOW_HIDDEN));
    window._skipIntroGlobalSecs = params.get('skip') || localStorage.getItem(_MB_SKIP_START);
    window._forcePdfJs = isTrue(params.get('pdfjs')) || isTrue(localStorage.getItem(_MB_PDF_JS));

    // supress highliter with 'nohl=true'
    if (isTrue(params.get('nohl') || localStorage.getItem(_MB_NOHL))) {
        IS_HIGHLIGHTER_ENABLED = false;
    }

    var filter = params.get('filter') || localStorage.getItem(_MB_FILTER);

    $('#spinr').show();

    // strip json name if the listing is from a json file
    var curdirBase = curdir.replace(/[a-z]+\.json$/, '');

    // append trailing slash for paths
    if (/^\/.*[^\/]$/.test(curdirBase)) {
        curdirBase = `${curdirBase}/`;
    }

    var isCustomIndex = window.location.href.indexOf(USER_INDEX_JSON) !== -1;

    $.getJSON(curdir)
        .done(function (data) {

            // handle output of "tree -L 1 -J"
            if (isCustomIndex && data.length === 2 && data[0].contents) {
                data = data[0].contents;
            }

            // Natural sort
            if (window.Intl && window.Intl.Collator) {
                var naturalCollator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
                data.sort((a, b) => {
                    (a.is_dir || a.type === 'directory') === (b.is_dir || b.type === 'directory') ? naturalCollator.compare(a.name, b.name) : (a.is_dir || a.type === 'directory') ? -1 : 1
                });
            }

            var filelist = document.getElementById('filelist');
            $(filelist).empty(); // REMOVE previous filelist

            data.forEach(element => {

                if (!element.name) {
                    alert(`Unexpected server response ${JSON.stringify(element)}`);
                    throw new Error('malformed index.json!');
                }

                if (!includeHidden && element.name.charAt(0) === '.') {
                    return;
                }
                var isDir = element.is_dir || element.type === 'directory';

                if (filter && !isDir && !element.is_symlink && !RegExp(filter).test(element.name)) {
                    return;
                }
                var _url = element.url || element.name;
                var type, href, icon, path = _url.replace(/^\.\//, '');

                if (isDir) {
                    type = 'dir';
                    icon = ICON_DIR;
                    if (isCustomIndex) {
                        // using static index.json with other servers than caddy
                        href = `${window.location.pathname}#${curdirBase}${path}${USER_INDEX_JSON}`;
                    } else {
                        // using caddy
                        href = `${window.location.pathname}#${curdirBase}${path}`;
                    }

                } else {
                    type = 'file';
                    var extension = element.name.split('.').pop().toLowerCase();
                    icon = ICONS_BY_TYPE[extension] || ICON_UNKNOWN;

                    href = `${curdirBase}${path}`;
                }

                var li = document.createElement('li');

                var preview = '';

                var lastModified = element.mod_time || element.time;

                var fileSize = isDir ? '' : fileSizeIEC(element.size);

                if (REGEX_TYPE_IMAGE.test(href) && element.size < 10485760) {

                    preview = `<a class="imglnk" data-type="file" title="️${element.name} - [${fileSize}] &#x1F55D; ${lastModified}" href="${href}">
                            <div class="preview">
                                <img src="${href}">
                            </div>
                        </a>`;
                }

                $(li).html(`${preview}\n<a class="fileinfo" data-type="${type}" data-name="${element.name}" title="${element.name} - &#x1F55D; ${lastModified}" href="${href}">
                        <span class="fname">${icon}&nbsp;${element.name}</span>
                        <span class="size">${fileSize}</span>
                    </a>`);
                filelist.appendChild(li);
            });

        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            alert(`${err}\n${JSON.stringify(jqxhr)}`);
            console.log("Request Failed: " + err);
        }).then(() => {
            console.log('DONE');
            attachEventListeners();
        }).always(function name(params) {
            window.top.location.hash = curdir;
            $('#spinr').hide();

            if (urlMeta.selectedFile) {
                var selected = document.querySelector(`a[data-name="${decodeURIComponent(urlMeta.selectedFile)}"]`);
                if (selected) {
                    selected.scrollIntoView({behavior: "smooth", block: "start"});
                    selected.click();
                }
            }
        });
}

$(document).ready(function () {
    loadData();

    $('#docview').on('load', function (e) {
        var docHead = $(e.target).contents().find("head");
        if (e.target.src.match(REGEX_TYPE_IMAGE)) {
            docHead.append('<style type="text/css">body{height:100%; position:relative} body>img {display:block; text-align:center; position:absolute; max-width:100%; max-height:100%; margin:auto; top:0; bottom: 0; left:0; right: 0}</style>');
        }
    });

    var $videoplayer = $('#videoplayer');

    $videoplayer.on('loadedmetadata', function () {
        console.log('loadmetadata', this);

        if (this.VTT_META) {
            for (var j = 0; j < this.VTT_META.length; j++) {
                var trk = this.VTT_META[j];
                track = document.createElement("track");
                track.kind = "captions";
                track.label = trk.label;
                track.srclang = "pi";
                track.src = trk.src;

                this.appendChild(track);
            }

            var lastLabel = localStorage.getItem(_MB_CURR_VTT);
            var numTracks = this.textTracks.length;

            for (var i = numTracks - 1; i >= 0; i--) {
                var track = this.textTracks[i];
                if (track.label === lastLabel) {
                    track.mode = "showing";
                } else {
                    track.mode = "disabled";
                }
            }
        }
    });

    $videoplayer.get(0).textTracks.addEventListener('change', function (e) {
        var textTrackList = this;
        var numTracks = textTrackList.length;
        var isTrackVisible = false;

        for (var i = numTracks - 1; i >= 0; i--) {
            var track = textTrackList[i];
            // https://developer.mozilla.org/en-US/docs/Web/API/TextTrack
            console.log(track.mode, track.label, track.language, track.kind, track.id);

            if (track.mode === 'showing') {
                localStorage.setItem(_MB_CURR_VTT, track.label);
                isTrackVisible = true;
            }
        }

        if (!isTrackVisible) {
            localStorage.removeItem(_MB_CURR_VTT);
        }
    });
});

function makeFile(bytesOrString, fileName) {
    return new File([bytesOrString], fileName, {
            type: "text/plain;charset=utf-8"
        }
    );
}

function downloadToLocalFile(filename, data) {
    window.file_saver_filename = filename;
    window.file_saver_data = data;
    if (!window.saveAs) {
        var script = document.createElement('script');
        script.src = 'js/FileSaver-1.3.8.min.js';
        // script.src = 'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js';
        document.head.appendChild(script);

        script.onload = function () {
            saveAs(makeFile(window.file_saver_data, window.file_saver_filename));
        };
    } else {
        saveAs(makeFile(window.file_saver_data, window.file_saver_filename));
    }
}

function downloadPlaylist(e) {
    var m3u_data = "#EXTM3U\n\n";
    var numEntries = 0;

    $("[data-type='file']").each(function () {
        if (REGEX_TYPE_AUDIO_VIDEO.test(this.href)){
            console.log(this.dataset.name);
            var url = new URL(this.href, document.location.origin).href;
            m3u_data += `#EXTINF:123,${this.dataset.name}\n${url}\n`;
            numEntries++;
        }

    });

    if (numEntries){
        var dirname = getUrlMetadata().curdir; // document.location.hash;
        if (dirname.endsWith('/')) {
            dirname = dirname.slice(0, -1);
        }
        var downloadName = `${dirname.substring(dirname.lastIndexOf('/')+1, dirname.length)}`;
        downloadName = decodeURIComponent(downloadName);
        var m3uFileName = `${(downloadName || 'playlist')}.m3u`;
        downloadToLocalFile(m3uFileName, m3u_data);
    } else {
        alert("No playable files found!")
    }
}