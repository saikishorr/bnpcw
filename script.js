<input type="text" id="searchInput" placeholder="Search the homepage..." onkeyup="searchHomepage()" style="padding: 8px; width: 300px;" />
<p id="searchStatus"></p>
    



function removeHighlights() {
    const highlights = document.querySelectorAll('.highlight');
    highlights.forEach(span => {
        const parent = span.parentNode;
        parent.replaceChild(document.createTextNode(span.textContent), span);
        parent.normalize(); // merge adjacent text nodes
    });
}

function highlightText(text) {
    const body = document.body;
    const regex = new RegExp(`(${text})`, 'gi');

    let found = false;
    const treeWalker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT, {
        acceptNode: function(node) {
            return node.parentNode && node.parentNode.nodeName !== "SCRIPT" && node.nodeValue.toLowerCase().includes(text.toLowerCase())
                ? NodeFilter.FILTER_ACCEPT
                : NodeFilter.FILTER_REJECT;
        }
    });

    while (treeWalker.nextNode()) {
        const node = treeWalker.currentNode;
        const span = document.createElement("span");
        span.className = "highlight";
        span.style.backgroundColor = "yellow";
        span.style.fontWeight = "bold";

        const parts = node.nodeValue.split(regex);
        if (parts.length > 1) {
            found = true;
            const fragment = document.createDocumentFragment();
            parts.forEach(part => {
                if (part.toLowerCase() === text.toLowerCase()) {
                    const match = span.cloneNode();
                    match.textContent = part;
                    fragment.appendChild(match);
                } else {
                    fragment.appendChild(document.createTextNode(part));
                }
            });

            const parent = node.parentNode;
            parent.replaceChild(fragment, node);
        }
    }

    return found;
}

function scrollToHighlight() {
    const el = document.querySelector('.highlight');
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
}

function searchHomepage() {
    removeHighlights();

    const input = document.getElementById("searchInput").value.trim();
    const status = document.getElementById("searchStatus");

    if (input.length < 2) {
        status.innerText = '';
        return;
    }

    const found = highlightText(input);

    if (found) {
        status.innerText = `Found "${input}"`;
        status.style.color = "green";
        scrollToHighlight();
    } else {
        status.innerText = `No results found for "${input}"`;
        status.style.color = "red";
    }
}


