import {BehaviorSubject} from 'rxjs';

export class ContentNode {
  children: BehaviorSubject<ContentNode[]>;
  constructor(public item: string, children?: ContentNode[]) {
    this.children = new BehaviorSubject(children === undefined ? [] : children);
  }
}
