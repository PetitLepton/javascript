document.addEventListener('DOMContentLoaded', function(event) {
    const TOC = document.getElementById('toc');
    // Move the parent level to 2 if <h1> is used for the title
    const headings = Array.from(document.querySelectorAll('h2, h3, h4, h5, h6'));

    let parentLevel = 2;
    let cursorNode = TOC;

    if (headings.length) {
        headings.forEach(
            function(currentHeading) {
                const newLevel = parseInt(currentHeading.tagName.substr(1, 1));
                let diff = newLevel - parentLevel;

                // If the heading level is deeper than the parent, create a new
                // <ul> and put the cursorNode at this <ul> node
                if (diff > 0) {
                    const containerLiNode = cursorNode.lastChild;
                    const ulNode = document.createElement('UL')
                    containerLiNode.appendChild(ulNode);
                    cursorNode = ulNode;
                    parentLevel = newLevel;
                }

                // If the level is higher than the parent, move the cursorNode
                // up the <ul> ladder until both levels are the same
                if (diff < 0) {
                    while (0 !== diff) {
                        diff = diff + 1;
                        // The first parentNode moves to the <li> parent, the
                        // second to the <ul> parent
                        cursorNode = cursorNode.parentNode.parentNode;
                    }
                    parentLevel = newLevel;
                }

                // If the heading level is the same, create a new item
                let liNode = document.createElement('LI');
                const text = currentHeading.firstChild.wholeText;
                if (currentHeading.hasAttribute('id')) {
                    let link = document.createElement('A');
                    link.setAttribute('href', '#' + currentHeading.getAttribute('id'));
                    link.appendChild(document.createTextNode(text))
                    liNode.appendChild(link);
                } else {
                    liNode.appendChild(document.createTextNode(text));
                }
                cursorNode.appendChild(liNode);
            }
        );
    } else {
        document.getElementById('toc-title').style.display = 'none'
    };
});
