import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ContentNode} from './contentNode';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

const TREE_DATA = [
  new ContentNode('Chapter 1', [
    new ContentNode('Sub_Chapter 1'),
    new ContentNode('Sub_Chapter 2'),
    new ContentNode('Sub_Chapter 3')
  ]),
  new ContentNode('Chapter 2', [
    new ContentNode('Sub_Chapter 1', [
      new ContentNode('Sub_Sub_Chapter 1'),
      new ContentNode('Sub_Sub_Chapter 2'),
      new ContentNode('Sub_Sub_Content 3')
    ]),
    new ContentNode('Sub_Chapter 2', [
      new ContentNode('Sub_Sub_Chapter 1'),
      new ContentNode('Sub_Sub_Chapter 2'),
      new ContentNode('Sub_Sub_Content 3')
    ]),
    new ContentNode('Sub_Chapter 3', [
      new ContentNode('Sub_Sub_Chapter 1'),
      new ContentNode('Sub_Sub_Chapter 2'),
      new ContentNode('Sub_Sub_Content 3')
    ]),
  ])
];

@Component({
  selector: 'app-contents-tree',
  templateUrl: './contents-tree.component.html',
  styleUrls: ['./contents-tree.component.css']
})
export class ContentsTreeComponent implements OnInit {

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

}
