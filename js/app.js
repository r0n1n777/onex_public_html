/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! ./scriptsLanding.js */ "./resources/js/scriptsLanding.js");

__webpack_require__(/*! ./scriptsAdmin.js */ "./resources/js/scriptsAdmin.js");

__webpack_require__(/*! ./pictureUpload.js */ "./resources/js/pictureUpload.js");

/***/ }),

/***/ "./resources/js/pictureUpload.js":
/*!***************************************!*\
  !*** ./resources/js/pictureUpload.js ***!
  \***************************************/
/***/ (() => {

$image_crop = $('#picture-box').croppie({
  enableExif: true,
  viewport: {
    width: 250,
    height: 250,
    type: 'circle' //circle

  },
  boundary: {
    width: 300,
    height: 300
  }
});
$('#close-profile-picture-modal').on('click', function () {
  $('#picture-file').val('');
});
$("#profile-picture-modal").on('hidden.bs.modal', function () {
  $('#picture-file').val('');
});
$('#picture-file').on('change', function () {
  var file = this.files[0];
  var fileType = file["type"];
  var fileSize = file["size"];
  var validImageTypes = ["image/jpg", "image/jpeg", "image/png"];

  if ($.inArray(fileType, validImageTypes) > 0) {
    if (fileSize < 5242880) {
      var reader = new FileReader();

      reader.onload = function (event) {
        $image_crop.croppie('bind', {
          url: event.target.result
        }).then(function () {
          console.log('jQuery Bind Complete');
        });
      };

      reader.readAsDataURL(this.files[0]);
      $('#profile-picture-modal').modal('show');
    } else {
      $('#profile-picture-modal-error-content').html('File size exceeded the limit of 5 MB.');
      $('#profile-picture-modal-error').modal('show');
    }
  } else {
    $('#profile-picture-modal-error-content').html('JPG and PNG are the only accepted files.');
    $('#profile-picture-modal-error').modal('show');
  }
});
$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});
$('#crop-upload-picture').on('click', function (event) {
  $image_crop.croppie('result', {
    type: 'canvas',
    size: 'viewport'
  }).then(function (response) {
    $.ajax({
      url: "profile/upload",
      type: "POST",
      data: {
        image: response
      },
      success: function success(data) {
        window.location.href = "profile";
      }
    });
  });
});

/***/ }),

/***/ "./resources/js/scriptsAdmin.js":
/*!**************************************!*\
  !*** ./resources/js/scriptsAdmin.js ***!
  \**************************************/
/***/ (() => {

(function ($) {
  "use strict"; // Enable Bootstrap tooltips via data-attributes globally

  $('[data-toggle="tooltip"]').tooltip(); // Enable Bootstrap popovers via data-attributes globally

  $('[data-toggle="popover"]').popover();
  $(".popover-dismiss").popover({
    trigger: "focus"
  }); // Add active state to sidbar nav links

  var path = window.location.href; // because the 'href' property of the DOM element is the absolute path

  $("#layoutSidenav_nav .sidenav a.nav-link").each(function () {
    if (this.href === path) {
      $(this).addClass("active");
    }
  }); // Toggle the side navigation

  $("#sidebarToggle").on("click", function (e) {
    e.preventDefault();
    $("body").toggleClass("sidenav-toggled");
  }); // Activate Feather icons

  feather.replace(); // Activate Bootstrap scrollspy for the sticky nav component

  $("body").scrollspy({
    target: "#stickyNav",
    offset: 82
  }); // Scrolls to an offset anchor when a sticky nav link is clicked

  $('.nav-sticky a.nav-link[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");

      if (target.length) {
        $("html, body").animate({
          scrollTop: target.offset().top - 81
        }, 200);
        return false;
      }
    }
  }); // Click to collapse responsive sidebar

  $("#layoutSidenav_content").click(function () {
    var BOOTSTRAP_LG_WIDTH = 992;

    if (window.innerWidth >= 992) {
      return;
    }

    if ($("body").hasClass("sidenav-toggled")) {
      $("body").toggleClass("sidenav-toggled");
    }
  }); // Init sidebar

  var activatedPath = window.location.pathname.match(/([\w-]+\.html)/, '$1');

  if (activatedPath) {
    activatedPath = activatedPath[0];
  } else {
    activatedPath = 'index.html';
  }

  var targetAnchor = $('[href="' + activatedPath + '"]');
  var collapseAncestors = targetAnchor.parents('.collapse');
  targetAnchor.addClass('active');
  collapseAncestors.each(function () {
    $(this).addClass('show');
    $('[data-target="#' + this.id + '"]').removeClass('collapsed');
  }); // Copy to clipboard button

  $("#copy-button").on("click", function () {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($('#affiliate-link').text()).select();
    document.execCommand("copy");
    $temp.remove();
    $("#copied").removeClass('d-none');
  });
})(jQuery);

/***/ }),

/***/ "./resources/js/scriptsLanding.js":
/*!****************************************!*\
  !*** ./resources/js/scriptsLanding.js ***!
  \****************************************/
/***/ (() => {

/*!
    * Start Bootstrap - SB UI Kit Pro v1.1.1 (https://shop.startbootstrap.com/product/sb-ui-kit-pro)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under SEE_LICENSE (https://github.com/BlackrockDigital/sb-ui-kit-pro/blob/master/LICENSE)
    */
(function ($) {
  "use strict"; // Enable Bootstrap tooltips via data-attributes globally

  $('[data-toggle="tooltip"]').tooltip(); // Enable Bootstrap popovers via data-attributes globally

  $('[data-toggle="popover"]').popover();
  $(".popover-dismiss").popover({
    trigger: "focus"
  }); // Activate Feather icons

  feather.replace(); // Activate Bootstrap scrollspy for the sticky nav component

  $("body").scrollspy({
    target: "#stickyNav",
    offset: 82
  }); // Scrolls to an offset anchor when a sticky nav link is clicked

  $('.nav-sticky a.nav-link[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");

      if (target.length) {
        $("html, body").animate({
          scrollTop: target.offset().top - 81
        }, 200);
        return false;
      }
    }
  }); // Collapse Navbar
  // Add styling fallback for when a transparent background .navbar-marketing is scrolled

  var navbarCollapse = function navbarCollapse() {
    if ($(".navbar-marketing.bg-transparent.fixed-top").length === 0) {
      return;
    }

    if ($(".navbar-marketing.bg-transparent.fixed-top").offset().top > 0) {
      $(".navbar-marketing").addClass("navbar-scrolled");
    } else {
      $(".navbar-marketing").removeClass("navbar-scrolled");
    }
  }; // Collapse now if page is not at top


  navbarCollapse(); // Collapse the navbar when page is scrolled

  $(window).scroll(navbarCollapse);
})(jQuery);

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					result = fn();
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/app": 0,
/******/ 			"css/app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			__webpack_require__.O();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./resources/js/app.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./resources/sass/app.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;