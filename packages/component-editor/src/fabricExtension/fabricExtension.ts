import { fabric } from "fabric";

export function extendImageWidget() {
  /* ====  Image  =====*/

  fabric.util.object.extend(fabric.Image.prototype, {
    /**
     * Following changes are due to NS_ERROR_NOT_AVAILABLE exception in firefox so
     * Following code is for fix image quality issue
     * Here we are using anti-alise technique to enhance image quality
     * For that we have to pass width, height and image element to the function
     * Function will return anti- alised canvas element
     * This element is drawn as widget
     */

    _render: function (ctx: any, noTransform: any) {
      try {
        var imageElement = this._element;

        this.lockUniScaling =
          this.PreserveWidgetAspectRatio != undefined
            ? this.PreserveWidgetAspectRatio
            : true;
        // if (this.PreserveImageAspectRatio) {
        //   this.drawImageForImageAspectRatio(ctx, imageElement, noTransform);
        // } else {
        this.drawImageOnContext(
          ctx,
          imageElement,
          noTransform,
          this.width,
          this.height
        );
        //}

        if (
          this.isMoving !== true &&
          this.resizeFilter &&
          this._needsResize()
        ) {
          this.applyResizeFilters();
        }
        this._stroke(ctx);
      } catch (err) {
        console.log(err);
      }
    },

    drawImageOnContext: function (
      ctx: any,
      imageElement: any,
      noTransform: any,
      width: any,
      height: any
    ) {
      imageElement &&
        ctx.drawImage(
          imageElement,
          noTransform ? this.left : -width / 2,
          noTransform ? this.top : -height / 2,
          width,
          height
        );
    },
    _toSVG: function () {
      let svgString = [],
        imageMarkup = [],
        strokeSvg: any,
        element = this._element,
        x = -this.width / 2,
        y = -this.height / 2,
        clipPath = "",
        imageRendering = "";
      if (!element) {
        return [];
      }
      if (this.hasCrop()) {
        let clipPathId = this.id;
        svgString.push(
          '<clipPath id="imageCrop_' + clipPathId + '">\n',
          '\t<rect x="' +
            x +
            '" y="' +
            y +
            '" width="' +
            this.width +
            '" height="' +
            this.height +
            '" />\n',
          "</clipPath>\n"
        );
        clipPath = ' clip-path="url(#imageCrop_' + clipPathId + ')" ';
      }
      if (!this.imageSmoothing) {
        imageRendering = '" image-rendering="optimizeSpeed';
      }
      imageMarkup.push(
        "\t<image ",
        "COMMON_PARTS",
        'xlink:href="',
        this.getSvgSrc(true),
        '" x="',
        x - this.cropX,
        '" y="',
        y - this.cropY,
        // we're essentially moving origin of transformation from top/left corner to the center of the shape
        // by wrapping it in container <g> element with actual transformation, then offsetting object to the top/left
        // so that object's center aligns with container's left/top
        '" width="',
        this.width || element.naturalWidth,
        '" height="',
        this.height || element.height,
        imageRendering,
        '"',
        clipPath,
        "></image>\n"
      );

      if (this.stroke || this.strokeDashArray) {
        var origFill = this.fill;
        this.fill = null;
        strokeSvg = [
          "\t<rect ",
          'x="',
          x,
          '" y="',
          y,
          '" width="',
          this.width,
          '" height="',
          this.height,
          '" style="',
          this.getSvgStyles(),
          '"/>\n',
        ];
        this.fill = origFill;
      }
      if (this.paintFirst !== "fill") {
        svgString = svgString.concat(strokeSvg, imageMarkup);
      } else {
        svgString = svgString.concat(imageMarkup, strokeSvg);
      }
      return svgString;
    },
  });

  fabric.util.object.extend(fabric.Textbox.prototype, {
    editable: false,

    calcTextHeight: function () {
      if (this.isAutoFontSize) {
        return this.height;
      } else {
        var lineHeight,
          height = 0;
        for (var i = 0, len = this._textLines.length; i < len; i++) {
          lineHeight = this.getHeightOfLine(i);
          height += i === len - 1 ? lineHeight / this.lineHeight : lineHeight;
        }
        return height;
      }
    },
  });

  fabric.util.object.extend(
    fabric.StaticCanvas.prototype,
    /** @lends fabric.Path.prototype */ {
      _setSVGHeader: function (markup: any, options: any) {
        let toFixed = fabric.util.toFixed;

        let width = options.width || this.width,
          height = options.height || this.height,
          vpt,
          viewBox = 'viewBox="0 0 ' + this.width + " " + this.height + '" ',
          NUM_FRACTION_DIGITS: any = fabric.Object.NUM_FRACTION_DIGITS;

        if (options.viewBox) {
          viewBox =
            'viewBox="' +
            options.viewBox.x +
            " " +
            options.viewBox.y +
            " " +
            options.viewBox.width +
            " " +
            options.viewBox.height +
            '" ';
        } else {
          if (this.svgViewportTransformation) {
            vpt = this.viewportTransform;
            viewBox =
              'viewBox="' +
              toFixed(-vpt[4] / vpt[0], NUM_FRACTION_DIGITS) +
              " " +
              toFixed(-vpt[5] / vpt[3], NUM_FRACTION_DIGITS) +
              " " +
              toFixed(this.width / vpt[0], NUM_FRACTION_DIGITS) +
              " " +
              toFixed(this.height / vpt[3], NUM_FRACTION_DIGITS) +
              '" ';
          }
        }

        markup.push(
          "<svg ",
          'xmlns="http://www.w3.org/2000/svg" ',
          'xmlns:xlink="http://www.w3.org/1999/xlink" ',
          'version="1.1" ',
          'width="',
          options.printAreaWidth,
          '" ',
          'height="',
          options.printAreaHeight,
          '" ',
          'x="' + options.xPosition + '" ',
          'y="' + options.yPosition + '" ',

          viewBox,
          'xml:space="preserve">\n',
          "<desc>Created with Fabric.js ",
          fabric.version,
          "</desc>\n",
          "<defs>\n",
          this.createSVGFontFacesMarkup(),
          this.createSVGRefElementsMarkup(),
          this.createSVGClipPathMarkup(options),
          "</defs>\n"
        );
      },
    }
  );
}
