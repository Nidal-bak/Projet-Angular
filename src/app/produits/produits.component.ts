import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  private produits: Object[] = [{'nom': 'produit1','qte':10}, {'nom': 'produit2', 'qte':0}];

  constructor() { }

  ngOnInit() {
  }

}
