"use strict";(self["webpackChunkakiyuki"]=self["webpackChunkakiyuki"]||[]).push([[73],{3749:function(e,a,l){l.d(a,{M4:function(){return u},Sc:function(){return n},mj:function(){return r},vq:function(){return o}});var t=l(4220);const n={name:String};function r(e){return(0,t.EW)((()=>({type:"hidden",name:e.name,value:e.modelValue})))}function o(e={}){return(a,l,n)=>{a[l]((0,t.h)("input",{class:"hidden"+(n||""),...e.value}))}}function u(e){return(0,t.EW)((()=>e.name||e.for))}},6968:function(e,a,l){l.r(a),l.d(a,{default:function(){return ie}});l(4645),l(4564),l(324),l(4329);var t=l(4220),n=l(7700),r=l(6732);const o=(0,r.KR)({separationDistance:20,alignmentDistance:50,cohesionDistance:100,separationWeight:1,alignmentWeight:1,cohesionWeight:1,maxSpeed:2,fieldOfView:90}),u=(e,a,l)=>{let t=Math.sqrt(e*e+a*a);if(0===t&&(e=.1*(2*Math.random()-1),a=.1*(2*Math.random()-1),t=Math.sqrt(e*e+a*a)),t>l){const n=l/t;return{x:e*n,y:a*n}}return{x:e,y:a}},i=(e,a)=>{const l=a.x-e.x,t=a.y-e.y,n=Math.atan2(t,l),r=Math.abs(n-e.angle);return r<=o.value.fieldOfView/2*(Math.PI/180)||r>=2*Math.PI-o.value.fieldOfView/2*(Math.PI/180)},s=(e,a)=>{let l=0,t=0,n=0;return a.forEach((a=>{if(i(e,a)){const r=e.x-a.x,u=e.y-a.y,i=Math.sqrt(r*r+u*u);if(i>0&&i<o.value.separationDistance){const e=(o.value.separationDistance-i)/i;l+=r*e,t+=u*e,n++}}})),n>0&&(l/=n,t/=n),{x:l*o.value.separationWeight,y:t*o.value.separationWeight}},v=(e,a)=>{let l=0,t=0,n=0;return a.forEach((a=>{if(i(e,a)){const r=Math.sqrt((e.x-a.x)**2+(e.y-a.y)**2);r<o.value.alignmentDistance&&(l+=a.vx,t+=a.vy,n++)}})),n>0&&(l=(l/n-e.vx)*o.value.alignmentWeight,t=(t/n-e.vy)*o.value.alignmentWeight,0===l&&0===t&&(l=.1*(2*Math.random()-1),t=.1*(2*Math.random()-1))),{x:l,y:t}},c=(e,a)=>{let l=0,t=0,n=0;if(a.forEach((a=>{if(i(e,a)){const r=Math.sqrt((e.x-a.x)**2+(e.y-a.y)**2);r<o.value.cohesionDistance&&(l+=a.x,t+=a.y,n++)}})),n>0){l=l/n-e.x,t=t/n-e.y;const a=Math.sqrt(l*l+t*t);l=l/a*o.value.cohesionWeight,t=t/a*o.value.cohesionWeight}return{x:l,y:t}},d=["width","height"],m={class:"q-gutter-md q-mt-md"},h={class:"bg-dark q-mt-md rounded-borders"},g={class:"q-gutter-md q-ma-md"},b={class:"col"},p={class:"row items-center"},x={class:"q-mr-md"},f={class:"q-mr-md"},k={class:"q-mr-md"},y={class:"q-mr-md"},q={class:"column bg-dark rounded-borders q-pt-none q-pb-md q-pl-md q-pr-md q-mx-lg q-gutter-md q-mt-md"},E={class:"row col"},M={class:"q-mr-md"},W={class:"column bg-dark rounded-borders q-pt-md q-pb-lg q-pl-lg q-pr-lg q-mt-md q-mx-lg"},w={class:"row col items-center q-gutter-xl"},C={class:"row items-center"},L={class:"q-mr-md"},V={class:"q-mt-lg q-pa-xl q-gutter-y-md"},$={class:"row justify-center q-gutter-lg q-mt-md q-mb-xl"};var S={__name:"BoidAlgorithm",setup(e){const a=(0,r.KR)(null);let l=Math.min(800,.9*window.innerWidth),i=Math.min(600,.6*window.innerHeight);const S=(0,r.KR)([]);let _=null;const R=(0,r.KR)(!1),I=(0,r.KR)({x:l/2,y:i/2}),T=(0,r.KR)({x:l/2,y:i/2,vx:0,vy:0,angle:0}),B=e=>{const l=a.value.getBoundingClientRect();I.value.x=Math.max(0,Math.min(e.clientX-l.left,l.width)),I.value.y=Math.max(0,Math.min(e.clientY-l.top,l.height))},P=e=>{if(e.preventDefault(),e.touches.length>0){const l=a.value.getBoundingClientRect(),t=e.touches[0].clientX-l.left,n=e.touches[0].clientY-l.top;I.value.x=Math.max(0,Math.min(t,l.width)),I.value.y=Math.max(0,Math.min(n,l.height))}},A=()=>{const e=I.value.x-T.value.x,a=I.value.y-T.value.y,l=Math.sqrt(e*e+a*a);l>1&&(T.value.vx=e/l*2,T.value.vy=a/l*2,T.value.x+=T.value.vx,T.value.y+=T.value.vy,T.value.angle=Math.atan2(T.value.vy,T.value.vx))},K=(0,r.KR)({body:{label:"鳥の体",value:!0},fieldOfView:{label:"視野角",value:!0},separationRadius:{label:"分離半径",value:!0},alignmentRadius:{label:"整列半径",value:!0},cohesionRadius:{label:"結合半径",value:!0}}),F=(0,r.KR)(20),D=(0,r.KR)([{label:"分離半径",value:20,min:10,max:100,step:1,key:"separationDistance"},{label:"整列半径",value:50,min:10,max:200,step:1,key:"alignmentDistance"},{label:"結合半径",value:100,min:10,max:300,step:1,key:"cohesionDistance"},{label:"分離重み",value:1,min:0,max:5,step:.1,key:"separationWeight"},{label:"整列重み",value:1,min:0,max:5,step:.1,key:"alignmentWeight"},{label:"結合重み",value:1,min:0,max:5,step:.1,key:"cohesionWeight"},{label:"最大速度",value:2,min:1.5,max:5,step:.1,key:"maxSpeed"},{label:"視野角",value:90,min:0,max:360,step:1,key:"fieldOfView"}]);(0,t.wB)(D,(e=>{e.forEach((e=>{o.value[e.key]=e.value}))}),{deep:!0});const O=()=>{S.value=[];for(let e=0;e<F.value;e++)S.value.push({x:Math.random()*(l-10)+5,y:Math.random()*(i-10)+5,vx:2*Math.random()-1,vy:2*Math.random()-1,angle:2*Math.random()*Math.PI})},N=()=>{S.value.forEach((e=>{const a=[...S.value,T.value].filter((a=>a!==e)),t=s(e,a),n=v(e,a),r=c(e,a);e.vx+=t.x+n.x+r.x,e.vy+=t.y+n.y+r.y;const d=u(e.vx,e.vy,o.value.maxSpeed);e.vx=d.x,e.vy=d.y,e.x+=e.vx/2,e.y+=e.vy/2,e.angle=Math.atan2(e.vy,e.vx),e.x=(e.x+l)%l,e.y=(e.y+i)%i})),R.value&&A()},z=()=>{const e=a.value.getContext("2d");e.fillStyle="red",e.beginPath(),e.arc(T.value.x,T.value.y,10,0,2*Math.PI),e.fill()},X=e=>{const l=a.value.getContext("2d"),t=10;K.value.body.value&&(l.fillStyle="orange",l.beginPath(),l.moveTo(e.x+Math.cos(e.angle)*t,e.y+Math.sin(e.angle)*t),l.lineTo(e.x+Math.cos(e.angle+2.5*Math.PI/3)*t,e.y+Math.sin(e.angle+2.5*Math.PI/3)*t),l.lineTo(e.x+Math.cos(e.angle-2.5*Math.PI/3)*t,e.y+Math.sin(e.angle-2.5*Math.PI/3)*t),l.closePath(),l.fill()),K.value.fieldOfView.value&&(l.strokeStyle="rgba(255, 255, 255, 0.3)",l.beginPath(),l.moveTo(e.x,e.y),l.arc(e.x,e.y,3*t,e.angle-o.value.fieldOfView/2*(Math.PI/180),e.angle+o.value.fieldOfView/2*(Math.PI/180)),l.closePath(),l.stroke()),K.value.separationRadius.value&&(l.strokeStyle="rgba(255, 100, 100, 0.2)",l.beginPath(),l.arc(e.x,e.y,o.value.separationDistance,0,2*Math.PI),l.stroke()),K.value.alignmentRadius.value&&(l.strokeStyle="rgba(100, 255, 100, 0.2)",l.beginPath(),l.arc(e.x,e.y,o.value.alignmentDistance,0,2*Math.PI),l.stroke()),K.value.cohesionRadius.value&&(l.strokeStyle="rgba(100, 100, 255, 0.2)",l.beginPath(),l.arc(e.x,e.y,o.value.cohesionDistance,0,2*Math.PI),l.stroke())},j=()=>{const e=a.value.getContext("2d");e.clearRect(0,0,l,i),S.value.forEach((e=>{X(e)})),R.value&&z()},G=()=>{N(),j(),_=requestAnimationFrame(G)},Q=()=>{_||G()},U=()=>{_&&(cancelAnimationFrame(_),_=null)},H=()=>{l=Math.min(800,.9*window.innerWidth),i=Math.min(600,.6*window.innerHeight)};return(0,t.wB)(F,(()=>{O()})),(0,t.sV)((()=>{O(),Q(),a.value.addEventListener("mousemove",B),a.value.addEventListener("touchmove",P,{passive:!1}),window.addEventListener("resize",H)})),(0,t.hi)((()=>{U(),a.value.removeEventListener("mousemove",B),a.value.removeEventListener("touchmove",P),window.removeEventListener("resize",H)})),(e,o)=>{const u=(0,t.g2)("q-btn"),s=(0,t.g2)("q-toggle"),v=(0,t.g2)("q-slider"),c=(0,t.g2)("q-page");return(0,t.uX)(),(0,t.Wv)(c,{class:"flex flex-center column"},{default:(0,t.k6)((()=>[(0,t.Lk)("div",{class:(0,n.C4)(["q-mb-lg",[e.$q.screen.xs?"text-h4 q-mt-md":e.$q.screen.sm?"text-h3":"text-h2"]])},o[2]||(o[2]=[(0,t.Lk)("span",null,"Boid Algorithm",-1)]),2),(0,t.Lk)("div",null,[(0,t.Lk)("div",{class:"border",style:(0,n.Tr)({width:`${(0,r.R1)(l)+25}px`,height:`${(0,r.R1)(i)+25}px`})},[(0,t.Lk)("canvas",{class:"q-ma-sm",ref_key:"canvas",ref:a,width:(0,r.R1)(l),height:(0,r.R1)(i)},null,8,d)],4)]),(0,t.Lk)("div",m,[(0,t.bF)(u,{outline:"",onClick:Q},{default:(0,t.k6)((()=>o[3]||(o[3]=[(0,t.eW)("アニメーション開始")]))),_:1}),(0,t.bF)(u,{outline:"",onClick:U},{default:(0,t.k6)((()=>o[4]||(o[4]=[(0,t.eW)("アニメーション停止")]))),_:1})]),(0,t.Lk)("div",h,[(0,t.Lk)("div",g,[(0,t.Lk)("div",b,[(0,t.bF)(s,{modelValue:R.value,"onUpdate:modelValue":o[0]||(o[0]=e=>R.value=e),"label-color":"grey-8","label-text-color":"white",label:"追従鳥の利用：","left-label":!0},null,8,["modelValue"])]),(0,t.Lk)("div",p,[(0,t.Lk)("span",x,"x: "+(0,n.v_)(T.value.x.toFixed(2)),1),(0,t.Lk)("span",f,"y: "+(0,n.v_)(T.value.y.toFixed(2)),1),(0,t.Lk)("span",k,"vx: "+(0,n.v_)(T.value.vx.toFixed(2)),1),(0,t.Lk)("span",y,"vy: "+(0,n.v_)(T.value.vy.toFixed(2)),1)])])]),(0,t.Lk)("div",q,[o[5]||(o[5]=(0,t.Lk)("div",{class:"col"},"表示設定",-1)),(0,t.Lk)("div",E,[((0,t.uX)(!0),(0,t.CE)(t.FK,null,(0,t.pI)(K.value,((e,a)=>((0,t.uX)(),(0,t.CE)("div",{key:a,class:"row items-center"},[(0,t.bF)(s,{modelValue:K.value[a].value,"onUpdate:modelValue":e=>K.value[a].value=e,"label-color":"grey-8","label-text-color":"white"},null,8,["modelValue","onUpdate:modelValue"]),(0,t.Lk)("span",M,(0,n.v_)(K.value[a].label),1)])))),128))])]),(0,t.Lk)("div",W,[o[7]||(o[7]=(0,t.Lk)("div",{class:"col"},"パラメータ設定",-1)),(0,t.Lk)("div",w,[(0,t.Lk)("div",C,[o[6]||(o[6]=(0,t.Lk)("span",{class:"q-mr-md"},"個体数",-1)),(0,t.bF)(v,{modelValue:F.value,"onUpdate:modelValue":o[1]||(o[1]=e=>F.value=e),"label-always":"","label-color":"grey-8","label-text-color":"white","switch-marker-labels-side":"","switch-label-side":"",markers:"",min:10,max:100,step:1},null,8,["modelValue"])]),((0,t.uX)(!0),(0,t.CE)(t.FK,null,(0,t.pI)(D.value,((e,a)=>((0,t.uX)(),(0,t.CE)("div",{key:a,class:"row items-center"},[(0,t.Lk)("span",L,(0,n.v_)(e.label),1),(0,t.bF)(v,{modelValue:e.value,"onUpdate:modelValue":a=>e.value=a,"label-always":"","label-color":"grey-8","label-text-color":"white","switch-marker-labels-side":"","switch-label-side":"",markers:"",min:e.min,max:e.max,step:e.step},null,8,["modelValue","onUpdate:modelValue","min","max","step"])])))),128))])]),(0,t.Lk)("div",V,[(0,t.Lk)("p",{class:(0,n.C4)(["text-h3 text-center",[e.$q.screen.xs?"text-h4":e.$q.screen.sm?"text-h3":"text-h2"]])}," Boid Algorithmとは ",2),o[11]||(o[11]=(0,t.Lk)("div",{class:"text-body1 text-center"}," このBoidアルゴリズムは，鳥の群れの挙動をシミュレートします．各鳥（Boid）は以下の3つのルールに従って行動します． ",-1)),(0,t.Lk)("div",$,[(0,t.Lk)("div",{class:(0,n.C4)(["bg-grey-2 q-pa-md rounded-borders text-black",[e.$q.screen.xs?"col-9":e.$q.screen.sm?"col-5":"col-3"]])},o[8]||(o[8]=[(0,t.Lk)("p",{class:"text-subtitle1 text-center"},[(0,t.Lk)("strong",null,"分離 (Separation)")],-1),(0,t.Lk)("p",{class:"text-body1 text-center"}," 近くの他の鳥との半径が一定以下にならないように，衝突を避けるように方向を変えます． ",-1)]),2),(0,t.Lk)("div",{class:(0,n.C4)(["bg-grey-2 q-pa-md rounded-borders text-black",[e.$q.screen.xs?"col-9":e.$q.screen.sm?"col-5":"col-3"]])},o[9]||(o[9]=[(0,t.Lk)("p",{class:"text-subtitle1 text-center"},[(0,t.Lk)("strong",null,"整列 (Alignment)")],-1),(0,t.Lk)("p",{class:"text-body1 text-center"}," 近くの他の鳥の平均的な速度と方向へ向かうように方向を変えます． ",-1)]),2),(0,t.Lk)("div",{class:(0,n.C4)(["bg-grey-2 q-pa-md rounded-borders text-black",[e.$q.screen.xs?"col-9":e.$q.screen.sm?"col-5":"col-3"]])},o[10]||(o[10]=[(0,t.Lk)("p",{class:"text-subtitle1 text-center"},[(0,t.Lk)("strong",null,"結合 (Cohesion)")],-1),(0,t.Lk)("p",{class:"text-body1 text-center"}," 近くの他の鳥の平均位置へ向かうように方向を変えます． ",-1)]),2)]),o[12]||(o[12]=(0,t.Lk)("div",{class:"text-body1 text-center"}," これらのルールを各鳥に適用することで，群れ全体としてまとまりのある，自然な動きが生まれます．各ルールの影響度や，近傍とみなす半径は，スライダーで調整可能です． ",-1)),o[13]||(o[13]=(0,t.Lk)("div",{class:"text-body1 text-center"}," この実装では，画面の端に達した鳥は反対側から出現するようにしています． ",-1))])])),_:1})}}},_=l(1399),R=l(3197),I=l(4503),T=l(5471),B=l(8313);function P(e,a){const l=(0,r.KR)(null),n=(0,t.EW)((()=>!0===e.disable?null:(0,t.h)("span",{ref:l,class:"no-outline",tabindex:-1})));function o(e){const t=a.value;void 0!==e&&0===e.type.indexOf("key")?null!==t&&document.activeElement!==t&&!0===t.contains(document.activeElement)&&t.focus():null!==l.value&&(void 0===e||null!==t&&!0===t.contains(e.target))&&l.value.focus()}return{refocusTargetEl:n,refocusTarget:o}}var A=l(3749),K={xs:30,sm:35,md:40,lg:50,xl:60},F=l(5055),D=l(1952);const O={...T.C,...B.x_,...A.Sc,modelValue:{required:!0,default:null},val:{},trueValue:{default:!0},falseValue:{default:!1},indeterminateValue:{default:null},checkedIcon:String,uncheckedIcon:String,indeterminateIcon:String,toggleOrder:{type:String,validator:e=>"tf"===e||"ft"===e},toggleIndeterminate:Boolean,label:String,leftLabel:Boolean,color:String,keepColor:Boolean,dense:Boolean,disable:Boolean,tabindex:[String,Number]},N=["update:modelValue"];function z(e,a){const{props:l,slots:n,emit:o,proxy:u}=(0,t.nI)(),{$q:i}=u,s=(0,T.A)(l,i),v=(0,r.KR)(null),{refocusTargetEl:c,refocusTarget:d}=P(l,v),m=(0,B.Ay)(l,K),h=(0,t.EW)((()=>void 0!==l.val&&Array.isArray(l.modelValue))),g=(0,t.EW)((()=>{const e=(0,r.ux)(l.val);return!0===h.value?l.modelValue.findIndex((a=>(0,r.ux)(a)===e)):-1})),b=(0,t.EW)((()=>!0===h.value?-1!==g.value:(0,r.ux)(l.modelValue)===(0,r.ux)(l.trueValue))),p=(0,t.EW)((()=>!0===h.value?-1===g.value:(0,r.ux)(l.modelValue)===(0,r.ux)(l.falseValue))),x=(0,t.EW)((()=>!1===b.value&&!1===p.value)),f=(0,t.EW)((()=>!0===l.disable?-1:l.tabindex||0)),k=(0,t.EW)((()=>`q-${e} cursor-pointer no-outline row inline no-wrap items-center`+(!0===l.disable?" disabled":"")+(!0===s.value?` q-${e}--dark`:"")+(!0===l.dense?` q-${e}--dense`:"")+(!0===l.leftLabel?" reverse":""))),y=(0,t.EW)((()=>{const a=!0===b.value?"truthy":!0===p.value?"falsy":"indet",t=void 0===l.color||!0!==l.keepColor&&("toggle"===e?!0!==b.value:!0===p.value)?"":` text-${l.color}`;return`q-${e}__inner relative-position non-selectable q-${e}__inner--${a}${t}`})),q=(0,t.EW)((()=>{const e={type:"checkbox"};return void 0!==l.name&&Object.assign(e,{".checked":b.value,"^checked":!0===b.value?"checked":void 0,name:l.name,value:!0===h.value?l.val:l.trueValue}),e})),E=(0,A.vq)(q),M=(0,t.EW)((()=>{const a={tabindex:f.value,role:"toggle"===e?"switch":"checkbox","aria-label":l.label,"aria-checked":!0===x.value?"mixed":!0===b.value?"true":"false"};return!0===l.disable&&(a["aria-disabled"]="true"),a}));function W(e){void 0!==e&&((0,F.Gu)(e),d(e)),!0!==l.disable&&o("update:modelValue",w(),e)}function w(){if(!0===h.value){if(!0===b.value){const e=l.modelValue.slice();return e.splice(g.value,1),e}return l.modelValue.concat([l.val])}if(!0===b.value){if("ft"!==l.toggleOrder||!1===l.toggleIndeterminate)return l.falseValue}else{if(!0!==p.value)return"ft"!==l.toggleOrder?l.trueValue:l.falseValue;if("ft"===l.toggleOrder||!1===l.toggleIndeterminate)return l.trueValue}return l.indeterminateValue}function C(e){13!==e.keyCode&&32!==e.keyCode||(0,F.Gu)(e)}function L(e){13!==e.keyCode&&32!==e.keyCode||W(e)}const V=a(b,x);return Object.assign(u,{toggle:W}),()=>{const a=V();!0!==l.disable&&E(a,"unshift",` q-${e}__native absolute q-ma-none q-pa-none`);const r=[(0,t.h)("div",{class:y.value,style:m.value,"aria-hidden":"true"},a)];null!==c.value&&r.push(c.value);const o=void 0!==l.label?(0,D.Hp)(n.default,[l.label]):(0,D.zm)(n.default);return void 0!==o&&r.push((0,t.h)("div",{class:`q-${e}__label q-anchor--skip`},o)),(0,t.h)("div",{ref:v,class:k.value,...M.value,onClick:W,onKeydown:C,onKeyup:L},r)}}var X=l(9140),j=(0,X.a0)({name:"QToggle",props:{...O,icon:String,iconColor:String},emits:N,setup(e){function a(a,l){const n=(0,t.EW)((()=>(!0===a.value?e.checkedIcon:!0===l.value?e.indeterminateIcon:e.uncheckedIcon)||e.icon)),r=(0,t.EW)((()=>!0===a.value?e.iconColor:null));return()=>[(0,t.h)("div",{class:"q-toggle__track"}),(0,t.h)("div",{class:"q-toggle__thumb absolute flex flex-center no-wrap"},void 0!==n.value?[(0,t.h)(I.A,{name:n.value,color:r.value})]:void 0)]}return z("toggle",a)}}),G=(l(7578),l(2617)),Q=l(6631),U=l(8445);const H="q-slider__marker-labels",Y=e=>({value:e}),J=({marker:e})=>(0,t.h)("div",{key:e.value,style:e.style,class:e.classes},e.label),Z=[34,37,40,33,39,38],ee={...T.C,...A.Sc,min:{type:Number,default:0},max:{type:Number,default:100},innerMin:Number,innerMax:Number,step:{type:Number,default:1,validator:e=>e>=0},snap:Boolean,vertical:Boolean,reverse:Boolean,color:String,markerLabelsClass:String,label:Boolean,labelColor:String,labelTextColor:String,labelAlways:Boolean,switchLabelSide:Boolean,markers:[Boolean,Number],markerLabels:[Boolean,Array,Object,Function],switchMarkerLabelsSide:Boolean,trackImg:String,trackColor:String,innerTrackImg:String,innerTrackColor:String,selectionColor:String,selectionImg:String,thumbSize:{type:String,default:"20px"},trackSize:{type:String,default:"4px"},disable:Boolean,readonly:Boolean,dense:Boolean,tabindex:[String,Number],thumbColor:String,thumbPath:{type:String,default:"M 4, 10 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0"}},ae=["pan","update:modelValue","change"];function le({updateValue:e,updatePosition:a,getDragging:l,formAttrs:n}){const{props:o,emit:u,slots:i,proxy:{$q:s}}=(0,t.nI)(),v=(0,T.A)(o,s),c=(0,A.vq)(n),d=(0,r.KR)(!1),m=(0,r.KR)(!1),h=(0,r.KR)(!1),g=(0,r.KR)(!1),b=(0,t.EW)((()=>!0===o.vertical?"--v":"--h")),p=(0,t.EW)((()=>"-"+(!0===o.switchLabelSide?"switched":"standard"))),x=(0,t.EW)((()=>!0===o.vertical?!0===o.reverse:o.reverse!==(!0===s.lang.rtl))),f=(0,t.EW)((()=>!0===isNaN(o.innerMin)||o.innerMin<o.min?o.min:o.innerMin)),k=(0,t.EW)((()=>!0===isNaN(o.innerMax)||o.innerMax>o.max?o.max:o.innerMax)),y=(0,t.EW)((()=>!0!==o.disable&&!0!==o.readonly&&f.value<k.value)),q=(0,t.EW)((()=>{if(0===o.step)return e=>e;const e=(String(o.step).trim().split(".")[1]||"").length;return a=>parseFloat(a.toFixed(e))})),E=(0,t.EW)((()=>0===o.step?1:o.step)),M=(0,t.EW)((()=>!0===y.value?o.tabindex||0:-1)),W=(0,t.EW)((()=>o.max-o.min)),w=(0,t.EW)((()=>k.value-f.value)),C=(0,t.EW)((()=>oe(f.value))),L=(0,t.EW)((()=>oe(k.value))),V=(0,t.EW)((()=>!0===o.vertical?!0===x.value?"bottom":"top":!0===x.value?"right":"left")),$=(0,t.EW)((()=>!0===o.vertical?"height":"width")),S=(0,t.EW)((()=>!0===o.vertical?"width":"height")),_=(0,t.EW)((()=>!0===o.vertical?"vertical":"horizontal")),R=(0,t.EW)((()=>{const e={role:"slider","aria-valuemin":f.value,"aria-valuemax":k.value,"aria-orientation":_.value,"data-step":o.step};return!0===o.disable?e["aria-disabled"]="true":!0===o.readonly&&(e["aria-readonly"]="true"),e})),I=(0,t.EW)((()=>`q-slider q-slider${b.value} q-slider--${!0===d.value?"":"in"}active inline no-wrap `+(!0===o.vertical?"row":"column")+(!0===o.disable?" disabled":" q-slider--enabled"+(!0===y.value?" q-slider--editable":""))+("both"===h.value?" q-slider--focus":"")+(o.label||!0===o.labelAlways?" q-slider--label":"")+(!0===o.labelAlways?" q-slider--label-always":"")+(!0===v.value?" q-slider--dark":"")+(!0===o.dense?" q-slider--dense q-slider--dense"+b.value:"")));function B(e){const a="q-slider__"+e;return`${a} ${a}${b.value} ${a}${b.value}${p.value}`}function P(e){const a="q-slider__"+e;return`${a} ${a}${b.value}`}const K=(0,t.EW)((()=>{const e=o.selectionColor||o.color;return"q-slider__selection absolute"+(void 0!==e?` text-${e}`:"")})),O=(0,t.EW)((()=>P("markers")+" absolute overflow-hidden")),N=(0,t.EW)((()=>P("track-container"))),z=(0,t.EW)((()=>B("pin"))),X=(0,t.EW)((()=>B("label"))),j=(0,t.EW)((()=>B("text-container"))),ee=(0,t.EW)((()=>B("marker-labels-container")+(void 0!==o.markerLabelsClass?` ${o.markerLabelsClass}`:""))),ae=(0,t.EW)((()=>"q-slider__track relative-position no-outline"+(void 0!==o.trackColor?` bg-${o.trackColor}`:""))),le=(0,t.EW)((()=>{const e={[S.value]:o.trackSize};return void 0!==o.trackImg&&(e.backgroundImage=`url(${o.trackImg}) !important`),e})),te=(0,t.EW)((()=>"q-slider__inner absolute"+(void 0!==o.innerTrackColor?` bg-${o.innerTrackColor}`:""))),ne=(0,t.EW)((()=>{const e=L.value-C.value,a={[V.value]:100*C.value+"%",[$.value]:0===e?"2px":100*e+"%"};return void 0!==o.innerTrackImg&&(a.backgroundImage=`url(${o.innerTrackImg}) !important`),a}));function re(e){const{min:a,max:l,step:t}=o;let n=a+e*(l-a);if(t>0){const e=(n-f.value)%t;n+=(Math.abs(e)>=t/2?(e<0?-1:1)*t:0)-e}return n=q.value(n),(0,Q.Tq)(n,f.value,k.value)}function oe(e){return 0===W.value?0:(e-o.min)/W.value}function ue(e,a){const l=(0,F.G1)(e),t=!0===o.vertical?(0,Q.Tq)((l.top-a.top)/a.height,0,1):(0,Q.Tq)((l.left-a.left)/a.width,0,1);return(0,Q.Tq)(!0===x.value?1-t:t,C.value,L.value)}const ie=(0,t.EW)((()=>!0===(0,U.Et)(o.markers)?o.markers:E.value)),se=(0,t.EW)((()=>{const e=[],a=ie.value,l=o.max;let t=o.min;do{e.push(t),t+=a}while(t<l);return e.push(l),e})),ve=(0,t.EW)((()=>{const e=` ${H}${b.value}-`;return H+`${e}${!0===o.switchMarkerLabelsSide?"switched":"standard"}`+`${e}${!0===x.value?"rtl":"ltr"}`})),ce=(0,t.EW)((()=>!1===o.markerLabels?null:he(o.markerLabels).map(((e,a)=>({index:a,value:e.value,label:e.label||e.value,classes:ve.value+(void 0!==e.classes?" "+e.classes:""),style:{...ge(e.value),...e.style||{}}}))))),de=(0,t.EW)((()=>({markerList:ce.value,markerMap:be.value,classes:ve.value,getStyle:ge}))),me=(0,t.EW)((()=>{const e=0===w.value?"2px":100*ie.value/w.value;return{...ne.value,backgroundSize:!0===o.vertical?`2px ${e}%`:`${e}% 2px`}}));function he(e){if(!1===e)return null;if(!0===e)return se.value.map(Y);if("function"===typeof e)return se.value.map((a=>{const l=e(a);return!0===(0,U.Gv)(l)?{...l,value:a}:{value:a,label:l}}));const a=({value:e})=>e>=o.min&&e<=o.max;return!0===Array.isArray(e)?e.map((e=>!0===(0,U.Gv)(e)?e:{value:e})).filter(a):Object.keys(e).map((a=>{const l=e[a],t=Number(a);return!0===(0,U.Gv)(l)?{...l,value:t}:{value:t,label:l}})).filter(a)}function ge(e){return{[V.value]:100*(e-o.min)/W.value+"%"}}const be=(0,t.EW)((()=>{if(!1===o.markerLabels)return null;const e={};return ce.value.forEach((a=>{e[a.value]=a})),e}));function pe(){if(void 0!==i["marker-label-group"])return i["marker-label-group"](de.value);const e=i["marker-label"]||J;return ce.value.map((a=>e({marker:a,...de.value})))}const xe=(0,t.EW)((()=>[[G.A,fe,void 0,{[_.value]:!0,prevent:!0,stop:!0,mouse:!0,mouseAllDir:!0}]]));function fe(t){!0===t.isFinal?(void 0!==g.value&&(a(t.evt),!0===t.touch&&e(!0),g.value=void 0,u("pan","end")),d.value=!1,h.value=!1):!0===t.isFirst?(g.value=l(t.evt),a(t.evt),e(),d.value=!0,u("pan","start")):(a(t.evt),e())}function ke(){h.value=!1}function ye(t){a(t,l(t)),e(),m.value=!0,d.value=!0,document.addEventListener("mouseup",qe,!0)}function qe(){m.value=!1,d.value=!1,e(!0),ke(),document.removeEventListener("mouseup",qe,!0)}function Ee(t){a(t,l(t)),e(!0)}function Me(a){Z.includes(a.keyCode)&&e(!0)}function We(e){if(!0===o.vertical)return null;const a=s.lang.rtl!==o.reverse?1-e:e;return{transform:`translateX(calc(${2*a-1} * ${o.thumbSize} / 2 + ${50-100*a}%))`}}function we(e){const a=(0,t.EW)((()=>!1!==m.value||h.value!==e.focusValue&&"both"!==h.value?"":" q-slider--focus")),l=(0,t.EW)((()=>`q-slider__thumb q-slider__thumb${b.value} q-slider__thumb${b.value}-${!0===x.value?"rtl":"ltr"} absolute non-selectable`+a.value+(void 0!==e.thumbColor.value?` text-${e.thumbColor.value}`:""))),n=(0,t.EW)((()=>({width:o.thumbSize,height:o.thumbSize,[V.value]:100*e.ratio.value+"%",zIndex:h.value===e.focusValue?2:void 0}))),r=(0,t.EW)((()=>void 0!==e.labelColor.value?` text-${e.labelColor.value}`:"")),u=(0,t.EW)((()=>We(e.ratio.value))),i=(0,t.EW)((()=>"q-slider__text"+(void 0!==e.labelTextColor.value?` text-${e.labelTextColor.value}`:"")));return()=>{const a=[(0,t.h)("svg",{class:"q-slider__thumb-shape absolute-full",viewBox:"0 0 20 20","aria-hidden":"true"},[(0,t.h)("path",{d:o.thumbPath})]),(0,t.h)("div",{class:"q-slider__focus-ring fit"})];return!0!==o.label&&!0!==o.labelAlways||(a.push((0,t.h)("div",{class:z.value+" absolute fit no-pointer-events"+r.value},[(0,t.h)("div",{class:X.value,style:{minWidth:o.thumbSize}},[(0,t.h)("div",{class:j.value,style:u.value},[(0,t.h)("span",{class:i.value},e.label.value)])])])),void 0!==o.name&&!0!==o.disable&&c(a,"push")),(0,t.h)("div",{class:l.value,style:n.value,...e.getNodeData()},a)}}function Ce(e,a,l,n){const r=[];"transparent"!==o.innerTrackColor&&r.push((0,t.h)("div",{key:"inner",class:te.value,style:ne.value})),"transparent"!==o.selectionColor&&r.push((0,t.h)("div",{key:"selection",class:K.value,style:e.value})),!1!==o.markers&&r.push((0,t.h)("div",{key:"marker",class:O.value,style:me.value})),n(r);const u=[(0,D.Kf)("div",{key:"trackC",class:N.value,tabindex:a.value,...l.value},[(0,t.h)("div",{class:ae.value,style:le.value},r)],"slide",y.value,(()=>xe.value))];if(!1!==o.markerLabels){const e=!0===o.switchMarkerLabelsSide?"unshift":"push";u[e]((0,t.h)("div",{key:"markerL",class:ee.value},pe()))}return u}return(0,t.xo)((()=>{document.removeEventListener("mouseup",qe,!0)})),{state:{active:d,focus:h,preventFocus:m,dragging:g,editable:y,classes:I,tabindex:M,attributes:R,roundValueFn:q,keyStep:E,trackLen:W,innerMin:f,innerMinRatio:C,innerMax:k,innerMaxRatio:L,positionProp:V,sizeProp:$,isReversed:x},methods:{onActivate:ye,onMobileClick:Ee,onBlur:ke,onKeyup:Me,getContent:Ce,getThumbRenderFn:we,convertRatioToModel:re,convertModelToRatio:oe,getDraggingRatio:ue}}}const te=()=>({});var ne=(0,X.a0)({name:"QSlider",props:{...ee,modelValue:{required:!0,default:null,validator:e=>"number"===typeof e||null===e},labelValue:[String,Number]},emits:ae,setup(e,{emit:a}){const{proxy:{$q:l}}=(0,t.nI)(),{state:n,methods:o}=le({updateValue:b,updatePosition:x,getDragging:p,formAttrs:(0,A.mj)(e)}),u=(0,r.KR)(null),i=(0,r.KR)(0),s=(0,r.KR)(0);function v(){s.value=null===e.modelValue?n.innerMin.value:(0,Q.Tq)(e.modelValue,n.innerMin.value,n.innerMax.value)}(0,t.wB)((()=>`${e.modelValue}|${n.innerMin.value}|${n.innerMax.value}`),v),v();const c=(0,t.EW)((()=>o.convertModelToRatio(s.value))),d=(0,t.EW)((()=>!0===n.active.value?i.value:c.value)),m=(0,t.EW)((()=>{const a={[n.positionProp.value]:100*n.innerMinRatio.value+"%",[n.sizeProp.value]:100*(d.value-n.innerMinRatio.value)+"%"};return void 0!==e.selectionImg&&(a.backgroundImage=`url(${e.selectionImg}) !important`),a})),h=o.getThumbRenderFn({focusValue:!0,getNodeData:te,ratio:d,label:(0,t.EW)((()=>void 0!==e.labelValue?e.labelValue:s.value)),thumbColor:(0,t.EW)((()=>e.thumbColor||e.color)),labelColor:(0,t.EW)((()=>e.labelColor)),labelTextColor:(0,t.EW)((()=>e.labelTextColor))}),g=(0,t.EW)((()=>!0!==n.editable.value?{}:!0===l.platform.is.mobile?{onClick:o.onMobileClick}:{onMousedown:o.onActivate,onFocus:f,onBlur:o.onBlur,onKeydown:k,onKeyup:o.onKeyup}));function b(l){s.value!==e.modelValue&&a("update:modelValue",s.value),!0===l&&a("change",s.value)}function p(){return u.value.getBoundingClientRect()}function x(a,l=n.dragging.value){const t=o.getDraggingRatio(a,l);s.value=o.convertRatioToModel(t),i.value=!0!==e.snap||0===e.step?t:o.convertModelToRatio(s.value)}function f(){n.focus.value=!0}function k(a){if(!1===Z.includes(a.keyCode))return;(0,F.Gu)(a);const l=([34,33].includes(a.keyCode)?10:1)*n.keyStep.value,t=([34,37,40].includes(a.keyCode)?-1:1)*(!0===n.isReversed.value?-1:1)*(!0===e.vertical?-1:1)*l;s.value=(0,Q.Tq)(n.roundValueFn.value(s.value+t),n.innerMin.value,n.innerMax.value),b()}return()=>{const a=o.getContent(m,n.tabindex,g,(e=>{e.push(h())}));return(0,t.h)("div",{ref:u,class:n.classes.value+(null===e.modelValue?" q-slider--no-value":""),...n.attributes.value,"aria-valuenow":e.modelValue},a)}}}),re=l(2110),oe=l.n(re);const ue=S;var ie=ue;oe()(S,"components",{QPage:_.A,QBtn:R.A,QToggle:j,QSlider:ne})}}]);
//# sourceMappingURL=boid.94efeb68.js.map