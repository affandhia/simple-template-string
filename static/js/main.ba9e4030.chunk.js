(this["webpackJsonpsimple-template-engine"]=this["webpackJsonpsimple-template-engine"]||[]).push([[0],{112:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n(63),a=n(5),i=n(37),j=n(12),o=n(164),s=n(161),u=n(160),l=n(158),b=n(169),O=n(170),d=n(156),x=n(171),h=n(172),f=n(173),v=n(165),p=n(52),g=n.n(p),m=n(149),y=n(163),C=n(166),S=n(167),k=n(157),w=n(2),E=Object(m.a)(""),M=Object(j.a)(E,2),R=M[0],T=M[1],I=Object(m.a)({}),z=Object(j.a)(I,2),B=z[0],D=z[1],F=function(e){var t=e.buttonText,n=void 0===t?"Copy":t,r=e.text,a=void 0===r?"":r,i=Object(c.useState)(!1),l=Object(j.a)(i,2),b=l[0],O=l[1],d=Object(y.a)(),x=Object(j.a)(d,2)[1];return Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)(o.a,{disabled:b,onClick:function(){x(a),O(!0)},children:n}),Object(w.jsx)(s.a,{anchorOrigin:{horizontal:"center",vertical:"top"},open:b,autoHideDuration:2e3,onClose:function(){return O(!1)},children:Object(w.jsx)(u.a,{onClose:function(){return O(!1)},severity:"success",children:"Text Copied"})})]})},J=function(e){var t=e.variable,n=B(),r=Object(j.a)(n,2),o=r[0],s=r[1],u=Object(c.useState)(o[t]),b=Object(j.a)(u,2),O=b[0],d=b[1];return Object(C.a)((function(){s((function(e){return Object(i.a)(Object(i.a)({},e),{},Object(a.a)({},t,O))}))}),500,[O]),Object(w.jsx)(l.a,{size:"small",variant:"standard",label:t,value:O,onChange:function(e){d(e.target.value)}})},W=function(){var e=B(),t=Object(j.a)(e,1)[0],n=Object(c.useMemo)((function(){return Object.keys(t)}),[t]);return n.length?Object(w.jsx)(b.a,{variant:"outlined",children:Object(w.jsx)(O.a,{children:Object(w.jsx)(d.a,{spacing:1,children:n.map((function(e){return Object(w.jsx)(J,{variable:e},e)}))})})}):null},H=function(){var e=Object(c.useRef)(null),t=Object(c.useRef)(!1),n=Object(S.a)("simple-te:textraw","\n{{hello}}\n"),r=Object(j.a)(n,2),a=r[0],i=r[1],s=B(),u=Object(j.a)(s,2)[1],d=R(),h=Object(j.a)(d,2),f=h[0],v=h[1],p=Object(c.useRef)({start:0,end:0});Object(C.a)((function(){v(a||"")}),500,[a]),Object(c.useEffect)((function(){var e={};try{g.a.parseWithoutProcessing(f).body.filter((function(e){return"MustacheStatement"===e.type})).forEach((function(t){var n,c,r=(null===(n=t.params[0])||void 0===n?void 0:n.original)||(null===(c=t.path)||void 0===c?void 0:c.original);e[r]=""})),u((function(t){var n={};for(var c in e)n[c]=t[c];return n}))}catch(t){}}),[f,u]);var m=function(e){var t=e.target,n=t.selectionStart,c=t.selectionEnd;p.current={start:n||0,end:c||0}};return Object(w.jsxs)(b.a,{variant:"outlined",children:[Object(w.jsxs)(x.a,{children:[Object(w.jsx)(F,{text:f}),Object(w.jsx)(o.a,{onClick:function(){var n,c=a;void 0!==c&&i("".concat(c.substring(0,p.current.start),"{{}}").concat(c.substring(p.current.end,c.length))),t.current=!0,null===(n=e.current)||void 0===n||n.focus()},children:"Insert Variable"})]}),Object(w.jsx)(O.a,{children:Object(w.jsx)(l.a,{inputRef:e,label:"Text Message",multiline:!0,value:a,fullWidth:!0,onFocus:function(e){t.current&&setTimeout((function(){e.target.selectionStart=p.current.start+2,e.target.selectionEnd=p.current.start+2,t.current=!1}),100)},onBlur:m,onKeyDown:m,onChange:function(e){i(e.target.value)}})})]})},K=function(){var e=B(),t=Object(j.a)(e,1)[0],n=R(),r=Object(j.a)(n,1)[0],o=Object(c.useMemo)((function(){var e="";try{e=g.a.compile(r)(Object.keys(t).reduce((function(e,n){return Object(i.a)(Object(i.a)({},e),{},Object(a.a)({},n,t[n]?t[n]:"{{".concat(n,"}}")))}),{}))}catch(n){}return e||r}),[r,t]);return Object(w.jsxs)(d.a,{children:[Object(w.jsx)(d.a,{direction:"row",alignItems:"center"}),Object(w.jsxs)(b.a,{variant:"outlined",children:[Object(w.jsx)(x.a,{children:Object(w.jsx)(F,{text:o})}),Object(w.jsx)(O.a,{children:Object(w.jsx)(h.a,{component:"pre",variant:"body1",gutterBottom:!0,children:o})})]})]})};function P(){return Object(k.a)("Template String"),Object(w.jsx)(T,{children:Object(w.jsx)(D,{children:Object(w.jsxs)(d.a,{spacing:1,divider:Object(w.jsx)(f.a,{orientation:"horizontal",flexItem:!0}),children:[Object(w.jsxs)(v.a,{container:!0,sx:{gap:1},children:[Object(w.jsx)(v.a,{xs:12,md:!0,children:Object(w.jsx)(H,{})}),Object(w.jsx)(v.a,{xs:12,md:!0,children:Object(w.jsx)(K,{})})]}),Object(w.jsx)(W,{})]})})})}var V=document.getElementById("root");r.createRoot(V).render(Object(w.jsx)(c.StrictMode,{children:Object(w.jsx)(P,{})}))}},[[112,1,2]]]);
//# sourceMappingURL=main.ba9e4030.chunk.js.map