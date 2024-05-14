import{l as A,j as r,c as w,t as C,R as V,r as M,ei as D,ej as F,d4 as O,aT as K,I as P,cn as U,aU as X,k as Z,Z as T,a0 as B,h as k,a1 as H,a2 as L}from"./main-0876e57f.js";const q=A(r.jsx("path",{d:"M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"}),"ChevronRightOutlined");function G(t){const{isCurrent:e,sizeStyle:n,isMenuTrigger:f,isClickable:y,isDisabled:d,onSelected:h,className:S,isMenuItem:m,isLink:s}=t,g=typeof t.children=="function"?t.children({isMenuItem:m}):t.children;if(m)return g;const p=f?{}:{tabIndex:s&&!d?0:void 0,role:s?"link":void 0,"aria-disabled":s?d:void 0,"aria-current":e&&s?"page":void 0,onClick:()=>h==null?void 0:h()};return r.jsxs("li",{className:w(`relative inline-flex min-w-0 flex-shrink-0 items-center justify-start ${n==null?void 0:n.font}`,(!y||d)&&"pointer-events-none",!e&&d&&"text-disabled"),children:[r.jsx("div",{...p,className:w(S,"cursor-pointer overflow-hidden whitespace-nowrap rounded px-8",!f&&"py-4 hover:bg-hover",!f&&s&&"outline-none focus-visible:ring"),children:g}),e===!1&&r.jsx(q,{size:n==null?void 0:n.icon,className:w(d?"text-disabled":"text-muted")})]})}const J=1,Q=10;function ne(t){const{size:e="md",children:n,isDisabled:f,className:y,currentIsClickable:d,isNavigation:h}=t,{trans:S}=C(),m=Y(e),s=[];V.Children.forEach(n,i=>{V.isValidElement(i)&&s.push(i)});const g=M.useRef(null),p=M.useRef(null),[E,R]=D(s.length),$=M.useCallback(()=>{const i=a=>{var N;const c=p.current;if(!c)return;const o=Array.from(c.children);if(!o.length)return;const b=c.offsetWidth,I=s.length>a;let l=0,u=0,v=Q;if(l+=o.shift().offsetWidth,u++,I&&(l+=((N=o.shift())==null?void 0:N.offsetWidth)??0,v--),l>=b&&u--,o.length>0){const j=o.pop();j.style.overflow="visible",l+=j.offsetWidth,l<b&&u++,j.style.overflow=""}for(const j of o.reverse())l+=j.offsetWidth,l<b&&u++;return Math.max(J,Math.min(v,u))};R(function*(){yield s.length;const a=i(s.length);yield a,a<s.length&&a>1&&(yield i(a))})},[p,n,R]);F({ref:g,onResize:$}),O($,[n]);let x=s;if(s.length>E){const i=s.length-1;x=[r.jsx(G,{sizeStyle:m,isMenuTrigger:!0,children:r.jsxs(K,{selectionMode:"single",selectedValue:i,children:[r.jsx(P,{"aria-label":"…",disabled:f,size:m.btn,children:r.jsx(U,{})}),r.jsx(X,{children:s.map((b,I)=>{const l=i===I;return r.jsx(Z,{value:I,onSelected:()=>{var u,v;l||(v=(u=b.props).onSelected)==null||v.call(u)},children:M.cloneElement(b,{isMenuItem:!0})},I)})})]})},"menu")];const c=[...s];let o=E;E>1&&(x.unshift(c.shift()),o--),x.push(...c.slice(-o))}const W=x.length-1,z=x.map((i,a)=>{const c=a===W,o=!c||d;return M.cloneElement(i,{key:i.key||a,isCurrent:c,sizeStyle:m,isClickable:o,isDisabled:f,isLink:h&&i.key!=="menu"})}),_=h?"nav":"div";return r.jsx(_,{className:w(y,"w-full min-w-0"),"aria-label":S({message:"Breadcrumbs"}),ref:g,children:r.jsx("ol",{ref:p,className:w("flex flex-nowrap justify-start",m.minHeight),children:z})})}function Y(t){switch(t){case"sm":return{font:"text-sm",icon:"sm",btn:"sm",minHeight:"min-h-36"};case"lg":return{font:"text-lg",icon:"md",btn:"md",minHeight:"min-h-42"};case"xl":return{font:"text-xl",icon:"md",btn:"md",minHeight:"min-h-42"};default:return{font:"text-base",icon:"md",btn:"md",minHeight:"min-h-42"}}}function ie(){const{trans:t}=C();return T({mutationFn:e=>ee(e),onSuccess:(e,n)=>{B(n.delete?t(k("Subscription deleted.")):t(k("Subscription cancelled.")))},onError:e=>H(e)})}function ee({subscriptionId:t,...e}){return L.post(`billing/subscriptions/${t}/cancel`,e).then(n=>n.data)}function re(){const{trans:t}=C();return T({mutationFn:e=>te(e),onSuccess:()=>{B(t(k("Subscription renewed.")))},onError:e=>H(e)})}function te({subscriptionId:t}){return L.post(`billing/subscriptions/${t}/resume`).then(e=>e.data)}export{ne as B,q as C,G as a,re as b,ie as u};
//# sourceMappingURL=use-resume-subscription-9a9f9fe1.js.map