"use strict";(self.webpackChunkcatalog_app=self.webpackChunkcatalog_app||[]).push([[47],{5047:(l,s,r)=>{r.r(s),r.d(s,{FavoriteComponent:()=>n});var p=r(6895),d=r(9626),e=r(2722),_=r(1826),i=r(6130),t=r(4650),u=r(1559);function m(a,o){1&a&&t._UZ(0,"app-product-card",2),2&a&&t.Q6J("product",o.$implicit)}class n extends _.s{constructor(o){super(),this._bd=o,this._products=[]}get products(){return this._products}ngOnInit(){this._bd.getFavorite().pipe((0,e.R)(this.destroy$)).subscribe(o=>{this._products=o})}}n.\u0275fac=function(o){return new(o||n)(t.Y36(u.G))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-favorite"]],standalone:!0,features:[t.qOj,t.jDz],decls:5,vars:1,consts:[[1,"cards"],["class","card",3,"product",4,"ngFor","ngForOf"],[1,"card",3,"product"]],template:function(o,c){1&o&&(t.TgZ(0,"h1")(1,"b"),t._uU(2,"Favorite products"),t.qZA()(),t.TgZ(3,"div",0),t.YNc(4,m,1,1,"app-product-card",1),t.qZA()),2&o&&(t.xp6(4),t.Q6J("ngForOf",c.products))},dependencies:[p.ez,p.sg,d.Bz,i.Y],styles:["@media (min-width: 790px){.cards[_ngcontent-%COMP%]{display:grid;gap:30px;grid-template-columns:1fr 1fr}}@media (min-width: 1200px){.cards[_ngcontent-%COMP%]{grid-template-columns:1fr 1fr 1fr}}.card[_ngcontent-%COMP%]{display:block;margin-bottom:20px}@media (min-width: 790px){.card[_ngcontent-%COMP%]{margin:0}}"]})}}]);