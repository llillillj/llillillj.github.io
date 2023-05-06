(function(){"use strict";var t={2102:function(t,e,n){var r=n(5102),o=n(9269);const i={id:"fade",class:"bg-transparent col q-ml-sm column q-pa-sm q-gutter-y-xs"},s=(0,o._)("div",{class:"col text-center q-pa-sm"},"Akiyuki Koyama",-1),a={id:"fade",class:"bg-transparent column q-ml-xl q-mt-sm q-gutter-y-xs",style:{position:"fixed",width:"300px",opacity:"1","z-index":"10"}};function l(t,e,n,r,l,c){const u=(0,o.up)("router-link"),f=(0,o.up)("q-header"),d=(0,o.up)("router-view"),m=(0,o.up)("q-page-container"),p=(0,o.up)("q-layout");return(0,o.wg)(),(0,o.j4)(p,{view:"lHh Lpr lFf",class:"bg-black text-white",style:{"font-weight":"1"}},{default:(0,o.w5)((()=>[(0,o.Wm)(m,{style:{width:"100vw"}},{default:(0,o.w5)((()=>[l.isMobile?((0,o.wg)(),(0,o.j4)(f,{key:0,class:"h row q-pa-sm text-h",style:{"background-color":"rgba(0, 0, 0, 0.8)"}},{default:(0,o.w5)((()=>[(0,o._)("div",i,[(0,o.Wm)(u,{to:"/",class:"col"},{default:(0,o.w5)((()=>[(0,o.Uk)("About Me")])),_:1}),(0,o.Wm)(u,{to:"/works",class:"col"},{default:(0,o.w5)((()=>[(0,o.Uk)("Works")])),_:1})]),s])),_:1})):((0,o.wg)(),(0,o.iD)(o.HY,{key:1},[(0,o.Wm)(f,{class:"h flex flex-center q-pa-lg text-h",style:{"min-width":"","background-color":"rgba(0, 0, 0, 0.8)"}},{default:(0,o.w5)((()=>[(0,o.Uk)("Akiyuki Koyama")])),_:1}),(0,o._)("div",a,[(0,o.Wm)(u,{to:"/",class:"col"},{default:(0,o.w5)((()=>[(0,o.Uk)("About Me")])),_:1}),(0,o.Wm)(u,{to:"/works",class:"col"},{default:(0,o.w5)((()=>[(0,o.Uk)("Works")])),_:1})])],64)),(0,o.Wm)(d,{isMobile:l.isMobile},null,8,["isMobile"])])),_:1})])),_:1})}var c={name:"LayoutDefault",components:{},data(){return{isMobile:!1,leftDrawerOpen:!1,isTransparent:!0,lastScrollPosition:0,scrollThreshold:50}},mounted(){this.checkUserAgent(),window.addEventListener("scroll",this.handleScroll)},beforeUnmount(){window.removeEventListener("scroll",this.handleScroll)},methods:{handleScroll(){const t=window.pageYOffset;t>this.lastScrollPosition&&t>this.scrollThreshold?this.isTransparent=!0:this.isTransparent=!1,this.lastScrollPosition=t},checkUserAgent(){const t=navigator.userAgent;/iPhone|iPad|iPod|Android/i.test(t)&&(this.isMobile=!0)}}};window.addEventListener("scroll",(function(){var t=document.getElementById("fade"),e=t.getBoundingClientRect();if(e.top<window.innerHeight&&e.bottom>=0){var n=1-e.top/window.innerHeight;t.style.opacity=n}}));var u=n(7617),f=n(1984),d=n(6974),m=n(7454),p=n(1410),h=n.n(p);const g=(0,u.Z)(c,[["render",l]]);var b=g;h()(c,"components",{QLayout:f.Z,QPageContainer:d.Z,QHeader:m.Z});var w=n(2201),v=n(3201),k=n.p+"img/lizard1.4f8bcbf1.png";const y=(0,o._)("div",{class:"absolute-full text-right"},[(0,o._)("span",{class:"q-mr-sm"},"兵庫県立大学 社会情報科学部 社会情報科学科"),(0,o._)("br"),(0,o._)("span",{class:"q-mr-sm"},"データ分析研究会"),(0,o._)("a",{class:"q-mr-lg",target:"_blank",href:"https://twitter.com/dakken205"},"-> Twitter"),(0,o._)("br"),(0,o._)("span",{class:"q-mr-sm"},"データ分析研究会"),(0,o._)("a",{class:"q-mr-lg",target:"_blank",href:"https://www.instagram.com/uoh_dakken/"},"-> Instagram"),(0,o._)("br"),(0,o._)("span",{class:"q-mr-sm"},"個人"),(0,o._)("a",{class:"q-mr-lg",target:"_blank",href:"https://twitter.com/llillillillj"},"-> Twitter"),(0,o._)("br"),(0,o._)("span",{class:"q-mr-sm"},"個人"),(0,o._)("a",{class:"q-mr-lg",target:"_blank",href:"https://www.kaggle.com/akiyukikouyama"},"-> Kaggle"),(0,o._)("br"),(0,o._)("span",{class:"q-mr-sm"},"個人"),(0,o._)("a",{class:"q-mr-lg",target:"_blank",href:"https://github.com/llillillj?tab=repositories"},"-> GIthub"),(0,o._)("br")],-1);function _(t,e,n,r,i,s){const a=(0,o.up)("q-img");return(0,o.wg)(),(0,o.iD)("div",{class:(0,v.C_)([{"mobile-style":n.isMobile,"pc-style":!n.isMobile},"bg-black float-right"])},[(0,o.Wm)(a,{class:(0,v.C_)({"mobile-style-img":n.isMobile,"pc-style-img":!n.isMobile}),src:k},{default:(0,o.w5)((()=>[y])),_:1},8,["class"])],2)}var q={name:"HomeView",components:{},props:["isMobile"],data(){return{}},created(){console.log(this.isMobile)}},j=n(1227);const x=(0,u.Z)(q,[["render",_]]);var M=x;h()(q,"components",{QImg:j.Z});const O=[{path:"/",name:"home",component:M},{path:"/works",name:"works",component:()=>n.e(443).then(n.bind(n,486))}],T=(0,w.p7)({history:(0,w.r5)(),routes:O});var P=T,A=n(3860),S={config:{},plugins:{}};(0,r.ri)(b).use(A.Z,S).use(P).mount("#app")}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={exports:{}};return t[r](i,i.exports,n),i.exports}n.m=t,function(){var t=[];n.O=function(e,r,o,i){if(!r){var s=1/0;for(u=0;u<t.length;u++){r=t[u][0],o=t[u][1],i=t[u][2];for(var a=!0,l=0;l<r.length;l++)(!1&i||s>=i)&&Object.keys(n.O).every((function(t){return n.O[t](r[l])}))?r.splice(l--,1):(a=!1,i<s&&(s=i));if(a){t.splice(u--,1);var c=o();void 0!==c&&(e=c)}}return e}i=i||0;for(var u=t.length;u>0&&t[u-1][2]>i;u--)t[u]=t[u-1];t[u]=[r,o,i]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})}}(),function(){n.f={},n.e=function(t){return Promise.all(Object.keys(n.f).reduce((function(e,r){return n.f[r](t,e),e}),[]))}}(),function(){n.u=function(t){return"js/about.4180eca6.js"}}(),function(){n.miniCssF=function(t){}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={},e="project:";n.l=function(r,o,i,s){if(t[r])t[r].push(o);else{var a,l;if(void 0!==i)for(var c=document.getElementsByTagName("script"),u=0;u<c.length;u++){var f=c[u];if(f.getAttribute("src")==r||f.getAttribute("data-webpack")==e+i){a=f;break}}a||(l=!0,a=document.createElement("script"),a.charset="utf-8",a.timeout=120,n.nc&&a.setAttribute("nonce",n.nc),a.setAttribute("data-webpack",e+i),a.src=r),t[r]=[o];var d=function(e,n){a.onerror=a.onload=null,clearTimeout(m);var o=t[r];if(delete t[r],a.parentNode&&a.parentNode.removeChild(a),o&&o.forEach((function(t){return t(n)})),e)return e(n)},m=setTimeout(d.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=d.bind(null,a.onerror),a.onload=d.bind(null,a.onload),l&&document.head.appendChild(a)}}}(),function(){n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){n.p="/"}(),function(){var t={143:0};n.f.j=function(e,r){var o=n.o(t,e)?t[e]:void 0;if(0!==o)if(o)r.push(o[2]);else{var i=new Promise((function(n,r){o=t[e]=[n,r]}));r.push(o[2]=i);var s=n.p+n.u(e),a=new Error,l=function(r){if(n.o(t,e)&&(o=t[e],0!==o&&(t[e]=void 0),o)){var i=r&&("load"===r.type?"missing":r.type),s=r&&r.target&&r.target.src;a.message="Loading chunk "+e+" failed.\n("+i+": "+s+")",a.name="ChunkLoadError",a.type=i,a.request=s,o[1](a)}};n.l(s,l,"chunk-"+e,e)}},n.O.j=function(e){return 0===t[e]};var e=function(e,r){var o,i,s=r[0],a=r[1],l=r[2],c=0;if(s.some((function(e){return 0!==t[e]}))){for(o in a)n.o(a,o)&&(n.m[o]=a[o]);if(l)var u=l(n)}for(e&&e(r);c<s.length;c++)i=s[c],n.o(t,i)&&t[i]&&t[i][0](),t[i]=0;return n.O(u)},r=self["webpackChunkproject"]=self["webpackChunkproject"]||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(2102)}));r=n.O(r)})();
//# sourceMappingURL=app.874d92db.js.map