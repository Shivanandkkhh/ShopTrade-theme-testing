
/*<![CDATA[*/
(function () {
  var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
  if (window.ShopifyBuy) {
    if (window.ShopifyBuy.UI) {
      ShopifyBuyInit();
    } else {
      loadScript();
    }
  } else {
    loadScript();
  }
  function loadScript() {
    var script = document.createElement('script');
    script.async = true;
    script.src = scriptURL;
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
    script.onload = ShopifyBuyInit;
  }
  function ShopifyBuyInit() {
    var client = ShopifyBuy.buildClient({
      domain: 'shoptrade-testing.myshopify.com',
      storefrontAccessToken: 'a159493ab3c5207db0df0c9ad00b467d',
    });
    ShopifyBuy.UI.onReady(client).then(function (ui) {
      ui.createComponent('product', {
        id: '8303507013911',
        node: document.getElementById('product-component-1692962822267'),
        moneyFormat: 'Rs.%20%7B%7Bamount%7D%7D',
        options: {
  "product": {
    "styles": {
      "product": {
        "@media (min-width: 601px)": {
          "max-width": "calc(25% - 20px)",
          "margin-left": "20px",
          "margin-bottom": "50px"
        }
      },
      "button": {
        ":hover": {
          "background-color": "#351aff"
        },
        "background-color": "#1f0fdf",
        ":focus": {
          "background-color": "#351aff"
        }
      }
    },
    "contents": {
      "img": false,
      "title": false,
      "price": false
    },
    "text": {
      "button": "Add to cart"
    }
  },
  "productSet": {
    "styles": {
      "products": {
        "@media (min-width: 601px)": {
          "margin-left": "-20px"
        }
      }
    }
  },
  "modalProduct": {
    "contents": {
      "img": false,
      "imgWithCarousel": true,
      "button": false,
      "buttonWithQuantity": true
    },
    "styles": {
      "product": {
        "@media (min-width: 601px)": {
          "max-width": "100%",
          "margin-left": "0px",
          "margin-bottom": "0px"
        }
      },
      "button": {
        ":hover": {
          "background-color": "#351aff"
        },
        "background-color": "#1f0fdf",
        ":focus": {
          "background-color": "#351aff"
        }
      }
    },
    "text": {
      "button": "Add to cart"
    }
  },
  "option": {},
  "cart": {
    "styles": {
      "button": {
        ":hover": {
          "background-color": "#351aff"
        },
        "background-color": "#1f0fdf",
        ":focus": {
          "background-color": "#351aff"
        }
      }
    },
    "text": {
      "total": "Subtotal",
      "button": "Checkout"
    }
  },
  "toggle": {
    "styles": {
      "toggle": {
        "background-color": "#1f0fdf",
        ":hover": {
          "background-color": "#351aff"
        },
        ":focus": {
          "background-color": "#351aff"
        }
      }
    }
  }
},
      });
    });
  }
})();
/*]]>*/

//Infinite scroll
"use strict";
var Ajaxinate = function (config) {
    var settings = config || {},
        defaultSettings = { pagination: ".AjaxinatePagination", method: "scroll", container: ".AjaxinateLoop", offset: 0, loadingText: "Loading More", callback: null };
    (this.settings = Object.assign(defaultSettings, settings)),
        (this.addScrollListeners = this.addScrollListeners.bind(this)),
        (this.addClickListener = this.addClickListener.bind(this)),
        (this.checkIfPaginationInView = this.checkIfPaginationInView.bind(this)),
        (this.stopMultipleClicks = this.stopMultipleClicks.bind(this)),
        (this.destroy = this.destroy.bind(this)),
        (this.containerElement = document.querySelector(this.settings.container)),
        (this.paginationElement = document.querySelector(this.settings.pagination)),
        this.initialize();
};
(Ajaxinate.prototype.initialize = function () {
    if (this.containerElement) {
        var initializers = { click: this.addClickListener, scroll: this.addScrollListeners };
        initializers[this.settings.method]();
    }
}),
    (Ajaxinate.prototype.addScrollListeners = function () {
        this.paginationElement &&
            (document.addEventListener("scroll", this.checkIfPaginationInView), window.addEventListener("resize", this.checkIfPaginationInView), window.addEventListener("orientationchange", this.checkIfPaginationInView));
    }),
    (Ajaxinate.prototype.addClickListener = function () {
        this.paginationElement &&
            ((this.nextPageLinkElement = this.paginationElement.querySelector("a")), (this.clickActive = !0), this.nextPageLinkElement !== null && this.nextPageLinkElement.addEventListener("click", this.stopMultipleClicks));
    }),
    (Ajaxinate.prototype.stopMultipleClicks = function (event) {
        event.preventDefault(), this.clickActive && ((this.nextPageLinkElement.innerHTML = this.settings.loadingText), (this.nextPageUrl = this.nextPageLinkElement.href), (this.clickActive = !1), this.loadMore());
    }),
    (Ajaxinate.prototype.checkIfPaginationInView = function () {
        var top = this.paginationElement.getBoundingClientRect().top - this.settings.offset,
            bottom = this.paginationElement.getBoundingClientRect().bottom + this.settings.offset;
        top <= window.innerHeight &&
            bottom >= 0 &&
            ((this.nextPageLinkElement = this.paginationElement.querySelector("a")),
            this.removeScrollListener(),
            this.nextPageLinkElement && ((this.nextPageLinkElement.innerHTML = this.settings.loadingText), (this.nextPageUrl = this.nextPageLinkElement.href), this.loadMore()));
    }),
    (Ajaxinate.prototype.loadMore = function () {
        (this.request = new XMLHttpRequest()),
            (this.request.onreadystatechange = function () {
                if (this.request.readyState === 4 && this.request.status === 200) {
                    var newContainer = this.request.responseXML.querySelectorAll(this.settings.container)[0],
                        newPagination = this.request.responseXML.querySelectorAll(this.settings.pagination)[0];
                    this.containerElement.insertAdjacentHTML("beforeend", newContainer.innerHTML),
                        (this.paginationElement.innerHTML = newPagination.innerHTML),
                        this.settings.callback && typeof this.settings.callback == "function" && this.settings.callback(this.request.responseXML),
                        this.initialize();
                }
            }.bind(this)),
            this.request.open("GET", this.nextPageUrl),
            (this.request.responseType = "document"),
            this.request.send();
    }),
    (Ajaxinate.prototype.removeClickListener = function () {
        this.nextPageLinkElement.addEventListener("click", this.stopMultipleClicks);
    }),
    (Ajaxinate.prototype.removeScrollListener = function () {
        document.removeEventListener("scroll", this.checkIfPaginationInView), window.removeEventListener("resize", this.checkIfPaginationInView), window.removeEventListener("orientationchange", this.checkIfPaginationInView);
    }),
    (Ajaxinate.prototype.destroy = function () {
        var destroyers = { click: this.removeClickListener, scroll: this.removeScrollListener };
        return destroyers[this.settings.method](), this;
    });

