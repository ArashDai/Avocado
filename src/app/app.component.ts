import {NestedTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';

interface NavNode {
  name: string;
  children?: NavNode[];
  route?: string;
}

const TREE_DATA: NavNode[] = [
 {
    name: 'Settings',
    children: [
      {
        name: 'Item Settings',
        children: [
          {name: 'Category Settings', route:'/settings/item/categories'},
          {name: 'Option Settings', route:'/settings/item/options'},
          {name: 'Tax Settings', route:'/settings/item/taxes'},
          {name: 'Component Settings', route:'/settings/item/components'},
          {name: 'Modifier Settings', route:'/settings/item/modifiers'},
          {name: 'Type Settings', route:'/settings/item/types'},
          {name: 'Subtype Settings', route:'/settings/item/subtypes'},
        ]
      }
    ]
  },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Avocado';

  treeControl = new NestedTreeControl<NavNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<NavNode>();

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: NavNode) => !!node.children && node.children.length > 0;
}
