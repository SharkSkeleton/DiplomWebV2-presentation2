import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ContentNode} from './contentNode';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

const TREE_DATA = [
  new ContentNode('Home page', [
    new ContentNode('Header description'),
    new ContentNode('Content description'),
    new ContentNode('Footer description')
  ]),
  new ContentNode('Chats page', [
    new ContentNode('Chats list description'),
    new ContentNode('Chats content')
  ]),
  new ContentNode('Dashboard page', [
    new ContentNode('TODO'),
    new ContentNode('In Progress'),
    new ContentNode('On Checking'),
    new ContentNode('Done')
  ]),
  new ContentNode('Work space page', [
    new ContentNode('Class Tree about'),
    new ContentNode('Editor about'),
    new ContentNode('Editor menu about')
  ]),
  new ContentNode('Burger menu', [
    new ContentNode('Docs', [
      new ContentNode('Tree about'),
      new ContentNode('Content about')
    ]),
    new ContentNode('Checks', [
      new ContentNode('Check list about'),
      new ContentNode('Element content about')
    ]),
    new ContentNode('Account', [
      new ContentNode('Fields about'),
      new ContentNode('Changing & Saving data')
    ]),
    new ContentNode('Settings', [
      new ContentNode('Choose project about'),
      new ContentNode('Create project about'),
      new ContentNode('Create tasks about')
    ]),
  ])
];

@Component({
  selector: 'app-contents-tree',
  templateUrl: './contents-tree.component.html',
  styleUrls: ['./contents-tree.component.css']
})
export class ContentsTreeComponent implements OnInit {

  @Output() onDatePicked: EventEmitter<any> = new EventEmitter<any>();
  openAll = false;
  levels = new Map<ContentNode, number>();
  treeControl: FlatTreeControl<ContentNode>;
  treeFlattener: MatTreeFlattener<ContentNode, ContentNode>;
  dataSource: MatTreeFlatDataSource<ContentNode, ContentNode>;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);

    this.treeControl = new FlatTreeControl<ContentNode>(this.getLevel, this.isExpandable);

    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    this.dataSource.data = TREE_DATA;
  }

  getLevel = (node: ContentNode): number => {
    return this.levels.get(node) || 0;
  }

  isExpandable = (node: ContentNode): boolean => {
    return node.children.value.length > 0;
  }

  getChildren = (node: ContentNode) => {
    return node.children;
  }

  transformer = (node: ContentNode, level: number) => {
    this.levels.set(node, level);
    return node;
  }

  hasChildren = (index: number, node: ContentNode): boolean => {
    return node.children.value.length > 0;
  }

  isOdd = (node: ContentNode) => {
    return this.getLevel(node) % 2 === 1;
  }

  ngOnInit(): void {
  }

  chosenNode(nodeName: string) {
    // alert(nodeName);
    this.onDatePicked.emit(nodeName);
  }

}
