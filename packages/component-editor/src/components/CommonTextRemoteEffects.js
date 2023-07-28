
(function () {
    'use strict';
    var toFixed = fabric.util.toFixed;

    fabric.CommonTextRemoteEffects = fabric.util.createClass(/** @lends fabric.Pattern.prototype */ {

        /**
        * Set Text object Image which is created from server with embroidery pattern
        * @type String
        * @default
        */
        textSrc: "",


        /**
        * Set TextSrx image element
        * @type Image Element
        * @default
        */
        textImageElement: new Image(),

        /**
       * Set Selected Pattern Unique Name
       * @type String
       * @default
       */
        SelectedPattern: "",

        /**
       * Set Selected Pattern Name
       * @type String
       * @default
       */
        PatternName: "",

        /**
        * Set TextSrc Left position inside text box
        * @type Number
        * @default
        */
        textSrcLeft: "",

        /**
       * Set TextSrc Top position inside text box
       * @type Number
       * @default
       */
        textSrcTop: "",

        type: "Embroidery",


        /**
         * Constructor
         * @param {Object} [options] Options object
         * @param {Function} [callback] function to invoke after callback init.
         * @return {fabric.Pattern} thisArg
         */
        initialize: function (options, callback) {
            if (typeof options !== 'string' && options) {
                options = options;
                for (var prop in options) {
                    this[prop] = options[prop];
                }
            }

        },
        /* Function is used to draw TextSrc instead of text */
        drawTextImage: function (object, method, ctx, chars, left, top) {
            var _this = this;
            if (object.textImageElement && object.textImageElement.src) {
                this.drawTextImageObject(object, method, ctx, chars, left, top);
            } else if (object.textSrc) {
                var replacement = fabric.util.createImage();
                replacement.onload = function () {
                    _this.textImageElement = replacement;
                    _this.drawTextImageObject(object, method, ctx, chars, left, top);
                }
                replacement.crossOrigin = 'anonymous';
                replacement.src = _this.textSrc;
            } else {
                ctx[method](chars, left, top);
            }
        },
        /*
        * Function is used to draw Embroidery Pattern TextSrc instead of text
        */
        drawEmbroideryImage: function (object, method, ctx, chars, left, top) {
            var _this = this;
            if (object.textImageElement && object.textImageElement.src) {
                this.drawTextImageObject(object, method, ctx, chars, left, top);
            } else if (object.textSrc) {
                var replacement = fabric.util.createImage();
                replacement.onload = function () {
                    _this.textImageElement = replacement;
                    _this.drawTextImageObject(object, method, ctx, chars, left, top);
                }
                replacement.crossOrigin = 'anonymous';
                replacement.src = _this.textSrc;
            } else {
                ctx[method](chars, left, top);
            }
        },


        /*
        * function is used to draw image instead of text, when any remote effects is applied
        */
        drawTextImageObject: function (object, method, ctx, chars, left, top) {
            this.setLeftTopByTextAlign(object, left, top);
            ctx.drawImage(object.textImageElement, object.textSrcLeft, object.textSrcTop, object.textImageElement.width, object.textImageElement.height);
        },

        setLeftTopByTextAlign: function (object, left, top) {

            this.setLeftByTextAlign(object, left, top);
            this.setTopByVAlign(object, left, top);

        },

        /*
        * Sets TextSrc Left position by text horizonatal alignment
        */
        setLeftByTextAlign: function (object, left, top) {
            switch (object.textAlign) {
                case "left":
                    object.textSrcLeft = -((object.width) / 2); break;
                case "center":
                    object.textSrcLeft = -object.textImageElement.width / 2 + left; break;
                case "right":
                    var newLeft = -object.textImageElement.width / 2 + (-object.width / 2 * 2);
                    var diff = (object.width - (object.textImageElement.width)) / 2;
                    newLeft += diff;
                    object.textSrcLeft = newLeft; break;
            }
        },

        /*
        * Sets TextSrc Top position by text vertical alignment
        */
        setTopByVAlign: function (object, left, top) {
            switch (object.vAlign) {
                case "top":
                    object.textSrcTop = -((object.height) / 2); break;
                case "middle":
                    object.textSrcTop = -object.textImageElement.height / 2; break;
                case "bottom":
                    object.textSrcTop = -object.textImageElement.height / 2 - ((object.textImageElement.height - object.height) / 2); break;
            }

        },


        /**
         * Returns object representation of a pattern
         * @param {Array} [propertiesToInclude] Any properties that you might want to additionally include in the output
         * @return {Object} Object representation of a pattern instance
         */
        toObject: function (customFilters) {
            var object = {};
            if (this.type == "Embroidery") {
                object = {
                    type: this.type,
                    PatternName: this.PatternName,
                    SelectedPattern: this.SelectedPattern
                };
            } else if (this.type == "EmbossDeboss") {
                object = {
                    type: this.type,
                    background: this.background,
                    highLight: this.highLight,
                    subType: this.subType.toLowerCase()
                };
            }
            else if (this.type == Artifi.effectsConstant.TEXTURE_EFFECT) {
                object = {
                    type: this.type,
                    TextureImgName: this.TextureImgName || this.textureImgName
                };
            }
            else if (this.type == Artifi.effectsConstant.SHADOW_EFFECT) {
                object = {
                    type: this.type,
                    blur: customFilters.blur,
                    color: customFilters.color,
                    offsetX: customFilters.offsetX,
                    offsetY: customFilters.offsetY,
                    opacity: customFilters.opacity
                };
            }
            return object;
        },
        /* _TO_SVG_START_ */
        /**
         * Returns SVG representation of a emboss deboss
         * @param {fabric.Object} object
         * @return {String} SVG representation of a pattern
         */
        toSVG: function (object) {
            return '';
        },


    });
})();