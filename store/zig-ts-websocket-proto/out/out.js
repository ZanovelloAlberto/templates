"use strict";(()=>{var d=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var et=d((ye,tt)=>{"use strict";tt.exports=re;function re(e,t){for(var r=new Array(arguments.length-1),n=0,i=2,o=!0;i<arguments.length;)r[n++]=arguments[i++];return new Promise(function(a,s){r[n]=function(l){if(o)if(o=!1,l)s(l);else{for(var w=new Array(arguments.length-1),O=0;O<w.length;)w[O++]=arguments[O];a.apply(null,w)}};try{e.apply(t||null,r)}catch(u){o&&(o=!1,s(u))}})}});var ot=d(it=>{"use strict";var j=it;j.length=function(t){var r=t.length;if(!r)return 0;for(var n=0;--r%4>1&&t.charAt(r)==="=";)++n;return Math.ceil(t.length*3)/4-n};var D=new Array(64),nt=new Array(123);for(B=0;B<64;)nt[D[B]=B<26?B+65:B<52?B+71:B<62?B-4:B-59|43]=B++;var B;j.encode=function(t,r,n){for(var i=null,o=[],f=0,a=0,s;r<n;){var u=t[r++];switch(a){case 0:o[f++]=D[u>>2],s=(u&3)<<4,a=1;break;case 1:o[f++]=D[s|u>>4],s=(u&15)<<2,a=2;break;case 2:o[f++]=D[s|u>>6],o[f++]=D[u&63],a=0;break}f>8191&&((i||(i=[])).push(String.fromCharCode.apply(String,o)),f=0)}return a&&(o[f++]=D[s],o[f++]=61,a===1&&(o[f++]=61)),i?(f&&i.push(String.fromCharCode.apply(String,o.slice(0,f))),i.join("")):String.fromCharCode.apply(String,o.slice(0,f))};var rt="invalid encoding";j.decode=function(t,r,n){for(var i=n,o=0,f,a=0;a<t.length;){var s=t.charCodeAt(a++);if(s===61&&o>1)break;if((s=nt[s])===void 0)throw Error(rt);switch(o){case 0:f=s,o=1;break;case 1:r[n++]=f<<2|(s&48)>>4,f=s,o=2;break;case 2:r[n++]=(f&15)<<4|(s&60)>>2,f=s,o=3;break;case 3:r[n++]=(f&3)<<6|s,o=0;break}}if(o===1)throw Error(rt);return n-i};j.test=function(t){return/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(t)}});var ut=d((_e,st)=>{"use strict";st.exports=M;function M(){this._listeners={}}M.prototype.on=function(t,r,n){return(this._listeners[t]||(this._listeners[t]=[])).push({fn:r,ctx:n||this}),this};M.prototype.off=function(t,r){if(t===void 0)this._listeners={};else if(r===void 0)this._listeners[t]=[];else for(var n=this._listeners[t],i=0;i<n.length;)n[i].fn===r?n.splice(i,1):++i;return this};M.prototype.emit=function(t){var r=this._listeners[t];if(r){for(var n=[],i=1;i<arguments.length;)n.push(arguments[i++]);for(i=0;i<r.length;)r[i].fn.apply(r[i++].ctx,n)}return this}});var dt=d((me,pt)=>{"use strict";pt.exports=ft(ft);function ft(e){return typeof Float32Array<"u"?function(){var t=new Float32Array([-0]),r=new Uint8Array(t.buffer),n=r[3]===128;function i(s,u,l){t[0]=s,u[l]=r[0],u[l+1]=r[1],u[l+2]=r[2],u[l+3]=r[3]}function o(s,u,l){t[0]=s,u[l]=r[3],u[l+1]=r[2],u[l+2]=r[1],u[l+3]=r[0]}e.writeFloatLE=n?i:o,e.writeFloatBE=n?o:i;function f(s,u){return r[0]=s[u],r[1]=s[u+1],r[2]=s[u+2],r[3]=s[u+3],t[0]}function a(s,u){return r[3]=s[u],r[2]=s[u+1],r[1]=s[u+2],r[0]=s[u+3],t[0]}e.readFloatLE=n?f:a,e.readFloatBE=n?a:f}():function(){function t(n,i,o,f){var a=i<0?1:0;if(a&&(i=-i),i===0)n(1/i>0?0:2147483648,o,f);else if(isNaN(i))n(2143289344,o,f);else if(i>34028234663852886e22)n((a<<31|2139095040)>>>0,o,f);else if(i<11754943508222875e-54)n((a<<31|Math.round(i/1401298464324817e-60))>>>0,o,f);else{var s=Math.floor(Math.log(i)/Math.LN2),u=Math.round(i*Math.pow(2,-s)*8388608)&8388607;n((a<<31|s+127<<23|u)>>>0,o,f)}}e.writeFloatLE=t.bind(null,at),e.writeFloatBE=t.bind(null,ht);function r(n,i,o){var f=n(i,o),a=(f>>31)*2+1,s=f>>>23&255,u=f&8388607;return s===255?u?NaN:a*(1/0):s===0?a*1401298464324817e-60*u:a*Math.pow(2,s-150)*(u+8388608)}e.readFloatLE=r.bind(null,lt),e.readFloatBE=r.bind(null,ct)}(),typeof Float64Array<"u"?function(){var t=new Float64Array([-0]),r=new Uint8Array(t.buffer),n=r[7]===128;function i(s,u,l){t[0]=s,u[l]=r[0],u[l+1]=r[1],u[l+2]=r[2],u[l+3]=r[3],u[l+4]=r[4],u[l+5]=r[5],u[l+6]=r[6],u[l+7]=r[7]}function o(s,u,l){t[0]=s,u[l]=r[7],u[l+1]=r[6],u[l+2]=r[5],u[l+3]=r[4],u[l+4]=r[3],u[l+5]=r[2],u[l+6]=r[1],u[l+7]=r[0]}e.writeDoubleLE=n?i:o,e.writeDoubleBE=n?o:i;function f(s,u){return r[0]=s[u],r[1]=s[u+1],r[2]=s[u+2],r[3]=s[u+3],r[4]=s[u+4],r[5]=s[u+5],r[6]=s[u+6],r[7]=s[u+7],t[0]}function a(s,u){return r[7]=s[u],r[6]=s[u+1],r[5]=s[u+2],r[4]=s[u+3],r[3]=s[u+4],r[2]=s[u+5],r[1]=s[u+6],r[0]=s[u+7],t[0]}e.readDoubleLE=n?f:a,e.readDoubleBE=n?a:f}():function(){function t(n,i,o,f,a,s){var u=f<0?1:0;if(u&&(f=-f),f===0)n(0,a,s+i),n(1/f>0?0:2147483648,a,s+o);else if(isNaN(f))n(0,a,s+i),n(2146959360,a,s+o);else if(f>17976931348623157e292)n(0,a,s+i),n((u<<31|2146435072)>>>0,a,s+o);else{var l;if(f<22250738585072014e-324)l=f/5e-324,n(l>>>0,a,s+i),n((u<<31|l/4294967296)>>>0,a,s+o);else{var w=Math.floor(Math.log(f)/Math.LN2);w===1024&&(w=1023),l=f*Math.pow(2,-w),n(l*4503599627370496>>>0,a,s+i),n((u<<31|w+1023<<20|l*1048576&1048575)>>>0,a,s+o)}}}e.writeDoubleLE=t.bind(null,at,0,4),e.writeDoubleBE=t.bind(null,ht,4,0);function r(n,i,o,f,a){var s=n(f,a+i),u=n(f,a+o),l=(u>>31)*2+1,w=u>>>20&2047,O=4294967296*(u&1048575)+s;return w===2047?O?NaN:l*(1/0):w===0?l*5e-324*O:l*Math.pow(2,w-1075)*(O+4503599627370496)}e.readDoubleLE=r.bind(null,lt,0,4),e.readDoubleBE=r.bind(null,ct,4,0)}(),e}function at(e,t,r){t[r]=e&255,t[r+1]=e>>>8&255,t[r+2]=e>>>16&255,t[r+3]=e>>>24}function ht(e,t,r){t[r]=e>>>24,t[r+1]=e>>>16&255,t[r+2]=e>>>8&255,t[r+3]=e&255}function lt(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0}function ct(e,t){return(e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3])>>>0}});var yt=d((exports,module)=>{"use strict";module.exports=inquire;function inquire(moduleName){try{var mod=eval("quire".replace(/^/,"re"))(moduleName);if(mod&&(mod.length||Object.keys(mod).length))return mod}catch(e){}return null}});var _t=d(gt=>{"use strict";var R=gt;R.length=function(t){for(var r=0,n=0,i=0;i<t.length;++i)n=t.charCodeAt(i),n<128?r+=1:n<2048?r+=2:(n&64512)===55296&&(t.charCodeAt(i+1)&64512)===56320?(++i,r+=4):r+=3;return r};R.read=function(t,r,n){var i=n-r;if(i<1)return"";for(var o=null,f=[],a=0,s;r<n;)s=t[r++],s<128?f[a++]=s:s>191&&s<224?f[a++]=(s&31)<<6|t[r++]&63:s>239&&s<365?(s=((s&7)<<18|(t[r++]&63)<<12|(t[r++]&63)<<6|t[r++]&63)-65536,f[a++]=55296+(s>>10),f[a++]=56320+(s&1023)):f[a++]=(s&15)<<12|(t[r++]&63)<<6|t[r++]&63,a>8191&&((o||(o=[])).push(String.fromCharCode.apply(String,f)),a=0);return o?(a&&o.push(String.fromCharCode.apply(String,f.slice(0,a))),o.join("")):String.fromCharCode.apply(String,f.slice(0,a))};R.write=function(t,r,n){for(var i=n,o,f,a=0;a<t.length;++a)o=t.charCodeAt(a),o<128?r[n++]=o:o<2048?(r[n++]=o>>6|192,r[n++]=o&63|128):(o&64512)===55296&&((f=t.charCodeAt(a+1))&64512)===56320?(o=65536+((o&1023)<<10)+(f&1023),++a,r[n++]=o>>18|240,r[n++]=o>>12&63|128,r[n++]=o>>6&63|128,r[n++]=o&63|128):(r[n++]=o>>12|224,r[n++]=o>>6&63|128,r[n++]=o&63|128);return n-i}});var wt=d((ve,mt)=>{"use strict";mt.exports=ne;function ne(e,t,r){var n=r||8192,i=n>>>1,o=null,f=n;return function(s){if(s<1||s>i)return e(s);f+s>n&&(o=e(n),f=0);var u=t.call(o,f,f+=s);return f&7&&(f=(f|7)+1),u}}});var Bt=d((Be,vt)=>{"use strict";vt.exports=y;var N=x();function y(e,t){this.lo=e>>>0,this.hi=t>>>0}var F=y.zero=new y(0,0);F.toNumber=function(){return 0};F.zzEncode=F.zzDecode=function(){return this};F.length=function(){return 1};var ie=y.zeroHash="\0\0\0\0\0\0\0\0";y.fromNumber=function(t){if(t===0)return F;var r=t<0;r&&(t=-t);var n=t>>>0,i=(t-n)/4294967296>>>0;return r&&(i=~i>>>0,n=~n>>>0,++n>4294967295&&(n=0,++i>4294967295&&(i=0))),new y(n,i)};y.from=function(t){if(typeof t=="number")return y.fromNumber(t);if(N.isString(t))if(N.Long)t=N.Long.fromString(t);else return y.fromNumber(parseInt(t,10));return t.low||t.high?new y(t.low>>>0,t.high>>>0):F};y.prototype.toNumber=function(t){if(!t&&this.hi>>>31){var r=~this.lo+1>>>0,n=~this.hi>>>0;return r||(n=n+1>>>0),-(r+n*4294967296)}return this.lo+this.hi*4294967296};y.prototype.toLong=function(t){return N.Long?new N.Long(this.lo|0,this.hi|0,!!t):{low:this.lo|0,high:this.hi|0,unsigned:!!t}};var S=String.prototype.charCodeAt;y.fromHash=function(t){return t===ie?F:new y((S.call(t,0)|S.call(t,1)<<8|S.call(t,2)<<16|S.call(t,3)<<24)>>>0,(S.call(t,4)|S.call(t,5)<<8|S.call(t,6)<<16|S.call(t,7)<<24)>>>0)};y.prototype.toHash=function(){return String.fromCharCode(this.lo&255,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,this.hi&255,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)};y.prototype.zzEncode=function(){var t=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^t)>>>0,this.lo=(this.lo<<1^t)>>>0,this};y.prototype.zzDecode=function(){var t=-(this.lo&1);return this.lo=((this.lo>>>1|this.hi<<31)^t)>>>0,this.hi=(this.hi>>>1^t)>>>0,this};y.prototype.length=function(){var t=this.lo,r=(this.lo>>>28|this.hi<<4)>>>0,n=this.hi>>>24;return n===0?r===0?t<16384?t<128?1:2:t<2097152?3:4:r<16384?r<128?5:6:r<2097152?7:8:n<128?9:10}});var x=d(W=>{"use strict";var h=W;h.asPromise=et();h.base64=ot();h.EventEmitter=ut();h.float=dt();h.inquire=yt();h.utf8=_t();h.pool=wt();h.LongBits=Bt();h.isNode=!!(typeof global<"u"&&global&&global.process&&global.process.versions&&global.process.versions.node);h.global=h.isNode&&global||typeof window<"u"&&window||typeof self<"u"&&self||W;h.emptyArray=Object.freeze?Object.freeze([]):[];h.emptyObject=Object.freeze?Object.freeze({}):{};h.isInteger=Number.isInteger||function(t){return typeof t=="number"&&isFinite(t)&&Math.floor(t)===t};h.isString=function(t){return typeof t=="string"||t instanceof String};h.isObject=function(t){return t&&typeof t=="object"};h.isset=h.isSet=function(t,r){var n=t[r];return n!=null&&t.hasOwnProperty(r)?typeof n!="object"||(Array.isArray(n)?n.length:Object.keys(n).length)>0:!1};h.Buffer=function(){try{var e=h.inquire("buffer").Buffer;return e.prototype.utf8Write?e:null}catch{return null}}();h._Buffer_from=null;h._Buffer_allocUnsafe=null;h.newBuffer=function(t){return typeof t=="number"?h.Buffer?h._Buffer_allocUnsafe(t):new h.Array(t):h.Buffer?h._Buffer_from(t):typeof Uint8Array>"u"?t:new Uint8Array(t)};h.Array=typeof Uint8Array<"u"?Uint8Array:Array;h.Long=h.global.dcodeIO&&h.global.dcodeIO.Long||h.global.Long||h.inquire("long");h.key2Re=/^true|false|0|1$/;h.key32Re=/^-?(?:0|[1-9][0-9]*)$/;h.key64Re=/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;h.longToHash=function(t){return t?h.LongBits.from(t).toHash():h.LongBits.zeroHash};h.longFromHash=function(t,r){var n=h.LongBits.fromHash(t);return h.Long?h.Long.fromBits(n.lo,n.hi,r):n.toNumber(!!r)};function bt(e,t,r){for(var n=Object.keys(t),i=0;i<n.length;++i)(e[n[i]]===void 0||!r)&&(e[n[i]]=t[n[i]]);return e}h.merge=bt;h.lcFirst=function(t){return t.charAt(0).toLowerCase()+t.substring(1)};function Et(e){function t(r,n){if(!(this instanceof t))return new t(r,n);Object.defineProperty(this,"message",{get:function(){return r}}),Error.captureStackTrace?Error.captureStackTrace(this,t):Object.defineProperty(this,"stack",{value:new Error().stack||""}),n&&bt(this,n)}return t.prototype=Object.create(Error.prototype,{constructor:{value:t,writable:!0,enumerable:!1,configurable:!0},name:{get:function(){return e},set:void 0,enumerable:!1,configurable:!0},toString:{value:function(){return this.name+": "+this.message},writable:!0,enumerable:!1,configurable:!0}}),t}h.newError=Et;h.ProtocolError=Et("ProtocolError");h.oneOfGetter=function(t){for(var r={},n=0;n<t.length;++n)r[t[n]]=1;return function(){for(var i=Object.keys(this),o=i.length-1;o>-1;--o)if(r[i[o]]===1&&this[i[o]]!==void 0&&this[i[o]]!==null)return i[o]}};h.oneOfSetter=function(t){return function(r){for(var n=0;n<t.length;++n)t[n]!==r&&delete this[t[n]]}};h.toJSONOptions={longs:String,enums:String,bytes:String,json:!0};h._configure=function(){var e=h.Buffer;if(!e){h._Buffer_from=h._Buffer_allocUnsafe=null;return}h._Buffer_from=e.from!==Uint8Array.from&&e.from||function(r,n){return new e(r,n)},h._Buffer_allocUnsafe=e.allocUnsafe||function(r){return new e(r)}}});var $=d((Ee,xt)=>{"use strict";xt.exports=c;var v=x(),T,z=v.LongBits,At=v.base64,kt=v.utf8;function P(e,t,r){this.fn=e,this.len=t,this.next=void 0,this.val=r}function J(){}function oe(e){this.head=e.head,this.tail=e.tail,this.len=e.len,this.next=e.states}function c(){this.len=0,this.head=new P(J,0,0),this.tail=this.head,this.states=null}var St=function(){return v.Buffer?function(){return(c.create=function(){return new T})()}:function(){return new c}};c.create=St();c.alloc=function(t){return new v.Array(t)};v.Array!==Array&&(c.alloc=v.pool(c.alloc,v.Array.prototype.subarray));c.prototype._push=function(t,r,n){return this.tail=this.tail.next=new P(t,r,n),this.len+=r,this};function U(e,t,r){t[r]=e&255}function se(e,t,r){for(;e>127;)t[r++]=e&127|128,e>>>=7;t[r]=e}function V(e,t){this.len=e,this.next=void 0,this.val=t}V.prototype=Object.create(P.prototype);V.prototype.fn=se;c.prototype.uint32=function(t){return this.len+=(this.tail=this.tail.next=new V((t=t>>>0)<128?1:t<16384?2:t<2097152?3:t<268435456?4:5,t)).len,this};c.prototype.int32=function(t){return t<0?this._push(Z,10,z.fromNumber(t)):this.uint32(t)};c.prototype.sint32=function(t){return this.uint32((t<<1^t>>31)>>>0)};function Z(e,t,r){for(;e.hi;)t[r++]=e.lo&127|128,e.lo=(e.lo>>>7|e.hi<<25)>>>0,e.hi>>>=7;for(;e.lo>127;)t[r++]=e.lo&127|128,e.lo=e.lo>>>7;t[r++]=e.lo}c.prototype.uint64=function(t){var r=z.from(t);return this._push(Z,r.length(),r)};c.prototype.int64=c.prototype.uint64;c.prototype.sint64=function(t){var r=z.from(t).zzEncode();return this._push(Z,r.length(),r)};c.prototype.bool=function(t){return this._push(U,1,t?1:0)};function H(e,t,r){t[r]=e&255,t[r+1]=e>>>8&255,t[r+2]=e>>>16&255,t[r+3]=e>>>24}c.prototype.fixed32=function(t){return this._push(H,4,t>>>0)};c.prototype.sfixed32=c.prototype.fixed32;c.prototype.fixed64=function(t){var r=z.from(t);return this._push(H,4,r.lo)._push(H,4,r.hi)};c.prototype.sfixed64=c.prototype.fixed64;c.prototype.float=function(t){return this._push(v.float.writeFloatLE,4,t)};c.prototype.double=function(t){return this._push(v.float.writeDoubleLE,8,t)};var ue=v.Array.prototype.set?function(t,r,n){r.set(t,n)}:function(t,r,n){for(var i=0;i<t.length;++i)r[n+i]=t[i]};c.prototype.bytes=function(t){var r=t.length>>>0;if(!r)return this._push(U,1,0);if(v.isString(t)){var n=c.alloc(r=At.length(t));At.decode(t,n,0),t=n}return this.uint32(r)._push(ue,r,t)};c.prototype.string=function(t){var r=kt.length(t);return r?this.uint32(r)._push(kt.write,r,t):this._push(U,1,0)};c.prototype.fork=function(){return this.states=new oe(this),this.head=this.tail=new P(J,0,0),this.len=0,this};c.prototype.reset=function(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new P(J,0,0),this.len=0),this};c.prototype.ldelim=function(){var t=this.head,r=this.tail,n=this.len;return this.reset().uint32(n),n&&(this.tail.next=t.next,this.tail=r,this.len+=n),this};c.prototype.finish=function(){for(var t=this.head.next,r=this.constructor.alloc(this.len),n=0;t;)t.fn(t.val,r,n),n+=t.len,t=t.next;return r};c._configure=function(e){T=e,c.create=St(),T._configure()}});var Ft=d((Ae,Ot)=>{"use strict";Ot.exports=A;var Lt=$();(A.prototype=Object.create(Lt.prototype)).constructor=A;var L=x();function A(){Lt.call(this)}A._configure=function(){A.alloc=L._Buffer_allocUnsafe,A.writeBytesBuffer=L.Buffer&&L.Buffer.prototype instanceof Uint8Array&&L.Buffer.prototype.set.name==="set"?function(t,r,n){r.set(t,n)}:function(t,r,n){if(t.copy)t.copy(r,n,0,t.length);else for(var i=0;i<t.length;)r[n++]=t[i++]}};A.prototype.bytes=function(t){L.isString(t)&&(t=L._Buffer_from(t,"base64"));var r=t.length>>>0;return this.uint32(r),r&&this._push(A.writeBytesBuffer,r,t),this};function fe(e,t,r){e.length<40?L.utf8.write(e,t,r):t.utf8Write?t.utf8Write(e,r):t.write(e,r)}A.prototype.string=function(t){var r=L.Buffer.byteLength(t);return this.uint32(r),r&&this._push(fe,r,t),this};A._configure()});var K=d((ke,Ct)=>{"use strict";Ct.exports=p;var b=x(),X,Nt=b.LongBits,ae=b.utf8;function E(e,t){return RangeError("index out of range: "+e.pos+" + "+(t||1)+" > "+e.len)}function p(e){this.buf=e,this.pos=0,this.len=e.length}var qt=typeof Uint8Array<"u"?function(t){if(t instanceof Uint8Array||Array.isArray(t))return new p(t);throw Error("illegal buffer")}:function(t){if(Array.isArray(t))return new p(t);throw Error("illegal buffer")},Pt=function(){return b.Buffer?function(r){return(p.create=function(i){return b.Buffer.isBuffer(i)?new X(i):qt(i)})(r)}:qt};p.create=Pt();p.prototype._slice=b.Array.prototype.subarray||b.Array.prototype.slice;p.prototype.uint32=function(){var t=4294967295;return function(){if(t=(this.buf[this.pos]&127)>>>0,this.buf[this.pos++]<128||(t=(t|(this.buf[this.pos]&127)<<7)>>>0,this.buf[this.pos++]<128)||(t=(t|(this.buf[this.pos]&127)<<14)>>>0,this.buf[this.pos++]<128)||(t=(t|(this.buf[this.pos]&127)<<21)>>>0,this.buf[this.pos++]<128)||(t=(t|(this.buf[this.pos]&15)<<28)>>>0,this.buf[this.pos++]<128))return t;if((this.pos+=5)>this.len)throw this.pos=this.len,E(this,10);return t}}();p.prototype.int32=function(){return this.uint32()|0};p.prototype.sint32=function(){var t=this.uint32();return t>>>1^-(t&1)|0};function G(){var e=new Nt(0,0),t=0;if(this.len-this.pos>4){for(;t<4;++t)if(e.lo=(e.lo|(this.buf[this.pos]&127)<<t*7)>>>0,this.buf[this.pos++]<128)return e;if(e.lo=(e.lo|(this.buf[this.pos]&127)<<28)>>>0,e.hi=(e.hi|(this.buf[this.pos]&127)>>4)>>>0,this.buf[this.pos++]<128)return e;t=0}else{for(;t<3;++t){if(this.pos>=this.len)throw E(this);if(e.lo=(e.lo|(this.buf[this.pos]&127)<<t*7)>>>0,this.buf[this.pos++]<128)return e}return e.lo=(e.lo|(this.buf[this.pos++]&127)<<t*7)>>>0,e}if(this.len-this.pos>4){for(;t<5;++t)if(e.hi=(e.hi|(this.buf[this.pos]&127)<<t*7+3)>>>0,this.buf[this.pos++]<128)return e}else for(;t<5;++t){if(this.pos>=this.len)throw E(this);if(e.hi=(e.hi|(this.buf[this.pos]&127)<<t*7+3)>>>0,this.buf[this.pos++]<128)return e}throw Error("invalid varint encoding")}p.prototype.bool=function(){return this.uint32()!==0};function I(e,t){return(e[t-4]|e[t-3]<<8|e[t-2]<<16|e[t-1]<<24)>>>0}p.prototype.fixed32=function(){if(this.pos+4>this.len)throw E(this,4);return I(this.buf,this.pos+=4)};p.prototype.sfixed32=function(){if(this.pos+4>this.len)throw E(this,4);return I(this.buf,this.pos+=4)|0};function Dt(){if(this.pos+8>this.len)throw E(this,8);return new Nt(I(this.buf,this.pos+=4),I(this.buf,this.pos+=4))}p.prototype.float=function(){if(this.pos+4>this.len)throw E(this,4);var t=b.float.readFloatLE(this.buf,this.pos);return this.pos+=4,t};p.prototype.double=function(){if(this.pos+8>this.len)throw E(this,4);var t=b.float.readDoubleLE(this.buf,this.pos);return this.pos+=8,t};p.prototype.bytes=function(){var t=this.uint32(),r=this.pos,n=this.pos+t;if(n>this.len)throw E(this,t);if(this.pos+=t,Array.isArray(this.buf))return this.buf.slice(r,n);if(r===n){var i=b.Buffer;return i?i.alloc(0):new this.buf.constructor(0)}return this._slice.call(this.buf,r,n)};p.prototype.string=function(){var t=this.bytes();return ae.read(t,0,t.length)};p.prototype.skip=function(t){if(typeof t=="number"){if(this.pos+t>this.len)throw E(this,t);this.pos+=t}else do if(this.pos>=this.len)throw E(this);while(this.buf[this.pos++]&128);return this};p.prototype.skipType=function(e){switch(e){case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for(;(e=this.uint32()&7)!==4;)this.skipType(e);break;case 5:this.skip(4);break;default:throw Error("invalid wire type "+e+" at offset "+this.pos)}return this};p._configure=function(e){X=e,p.create=Pt(),X._configure();var t=b.Long?"toLong":"toNumber";b.merge(p.prototype,{int64:function(){return G.call(this)[t](!1)},uint64:function(){return G.call(this)[t](!0)},sint64:function(){return G.call(this).zzDecode()[t](!1)},fixed64:function(){return Dt.call(this)[t](!0)},sfixed64:function(){return Dt.call(this)[t](!1)}})}});var It=d((Se,zt)=>{"use strict";zt.exports=q;var Mt=K();(q.prototype=Object.create(Mt.prototype)).constructor=q;var jt=x();function q(e){Mt.call(this,e)}q._configure=function(){jt.Buffer&&(q.prototype._slice=jt.Buffer.prototype.slice)};q.prototype.string=function(){var t=this.uint32();return this.buf.utf8Slice?this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+t,this.len)):this.buf.toString("utf-8",this.pos,this.pos=Math.min(this.pos+t,this.len))};q._configure()});var Wt=d((xe,Rt)=>{"use strict";Rt.exports=C;var Q=x();(C.prototype=Object.create(Q.EventEmitter.prototype)).constructor=C;function C(e,t,r){if(typeof e!="function")throw TypeError("rpcImpl must be a function");Q.EventEmitter.call(this),this.rpcImpl=e,this.requestDelimited=!!t,this.responseDelimited=!!r}C.prototype.rpcCall=function e(t,r,n,i,o){if(!i)throw TypeError("request must be specified");var f=this;if(!o)return Q.asPromise(e,f,t,r,n,i);if(!f.rpcImpl){setTimeout(function(){o(Error("already ended"))},0);return}try{return f.rpcImpl(t,r[f.requestDelimited?"encodeDelimited":"encode"](i).finish(),function(s,u){if(s)return f.emit("error",s,t),o(s);if(u===null){f.end(!0);return}if(!(u instanceof n))try{u=n[f.responseDelimited?"decodeDelimited":"decode"](u)}catch(l){return f.emit("error",l,t),o(l)}return f.emit("data",u,t),o(null,u)})}catch(a){f.emit("error",a,t),setTimeout(function(){o(a)},0);return}};C.prototype.end=function(t){return this.rpcImpl&&(t||this.rpcImpl(null,null,null),this.rpcImpl=null,this.emit("end").off()),this}});var Ht=d(Tt=>{"use strict";var he=Tt;he.Service=Wt()});var Ut=d((Oe,Jt)=>{"use strict";Jt.exports={}});var $t=d(Zt=>{"use strict";var _=Zt;_.build="minimal";_.Writer=$();_.BufferWriter=Ft();_.Reader=K();_.BufferReader=It();_.util=x();_.rpc=Ht();_.roots=Ut();_.configure=Vt;function Vt(){_.util._configure(),_.Writer._configure(_.BufferWriter),_.Reader._configure(_.BufferReader)}Vt()});var Xt=d((qe,Gt)=>{"use strict";Gt.exports=$t()});var ee=d(g=>{"use strict";Object.defineProperty(g,"__esModule",{value:!0});g.AddressBook=g.Person=g.Info=g.protobufPackage=void 0;var k=Xt();g.protobufPackage="ok";function Kt(){return{}}g.Info={encode:function(e,t){return t===void 0&&(t=k.Writer.create()),t},decode:function(e,t){for(var r=e instanceof k.Reader?e:k.Reader.create(e),n=t===void 0?r.len:r.pos+t,i=Kt();r.pos<n;){var o=r.uint32();switch(o>>>3){}if((o&7)===4||o===0)break;r.skipType(o&7)}return i},fromJSON:function(e){return{}},toJSON:function(e){var t={};return t},create:function(e){return g.Info.fromPartial(e??{})},fromPartial:function(e){var t=Kt();return t}};function Qt(){return{name:"",age:0}}g.Person={encode:function(e,t){return t===void 0&&(t=k.Writer.create()),e.name!==""&&t.uint32(10).string(e.name),e.age!==0&&t.uint32(16).int32(e.age),t},decode:function(e,t){for(var r=e instanceof k.Reader?e:k.Reader.create(e),n=t===void 0?r.len:r.pos+t,i=Qt();r.pos<n;){var o=r.uint32();switch(o>>>3){case 1:if(o!==10)break;i.name=r.string();continue;case 2:if(o!==16)break;i.age=r.int32();continue}if((o&7)===4||o===0)break;r.skipType(o&7)}return i},fromJSON:function(e){return{name:te(e.name)?globalThis.String(e.name):"",age:te(e.age)?globalThis.Number(e.age):0}},toJSON:function(e){var t={};return e.name!==""&&(t.name=e.name),e.age!==0&&(t.age=Math.round(e.age)),t},create:function(e){return g.Person.fromPartial(e??{})},fromPartial:function(e){var t,r,n=Qt();return n.name=(t=e.name)!==null&&t!==void 0?t:"",n.age=(r=e.age)!==null&&r!==void 0?r:0,n}};function Yt(){return{people:[]}}g.AddressBook={encode:function(e,t){t===void 0&&(t=k.Writer.create());for(var r=0,n=e.people;r<n.length;r++){var i=n[r];g.Person.encode(i,t.uint32(10).fork()).ldelim()}return t},decode:function(e,t){for(var r=e instanceof k.Reader?e:k.Reader.create(e),n=t===void 0?r.len:r.pos+t,i=Yt();r.pos<n;){var o=r.uint32();switch(o>>>3){case 1:if(o!==10)break;i.people.push(g.Person.decode(r,r.uint32()));continue}if((o&7)===4||o===0)break;r.skipType(o&7)}return i},fromJSON:function(e){return{people:globalThis.Array.isArray(e?.people)?e.people.map(function(t){return g.Person.fromJSON(t)}):[]}},toJSON:function(e){var t,r={};return!((t=e.people)===null||t===void 0)&&t.length&&(r.people=e.people.map(function(n){return g.Person.toJSON(n)})),r},create:function(e){return g.AddressBook.fromPartial(e??{})},fromPartial:function(e){var t,r=Yt();return r.people=((t=e.people)===null||t===void 0?void 0:t.map(function(n){return g.Person.fromPartial(n)}))||[],r}};function te(e){return e!=null}});var pe=d(m=>{Object.defineProperty(m,"__esModule",{value:!0});m.socket=m.endpoint=m.port=void 0;m.port=3010;m.endpoint="ws://127.0.0.1:".concat(m.port);m.socket=new WebSocket(m.endpoint);m.socket.binaryType="arraybuffer";var Y=ee(),le=Y.Person.create({age:10,name:"AAA"}),ce=Y.Person.encode(le).finish();ce.forEach(function(e){console.log(e)});m.socket.addEventListener("close",function(){console.log("close")});m.socket.addEventListener("open",function(e){console.log("open")});m.socket.addEventListener("message",function(e){var t=Y.Person.decode(new Uint8Array(e.data));console.log(t);var r=new Uint8Array(e.data);r.forEach(function(n){console.log(n)})})});pe();})();
