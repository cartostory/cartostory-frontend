(function(t){function e(e){for(var r,i,s=e[0],c=e[1],l=e[2],d=0,f=[];d<s.length;d++)i=s[d],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&f.push(a[i][0]),a[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);u&&u(e);while(f.length)f.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],r=!0,s=1;s<n.length;s++){var c=n[s];0!==a[c]&&(r=!1)}r&&(o.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},a={app:0},o=[];function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var l=0;l<s.length;l++)e(s[l]);var u=c;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"116c":function(t,e,n){"use strict";var r=n("9e12"),a=n.n(r);a.a},1347:function(t,e,n){},"33f4":function(t,e,n){},"541e":function(t,e,n){"use strict";var r=n("9ef9"),a=n.n(r);a.a},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("289d"),a=n("a026"),o=n("2f62"),i=n("85ff"),s=n.n(i),c=n("f13c"),l=n.n(c),u=(n("f5df"),n("a41b"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"section",attrs:{id:"js-app"}},[n("router-view"),n("cs-notification"),n("b-loading",{attrs:{"is-full-page":!0,active:t.loading},on:{"update:active":function(e){t.loading=e}}})],1)}),d=[],f=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div")},h=[],b=(n("ac6a"),"REMOVE_ERROR"),p="UPDATE_BOUNDING_BOX_CALLBACK",m="UPDATE_ERRORS",y="UPDATE_EDITABLE",g="UPDATE_FEATURE_MARK_CALLBACK",v="UPDATE_HIGHLIGHTED_BBOX",O="UPDATE_HIGHLIGHTED_LAT_LNG",k="UPDATE_LOADING",_="UPDATE_MAP_CENTER",j="UPDATE_STORY",C="UPDATE_STORY_NAME",x="UPDATE_STORY_TEXT",w="UPDATE_STORY_URL",E="UPDATE_TRACK",M={name:"CsNotification",computed:{errors:function(){var t=this;return this.$store.state.errors.forEach((function(e){t.$buefy.snackbar.open({indefinite:!0,position:"is-top-right",type:"is-danger",message:"<strong>".concat(e.title,"</strong><br/><p>").concat(e.message,"</p>"),onAction:function(){t.$store.commit(b,e)}}),t.$store.commit(b,e)})),this.$store.state.errors}},watch:{errors:function(){return this.errors}}},A=M,S=n("2877"),D=Object(S["a"])(A,f,h,!1,null,null,null),$=D.exports,N={name:"app",components:{CsNotification:$},computed:{loading:function(){return this.$store.state.loading}}},T=N,B=Object(S["a"])(T,u,d,!1,null,null,null),P=B.exports,R=n("8c4f"),U=(n("96cf"),n("3b8d")),F=n("bd86"),I=(n("c5f6"),n("5df2"),n("75fc")),z=(n("20d6"),n("bc3a")),V=n.n(z),H=n("89c7"),J=n.n(H),G=n("c2d0"),K=n("7e8c"),q=(n("28a5"),"data-cs-bbox"),X=at(q),W="data-cs-lat",Y="data-cs-lng",Z=at(W),Q=at(Y),tt="mark-click",et="add-bounding-box",nt="add-feature-mark",rt="track-file-upload";function at(t){return t.split("-").map((function(t,e){return e>0?t.slice(0,1).toUpperCase()+t.slice(1):t})).join("")}var ot,it=function(t){return t[t.length-1]},st=function(t){return function(e,n){e[t]=n}},ct=function(t){return function(e,n){var r=t.slice(0,-1).reduce((function(e,n,r){return n in e||(e[n]="number"===typeof t[r+1]?[]:{}),e[n]}),e);r[it(t)]=n}};a["a"].use(o["a"]);var lt={editable:!1,errors:[],loading:!1,storyUrl:void 0,story:{name:void 0,text:void 0,track:void 0},addBoundingBoxCallback:void 0,addFeatureMarkCallback:void 0,availableStories:[],highlightedBbox:void 0,highlightedLatLng:void 0},ut=(ot={},Object(F["a"])(ot,b,(function(t,e){var n=t.errors.findIndex((function(t){return t.title===e.title&&t.message===e.message}));n>-1&&t.errors.splice(n,1)})),Object(F["a"])(ot,p,st("addBoundingBoxCallback")),Object(F["a"])(ot,y,st("editable")),Object(F["a"])(ot,m,(function(t,e){t.errors=[].concat(Object(I["a"])(t.errors),[e])})),Object(F["a"])(ot,g,st("addFeatureMarkCallback")),Object(F["a"])(ot,v,(function(t,e){t.highlightedBbox=[{lat:e[0][0],lng:e[0][1]},{lat:e[1][0],lng:e[1][1]}]})),Object(F["a"])(ot,O,(function(t,e){t.highlightedLatLng=e?{lat:Number.parseFloat(e[W]),lng:Number.parseFloat(e[Y])}:void 0})),Object(F["a"])(ot,k,st("loading")),Object(F["a"])(ot,_,ct(["map","center"])),Object(F["a"])(ot,j,st("story")),Object(F["a"])(ot,C,ct(["story","name"])),Object(F["a"])(ot,x,ct(["story","text"])),Object(F["a"])(ot,w,st("storyUrl")),Object(F["a"])(ot,E,ct(["story","track"])),ot),dt={updateTrack:function(t,e){var n=t.commit;n(E,e)},updateStoryText:function(t,e){var n=t.commit;n(x,e)},loadStory:function(){var t=Object(U["a"])(regeneratorRuntime.mark((function t(e){var n,r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.commit,r=e.state,n(k,!0),t.next=4,V.a.get(r.storyUrl);case 4:a=t.sent,n(j,a.data);case 6:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},ft={content:function(t){var e;return e=t.story.text&&t.story.text.state?t.story.text.state.doc.content:t.story.text&&t.story.text.content,e&&JSON.parse(JSON.stringify(e))},bboxes:function(t,e){var n=[],r=e.content;if(r){var a=Object(K["a"])(r,q);n=Object(G["a"])(a,(function(t){return t}),{leavesOnly:!0}).filter((function(t){return null!==t})).map((function(t){return JSON.parse(t)})).map((function(t,e){return{id:e,bounds:[[t[0][0],t[0][1]],[t[1][0],t[1][1]]]}}))}return n},features:function(t,e){var n=[],r=e.content;if(r){var a=Object(G["a"])(Object(K["a"])(r,[W,Y]),(function(t){return t}),{leavesOnly:!0}).filter((function(t){return null!==t}));n=J()(a,2).map((function(t){return{lat:t[0],lng:t[1]}}))}return n},featuresWithoutHighlighted:function(t,e){if(!t.highlightedLatLng)return e.features;var n=t.highlightedLatLng,r=n.lat,a=n.lng;return e.features.filter((function(t){return t.lat!==r&&t.lng!==a}))}},ht=new o["a"].Store({strict:!0,getters:ft,state:lt,mutations:ut,actions:dt}),bt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"hero is-fullheight"},[n("div",{staticClass:"hero-body"},[n("div",{staticClass:"container"},[n("div",{staticClass:"columns"},[n("div",{staticClass:"column is-6 is-offset-3"},[t._m(0),n("div",{staticClass:"columns"},[n("div",{staticClass:"column is-6 section-left has-pb-0"},[n("h2",{staticClass:"title is-2 has-text-weight-normal has-text-centered has-mb-2"},[t._v("Napsat příběh")]),n("p",[t._v("Chcete napsat svůj vlastní příběh? Z prázdnin, dovolené nebo jen zajímavého sobotního\n                výletu?")]),n("b-button",{on:{click:function(e){return t.$router.push("/story/create")}}},[t._v("Chci psát")])],1),n("div",{staticClass:"column is-6 section-right has-pb-0"},[n("h2",{staticClass:"title is-2 has-text-weight-normal has-text-centered has-mb-2"},[t._v("Číst příběh")]),n("p",[t._v("Váš kamarád nebo příbuzný napsal příběh a poslal vám jeho adresu? Můžete si ho přečíst.")]),n("b-button",{on:{click:function(e){return t.$router.push("/story/load")}}},[t._v("Chci číst")])],1)])])])])])])},pt=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"columns"},[n("div",{staticClass:"column"},[n("h1",{staticClass:"title is-1 has-text-weight-normal has-text-centered has-mb-1"},[t._v("Cartostory")])])])}],mt={name:"Landing"},yt=mt,gt=(n("6a2b"),Object(S["a"])(yt,bt,pt,!1,null,"40225d4e",null)),vt=gt.exports,Ot=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container-fluid story-form"},[n("div",{staticClass:"columns has-margin-0",staticStyle:{height:"100vh"}},[n("cs-map"),n("div",{staticStyle:{display:"flex","flex-direction":"column",width:"100%"}},[t.$store.state.story.text||t.ready?n("cs-editor",{on:t._d({},[t.ADD_FEATURE_MARK_EVENT,function(e){return t.handleAddFeatureMarkClick(e)},t.ADD_BOUNDING_BOX_EVENT,function(e){return t.handleAddBoundingBoxClick(e)}])}):t._e()],1)],1)])},kt=[],_t={bounds:void 0,center:[50,19],baseLayer:"https://api.mapbox.com/styles/v1/cartostory/cjugqcypf27581gnry4y59lxy/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2FydG9zdG9yeSIsImEiOiJjanQycXVyZDcxeXZqM3lxeDNvcW81NWJpIn0.hfvoqNSy7dT0yviVhNcDMg",hikingOverlay:"http://tile.mtbmap.cz/overlay_hiking/{z}/{x}/{y}.png",labelsOverlay:"https://api.mapbox.com/styles/v1/cartostory/cjugqfe8r1lhh1ftgrmr7v9zj/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2FydG9zdG9yeSIsImEiOiJjanQycXVyZDcxeXZqM3lxeDNvcW81NWJpIn0.hfvoqNSy7dT0yviVhNcDMg",zoom:8,edgeMarker:void 0},jt={style:{common:{radius:8,weight:1.5},highlighted:{color:"#F56C6C",opacity:1,fillOpacity:.4},inBbox:{color:"#42b983",fillOpacity:.5},plain:{color:"#3185fc",fillOpacity:.5},edge:{icon:L.icon({iconUrl:"../../node_modules/leaflet/dist/images/marker-icon.png",iconRetinaUrl:"marker-icon-2x.png",shadowUrl:"marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[0,0]})}}},Ct={plain:{style:{color:"#5a5a66",fillOpacity:0,dashArray:"5",weight:2}},hovered:{style:{color:"#5a5a66",fillColor:"#5a5a66",dashArray:"5",weight:2}},selected:{style:{color:"#42b983",fillColor:"#42b983",fillOpacity:0,dashArray:"5",weight:2}}},xt={style:{plain:{color:"#5a5a66",dashArray:"6"},inBbox:{color:"#42b983",dashArray:"6"}}},wt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"column is-12 has-padding-0 story-text"},[n("div",{staticClass:"story-text__content"},[t.editable?n("form",{staticClass:"has-mt-1"},[n("b-field",[n("b-input",{attrs:{"custom-class":"story-title-input",placeholder:"Název příběhu",size:"is-large"},model:{value:t.storyName,callback:function(e){t.storyName=e},expression:"storyName"}})],1)],1):t._e(),t.editable?t._e():n("h1",{staticClass:"story-title-input has-mt-1"},[t._v(t._s(t.storyName))]),t.editable?n("menu-bar",{attrs:{editor:t.editor}}):t._e(),t.editable?n("menu-bubble",{attrs:{editor:t.editor}}):t._e(),n("editor-content",{staticClass:"editor",class:{editable:this.editable},staticStyle:{flex:"1",overflow:"auto"},attrs:{editor:t.editor}})],1)])},Et=[],Lt=(n("8e6e"),n("456d"),n("7f7f"),n("cd42")),Mt=n("f23d"),At=(n("6b54"),n("2397"),n("d225")),St=n("b0b4"),Dt=n("308d"),$t=n("6bb5"),Nt=n("4e2b"),Tt=n("a9de");function Bt(t){return function(){var e,n=Object($t["a"])(t);if(Pt()){var r=Object($t["a"])(this).constructor;e=Reflect.construct(n,arguments,r)}else e=n.apply(this,arguments);return Object(Dt["a"])(this,e)}}function Pt(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}var Rt="a",Ut=function(t){Object(Nt["a"])(n,t);var e=Bt(n);function n(){return Object(At["a"])(this,n),e.apply(this,arguments)}return Object(St["a"])(n,[{key:"commands",value:function(t){var e=t.type;return function(t){var n=t&&[[t[0][0],t[0][1]],[t[1][0],t[1][1]]];return Object(Tt["r"])(e,Object(F["a"])({},q,JSON.stringify(n)))}}},{key:"name",get:function(){return"bboxMark"}},{key:"schema",get:function(){return{attrs:Object(F["a"])({},q,{default:null}),parseDOM:[{tag:Rt,getAttrs:function(t){return Object(F["a"])({},q,t.dataset[q])}}],toDOM:function(t){return[Rt,Object(F["a"])({},q,t.attrs[q]),0]}}}},{key:"view",get:function(){return{props:["node","updateAttrs","view"],methods:{handleClick:function(){var t=JSON.parse(this[X]);this.$store.commit(v,t)}},computed:Object(F["a"])({isHighlighted:function(){if(!this.$store.state.highlightedBbox)return!1;var t=this.$store.state.highlightedBbox;t.lat,t.lng;return!0}},X,{get:function(){return this.node.attrs[q]},set:function(t){this.updateAttrs(Object(F["a"])({},q,t))}}),template:"\n        <a\n          :class=\"{'is-highlighted': isHighlighted}\"\n          :".concat(q,'="').concat(X,'"\n          @click="handleClick()"\n        >\n        </a>\n      ')}}}]),n}(Lt["f"]);function Ft(t){return function(){var e,n=Object($t["a"])(t);if(It()){var r=Object($t["a"])(this).constructor;e=Reflect.construct(n,arguments,r)}else e=n.apply(this,arguments);return Object(Dt["a"])(this,e)}}function It(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}var zt="a",Vt=function(t){Object(Nt["a"])(n,t);var e=Ft(n);function n(){return Object(At["a"])(this,n),e.apply(this,arguments)}return Object(St["a"])(n,[{key:"commands",value:function(t){var e=t.type;return function(t){var n;return Object(Tt["r"])(e,(n={},Object(F["a"])(n,W,t&&t[W]),Object(F["a"])(n,Y,t&&t[Y]),n))}}},{key:"name",get:function(){return"featureMark"}},{key:"schema",get:function(){var t;return{attrs:(t={},Object(F["a"])(t,W,{default:null}),Object(F["a"])(t,Y,{default:null}),t),parseDOM:[{tag:zt,getAttrs:function(t){var e;return e={},Object(F["a"])(e,W,t.dataset[W]),Object(F["a"])(e,Y,t.dataset[Y]),e}}],toDOM:function(t){var e;return[zt,(e={},Object(F["a"])(e,W,t.attrs[W]),Object(F["a"])(e,Y,t.attrs[Y]),e),0]}}}},{key:"view",get:function(){var t;return{props:["node","updateAttrs","view"],methods:{handleClick:function(){var t,e=(t={},Object(F["a"])(t,W,this[Z]),Object(F["a"])(t,Y,this[Q]),t);this.$store.commit(O,e)}},computed:(t={isHighlighted:function(){if(!this.$store.state.highlightedLatLng)return!1;var t=this.$store.state.highlightedLatLng,e=t.lat,n=t.lng;return e===this[Z]&&n===this[Q]}},Object(F["a"])(t,Z,{get:function(){return this.node.attrs[W]},set:function(t){this.updateAttrs(Object(F["a"])({},W,t))}}),Object(F["a"])(t,Q,{get:function(){return this.node.attrs[Y]},set:function(t){this.updateAttrs(Object(F["a"])({},Y,t))}}),t),template:"\n        <a\n          :".concat(Y,'="').concat(Q,'"\n          :').concat(W,'="').concat(Z,'"\n          @click="handleClick()"\n        >\n        </a>\n      ')}}}]),n}(Lt["f"]),Ht=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("editor-menu-bar",{staticClass:"has-mt-1",staticStyle:{background:"white"},attrs:{editor:t.editor},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.commands,a=e.isActive;return[n("div",{staticClass:"editor-menu-bar buttons"},[n("b-button",{staticClass:"menubar__button",class:{"is-active":a.heading({level:2})},attrs:{title:"Nadpis 1. úrovně",size:"is-small"},on:{click:function(t){return r.heading({level:2})}}},[t._v("\n      H1\n    ")]),n("b-button",{staticClass:"menubar__button",class:{"is-active":a.heading({level:3})},attrs:{title:"Nadpis 2. úrovně",size:"is-small"},on:{click:function(t){return r.heading({level:3})}}},[t._v("\n      H2\n    ")]),n("b-button",{staticClass:"menubar__button",class:{"is-active":a.heading({level:4})},attrs:{title:"Nadpis 3. úrovně",size:"is-small"},on:{click:function(t){return r.heading({level:4})}}},[t._v("\n      H3\n    ")]),n("b-button",{staticClass:"menubar__button",staticStyle:{"margin-left":"auto"},attrs:{title:"Uložit příběh",size:"is-small",type:"is-primary"},on:{click:t.handleSave}},[t._v("Uložit\n    ")])],1)]}}])})},Jt=[],Gt={name:"MenuBar",components:{EditorMenuBar:Lt["c"]},props:["editor"],methods:{handleSave:function(){var t={name:this.$store.state.story.name,text:this.$store.state.story.text,track:this.$store.state.story.track};console.log("handleSave",t)}}},Kt=Gt,qt=Object(S["a"])(Kt,Ht,Jt,!1,null,null,null),Xt=qt.exports,Wt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("editor-menu-bubble",{attrs:{editor:t.editor,"keep-in-bounds":!0},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.commands,a=e.getMarkAttrs,o=e.isActive,i=e.menu;return[n("div",{staticClass:"menububble",class:{"is-active":i.isActive},style:"left: "+i.left+"px; bottom: "+i.bottom+"px;"},[t.isNewFeatureMarkButtonVisible(a("featureMark"))?t._e():n("b-button",{staticClass:"menububble__button menububble__button__mark",class:{"is-active":o.featureMark()},attrs:{"icon-left":"map-marker-plus"},on:{click:function(e){return t.handleAddFeatureMarkClick(r.featureMark)}}}),t.isNewFeatureMarkButtonVisible(a("featureMark"))?n("b-button",{staticClass:"menububble__button",class:{"is-active":o.featureMark()},attrs:{"icon-left":"map-marker-minus"},on:{click:function(e){return t.handleRemoveFeatureMarkClick(r.featureMark)}}}):t._e(),t.isNewBboxMarkVisible(a("bboxMark"))?t._e():n("b-button",{staticClass:"menububble__button menububble__button__bbox",class:{"is-active":o.bboxMark()},attrs:{"icon-left":"fullscreen"},on:{click:function(e){return t.handleAddBoundingBoxClick(r.bboxMark)}}}),t.isNewBboxMarkVisible(a("bboxMark"))?n("b-button",{staticClass:"menububble__button menububble__button__bbox",class:{"is-active":o.bboxMark()},attrs:{"icon-left":"fullscreen-exit"},on:{click:function(t){return r.bboxMark()}}}):t._e()],1)]}}])})},Yt=[],Zt={name:"MenuBubble",props:["editor"],components:{EditorMenuBubble:Lt["d"]},methods:{isNewFeatureMarkButtonVisible:function(t){return t&&t[W]},isNewBboxMarkVisible:function(t){return t&&t[q]},handleAddFeatureMarkClick:function(t){this.$parent.$emit(nt,t)},handleRemoveFeatureMarkClick:function(t){this.$store.commit(O,void 0),t()},handleAddBoundingBoxClick:function(t){this.$parent.$emit(et,t)}}},Qt=Zt,te=(n("c34e"),Object(S["a"])(Qt,Wt,Yt,!1,null,"84d85270",null)),ee=te.exports;function ne(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function re(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?ne(Object(n),!0).forEach((function(e){Object(F["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):ne(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var ae={name:"CsEditor",components:{EditorContent:Lt["b"],MenuBubble:ee,MenuBar:Xt},data:function(){return{contentPlaceholder:"Můžete začít psát...",editor:void 0,keepInBounds:!0}},computed:re({},Object(o["c"])({editable:function(t){return t.editable},highlightedLatLng:function(t){return t.highlightedLatLng}}),{storyName:{get:function(){return this.$store.state.story.name},set:function(t){this.$store.commit(C,t)}}}),watch:{highlightedLatLng:function(){this.scrollToHighlightedLatLng()}},mounted:function(){this.editor=this.$createEditor()},methods:{scrollToHighlightedLatLng:function(){if(this.highlightedLatLng){var t=this.highlightedLatLng,e=t.lat,n=t.lng,r=document.querySelector("[".concat(W,"='").concat(e,"'], [").concat(Y,"='").concat(n,"']"));this.$scrollTo(r,void 0,{container:document.querySelector(".editor"),offset:-50})}},$createEditor:function(){var t=this;return new Lt["a"]({editable:this.editable,extensions:[new Ut,new Vt,new Mt["a"]({levels:[2,3,4]})],content:this.$store.state.story.text||this.contentPlaceholder,onUpdate:function(e){t.$store.commit(x,e)}})}},beforeDestroy:function(){this.editor.destroy()}},oe=ae,ie=(n("116c"),Object(S["a"])(oe,wt,Et,!1,null,null,null)),se=ie.exports,ce=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"column is-6 has-padding-0"},[n("div",{staticClass:"cs-map"},[n("div",{attrs:{id:"cs-map-container"}},[n("l-map",{ref:"csmap",attrs:{center:t.highlightedLatLng||t.mapOptions.center,zoom:t.mapOptions.zoom},on:{click:function(e){return t.handleMapClick(e.latlng)},mousedown:function(e){return t.handleMapMouseDown(e.latlng)}}},[n("l-control",{staticClass:"leaflet-bar leaflet-control",attrs:{position:"topleft"}},[t.editable?n("cs-track-upload-button",{on:t._d({},[t.TRACK_FILE_UPLOAD_EVENT,function(e){return t.handleFileUpload(e)}])}):t._e()],1),n("l-tile-layer",{attrs:{url:t.mapOptions.baseLayer}}),n("l-tile-layer",{attrs:{url:t.mapOptions.hikingOverlay,"layer-type":"overlay",opacity:.7}}),n("l-tile-layer",{attrs:{url:t.mapOptions.labelsOverlay,"layer-type":"overlay"}}),t.track?n("l-geo-json",{ref:"cstrack",attrs:{geojson:t.track,options:t.trackOptions.style.plain},on:{ready:function(e){return t.handleTrackReady(e)}}}):t._e(),t._l(t.bboxes,(function(e){return n("l-rectangle",{key:e.id,attrs:{bounds:e.bounds,"l-style":t.bboxOptions.selected.style}})})),t._l(t.featuresWithoutHighlighted,(function(e,r){return n("l-circle-marker",{key:r,attrs:{color:t.markerOptions.style.plain.color,"fill-color":t.markerOptions.style.plain.color,"fill-opacity":t.markerOptions.style.plain.fillOpacity,latLng:e,radius:t.markerOptions.style.common.radius,weight:t.markerOptions.style.common.weight},on:{click:t.handleFeatureClick}})})),t.highlightedLatLng?n("l-circle-marker",{attrs:{color:t.markerOptions.style.highlighted.color,"fill-color":t.markerOptions.style.highlighted.color,"fill-opacity":t.markerOptions.style.highlighted.fillOpacity,latLng:t.highlightedLatLng,radius:t.markerOptions.style.common.radius,weight:t.markerOptions.style.common.weight},on:{click:t.handleFeatureClick}}):t._e()],2)],1)])])},le=[],ue=n("ea97"),de=n("2253c"),fe=n("044a"),he=n("2699"),be=n("a40a"),pe=n("fb8e"),me=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("file-reader",{staticStyle:{height:"30px",width:"30px","line-height":"30px"},attrs:{accept:".json",output:"text"},on:{"reader-load":t.handleFileUpload},scopedSlots:t._u([{key:"reader",fn:function(e){return[n("b-button",{staticClass:"file-upload-button",attrs:{title:"Nahrát soubor trasy",size:"is-small","icon-left":"cloud-upload"},on:{click:function(e){return t.$refs.fileReader.click()}}}),n("input",{ref:"fileReader",staticStyle:{visibility:"hidden"},attrs:{type:"file",accept:e.accept},on:{change:e.onchange}})]}}])})},ye=[],ge=n("5112"),ve=n.n(ge),Oe={name:"CsTrackUploadButton",components:{FileReader:ve.a},methods:{handleFileUpload:function(t){try{this.$emit(rt,t&&JSON.parse(t.data))}catch(e){this.$store.commit(m,{title:"Selhalo nahrání trasy",message:"Trasu se nepodařilo nahrát. Soubor pravděpodobně není validní."})}}}},ke=Oe,_e=(n("d51c"),Object(S["a"])(ke,me,ye,!1,null,"6f11a710",null)),je=_e.exports;function Ce(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function xe(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?Ce(Object(n),!0).forEach((function(e){Object(F["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Ce(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}n("6cc5"),n("20d6b");var we={name:"CsMap",components:{CsTrackUploadButton:je,LCircleMarker:ue["a"],LControl:de["a"],LGeoJson:fe["a"],LMap:he["a"],LTileLayer:be["a"],LRectangle:pe["a"]},data:function(){return{STORY_LINK_CLICK_EVENT:tt,TRACK_FILE_UPLOAD_EVENT:rt,addFeatureMark:void 0,bboxOptions:Ct,drawControl:void 0,markerOptions:jt,mapOptions:_t,trackOptions:xt,bboxBounds:[void 0,void 0]}},computed:xe({},Object(o["c"])({addBoundingBoxCallback:function(t){return t.addBoundingBoxCallback},addFeatureMarkCallback:function(t){return t.addFeatureMarkCallback},editable:function(t){return t.editable},highlightedLatLng:function(t){return t.highlightedLatLng},track:function(t){return t.story.track}}),{},Object(o["b"])(["bboxes","features","featuresWithoutHighlighted"])),methods:{handleTrackReady:function(t){this.$refs.csmap.mapObject.fitBounds(t.getBounds())},handleFeatureClick:function(t){var e,n=t.latlng,r=n.lat,a=n.lng,o=document.querySelector("[data-cs-lat='".concat(r,"'], [data-cs-lng='").concat(a,"']"));o&&this.$store.commit(O,(e={},Object(F["a"])(e,W,o.getAttribute([W])),Object(F["a"])(e,Y,o.getAttribute([Y])),e))},handleMapClick:function(t){var e;this.addFeatureMarkCallback&&"function"===typeof this.addFeatureMarkCallback&&(this.addFeatureMarkCallback((e={},Object(F["a"])(e,W,t.lat),Object(F["a"])(e,Y,t.lng),e)),this.$store.commit(g,void 0))},handleMapMouseDown:function(){if(this.addBoundingBoxCallback){var t=this.$refs.csmap.mapObject;window.L.drawLocal.draw.handlers.rectangle.tooltip.start="",window.L.drawLocal.draw.handlers.simpleshape.tooltip.end="",new window.L.Draw.Rectangle(t,{showArea:!1,shapeOptions:this.bboxOptions.plain.style}).enable(),t.off(window.L.Draw.Event.CREATED),t.on(window.L.Draw.Event.CREATED,this.$handleCreateRectangle)}},handleFileUpload:function(t){this.$store.commit(E,t)},$handleCreateRectangle:function(t){var e=t.layer.getBounds(),n=e.getNorthWest(),r=e.getSouthEast(),a=[[n.lat,n.lng],[r.lat,r.lng]];this.addBoundingBoxCallback(a),this.$store.commit(p,void 0)}}},Ee=we,Le=(n("541e"),Object(S["a"])(Ee,ce,le,!1,null,"d5b7a2ac",null)),Me=Le.exports;n("6cc5");var Ae={name:"story-screen",components:{CsEditor:se,CsMap:Me},data:function(){return{storyName:void 0,ready:!1,ADD_BOUNDING_BOX_EVENT:et,ADD_FEATURE_MARK_EVENT:nt,STORY_LINK_CLICK_EVENT:tt,TRACK_FILE_UPLOAD_EVENT:rt,features:[],track:void 0,trackBounds:void 0,addFeatureMark:void 0,markerOptions:jt,mapOptions:_t,trackOptions:xt}},computed:{editable:function(){return this.$store.state.editable}},mounted:function(){this.ready="/story/create"===this.$router.currentRoute.path},methods:{handleAddFeatureMarkClick:function(t){this.$store.commit(g,t)},handleAddBoundingBoxClick:function(t){this.$store.commit(p,t)}}},Se=Ae,De=(n("bb45"),Object(S["a"])(Se,Ot,kt,!1,null,"8c409c74",null)),$e=De.exports,Ne=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",{staticClass:"columns"},[n("div",{staticClass:"column is-6 is-offset-3"},[n("h1",{staticClass:"title is-1 has-text-weight-normal has-text-centered has-mt-2"},[t._v("Cartostory")]),n("div",{staticClass:"card has-padding-1"},[n("div",{staticClass:"card-content"},[t.availableStories.length>0?n("b-field",{attrs:{label:"Nahrát příběh"}},[n("b-select",{attrs:{placeholder:"Příběh",expanded:""},on:{input:t.handleStorySelect}},t._l(t.availableStories,(function(e){return n("option",{key:e.name,domProps:{value:e.name}},[t._v(t._s(e.name)+"\n            ")])})),0)],1):t._e(),n("b-field",{attrs:{label:"URL příběhu"}},[n("b-input",{attrs:{type:"text",expanded:""},model:{value:t.storyUrl,callback:function(e){t.storyUrl=e},expression:"storyUrl"}})],1),n("b-button",{attrs:{disabled:t.disabledSubmit,type:"is-primary"},on:{click:t.handleSubmit}},[t._v("Načíst")])],1)])])])])},Te=[],Be=(n("7514"),n("f788")),Pe=n.n(Be);function Re(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function Ue(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?Re(Object(n),!0).forEach((function(e){Object(F["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Re(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var Fe={name:"LoadStoryForm",data:function(){return{currentStory:void 0}},computed:Ue({},Object(o["c"])({availableStories:function(t){return t.availableStories},storyName:function(t){return t.story.name},storyText:function(t){return t.story.text}}),{disabledSubmit:function(){return!this.storyUrl},storyUrl:{get:function(){return this.$store.state.storyUrl},set:function(t){this.$store.commit(w,t)}}}),methods:{handleSubmit:function(){var t=Object(U["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.$store.dispatch("loadStory");case 3:e=Pe()(this.storyName).toLowerCase(),this.$router.push("/story/read/".concat(e)),t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),this.$store.commit(m,{title:"Příběh se nepodařilo nahrát",message:"Zkontrolujte jeho adresu."});case 10:return t.prev=10,this.$store.commit(k,!1),t.finish(10);case 13:case"end":return t.stop()}}),t,this,[[0,7,10,13]])})));function e(){return t.apply(this,arguments)}return e}(),handleStorySelect:function(t){var e=this.availableStories.find((function(e){return e.name===t}));e&&(this.storyUrl=e.storyUrl)}}},Ie=Fe,ze=Object(S["a"])(Ie,Ne,Te,!1,null,"6706dcd3",null),Ve=ze.exports;a["a"].use(R["a"]);var He=[{path:"/",component:vt},{path:"/story/read/:title",component:$e,beforeEnter:function(t,e,n){ht.commit(y,!1),ht.state.storyUrl?n():n("/story/load")}},{path:"/story/load",component:Ve},{path:"/story/create",component:$e,beforeEnter:function(t,e,n){ht.commit(y,!0),n()}}],Je=new R["a"]({mode:"history",base:"/",routes:He});Je.beforeEach((function(t,e,n){ht.commit(k,!0),n()})),Je.afterEach((function(){ht.commit(k,!1)}));var Ge=Je;a["a"].config.productionTip=!1,a["a"].use(r["a"]),a["a"].use(s.a),a["a"].use(l.a),a["a"].use(o["a"]),new a["a"]({store:ht,router:Ge,render:function(t){return t(P)}}).$mount("#js-cartostory")},6297:function(t,e,n){},"6a2b":function(t,e,n){"use strict";var r=n("33f4"),a=n.n(r);a.a},"9e12":function(t,e,n){},"9ef9":function(t,e,n){},a41b:function(t,e,n){},bb45:function(t,e,n){"use strict";var r=n("1347"),a=n.n(r);a.a},c34e:function(t,e,n){"use strict";var r=n("d45e"),a=n.n(r);a.a},d45e:function(t,e,n){},d51c:function(t,e,n){"use strict";var r=n("6297"),a=n.n(r);a.a}});
//# sourceMappingURL=app.5045ca65.js.map