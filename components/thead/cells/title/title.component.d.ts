import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DataSource } from '../../../../lib/data-source/data-source';
import { Column } from '../../../../lib/data-set/column';
export declare class TitleComponent implements OnChanges {
    currentDirection: string;
    column: Column;
    source: DataSource;
    sort: EventEmitter<any>;
    protected dataChangedSub: Subscription;
    ngOnChanges(changes: SimpleChanges): void;
    _sort(event: any): void;
    changeSortDirection(): string;
    setSortDirection(direction: string): void;
}
