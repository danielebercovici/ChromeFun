var ELEMENT = 1;
var DOCUMENT = 9;
var DOCUMENT_FRAGMENT = 11;
var TEXT = 3;

// Enter things that you'd like to replace
var MATCH = ['trump'];
var REPLACE = ['Dumbass'];

walk(document.body);

function walk(node) {
    // Function from here for replacing text: http://is.gd/mwZp7E
    
    var child, next;

    switch (node.nodeType) {
        case ELEMENT:  // Element
        case DOCUMENT:  // Document
        case DOCUMENT_FRAGMENT: // Document fragment
            child = node.firstChild;
            while (child) {
                next = child.nextSibling;
                walk(child);
                child = next;
            }
            break;

        case TEXT: // Text node
            replaceText(node);
            break;
    }
}

function replaceText(textNode) {
    var v = textNode.nodeValue;
    v = v.replace(new RegExp('\\b' + MATCH[0] + '\\b', 'g'), REPLACE[0]);
    textNode.nodeValue = v;
}