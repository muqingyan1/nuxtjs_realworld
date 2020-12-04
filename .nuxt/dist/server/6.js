exports.ids = [6];
exports.modules = {

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return login; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return register; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return updateUser; });
/* harmony import */ var _plugins_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
 // 登陆

const login = data => {
  return Object(_plugins_request__WEBPACK_IMPORTED_MODULE_0__[/* request */ "b"])({
    method: 'POST',
    url: '/api/users/login',
    data
  });
}; // 注册

const register = data => {
  return Object(_plugins_request__WEBPACK_IMPORTED_MODULE_0__[/* request */ "b"])({
    method: 'POST',
    url: '/api/users',
    data
  });
}; // 修改用户信息

const updateUser = data => {
  return Object(_plugins_request__WEBPACK_IMPORTED_MODULE_0__[/* request */ "b"])({
    method: 'PUT',
    url: '/api/user',
    data
  });
};

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./pages/settings/index.vue?vue&type=template&id=23bfa480&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"settings-page"},[_vm._ssrNode("<div class=\"container page\"><div class=\"row\"><div class=\"col-md-6 offset-md-3 col-xs-12\"><h1 class=\"text-xs-center\">Your Settings</h1> <ul class=\"error-messages\">"+(_vm._ssrList((_vm.errors),function(messages,field){return ((_vm._ssrList((messages),function(message,index){return ("<li>"+_vm._ssrEscape(_vm._s(field)+" "+_vm._s(message))+"</li>")})))}))+"</ul> <form><fieldset><fieldset class=\"form-group\"><input"+(_vm._ssrAttr("disabled",_vm.disabled))+" type=\"text\" placeholder=\"URL of profile picture\""+(_vm._ssrAttr("value",(_vm.author.image)))+" class=\"form-control\"></fieldset> <fieldset class=\"form-group\"><input"+(_vm._ssrAttr("disabled",_vm.disabled))+" type=\"text\" placeholder=\"Your Name\""+(_vm._ssrAttr("value",(_vm.author.username)))+" class=\"form-control form-control-lg\"></fieldset> <fieldset class=\"form-group\"><textarea"+(_vm._ssrAttr("disabled",_vm.disabled))+" rows=\"8\" placeholder=\"Short bio about you\" class=\"form-control form-control-lg\">"+_vm._ssrEscape(_vm._s(_vm.author.bio))+"</textarea></fieldset> <fieldset class=\"form-group\"><input"+(_vm._ssrAttr("disabled",_vm.disabled))+" type=\"email\" placeholder=\"Email\""+(_vm._ssrAttr("value",(_vm.author.email)))+" class=\"form-control form-control-lg\"></fieldset> <fieldset class=\"form-group\"><input"+(_vm._ssrAttr("disabled",_vm.disabled))+" type=\"password\" placeholder=\"Password\""+(_vm._ssrAttr("value",(_vm.author.password)))+" class=\"form-control form-control-lg\"></fieldset> <button class=\"btn btn-lg btn-primary pull-xs-right\">\n                Update Settings\n              </button></fieldset></form> <hr> <button class=\"btn btn-outline-danger\">\n          Or click here to logout.\n        </button></div></div></div>")])}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/settings/index.vue?vue&type=template&id=23bfa480&

// EXTERNAL MODULE: ./api/user.js
var user = __webpack_require__(28);

// EXTERNAL MODULE: external "vuex"
var external_vuex_ = __webpack_require__(2);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/settings/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
const Cookie =  false ? undefined : undefined;


/* harmony default export */ var settingsvue_type_script_lang_js_ = ({
  name: 'SettingIndex',
  middleware: 'auth',

  data() {
    return {
      author: {
        username: '',
        email: '',
        bio: '',
        image: '',
        password: ''
      },
      disabled: false,
      errors: {}
    };
  },

  computed: { ...Object(external_vuex_["mapState"])(['user'])
  },

  mounted() {
    this.author.bio = this.user.bio;
    this.author.email = this.user.email;
    this.author.image = this.user.image;
    this.author.password = this.user.password;
    this.author.username = this.user.username;
  },

  methods: {
    async onSubmit() {
      this.disabled = true;

      try {
        const {
          data
        } = await Object(user["c" /* updateUser */])({
          user: this.author
        }); // 成功后跳转到该文章页面 /article/slug
        // 更新用户的登录状态

        this.$store.commit('setUser', data.user); // 为了防止刷新页面数据丢失，数据需要持久化

        Cookie.set('user', data.user);
        this.$router.push(`/profile/${data.user.username}`); // const { slug } = data
        // this.$router.push({
        //   name: 'article',
        //   params: {
        //     slug
        //   }
        // })
      } catch (err) {
        this.disabled = false;
        this.errors = err.response.data.errors;
      }
    },

    logout() {
      // 删除用户的登录状态
      this.$store.commit('setUser', null); // 删除数据持久化

      Cookie.set('user', null);
      this.$router.push('/');
    }

  }
});
// CONCATENATED MODULE: ./pages/settings/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_settingsvue_type_script_lang_js_ = (settingsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./pages/settings/index.vue



function injectStyles (context) {
  
  
}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_settingsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "40e3fe46"
  
)

/* harmony default export */ var settings = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=6.js.map