var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataSource } from '../../lib/data-source/data-source';
var PagerComponent = (function () {
    function PagerComponent() {
        this.perPageSelect = [];
        this.changePage = new EventEmitter();
        this.count = 0;
    }
    PagerComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.source) {
            if (!changes.source.firstChange) {
                this.dataChangedSub.unsubscribe();
            }
            this.dataChangedSub = this.source.onChanged().subscribe(function (dataChanges) {
                _this.page = _this.source.getPaging().page;
                _this.perPage = _this.source.getPaging().perPage;
                _this.currentPerPage = _this.perPage;
                _this.count = _this.source.count();
                if (_this.isPageOutOfBounce()) {
                    _this.source.setPage(--_this.page);
                }
                _this.processPageChange(dataChanges);
                _this.initPages();
            });
        }
    };
    /**
     * We change the page here depending on the action performed against data source
     * if a new element was added to the end of the table - then change the page to the last
     * if a new element was added to the beginning of the table - then to the first page
     * @param changes
     */
    PagerComponent.prototype.processPageChange = function (changes) {
        if (changes['action'] === 'prepend') {
            this.source.setPage(1);
        }
        if (changes['action'] === 'append') {
            this.source.setPage(this.getLast());
        }
    };
    PagerComponent.prototype.shouldShow = function () {
        return this.source.count() > this.perPage;
    };
    PagerComponent.prototype.paginate = function (page) {
        this.source.setPage(page);
        this.page = page;
        this.changePage.emit({ page: page });
        return false;
    };
    PagerComponent.prototype.next = function () {
        return this.paginate(this.getPage() + 1);
    };
    PagerComponent.prototype.prev = function () {
        return this.paginate(this.getPage() - 1);
    };
    PagerComponent.prototype.getPage = function () {
        return this.page;
    };
    PagerComponent.prototype.getPages = function () {
        return this.pages;
    };
    PagerComponent.prototype.getLast = function () {
        return Math.ceil(this.count / this.perPage);
    };
    PagerComponent.prototype.getPageStart = function () {
        return (this.page - 1) * this.perPage + 1;
    };
    PagerComponent.prototype.getPageEnd = function () {
        if (this.page * this.perPage >= this.count) {
            return this.count;
        }
        return this.page * this.perPage;
    };
    PagerComponent.prototype.isPageOutOfBounce = function () {
        return (this.page * this.perPage) >= (this.count + this.perPage) && this.page > 1;
    };
    PagerComponent.prototype.initPages = function () {
        var pagesCount = this.getLast();
        var showPagesCount = 1;
        showPagesCount = pagesCount < showPagesCount ? pagesCount : showPagesCount;
        this.pages = [];
        if (this.shouldShow()) {
            var middleOne = Math.ceil(showPagesCount / 2);
            middleOne = this.page >= middleOne ? this.page : middleOne;
            var lastOne = middleOne + Math.floor(showPagesCount / 2);
            lastOne = lastOne >= pagesCount ? pagesCount : lastOne;
            var firstOne = lastOne - showPagesCount + 1;
            for (var i = firstOne; i <= lastOne; i++) {
                this.pages.push(i);
            }
        }
    };
    PagerComponent.prototype.onChangePerPage = function (event) {
        if (this.currentPerPage) {
            if (typeof this.currentPerPage === 'string' && this.currentPerPage.toLowerCase() === 'all') {
                this.source.getPaging().perPage = null;
            }
            else {
                this.source.getPaging().perPage = this.currentPerPage * 1;
                this.source.refresh();
            }
            this.initPages();
        }
    };
    return PagerComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", DataSource)
], PagerComponent.prototype, "source", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], PagerComponent.prototype, "perPageSelect", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PagerComponent.prototype, "changePage", void 0);
PagerComponent = __decorate([
    Component({
        selector: 'ng2-smart-table-pager',
        styles: [".overview{float:right;display:table;height:30px;width:auto;font-size:.875em}.overview .counter{display:table-cell;vertical-align:middle}.ng2-smart-pagination{display:inline-flex;font-size:.875em;padding:0}.ng2-smart-pagination .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}.ng2-smart-pagination .ng2-smart-page-item{display:inline}.ng2-smart-pagination .page-link-next,.ng2-smart-pagination .page-link-prev{font-size:10px}:host{display:flex;justify-content:space-between}:host select{margin:1rem 0 1rem 1rem}:host label{margin:1rem 0 1rem 1rem;line-height:2.5rem} /*# sourceMappingURL=pager.component.css.map */ "],
        template: "\n    <nav *ngIf=\"shouldShow()\" class=\"ng2-smart-pagination-nav\">\n      <ul class=\"ng2-smart-pagination pagination\">\n        <li class=\"ng2-smart-page-item page-item\" [ngClass]=\"{disabled: getPage() == 1}\">\n          <a class=\"ng2-smart-page-link page-link page-link-prev\" href=\"#\"\n             (click)=\"getPage() == 1 ? false : prev()\" aria-label=\"Prev\">\n            <span aria-hidden=\"true\">&lt;</span>\n            <span class=\"sr-only\">Prev</span>\n          </a>\n        </li>\n        <li class=\"ng2-smart-page-item page-item\"\n            [ngClass]=\"{disabled: getPage() == getLast()}\">\n          <a class=\"ng2-smart-page-link page-link page-link-next\" href=\"#\"\n             (click)=\"getPage() == getLast() ? false : next()\" aria-label=\"Next\">\n            <span aria-hidden=\"true\">&gt;</span>\n            <span class=\"sr-only\">Next</span>\n          </a>\n        </li>\n      </ul>\n      <div class=\"overview\">\n        <div class=\"counter\">\n        &emsp;\n        <span>{{ getPageStart() }}</span> &nbsp;-&nbsp;\n        <span>{{ getPageEnd() }}</span> &nbsp;of&nbsp;\n        <span>{{ count }}</span>\n       </div>\n      </div>\n    </nav>\n    \n    <nav *ngIf=\"perPageSelect && perPageSelect.length > 0\" class=\"ng2-smart-pagination-per-page\">\n      <label for=\"per-page\">\n        Per Page:\n      </label>\n      <select (change)=\"onChangePerPage($event)\" [(ngModel)]=\"currentPerPage\" id=\"per-page\">\n        <option *ngFor=\"let item of perPageSelect\" [value]=\"item\">{{ item }}</option>\n      </select>\n    </nav>\n  ",
    })
], PagerComponent);
export { PagerComponent };
//# sourceMappingURL=pager.component.js.map