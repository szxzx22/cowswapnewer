import{c as Sr}from"./@1inch-7b4035dc.js";var Cr=function ne(D,o){if(D===o)return!0;if(D&&o&&typeof D=="object"&&typeof o=="object"){if(D.constructor!==o.constructor)return!1;var v,i,_;if(Array.isArray(D)){if(v=D.length,v!=o.length)return!1;for(i=v;i--!==0;)if(!ne(D[i],o[i]))return!1;return!0}if(D.constructor===RegExp)return D.source===o.source&&D.flags===o.flags;if(D.valueOf!==Object.prototype.valueOf)return D.valueOf()===o.valueOf();if(D.toString!==Object.prototype.toString)return D.toString()===o.toString();if(_=Object.keys(D),v=_.length,v!==Object.keys(o).length)return!1;for(i=v;i--!==0;)if(!Object.prototype.hasOwnProperty.call(o,_[i]))return!1;for(i=v;i--!==0;){var R=_[i];if(!ne(D[R],o[R]))return!1}return!0}return D!==D&&o!==o},ve={exports:{}};/** @license URI.js v4.4.1 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js */(function(ne,D){(function(o,v){v(D)})(Sr,function(o){function v(){for(var r=arguments.length,e=Array(r),a=0;a<r;a++)e[a]=arguments[a];if(e.length>1){e[0]=e[0].slice(0,-1);for(var t=e.length-1,n=1;n<t;++n)e[n]=e[n].slice(1,-1);return e[t]=e[t].slice(1),e.join("")}else return e[0]}function i(r){return"(?:"+r+")"}function _(r){return r===void 0?"undefined":r===null?"null":Object.prototype.toString.call(r).split(" ").pop().split("]").shift().toLowerCase()}function R(r){return r.toUpperCase()}function qe(r){return r!=null?r instanceof Array?r:typeof r.length!="number"||r.split||r.setInterval||r.call?[r]:Array.prototype.slice.call(r):[]}function Le(r,e){var a=r;if(e)for(var t in e)a[t]=e[t];return a}function oe(r){var e="[A-Za-z]",a="[0-9]",t=v(a,"[A-Fa-f]"),n=i(i("%[EFef]"+t+"%"+t+t+"%"+t+t)+"|"+i("%[89A-Fa-f]"+t+"%"+t+t)+"|"+i("%"+t+t)),f="[\\:\\/\\?\\#\\[\\]\\@]",u="[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]",c=v(f,u),d=r?"[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]":"[]",g=r?"[\\uE000-\\uF8FF]":"[]",s=v(e,a,"[\\-\\.\\_\\~]",d);i(e+v(e,a,"[\\+\\-\\.]")+"*"),i(i(n+"|"+v(s,u,"[\\:]"))+"*");var l=i(i("25[0-5]")+"|"+i("2[0-4]"+a)+"|"+i("1"+a+a)+"|"+i("0?[1-9]"+a)+"|0?0?"+a),S=i(l+"\\."+l+"\\."+l+"\\."+l),h=i(t+"{1,4}"),p=i(i(h+"\\:"+h)+"|"+S),C=i(i(h+"\\:")+"{6}"+p),E=i("\\:\\:"+i(h+"\\:")+"{5}"+p),b=i(i(h)+"?\\:\\:"+i(h+"\\:")+"{4}"+p),m=i(i(i(h+"\\:")+"{0,1}"+h)+"?\\:\\:"+i(h+"\\:")+"{3}"+p),P=i(i(i(h+"\\:")+"{0,2}"+h)+"?\\:\\:"+i(h+"\\:")+"{2}"+p),Q=i(i(i(h+"\\:")+"{0,3}"+h)+"?\\:\\:"+h+"\\:"+p),H=i(i(i(h+"\\:")+"{0,4}"+h)+"?\\:\\:"+p),A=i(i(i(h+"\\:")+"{0,5}"+h)+"?\\:\\:"+h),F=i(i(i(h+"\\:")+"{0,6}"+h)+"?\\:\\:"),q=i([C,E,b,m,P,Q,H,A,F].join("|")),w=i(i(s+"|"+n)+"+");i("[vV]"+t+"+\\."+v(s,u,"[\\:]")+"+"),i(i(n+"|"+v(s,u))+"*");var W=i(n+"|"+v(s,u,"[\\:\\@]"));return i(i(n+"|"+v(s,u,"[\\@]"))+"+"),i(i(W+"|"+v("[\\/\\?]",g))+"*"),{NOT_SCHEME:new RegExp(v("[^]",e,a,"[\\+\\-\\.]"),"g"),NOT_USERINFO:new RegExp(v("[^\\%\\:]",s,u),"g"),NOT_HOST:new RegExp(v("[^\\%\\[\\]\\:]",s,u),"g"),NOT_PATH:new RegExp(v("[^\\%\\/\\:\\@]",s,u),"g"),NOT_PATH_NOSCHEME:new RegExp(v("[^\\%\\/\\@]",s,u),"g"),NOT_QUERY:new RegExp(v("[^\\%]",s,u,"[\\:\\@\\/\\?]",g),"g"),NOT_FRAGMENT:new RegExp(v("[^\\%]",s,u,"[\\:\\@\\/\\?]"),"g"),ESCAPE:new RegExp(v("[^]",s,u),"g"),UNRESERVED:new RegExp(s,"g"),OTHER_CHARS:new RegExp(v("[^\\%]",s,c),"g"),PCT_ENCODED:new RegExp(n,"g"),IPV4ADDRESS:new RegExp("^("+S+")$"),IPV6ADDRESS:new RegExp("^\\[?("+q+")"+i(i("\\%25|\\%(?!"+t+"{2})")+"("+w+")")+"?\\]?$")}}var L=oe(!1),Y=oe(!0),B=function(){function r(e,a){var t=[],n=!0,f=!1,u=void 0;try{for(var c=e[Symbol.iterator](),d;!(n=(d=c.next()).done)&&(t.push(d.value),!(a&&t.length===a));n=!0);}catch(g){f=!0,u=g}finally{try{!n&&c.return&&c.return()}finally{if(f)throw u}}return t}return function(e,a){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return r(e,a);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),Ve=function(r){if(Array.isArray(r)){for(var e=0,a=Array(r.length);e<r.length;e++)a[e]=r[e];return a}else return Array.from(r)},V=2147483647,I=36,te=1,Z=26,je=38,Me=700,le=72,de=128,pe="-",Ge=/^xn--/,Xe=/[^\0-\x7E]/,Qe=/[\x2E\u3002\uFF0E\uFF61]/g,Ye={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},ie=I-te,O=Math.floor,fe=String.fromCharCode;function z(r){throw new RangeError(Ye[r])}function Ze(r,e){for(var a=[],t=r.length;t--;)a[t]=e(r[t]);return a}function Ee(r,e){var a=r.split("@"),t="";a.length>1&&(t=a[0]+"@",r=a[1]),r=r.replace(Qe,".");var n=r.split("."),f=Ze(n,e).join(".");return t+f}function ge(r){for(var e=[],a=0,t=r.length;a<t;){var n=r.charCodeAt(a++);if(n>=55296&&n<=56319&&a<t){var f=r.charCodeAt(a++);(f&64512)==56320?e.push(((n&1023)<<10)+(f&1023)+65536):(e.push(n),a--)}else e.push(n)}return e}var Je=function(e){return String.fromCodePoint.apply(String,Ve(e))},Ke=function(e){return e-48<10?e-22:e-65<26?e-65:e-97<26?e-97:I},Se=function(e,a){return e+22+75*(e<26)-((a!=0)<<5)},De=function(e,a,t){var n=0;for(e=t?O(e/Me):e>>1,e+=O(e/a);e>ie*Z>>1;n+=I)e=O(e/ie);return O(n+(ie+1)*e/(e+je))},Ce=function(e){var a=[],t=e.length,n=0,f=de,u=le,c=e.lastIndexOf(pe);c<0&&(c=0);for(var d=0;d<c;++d)e.charCodeAt(d)>=128&&z("not-basic"),a.push(e.charCodeAt(d));for(var g=c>0?c+1:0;g<t;){for(var s=n,l=1,S=I;;S+=I){g>=t&&z("invalid-input");var h=Ke(e.charCodeAt(g++));(h>=I||h>O((V-n)/l))&&z("overflow"),n+=h*l;var p=S<=u?te:S>=u+Z?Z:S-u;if(h<p)break;var C=I-p;l>O(V/C)&&z("overflow"),l*=C}var E=a.length+1;u=De(n-s,E,s==0),O(n/E)>V-f&&z("overflow"),f+=O(n/E),n%=E,a.splice(n++,0,f)}return String.fromCodePoint.apply(String,a)},ye=function(e){var a=[];e=ge(e);var t=e.length,n=de,f=0,u=le,c=!0,d=!1,g=void 0;try{for(var s=e[Symbol.iterator](),l;!(c=(l=s.next()).done);c=!0){var S=l.value;S<128&&a.push(fe(S))}}catch(k){d=!0,g=k}finally{try{!c&&s.return&&s.return()}finally{if(d)throw g}}var h=a.length,p=h;for(h&&a.push(pe);p<t;){var C=V,E=!0,b=!1,m=void 0;try{for(var P=e[Symbol.iterator](),Q;!(E=(Q=P.next()).done);E=!0){var H=Q.value;H>=n&&H<C&&(C=H)}}catch(k){b=!0,m=k}finally{try{!E&&P.return&&P.return()}finally{if(b)throw m}}var A=p+1;C-n>O((V-f)/A)&&z("overflow"),f+=(C-n)*A,n=C;var F=!0,q=!1,w=void 0;try{for(var W=e[Symbol.iterator](),_e;!(F=(_e=W.next()).done);F=!0){var be=_e.value;if(be<n&&++f>V&&z("overflow"),be==n){for(var ee=f,re=I;;re+=I){var ae=re<=u?te:re>=u+Z?Z:re-u;if(ee<ae)break;var ze=ee-ae,He=I-ae;a.push(fe(Se(ae+ze%He,0))),ee=O(ze/He)}a.push(fe(Se(ee,0))),u=De(f,A,p==h),f=0,++p}}}catch(k){q=!0,w=k}finally{try{!F&&W.return&&W.return()}finally{if(q)throw w}}++f,++n}return a.join("")},We=function(e){return Ee(e,function(a){return Ge.test(a)?Ce(a.slice(4).toLowerCase()):a})},ke=function(e){return Ee(e,function(a){return Xe.test(a)?"xn--"+ye(a):a})},j={version:"2.1.0",ucs2:{decode:ge,encode:Je},decode:Ce,encode:ye,toASCII:ke,toUnicode:We},y={};function $(r){var e=r.charCodeAt(0),a=void 0;return e<16?a="%0"+e.toString(16).toUpperCase():e<128?a="%"+e.toString(16).toUpperCase():e<2048?a="%"+(e>>6|192).toString(16).toUpperCase()+"%"+(e&63|128).toString(16).toUpperCase():a="%"+(e>>12|224).toString(16).toUpperCase()+"%"+(e>>6&63|128).toString(16).toUpperCase()+"%"+(e&63|128).toString(16).toUpperCase(),a}function M(r){for(var e="",a=0,t=r.length;a<t;){var n=parseInt(r.substr(a+1,2),16);if(n<128)e+=String.fromCharCode(n),a+=3;else if(n>=194&&n<224){if(t-a>=6){var f=parseInt(r.substr(a+4,2),16);e+=String.fromCharCode((n&31)<<6|f&63)}else e+=r.substr(a,6);a+=6}else if(n>=224){if(t-a>=9){var u=parseInt(r.substr(a+4,2),16),c=parseInt(r.substr(a+7,2),16);e+=String.fromCharCode((n&15)<<12|(u&63)<<6|c&63)}else e+=r.substr(a,9);a+=9}else e+=r.substr(a,3),a+=3}return e}function ue(r,e){function a(t){var n=M(t);return n.match(e.UNRESERVED)?n:t}return r.scheme&&(r.scheme=String(r.scheme).replace(e.PCT_ENCODED,a).toLowerCase().replace(e.NOT_SCHEME,"")),r.userinfo!==void 0&&(r.userinfo=String(r.userinfo).replace(e.PCT_ENCODED,a).replace(e.NOT_USERINFO,$).replace(e.PCT_ENCODED,R)),r.host!==void 0&&(r.host=String(r.host).replace(e.PCT_ENCODED,a).toLowerCase().replace(e.NOT_HOST,$).replace(e.PCT_ENCODED,R)),r.path!==void 0&&(r.path=String(r.path).replace(e.PCT_ENCODED,a).replace(r.scheme?e.NOT_PATH:e.NOT_PATH_NOSCHEME,$).replace(e.PCT_ENCODED,R)),r.query!==void 0&&(r.query=String(r.query).replace(e.PCT_ENCODED,a).replace(e.NOT_QUERY,$).replace(e.PCT_ENCODED,R)),r.fragment!==void 0&&(r.fragment=String(r.fragment).replace(e.PCT_ENCODED,a).replace(e.NOT_FRAGMENT,$).replace(e.PCT_ENCODED,R)),r}function he(r){return r.replace(/^0*(.*)/,"$1")||"0"}function se(r,e){var a=r.match(e.IPV4ADDRESS)||[],t=B(a,2),n=t[1];return n?n.split(".").map(he).join("."):r}function Ae(r,e){var a=r.match(e.IPV6ADDRESS)||[],t=B(a,3),n=t[1],f=t[2];if(n){for(var u=n.toLowerCase().split("::").reverse(),c=B(u,2),d=c[0],g=c[1],s=g?g.split(":").map(he):[],l=d.split(":").map(he),S=e.IPV4ADDRESS.test(l[l.length-1]),h=S?7:8,p=l.length-h,C=Array(h),E=0;E<h;++E)C[E]=s[E]||l[p+E]||"";S&&(C[h-1]=se(C[h-1],e));var b=C.reduce(function(A,F,q){if(!F||F==="0"){var w=A[A.length-1];w&&w.index+w.length===q?w.length++:A.push({index:q,length:1})}return A},[]),m=b.sort(function(A,F){return F.length-A.length})[0],P=void 0;if(m&&m.length>1){var Q=C.slice(0,m.index),H=C.slice(m.index+m.length);P=Q.join(":")+"::"+H.join(":")}else P=C.join(":");return f&&(P+="%"+f),P}else return r}var Be=/^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i,er="".match(/(){0}/)[1]===void 0;function U(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a={},t=e.iri!==!1?Y:L;e.reference==="suffix"&&(r=(e.scheme?e.scheme+":":"")+"//"+r);var n=r.match(Be);if(n){er?(a.scheme=n[1],a.userinfo=n[3],a.host=n[4],a.port=parseInt(n[5],10),a.path=n[6]||"",a.query=n[7],a.fragment=n[8],isNaN(a.port)&&(a.port=n[5])):(a.scheme=n[1]||void 0,a.userinfo=r.indexOf("@")!==-1?n[3]:void 0,a.host=r.indexOf("//")!==-1?n[4]:void 0,a.port=parseInt(n[5],10),a.path=n[6]||"",a.query=r.indexOf("?")!==-1?n[7]:void 0,a.fragment=r.indexOf("#")!==-1?n[8]:void 0,isNaN(a.port)&&(a.port=r.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/)?n[4]:void 0)),a.host&&(a.host=Ae(se(a.host,t),t)),a.scheme===void 0&&a.userinfo===void 0&&a.host===void 0&&a.port===void 0&&!a.path&&a.query===void 0?a.reference="same-document":a.scheme===void 0?a.reference="relative":a.fragment===void 0?a.reference="absolute":a.reference="uri",e.reference&&e.reference!=="suffix"&&e.reference!==a.reference&&(a.error=a.error||"URI is not a "+e.reference+" reference.");var f=y[(e.scheme||a.scheme||"").toLowerCase()];if(!e.unicodeSupport&&(!f||!f.unicodeSupport)){if(a.host&&(e.domainHost||f&&f.domainHost))try{a.host=j.toASCII(a.host.replace(t.PCT_ENCODED,M).toLowerCase())}catch(u){a.error=a.error||"Host's domain name can not be converted to ASCII via punycode: "+u}ue(a,L)}else ue(a,t);f&&f.parse&&f.parse(a,e)}else a.error=a.error||"URI can not be parsed.";return a}function rr(r,e){var a=e.iri!==!1?Y:L,t=[];return r.userinfo!==void 0&&(t.push(r.userinfo),t.push("@")),r.host!==void 0&&t.push(Ae(se(String(r.host),a),a).replace(a.IPV6ADDRESS,function(n,f,u){return"["+f+(u?"%25"+u:"")+"]"})),(typeof r.port=="number"||typeof r.port=="string")&&(t.push(":"),t.push(String(r.port))),t.length?t.join(""):void 0}var Re=/^\.\.?\//,Ie=/^\/\.(\/|$)/,Oe=/^\/\.\.(\/|$)/,ar=/^\/?(?:.|\n)*?(?=\/|$)/;function G(r){for(var e=[];r.length;)if(r.match(Re))r=r.replace(Re,"");else if(r.match(Ie))r=r.replace(Ie,"/");else if(r.match(Oe))r=r.replace(Oe,"/"),e.pop();else if(r==="."||r==="..")r="";else{var a=r.match(ar);if(a){var t=a[0];r=r.slice(t.length),e.push(t)}else throw new Error("Unexpected dot segment condition")}return e.join("")}function T(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=e.iri?Y:L,t=[],n=y[(e.scheme||r.scheme||"").toLowerCase()];if(n&&n.serialize&&n.serialize(r,e),r.host&&!a.IPV6ADDRESS.test(r.host)){if(e.domainHost||n&&n.domainHost)try{r.host=e.iri?j.toUnicode(r.host):j.toASCII(r.host.replace(a.PCT_ENCODED,M).toLowerCase())}catch(c){r.error=r.error||"Host's domain name can not be converted to "+(e.iri?"Unicode":"ASCII")+" via punycode: "+c}}ue(r,a),e.reference!=="suffix"&&r.scheme&&(t.push(r.scheme),t.push(":"));var f=rr(r,e);if(f!==void 0&&(e.reference!=="suffix"&&t.push("//"),t.push(f),r.path&&r.path.charAt(0)!=="/"&&t.push("/")),r.path!==void 0){var u=r.path;!e.absolutePath&&(!n||!n.absolutePath)&&(u=G(u)),f===void 0&&(u=u.replace(/^\/\//,"/%2F")),t.push(u)}return r.query!==void 0&&(t.push("?"),t.push(r.query)),r.fragment!==void 0&&(t.push("#"),t.push(r.fragment)),t.join("")}function $e(r,e){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},t=arguments[3],n={};return t||(r=U(T(r,a),a),e=U(T(e,a),a)),a=a||{},!a.tolerant&&e.scheme?(n.scheme=e.scheme,n.userinfo=e.userinfo,n.host=e.host,n.port=e.port,n.path=G(e.path||""),n.query=e.query):(e.userinfo!==void 0||e.host!==void 0||e.port!==void 0?(n.userinfo=e.userinfo,n.host=e.host,n.port=e.port,n.path=G(e.path||""),n.query=e.query):(e.path?(e.path.charAt(0)==="/"?n.path=G(e.path):((r.userinfo!==void 0||r.host!==void 0||r.port!==void 0)&&!r.path?n.path="/"+e.path:r.path?n.path=r.path.slice(0,r.path.lastIndexOf("/")+1)+e.path:n.path=e.path,n.path=G(n.path)),n.query=e.query):(n.path=r.path,e.query!==void 0?n.query=e.query:n.query=r.query),n.userinfo=r.userinfo,n.host=r.host,n.port=r.port),n.scheme=r.scheme),n.fragment=e.fragment,n}function nr(r,e,a){var t=Le({scheme:"null"},a);return T($e(U(r,t),U(e,t),t,!0),t)}function tr(r,e){return typeof r=="string"?r=T(U(r,e),e):_(r)==="object"&&(r=U(T(r,e),e)),r}function ir(r,e,a){return typeof r=="string"?r=T(U(r,a),a):_(r)==="object"&&(r=T(r,a)),typeof e=="string"?e=T(U(e,a),a):_(e)==="object"&&(e=T(e,a)),r===e}function fr(r,e){return r&&r.toString().replace(!e||!e.iri?L.ESCAPE:Y.ESCAPE,$)}function x(r,e){return r&&r.toString().replace(!e||!e.iri?L.PCT_ENCODED:Y.PCT_ENCODED,M)}var J={scheme:"http",domainHost:!0,parse:function(e,a){return e.host||(e.error=e.error||"HTTP URIs must have a host."),e},serialize:function(e,a){var t=String(e.scheme).toLowerCase()==="https";return(e.port===(t?443:80)||e.port==="")&&(e.port=void 0),e.path||(e.path="/"),e}},Te={scheme:"https",domainHost:J.domainHost,parse:J.parse,serialize:J.serialize};function Ne(r){return typeof r.secure=="boolean"?r.secure:String(r.scheme).toLowerCase()==="wss"}var K={scheme:"ws",domainHost:!0,parse:function(e,a){var t=e;return t.secure=Ne(t),t.resourceName=(t.path||"/")+(t.query?"?"+t.query:""),t.path=void 0,t.query=void 0,t},serialize:function(e,a){if((e.port===(Ne(e)?443:80)||e.port==="")&&(e.port=void 0),typeof e.secure=="boolean"&&(e.scheme=e.secure?"wss":"ws",e.secure=void 0),e.resourceName){var t=e.resourceName.split("?"),n=B(t,2),f=n[0],u=n[1];e.path=f&&f!=="/"?f:void 0,e.query=u,e.resourceName=void 0}return e.fragment=void 0,e}},me={scheme:"wss",domainHost:K.domainHost,parse:K.parse,serialize:K.serialize},ur={},Pe="[A-Za-z0-9\\-\\.\\_\\~\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]",N="[0-9A-Fa-f]",hr=i(i("%[EFef]"+N+"%"+N+N+"%"+N+N)+"|"+i("%[89A-Fa-f]"+N+"%"+N+N)+"|"+i("%"+N+N)),sr="[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]",cr="[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]",vr=v(cr,'[\\"\\\\]'),or="[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]",lr=new RegExp(Pe,"g"),X=new RegExp(hr,"g"),dr=new RegExp(v("[^]",sr,"[\\.]",'[\\"]',vr),"g"),Fe=new RegExp(v("[^]",Pe,or),"g"),pr=Fe;function ce(r){var e=M(r);return e.match(lr)?e:r}var Ue={scheme:"mailto",parse:function(e,a){var t=e,n=t.to=t.path?t.path.split(","):[];if(t.path=void 0,t.query){for(var f=!1,u={},c=t.query.split("&"),d=0,g=c.length;d<g;++d){var s=c[d].split("=");switch(s[0]){case"to":for(var l=s[1].split(","),S=0,h=l.length;S<h;++S)n.push(l[S]);break;case"subject":t.subject=x(s[1],a);break;case"body":t.body=x(s[1],a);break;default:f=!0,u[x(s[0],a)]=x(s[1],a);break}}f&&(t.headers=u)}t.query=void 0;for(var p=0,C=n.length;p<C;++p){var E=n[p].split("@");if(E[0]=x(E[0]),a.unicodeSupport)E[1]=x(E[1],a).toLowerCase();else try{E[1]=j.toASCII(x(E[1],a).toLowerCase())}catch(b){t.error=t.error||"Email address's domain name can not be converted to ASCII via punycode: "+b}n[p]=E.join("@")}return t},serialize:function(e,a){var t=e,n=qe(e.to);if(n){for(var f=0,u=n.length;f<u;++f){var c=String(n[f]),d=c.lastIndexOf("@"),g=c.slice(0,d).replace(X,ce).replace(X,R).replace(dr,$),s=c.slice(d+1);try{s=a.iri?j.toUnicode(s):j.toASCII(x(s,a).toLowerCase())}catch(p){t.error=t.error||"Email address's domain name can not be converted to "+(a.iri?"Unicode":"ASCII")+" via punycode: "+p}n[f]=g+"@"+s}t.path=n.join(",")}var l=e.headers=e.headers||{};e.subject&&(l.subject=e.subject),e.body&&(l.body=e.body);var S=[];for(var h in l)l[h]!==ur[h]&&S.push(h.replace(X,ce).replace(X,R).replace(Fe,$)+"="+l[h].replace(X,ce).replace(X,R).replace(pr,$));return S.length&&(t.query=S.join("&")),t}},Er=/^([^\:]+)\:(.*)/,xe={scheme:"urn",parse:function(e,a){var t=e.path&&e.path.match(Er),n=e;if(t){var f=a.scheme||n.scheme||"urn",u=t[1].toLowerCase(),c=t[2],d=f+":"+(a.nid||u),g=y[d];n.nid=u,n.nss=c,n.path=void 0,g&&(n=g.parse(n,a))}else n.error=n.error||"URN can not be parsed.";return n},serialize:function(e,a){var t=a.scheme||e.scheme||"urn",n=e.nid,f=t+":"+(a.nid||n),u=y[f];u&&(e=u.serialize(e,a));var c=e,d=e.nss;return c.path=(n||a.nid)+":"+d,c}},gr=/^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/,we={scheme:"urn:uuid",parse:function(e,a){var t=e;return t.uuid=t.nss,t.nss=void 0,!a.tolerant&&(!t.uuid||!t.uuid.match(gr))&&(t.error=t.error||"UUID is not valid."),t},serialize:function(e,a){var t=e;return t.nss=(e.uuid||"").toLowerCase(),t}};y[J.scheme]=J,y[Te.scheme]=Te,y[K.scheme]=K,y[me.scheme]=me,y[Ue.scheme]=Ue,y[xe.scheme]=xe,y[we.scheme]=we,o.SCHEMES=y,o.pctEncChar=$,o.pctDecChars=M,o.parse=U,o.removeDotSegments=G,o.serialize=T,o.resolveComponents=$e,o.resolve=nr,o.normalize=tr,o.equal=ir,o.escapeComponent=fr,o.unescapeComponent=x,Object.defineProperty(o,"__esModule",{value:!0})})})(ve,ve.exports);var yr=ve.exports;export{Cr as f,yr as u};
