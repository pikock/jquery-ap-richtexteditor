/*
* jQuery rich text editor plugin 0.0.1 - Rich text editor (Chrome, Mozilla, Opera, Safari, Internet Explorer)
*
* Copyright (c) 2012 Thierry Charbonnel
* Distributed under the MIT License.
*/

(function($) {
    
    var methods = {
        _init: function(options) {
            var settings = $.extend({
                isMSIE : (navigator.appVersion.indexOf("MSIE") != -1),
                eventSuffix: 'ApRichTextEditor' ,
                css: 'css/apRichTextEditor.css',
                autoResize: true,
                buttons: {
                    backColor: // Changes the document background color. In styleWithCss mode, it affects the background color of the containing block instead. This requires a color value string to be passed in as a value argument. (Internet Explorer uses this to set text background color.)
                    {
                        label: 'backColor',
                        action: 'backColor',
                        args: '#FFFF00'
                    },
                    
                    bold: // Toggles bold on/off for the selection or at the insertion point. (Internet Explorer uses the STRONG tag instead of B.)
                    {
                        label: 'bold',
                        action: 'bold',
                        args: false
                    },
                    contentReadOnly: //Makes the content document either read-only or editable. This requires a boolean true/false to be passed in as a value argument. (Not supported by Internet Explorer.)
                    {
                        label: 'contentReadOnly',
                        action: 'contentReadOnly',
                        args: false
                    },
                    copy: //Copies the current selection to the clipboard. Clipboard capability must be enabled in the user.js preference file. See [1]
                    {
                        label: 'copy',
                        action: 'copy',
                        args: false
                    },
                    createLink: //Creates an anchor link from the selection, only if there is a selection. This requires the HREF URI string to be passed in as a value argument. The URI must contain at least a single character, which may be a white space. (Internet Explorer will create a link with a null URI value.)
                    {
                        label: 'createLink',
                        action: 'createLink',
                        args: 'http://www.ap.cx/'
                    },
                    cut: //Cuts the current selection and copies it to the clipboard. Clipboard capability must be enabled in the user.js preference file. See [2]
                    {
                        label: 'cut',
                        action: 'cut',
                        args: false
                    },
                    decreaseFontSize: //Adds a SMALL tag around the selection or at the insertion point. (Not supported by Internet Explorer.)
                    {
                        label: 'decreaseFontSize',
                        action: 'decreaseFontSize',
                        args: false,
                        ie: false
                    },
                    deleteIt: //Deletes the current selection.
                    {
                        label: 'delete',
                        action: 'delete',
                        args: false
                    },
                    enableInlineTableEditing: //Enables or disables the table row and column insertion and deletion controls. (Not supported by Internet Explorer.)
                    {
                        label: 'enableInlineTableEditing',
                        action: 'enableInlineTableEditing',
                        args: false,
                        ie: false
                    },
                    enableObjectResizing: //Enables or disables the resize handles on images and other resizable objects. (Not supported by Internet Explorer.)
                    {
                        label: 'enableObjectResizing',
                        action: 'enableObjectResizing',
                        args: false,
                        ie: false
                    },
                    /*
                    fontName: //Changes the font name for the selection or at the insertion point. This requires a font name string ("Arial" for example) to be passed in as a value argument.
                    {
                        label: 'fontName',
                        action: 'fontName',
                        args: 'helvetica'
                    },
                    */
                    /*
                    fontSize: //Changes the font size for the selection or at the insertion point. This requires an HTML font size (1-7) to be passed in as a value argument.
                    {
                        label: 'fontSize',
                        action: 'fontSize',
                        args: false
                    },
                    */
                    foreColor: //Changes a font color for the selection or at the insertion point. This requires a color value string to be passed in as a value argument.
                    {
                        label: 'foreColor',
                        action: 'foreColor',
                        args: '#FF0000'
                    },
                    formatBlock: //Adds an HTML block-style tag around the line containing the current selection, replacing the block element containing the line if one exists (in Firefox, BLOCKQUOTE is the exception - it will wrap any containing block element). Requires a tag-name string to be passed in as a value argument. Virtually all block style tags can be used (eg. "H1", "P", "DL", "BLOCKQUOTE"). (Internet Explorer supports only heading tags H1 - H6, ADDRESS, and PRE, which must also include the tag delimiters < >, such as "<H1>".)
                    {
                        label: 'formatBlock',
                        action: 'formatBlock',
                        args: 'p'
                    },
                    heading: // Adds a heading tag around a selection or insertion point line. Requires the tag-name string to be passed in as a value argument (i.e. "H1", "H6"). (Not supported by Internet Explorer.)
                    {
                        label: 'H1',
                        action: 'heading',
                        args: 'h1',
                        ieAction: 'formatBlock'
                    },
                    headingH2: // Adds a heading tag around a selection or insertion point line. Requires the tag-name string to be passed in as a value argument (i.e. "H1", "H6"). (Not supported by Internet Explorer.)
                    {
                        label: 'H2',
                        action: 'heading',
                        args: 'h2',
                        ieAction: 'formatBlock'
                    },
                    headingH3: // Adds a heading tag around a selection or insertion point line. Requires the tag-name string to be passed in as a value argument (i.e. "H1", "H6"). (Not supported by Internet Explorer.)
                    {
                        label: 'H3',
                        action: 'heading',
                        args: 'h3',
                        ieAction: 'formatBlock'
                    },
                    headingH4: // Adds a heading tag around a selection or insertion point line. Requires the tag-name string to be passed in as a value argument (i.e. "H1", "H6"). (Not supported by Internet Explorer.)
                    {
                        label: 'H4',
                        action: 'heading',
                        args: 'h4',
                        ieAction: 'formatBlock'
                    },
                    paragraph: //Adds an HTML block-style tag around the line containing the current selection, replacing the block element containing the line if one exists (in Firefox, BLOCKQUOTE is the exception - it will wrap any containing block element). Requires a tag-name string to be passed in as a value argument. Virtually all block style tags can be used (eg. "H1", "P", "DL", "BLOCKQUOTE"). (Internet Explorer supports only heading tags H1 - H6, ADDRESS, and PRE, which must also include the tag delimiters < >, such as "<H1>".)
                    {
                        label: 'paragraph',
                        action: 'formatBlock',
                        args: 'p'
                    },
                    hiliteColor: //Changes the background color for the selection or at the insertion point. Requires a color value string to be passed in as a value argument. UseCSS must be turned on for this to function. (Not supported by Internet Explorer.)
                    {
                        label: 'hiliteColor',
                        action: 'hiliteColor',
                        args: '#FFFF00',
                        ie: false
                    },
                    increaseFontSize: //Adds a BIG tag around the selection or at the insertion point. (Not supported by Internet Explorer.)
                    {
                        label: 'increaseFontSize',
                        action: 'increaseFontSize',
                        args: false,
                        ie: false
                    },
                    indent: //Indents the line containing the selection or insertion point. In Firefox, if the selection spans multiple lines at different levels of indentation, only the least indented lines in the selection will be indented.
                    {
                        label: 'indent',
                        action: 'indent',
                        args: false,
                        ie: false
                    },
                    insertBrOnReturn: //Controls whether the Enter key inserts a br tag or splits the current block element into two. (Not supported by Internet Explorer.)
                    {
                        label: 'insertBrOnReturn On',
                        action: 'insertBrOnReturn',
                        args: true,
                        ie: false
                    },
                    insertBrOnReturnOff: //Controls whether the Enter key inserts a br tag or splits the current block element into two. (Not supported by Internet Explorer.)
                    {
                        label: 'insertBrOnReturn Off',
                        action: 'insertBrOnReturn',
                        args: false,
                        ie: false
                    },
                    insertHorizontalRule: //Inserts a horizontal rule at the insertion point (deletes selection).
                    {
                        label: 'insertHorizontalRule',
                        action: 'insertHorizontalRule',
                        args: false
                    },
                    insertHTML: //Inserts an HTML string at the insertion point (deletes selection). Requires a valid HTML string to be passed in as a value argument. (Not supported by Internet Explorer.)
                    {
                        label: 'insertHTML',
                        action: 'insertHTML',
                        args: false,
                        ie: false
                    },
                    insertImage: //Inserts an image at the insertion point (deletes selection). Requires the image SRC URI string to be passed in as a value argument. The URI must contain at least a single character, which may be a white space. (Internet Explorer will create a link with a null URI value.)
                    {
                        label: 'insertImage',
                        action: 'insertImage',
                        args: 'http://gravatar.com/emails/'
                    },
                    insertOrderedList: //Creates a numbered ordered list for the selection or at the insertion point.
                    {
                        label: 'insertOrderedList',
                        action: 'insertOrderedList',
                        args: false
                    },
                    insertUnorderedList: //Creates a bulleted unordered list for the selection or at the insertion point.
                    {
                        label: 'insertUnorderedList',
                        action: 'insertUnorderedList',
                        args: false
                    },
                    insertParagraph: //Inserts a paragraph around the selection or the current line. (Internet Explorer inserts a paragraph at the insertion point and deletes the selection.)
                    {
                        label: 'insertParagraph',
                        action: 'insertParagraph',
                        args: false
                    },
                    italic: //Toggles italics on/off for the selection or at the insertion point. (Internet Explorer uses the EM tag instead of I.)
                    {
                        label: 'italic',
                        action: 'italic',
                        args: false
                    },
                    justifyCenter: //Centers the selection or insertion point.
                    {
                        label: 'justifyCenter',
                        action: 'justifyCenter',
                        args: false
                    },
                    justifyLeft: //Justifies the selection or insertion point to the left.
                    {
                        label: 'justifyLeft',
                        action: 'justifyLeft',
                        args: false
                    },
                    justifyRight: //Right-justifies the selection or the insertion point.
                    {
                        label: 'justifyRight',
                        action: 'justifyRight',
                        args: false
                    },
                    justifyFull: //Right-justifies the selection or the insertion point.
                    {
                        label: 'justifyFull',
                        action: 'justifyFull',
                        args: false
                    },
                    outdent: //Outdents the line containing the selection or insertion point.
                    {
                        label: 'outdent',
                        action: 'outdent',
                        args: false
                    },
                    paste: //Pastes the clipboard contents at the insertion point (replaces current selection). Clipboard capability must be enabled in the user.js preference file. See [3]
                    {
                        label: 'paste',
                        action: 'paste',
                        args: false
                    },
                    redo: //Redoes the previous undo command.
                    {
                        label: 'redo',
                        action: 'redo',
                        args: false
                    },
                    removeFormat: //Removes all formatting from the current selection.
                    {
                        label: 'removeFormat',
                        action: 'removeFormat',
                        args: false
                    },
                    selectAll: //Selects all of the content of the editable region.
                    {
                        label: 'selectAll',
                        action: 'selectAll',
                        args: false
                    },
                    strikeThrough: //Toggles strikethrough on/off for the selection or at the insertion point.
                    {
                        label: 'strikeThrough',
                        action: 'strikeThrough',
                        args: false
                    },
                    subscript: //Toggles subscript on/off for the selection or at the insertion point.
                    {
                        label: 'subscript',
                        action: 'subscript',
                        args: false
                    },
                    superscript: //Toggles superscript on/off for the selection or at the insertion point.
                    {
                        label: 'superscript',
                        action: 'superscript',
                        args: false
                    },
                    underline: //Toggles underline on/off for the selection or at the insertion point.
                    {
                        label: 'underline',
                        action: 'underline',
                        args: false
                    },
                    undo: //Undoes the last executed command.
                    {
                        label: 'undo',
                        action: 'undo',
                        args: false
                    },
                    unlink: //Removes the anchor tag from a selected anchor link.
                    {
                        label: 'unlink',
                        action: 'unlink',
                        args: false
                    },
                    styleWithCSS: //Replaces the useCSS command; argument works as expected, i.e. true modifies/generates style attributes in markup, false generates formatting elements.
                    {
                        label: 'styleWithCSS',
                        action: 'styleWithCSS',
                        args: 'border: 1px solid #969696;'
                    },
                    normalize: //Replaces the useCSS command; argument works as expected, i.e. true modifies/generates style attributes in markup, false generates formatting elements.
                    {
                        label: 'normalize',
                        action: 'normalize',
                        args: false
                    }
                },
                buttonsList: [
                    //'backColor',
                    'heading',
                    'headingH2',
                    'headingH3',
                    'headingH4',
                    'paragraph',
                    'SP',
                    
                    'bold',
                    'italic',
                    'SP',
                    
                    'justifyLeft',
                    'justifyCenter',
                    'justifyRight',
                    'justifyFull',
                    'SP',
                    
                    'outdent',
                    'indent',
                    'SP',
                    
                    'insertOrderedList',
                    'insertUnorderedList',
                    'SP',
                    
                    'undo',
                    'redo',
                    'SP',
                    
                    'createLink',
                    'unlink',
                    'SP',
                    
                    'removeFormat'
                    //'contentReadOnly',
                    
                    //'decreaseFontSize',
                    //'enableInlineTableEditing',
                    //'enableObjectResizing',
                    //'fontName',
                    //'fontSize',
                    
                    
                    //'increaseFontSize',
                    
                    //'insertBrOnReturn',
                    //'insertBrOnReturnOff',
                    
                ],
                buttonsOptionsList: {
                    edit: {
                        label: 'Edit',
                        items: [
                            'copy',
                            'cut',
                            'paste',
                            'selectAll',
                            'deleteIt'
                        ]
                    },
                    insert: {
                        label: 'Insert',
                        items: [
                            'insertHorizontalRule',
                            'insertHTML',
                            'insertImage',
                            'insertParagraph',
                            'normalize',
                            'removeFormat'
                        ]
                    },
                    formatFont: {
                        label: 'Format Font',
                        items: [
                            'strikeThrough',
                            'styleWithCSS',
                            'subscript',
                            'superscript',
                            'underline',
                            'foreColor',
                            'hiliteColor'
                        ]
                    }
                    
                },
                nextTagRules: {
                    'h1': 'h2',
                    'h2': 'h3',
                    'h3': 'p',
                    'h4': 'p'
                },
                removeTags: [
                    'font', 'style', 'script'
                ]
            }, options);
            
            /*
            
        
            */
            
            return this.each(function() {
                var $this = $(this);
                var data = $this.data('apRichTextEditor');            
                if (!data) {
                    $this.data('apRichTextEditor', {
                        settings: settings
                    });
                }
            }); 
        },
        enable: function(options) {
            
            var paragraphTagNames = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'plaintext', 'pre'];
            var prohibitedParagraphChildNames = ['address', 'article', 'aside',
                'blockquote', 'caption', 'center', 'col', 'colgroup', 'dd', 'details',
                'dir', 'div', 'dl', 'dt', 'fieldset', 'figcaption', 'figure', 'footer',
                'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr', 'li',
                'listing', 'menu', 'nav', 'ol', 'p', 'plaintext', 'pre', 'section',
                'summary', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul',
                'xmp'];
            
            /*
             * enableDesignMode
             */
            return this.each(function() {
                $(this).apRichTextEditor('_init', options);
                var data = $(this).data('apRichTextEditor');
                var src = this;
                var $this = $(this);
                
                var $editorDiv = $('<div/>');
                $editorDiv.addClass('apRichTextEditor');
                
                $editorDiv.data('apRichTextEditor', {
                    src: $this
                });
                
                /*
                $editorDiv.height($this.height());
                $editorDiv.width($this.width());
                */
                
                var $iframe = $('<iframe/>');
                
                $iframe
                    .attr('frameborder', 0)
                    .attr('framemargin', 0)
                    .attr('framepadding', 0)
                    .addClass('apRichTextEditorIframe');
            
                $iframe.height($this.height());
                $iframe.width('100%');
            
                $editorDiv.insertAfter($this);
                $editorDiv.append($iframe);
                
                var $toolbar = $('<ul/>');
                $toolbar.addClass('apRichTextEditorToolbar');
                
                data.editor = $editorDiv;
                data.iframe = $iframe;
                data.toolbar = $toolbar;
                $this.data('apRichTextEditor', data);
                
                if(!$iframe) { 
                    throw new Error('create iframe error)');
                    return false;
                }
                
                var _getDoc = function(iframe){
                    var iframe = $iframe.get(0);
                    if (iframe.contentDocument) return iframe.contentDocument;
                    else if (iframe.contentWindow && iframe.contentWindow.document) return iframe.contentWindow.document;
                    else if (iframe.document) return iframe.document;
                    else return null;                
                }
                
                var _enableApRichTextEditor = function($this) {
                    var data = $this.data('apRichTextEditor');
                    var $iframe = data.iframe;
                    var $editorDiv = data.editor;
                    
                    switch ( src.tagName.toLowerCase() ) {
                        case 'textarea':
                            var content = $this.val();
                            break;
                        
                        default:
                        case 'div':
                            var content = $this.html();
                            break;	
                    }      
                    var css = '<link href="'+ data.settings.css +'" type="text/css" rel="stylesheet"/>';
                    var doc = '<html><head>'+css+'</head><body class="apRichTextEditorBody"></body></html>';
                            
                    iframe = $iframe.get(0);
                    var iframeDoc = _getDoc(iframe);
                    console.log(iframeDoc);
                    try {
                        iframeDoc.open();
                        iframeDoc.write(doc);
                        iframeDoc.close();
                    } catch(error) {
                        throw new Error('create iframe error ('+ error +')');
                    }
                    $(iframe.contentWindow.document).find('.apRichTextEditorBody').html(content);
                    
                    if (typeof(document.selection) != 'undefined') {
                        // ie
                        iframe.contentWindow.document.designMode = "On";
                        iframe.contentWindow.document.contentEditable = true;
                        return _createApRichTextEditor($this);
                    } else if (document.designMode != null) {
                        try {
                            iframeDoc.designMode = "on";
                            //iframeDoc.xhtml = "0";
                            try {
                                iframeDoc.execCommand("useCSS", false, true);
                                iframeDoc.execCommand("insertBrOnReturn", false, false);
                            } 
                            catch(e) {
                                console.log('execCommand'),
                                console.log(e);
                            }
                            return _createApRichTextEditor($this);
                        } catch (error) {
                            throw new Error('designMode ('+ error +')');
                        }
                    }
                };
                
                var _createApRichTextEditor = function($this) {
                    var data = $this.data('apRichTextEditor');
                    var $iframe = data.iframe;
                    var $editorDiv = data.editor;
                    var iframe = $iframe.get(0);
                    var $iframeDoc = $(iframe.contentWindow.document);
                    var currentNode = false;
                    
                    _resizeDoc($iframe);
                    
                    $iframeDoc.bind('mouseup', function(event) {
                        _setSelectedButton(_getCurrentNode(iframe));
                    });

                    $iframeDoc.bind('keydown', function(event) {
                        $this.trigger('apRichTextEditor.keydown', [iframe]);
                        switch ( event.which ) {
                            case 13:
                                currentNode = _getCurrentNode(iframe);
                                if (currentNode.tagName.toLowerCase() == 'div') {
                                    iframe.contentWindow.document.execCommand('formatBlock', false, 'p');
                                }
                                break;
                        }
                    });
                    
                    $iframeDoc.bind('keyup', function(event) {
                        _resizeDoc($iframe);
                        if (currentNode) {
                            currentTagName = currentNode.tagName.toLowerCase();
                        }
                        
                        switch ( event.which ) {
                            case 13:
                                if (currentTagName == 'div') {
                                    iframe.contentWindow.document.execCommand('formatBlock', false, 'p');
                                    currentTagName = _getCurrentNode(iframe).tagName.toLowerCase();
                                } 
                                
                                if (data.settings.nextTagRules[currentTagName]) {
                                    iframe.contentWindow.document.execCommand('formatBlock', false, data.settings.nextTagRules[currentTagName]);
                                }
                                break;
                        }
                        //_cleanUpHtmlPath(iframe);
                        _setSelectedButton(_getCurrentNode(iframe));
                        $this.trigger('apRichTextEditor.keyup', [iframe]);
                    });
                    
                    for (i = 0; i < data.settings.buttonsList.length; i++) {
                        if (data.settings.buttonsList[i] == 'SP') {
                            var $sp = $('<li/>').html('&nbsp;').addClass('apRichTextEditorSp');
                            $toolbar.append($sp);
                            continue;
                        }
                        var item = data.settings.buttons[data.settings.buttonsList[i] ];
                        item.selectedInstance = $iframe.get(0);
                        var $bt = $('<li/>');
                        $bt.data('apRichTextEditorButton', item);
                        $bt.addClass('apRichTextEditorButton')
                            .addClass(item.label + 'Bt')
                            .click( function(event) {
                                var data = $(this).data('apRichTextEditorButton');
                                $this.trigger('apRichTextEditor.execCommand',['before',data]);
                                _formatText(data.selectedInstance, data.action, data.args);
                                $this.trigger('apRichTextEditor.execCommand',['after', data]);
                            }).attr('title', item.label);
                        var $btSpan = $('<span/>').html(item.label);
                        $bt.append($btSpan);
                        $toolbar.append($bt);
                    }
                    
                    $editorDiv.append($toolbar);
                    data.editorBody = $(iframe.contentWindow.document).find('.apRichTextEditorBody');
                    $this.data('apRichTextEditor', data);
                    $this.trigger('apRichTextEditor.ready', [data]);
                };
                
                var _resizeDoc = function($iframe){
                    if (data.settings.autoResize) {
                        var iframe = $iframe.get(0);
                        /* if IE */
                        setTimeout(function(){
                             $iframe.css('height', parseInt($(iframe.contentWindow.document).outerHeight()));
                        }, 10);
                    }
                } 
                
                var _getSelectionRange = function(iframe) {
                    if (iframe.contentWindow && typeof iframe.contentWindow.getSelection == 'function') {
                        try {
                            selection = iframe.contentWindow.getSelection();
                            range = selection.getRangeAt(0);
                        }
                        catch(e){
                            return false;
                        }
                    } else if (iframe.contentWindow.document.selection) {
                        // IE 
                        // alert(iframe.contentWindow.document.selection);
                        selection = iframe.contentWindow.document.selection;
                        range = selection.createRange();
                    } else {
                        return false;
                    }
                    return { selection : selection, range: range };
                };
                
                var _getSelectionString = function(iframe) {
                    var selection, node;
                    if (iframe.contentWindow && typeof iframe.contentWindow.getSelection == 'function') {
                        try {
                            selection = iframe.contentWindow.getSelection().toString();
                        }
                        catch(e){
                            return false;
                        }
                    } else if (iframe.contentWindow.document.selection) {
                        // IE 
                        selection = iframe.contentWindow.document.selection.createRange().text;
                    } else {
                        return false;
                    }
                    return selection;
                };
                
                var _getSelectionElement = function(iframe) {
                    var selection, range, node;
                    if (iframe.contentWindow && typeof iframe.contentWindow.getSelection == 'function') {
                        try {
                            selection = iframe.contentWindow.getSelection();
                            range = selection.getRangeAt(0);
                        }
                        catch(e){
                            return false;
                        }
                        node = range.commonAncestorContainer;
                    } else if (iframe.contentWindow && iframe.contentWindow.document.selection) {
                        // IE 
                        selection = iframe.contentWindow.document.selection;
                        range = selection.createRange();
                        try {
                            node = range.parentElement();
                        }
                        catch (e) {
                            return false;
                        }
                    } else {
                        return false;
                    }
                    //console.log(selection);
                    //console.log(range);
                    return node;
                };
                
                /*
                
                    1	ELEMENT_NODE
                    2	ATTRIBUTE_NODE
                    3	TEXT_NODE
                    4	CDATA_SECTION_NODE
                    5	ENTITY_REFERENCE_NODE
                    6	ENTITY_NODE
                    7	PROCESSING_INSTRUCTION_NODE
                    8	COMMENT_NODE
                    9	DOCUMENT_NODE
                    10	DOCUMENT_TYPE_NODE
                    11	DOCUMENT_FRAGMENT_NODE
                    12`	NOTATION_NODE
                
                */
                
                var _setSelectionElement = function(iframe, element) {
                    var selection, range, node;
                    if (iframe.contentWindow && typeof iframe.contentWindow.getSelection == 'function') {
                        try {
                            selection = iframe.contentWindow.getSelection();
                            selection.removeAllRanges();
                            range = iframe.contentWindow.document.createRange();
                            range.selectNodeContents(element);
                            selection.addRange(range);
                        }
                        catch(e){
                            return false;
                        }
                        
                    } else if (iframe.contentWindow.document.selection) {
                        // IE 
                        selection = iframe.contentWindow.document.selection;
                        range = iframe.contentWindow.document.body.createTextRange();
                        range.moveToElementText(element);
                        range.select();
                        
                    } else {
                        return false;
                    }
                    return true;
                }
                
                var _setExpandSelectionElement = function(iframe, element) {
                    var selection, range, node;
                    if (iframe.contentWindow && typeof iframe.contentWindow.getSelection == 'function') {
                        try {
                            selection = iframe.contentWindow.getSelection();
                            selection.removeAllRanges();
                            range = iframe.contentWindow.document.createRange();
                            range.selectNode(element);
                        }
                        catch(e){
                            return false;
                        }
                        
                    } else if (iframe.contentWindow.document.selection) {
                        // IE 
                        
                    } else {
                        return false;
                    }
                    return true;
                }
                
                var _getHtmlPath = function(iframe) {
                    var path = [];
                    var node = _getSelectionElement(iframe);
                    while (node.nodeType != 1 || node.tagName.toLowerCase() != 'body') {
                        node = $(node).parent().get(0);
                        if (node.nodeType == 1) {
                            path.unshift(node);
                        }
                    }
                    return path;
                 }
                 
                 var _getCurrentNode = function(iframe){
                    var node = _getSelectionElement(iframe);
                    while (node.nodeType == 3){
                        node = $(node).parent().get(0);
                    }
                    return node;
                 }
                 
                 var _cleanUpHtmlPath = function(iframe) {
                    var path = _getHtmlPath(iframe);
                    /*
                    var isParagraph = false;
                    for ( i = 0; i < path.length; i++ ) {
                        
                        if (isParagraph) {
                            for ( j = 0; j < prohibitedParagraphChildNames.length; j++ ) {
                                if (prohibitedParagraphChildNames[j] == path[i].tagName.toLowerCase()) {
                                    console.log(path[i].tagName);
                                    //_setSelectionElement( iframe, _getSelectionElement(iframe) );
                                    iframe.contentWindow.document.execCommand('formatBlock', false, 'div');
                                }
                            }
                        }
                        
                        for ( j = 0; j < paragraphTagNames.length; j++ ) {
                        	if (paragraphTagNames[j] == path[i].tagName.toLowerCase()) {
                        	    isParagraph = true;
                        	}
                        }
                        
                        
                    
                        console.log(path[i].tagName);
                    }
                    */
                            
                }
                
                var tmp_cleanUpText = function(iframe){
                    node = _getCurrentNode(iframe);
                    var text = $(node).text();
                    $(node).contents()
                        .filter(function() {
                            return this.nodeType == 3;
                        })
                        .wrap('<p></p>').end()
                        .filter('br').remove();
                    iframe.contentWindow.focus();
                }
                
                var _cleanWhitespace = function (node){
                  for (var i=0; i< node.childNodes.length; i++)
                  {
                    var child = node.childNodes[i];
                    if(child.nodeType == 3 && !/\S/.test(child.nodeValue))
                    {
                      node.removeChild(child);
                      i--;
                    }
                    if(child.nodeType == 1)
                    {
                      _cleanWhitespace(child);
                    }
                  }
                  return node;
                }
                
                var _formatText = function(iframe, command, args) {
                    iframe.contentWindow.focus();
                    if($.trim(_getSelectionString(iframe)).length == 0) {
                        _setSelectionElement( iframe, _getSelectionElement(iframe) );
                    }
                    currentNode = _getCurrentNode(iframe);
                    var currentNodeTagName = currentNode.tagName.toLowerCase();
                    switch ( command ) {
                    	case 'normalize':
                    		    iframe.contentWindow.document.body.normalize();
                    		    _cleanWhitespace(iframe.contentWindow.document.body);
                    		break;
                    		
                    	case 'insertOrderedList':
                    	case 'insertUnorderedList':
                                if (
                                    currentNodeTagName == 'ul' ||
                                    currentNodeTagName == 'ol'
                                ) {
                                    return;
                                }
                                
                                if (
                                    currentNodeTagName != 'p' &&
                                    currentNodeTagName != 'div' &&
                                    currentNodeTagName != 'li'
                                ) {
                                    iframe.contentWindow.document.execCommand('formatBlock', false, 'p');
                                }
                                iframe.contentWindow.document.execCommand(command, false, args);
                    		break;
                    		
                    	case 'heading':
                                currentNode = _resetList(iframe, currentNode);
                                currentNodeTagName = currentNode.tagName.toLowerCase();
                                if (
                                    currentNodeTagName == 'p' ||
                                    currentNodeTagName == 'div' ||
                                    currentNodeTagName == 'h1' ||
                                    currentNodeTagName == 'h2' ||
                                    currentNodeTagName == 'h3' ||
                                    currentNodeTagName == 'h4' ||
                                    currentNodeTagName == 'h5' ||
                                    currentNodeTagName == 'h6'
                                ) {
                                    try {
                                        iframe.contentWindow.document.execCommand('formatBlock', false, args);
                                    } 
                                    catch(e) {
                                        console.log('execCommand'),
                                        console.log(e);
                                    }
                                }
                    		break;
                    		
                    	case 'formatBlock':
                    	        currentNode = _resetList(iframe, currentNode);
                    	        currentNodeTagName = currentNode.tagName.toLowerCase();
                                iframe.contentWindow.document.execCommand(command, false, args);
                                try {
                                    iframe.contentWindow.document.execCommand(command, false, args);
                                } 
                                catch(e) {
                                    console.log('execCommand'),
                                    console.log(e);
                                }
                    		break;
                    	
                    	
                    	default:
                    		try {
                                iframe.contentWindow.document.execCommand(command, false, args);
                            } 
                            catch(e) {
                                console.log('execCommand'),
                                console.log(e);
                            }
                    }
                    //_cleanWhitespace(iframe.contentWindow.document.body);
                    _setSelectedButton(_getCurrentNode(iframe));
                    _resizeDoc($iframe);
                    //iframe.contentWindow.document.body.normalize();
                };
                
                var _resetList = function (iframe, currentNode) {
                    var currentNodeTagName = currentNode.tagName.toLowerCase();
                	while (currentNodeTagName == 'li') {
                        var parentTag = $(currentNode).parent().get(0);
                        switch ( parentTag.tagName.toLowerCase() ) {
                            case 'ul':
                                var listCommand = 'insertUnorderedList';
                                break;
                            case 'ol':
                                var listCommand = 'insertOrderedList';
                                break;
                            default:
                                return currentNode;
                        }
                        try {
                            iframe.contentWindow.document.execCommand(listCommand, false, false);
                        } 
                        catch(e) {
                            console.log('execCommand'),
                            console.log(e);
                        }
                        currentNode = _getCurrentNode(iframe);
                        currentNodeTagName = currentNode.tagName.toLowerCase();
                    }
                    return currentNode;
                }
                
                var _resetInline = function (iframe, currentNode) {
                    var currentNodeTagName = currentNode.tagName.toLowerCase();
                	while (currentNodeTagName == 'b' || currentNodeTagName == 'i' ) {
                        switch ( currentNodeTagName ) {
                            case 'b':
                                var listCommand = 'bold';
                                break;
                            case 'i':
                                var listCommand = 'italic';
                                break;
                        }
                        try {
                            iframe.contentWindow.document.execCommand(listCommand, false, false);
                        } 
                        catch(e) {
                            console.log('execCommand'),
                            console.log(e);
                        }
                        currentNode = _getCurrentNode(iframe);
                        currentNodeTagName = currentNode.tagName.toLowerCase();
                    }
                    return currentNode;
                }
                
                var _setSelectedButton = function (currentNode) {
                    $toolbar.children('li').removeClass('selected');
                    switch ( currentNode.tagName.toLowerCase() ) {
                    	case 'b':
                    		$toolbar.children('.boldBt').addClass('selected');
                    		break;
                    	case 'i':
                    		$toolbar.children('.italicBt').addClass('selected');
                    		break;
                    	case 'p':
                    		$toolbar.children('.paragraphBt').addClass('selected');
                    		break;
                    		break;
                    	case 'h1':
                    		$toolbar.children('.H1Bt').addClass('selected');
                    		break;
                    	case 'h2':
                    		$toolbar.children('.H2Bt').addClass('selected');
                    		break;
                    	case 'h3':
                    		$toolbar.children('.H3Bt').addClass('selected');
                    		break;
                    	case 'h4':
                    		$toolbar.children('.H4Bt').addClass('selected');
                    		break;
                    	case 'blockcote':
                    		
                    		break;
                    	case 'li':
                    	    var parentTag = $(currentNode).parent().get(0);
                            switch ( parentTag.tagName.toLowerCase() ) {
                                case 'ul':
                                    // 'insertUnorderedList';
                                    $toolbar.children('.insertUnorderedListBt').addClass('selected');
                                    break;
                                case 'ol':
                                    // 'insertOrderedList';
                                    $toolbar.children('.insertOrderedListBt').addClass('selected');
                                    break;
                                default:
                                    return;
                            }
                    		break;
                    	default:
                    	    return false;
                    }
                }
                // _enableApRichTextEditor($this);
                setTimeout(function(){ _enableApRichTextEditor($this) }, 500);
                
            });
        },
        disable: function(options) {
            return this.each(function() {
                $(this).apRichTextEditor('_init', options);
                var data = $(this).data('apRichTextEditor');
                if(!data) return;
                
                var $this = $(this);
                var $iframe = data.iframe;
                
                switch ( $this.tagName ) {
                	case 'textarea':
                		$this.val($iframe.html());
                		break;
                	
                	default:
                	case 'div':
                		$this.html($iframe.html());
                		break;	
                }
                data.iframe.remove();
            }); 
        },
        normalize: function(options) {
            return this.each(function() {
                var data = $(this).data('apRichTextEditor');
                if(!data) return;
                var $this = $(this);
                var $iframe = data.iframe;
                var iframe = $iframe.get(0);
                iframe.contentWindow.document.body.normalize();
            });
        }
    }   
    
    
    jQuery.fn.apRichTextEditor = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.enable.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.apRichTextEditor');
        }
    };
    
    jQuery.fn.richTextEditor = jQuery.fn.apRichTextEditor;

})(jQuery);

