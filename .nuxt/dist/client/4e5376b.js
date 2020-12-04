(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{181:function(t,e,r){"use strict";r.d(e,"d",(function(){return c})),r.d(e,"i",(function(){return o})),r.d(e,"k",(function(){return l})),r.d(e,"b",(function(){return d})),r.d(e,"f",(function(){return f})),r.d(e,"h",(function(){return m})),r.d(e,"j",(function(){return v})),r.d(e,"e",(function(){return h})),r.d(e,"l",(function(){return O})),r.d(e,"a",(function(){return x})),r.d(e,"c",(function(){return w})),r.d(e,"g",(function(){return j}));var n=r(59),c=function(data){return Object(n.b)({method:"POST",url:"/api/articles",data:data})},o=function(t){return Object(n.b)({method:"GET",url:"/api/articles",params:t})},l=function(t){return Object(n.b)({method:"GET",url:"/api/articles/feed",params:t})},d=function(t){return Object(n.b)({method:"POST",url:"/api/articles/".concat(t,"/favorite")})},f=function(t){return Object(n.b)({method:"DELETE",url:"/api/articles/".concat(t,"/favorite")})},m=function(t){return Object(n.b)({method:"GET",url:"/api/articles/".concat(t)})},v=function(t){return Object(n.b)({method:"GET",url:"/api/articles/".concat(t,"/comments")})},h=function(t){return Object(n.b)({method:"DELETE",url:"/api/articles/".concat(t)})},O=function(t,data){return Object(n.b)({method:"PUT",url:"/api/articles/".concat(t),data:data})},x=function(t,body){return Object(n.b)({method:"POST",url:"/api/articles/".concat(t,"/comments"),data:{body:body}})},w=function(t){return Object(n.b)({method:"POST",url:"/api/profiles/".concat(t,"/follow")})},j=function(t){return Object(n.b)({method:"DELETE",url:"/api/profiles/".concat(t,"/follow")})}},262:function(t,e,r){"use strict";r.r(e);r(62),r(63),r(29);var n=r(3),article=r(181),c={name:"Editor",middleware:"auth",data:function(){return{article:{title:"",description:"",body:"",tagList:[]},curtag:"",disabled:!1,errors:{}}},mounted:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n,data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(r=t.$route.params.slug)){e.next=8;break}return t.slug=r,e.next=5,Object(article.h)(r);case 5:n=e.sent,data=n.data,t.article=data.article;case 8:case"end":return e.stop()}}),e)})))()},methods:{savetags:function(){this.article.tagList.includes(this.curtag)||(this.article.tagList.push(this.curtag),this.curtag="")},deltag:function(t){this.article.tagList.splice(t,1)},onSubmit:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r,data,n,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.disabled=!0,e.prev=1,!t.slug){e.next=10;break}return e.next=5,Object(article.l)(t.slug,{article:t.article});case 5:r=e.sent,data=r.data,t.$router.push("/article/".concat(data.article.slug)),e.next=15;break;case 10:return e.next=12,Object(article.d)({article:t.article});case 12:n=e.sent,c=n.data,t.$router.push("/article/".concat(c.article.slug));case 15:e.next=21;break;case 17:e.prev=17,e.t0=e.catch(1),t.disabled=!1,t.errors=e.t0.response.data.errors;case 21:case"end":return e.stop()}}),e,null,[[1,17]])})))()}}},o=r(20),component=Object(o.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"editor-page"},[r("div",{staticClass:"container page"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-10 offset-md-1 col-xs-12"},[r("ul",{staticClass:"error-messages"},[t._l(t.errors,(function(e,n){return t._l(e,(function(e,c){return r("li",{key:c},[t._v(t._s(n)+" "+t._s(e))])}))}))],2),t._v(" "),r("form",[r("fieldset",[r("fieldset",{staticClass:"form-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.article.title,expression:"article.title"}],staticClass:"form-control form-control-lg",attrs:{disabled:t.disabled,required:"",type:"text",placeholder:"Article Title"},domProps:{value:t.article.title},on:{input:function(e){e.target.composing||t.$set(t.article,"title",e.target.value)}}})]),t._v(" "),r("fieldset",{staticClass:"form-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.article.description,expression:"article.description"}],staticClass:"form-control",attrs:{disabled:t.disabled,required:"",type:"text",placeholder:"What's this article about?"},domProps:{value:t.article.description},on:{input:function(e){e.target.composing||t.$set(t.article,"description",e.target.value)}}})]),t._v(" "),r("fieldset",{staticClass:"form-group"},[r("textarea",{directives:[{name:"model",rawName:"v-model",value:t.article.body,expression:"article.body"}],staticClass:"form-control",attrs:{disabled:t.disabled,required:"",rows:"8",placeholder:"Write your article (in markdown)"},domProps:{value:t.article.body},on:{input:function(e){e.target.composing||t.$set(t.article,"body",e.target.value)}}})]),t._v(" "),r("fieldset",{staticClass:"form-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.curtag,expression:"curtag"}],staticClass:"form-control",attrs:{disabled:t.disabled,type:"text",placeholder:"Enter tags"},domProps:{value:t.curtag},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.savetags(e)},input:function(e){e.target.composing||(t.curtag=e.target.value)}}}),t._v(" "),r("div",{staticClass:"tag-list"},t._l(t.article.tagList,(function(e,n){return r("span",{staticClass:"tag-default tag-pill"},[r("i",{staticClass:"ion-close-round",on:{click:function(e){return t.deltag(n)}}}),t._v("\n                  "+t._s(e)+"\n                ")])})),0)]),t._v(" "),r("button",{staticClass:"btn btn-lg pull-xs-right btn-primary",attrs:{disabled:t.disabled,type:"button"},on:{click:t.onSubmit}},[t._v("\n              Publish Article\n            ")])])])])])])])}),[],!1,null,null,null);e.default=component.exports}}]);