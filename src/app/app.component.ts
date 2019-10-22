import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';

interface NavNode {
  name: string;
  children?: NavNode[];
  route?: string;
}

const TREE_DATA: NavNode[] = [
  {
    name: 'Register',
    children: [
      { name: 'Register Terminal', route: '/register/terminal' },
      { name: 'Transactions', route: '/register/transactions' }
    ]
  },
  {
    name: 'Settings',
    children: [
      {
        name: 'Item Settings',
        children: [
          { name: 'Category Settings', route: '/settings/item/categories' },
          { name: 'Option Settings', route: '/settings/item/options' },
          { name: 'Tax Settings', route: '/settings/item/taxes' },
          { name: 'Component Settings', route: '/settings/item/components' },
          { name: 'Modifier Settings', route: '/settings/item/modifiers' },
          { name: 'Type Settings', route: '/settings/item/types' },
          { name: 'Subtype Settings', route: '/settings/item/subtypes' },
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
  module;

  treeControl = new NestedTreeControl<NavNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<NavNode>();

  constructor(private router: Router) {
    this.dataSource.data = TREE_DATA;
  }

  setModule(mod) {
    this.module = mod;
  }

  hasChild = (_: number, node: NavNode) => !!node.children && node.children.length > 0;
}
