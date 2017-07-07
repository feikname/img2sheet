/*
#
# i2mx_page_manager.js - v0.1-Alpha
# Apache v2 License
#
*/

window.i2mx.PageManager = new (function() {
    this.pages = [];
    this.activePages = 0;

    this.event = {};

    this.event.addNewPage = function() {
        let newPage = {}
        newPage.assignedImage = null;

        i2mx.PageManager.pages.push(newPage);
        i2mx.PageManager.activePages++;

        i2mx.PageManager.render();
    }

    this.createPageHTML = function(id, ord) {
        // Create "Remove page" button
        let pageDeleteBtn = document.createElement("input");
        pageDeleteBtn.type = "submit";
        pageDeleteBtn.classList.add("i2mx-page_mngr-remove-item-btn");
        pageDeleteBtn.classList.add("button-as-text");
        pageDeleteBtn.value = "Remove page";
        pageDeleteBtn.setAttribute("data-page-id", id);

        return ord + " - (id="+id+") Nothing to do here for now! ("+pageDeleteBtn.outerHTML+")<br>"
    }

    this.event.deletePage = function(clickedButton) {
        let id = parseInt(clickedButton.target.getAttribute("data-page-id"));

        i2mx.PageManager.pages[id] = null;
        i2mx.PageManager.activePages--;

        i2mx.PageManager.render();
    }

    this.render = function() {
        let pageCount = i2mx.Elements.pageCount();

        pageCount.innerHTML = i2mx.PageManager.activePages;

        if(i2mx.PageManager.activePages == 0) {
            i2mx.Elements.pageList().innerHTML = "Oops! There are no pages here yet.";
            return;
        }

        let newHTML = "";
        let ord = 0;
        for(var id=0; id<i2mx.PageManager.pages.length; id++) {
            if(i2mx.PageManager.pages[id] !== null) {
                newHTML += this.createPageHTML(id, ++ord);
            }
        }

        i2mx.Elements.pageList().innerHTML = newHTML;

        let btns;
        btns = document.getElementsByClassName("i2mx-page_mngr-remove-item-btn");
        for(var i=0; i<btns.length; i++) {
            btns[i].addEventListener("click", this.event.deletePage)
        }

    }

    this.load = function() {
        i2mx.Elements.addNewPageBtn().addEventListener("click", this.event.addNewPage)
    };
});
