/**
 * Created by paul666 on 2016/3/17.
 */
(function () {
    "use strict";
    window.PModal = function PModal(option) {
        var app = this;
        if(arguments.length==0){
            option ={};
        }
        var defaultCSS = ".modal-overlay,.preloader-indicator-overlay,.popup-overlay{position:absolute;left:0;top:0;width:100%;height:100%;background:rgba(0, 0, 0, .4);z-index:10600;visibility:hidden;opacity:0;-webkit-transition-duration:400ms;transition-duration:400ms}.modal-overlay.modal-overlay-visible,.preloader-indicator-overlay.modal-overlay-visible,.popup-overlay.modal-overlay-visible{visibility:visible;opacity:1}.popup-overlay{z-index:10200}" +
            ".modal{width:270px;position:absolute;z-index:11000;left:50%;margin-left:-135px;margin-top:0;top:50%;text-align:center;border-radius:7px;opacity:0;-webkit-transform:translate3d(0, 0, 0) scale(1.185);transform:translate3d(0, 0, 0) scale(1.185);-webkit-transition-property:-webkit-transform, opacity;-moz-transition-property:-moz-transform, opacity;-ms-transition-property:-ms-transform, opacity;-o-transition-property:-o-transform, opacity;transition-property:transform, opacity;color:#000;display:none}.modal.modal-in{opacity:1;-webkit-transition-duration:400ms;transition-duration:400ms;-webkit-transform:translate3d(0, 0, 0) scale(1);transform:translate3d(0, 0, 0) scale(1)}.modal.modal-out{opacity:0;z-index:10999;-webkit-transition-duration:400ms;transition-duration:400ms;-webkit-transform:translate3d(0, 0, 0) scale(0.815);transform:translate3d(0, 0, 0) scale(0.815)}.modal-inner.no-button{padding:15px;border-radius:7px;}.modal-inner{padding:15px;border-radius:7px 7px 0 0;position:relative;background:#e8e8e8}.modal-inner.no-button:after{height:0}.modal-inner:after{content:'';position:absolute;left:0;bottom:0;right:auto;top:auto;height:1px;width:100%;background-color:#b5b5b5;display:block;z-index:15;-webkit-transform-origin:50% 100%;transform-origin:50% 100%}html.pixel-ratio-2 .modal-inner:after{-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}html.pixel-ratio-3 .modal-inner:after{-webkit-transform:scaleY(0.33);transform:scaleY(0.33)}.modal-title{font-weight:500;font-size:18px;text-align:center}.modal-title + .modal-text{margin-top:5px}.modal-buttons{height:44px;overflow:hidden;display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center}.modal-buttons.modal-buttons-vertical{display:block;height:auto}.modal-button{width:100%;padding:0 5px;height:44px;font-size:17px;line-height:44px;text-align:center;color:#007aff;background:#e8e8e8;display:block;position:relative;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;cursor:pointer;box-sizing:border-box;-webkit-box-flex:1;-ms-flex:1}.modal-button:after{content:'';position:absolute;right:0;top:0;left:auto;bottom:auto;width:1px;height:100%;background-color:#b5b5b5;display:block;z-index:15;-webkit-transform-origin:100% 50%;transform-origin:100% 50%}html.pixel-ratio-2 .modal-button:after{-webkit-transform:scaleX(0.5);transform:scaleX(0.5)}html.pixel-ratio-3 .modal-button:after{-webkit-transform:scaleX(0.33);transform:scaleX(0.33)}.modal-button:first-child{border-radius:0 0 0 7px}.modal-button:last-child{border-radius:0 0 7px 0}.modal-button:last-child:after{display:none}.modal-button:first-child:last-child{border-radius:0 0 7px 7px}.modal-button.modal-button-bold{font-weight:500}html:not(.watch-active-state) .modal-button:active,.modal-button.active-state{background:#d4d4d4}.modal-buttons-vertical .modal-button{border-radius:0}.modal-buttons-vertical .modal-button:after{display:none}.modal-buttons-vertical .modal-button:before{display:none}.modal-buttons-vertical .modal-button:after{content:'';position:absolute;left:0;bottom:0;right:auto;top:auto;height:1px;width:100%;background-color:#b5b5b5;display:block;z-index:15;-webkit-transform-origin:50% 100%;transform-origin:50% 100%}html.pixel-ratio-2 .modal-buttons-vertical .modal-button:after{-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}html.pixel-ratio-3 .modal-buttons-vertical .modal-button:after{-webkit-transform:scaleY(0.33);transform:scaleY(0.33)}.modal-buttons-vertical .modal-button:last-child{border-radius:0 0 7px 7px}.modal-buttons-vertical .modal-button:last-child:after{display:none}.modal-no-buttons .modal-inner{border-radius:7px}.modal-no-buttons .modal-inner:after{display:none}.modal-no-buttons .modal-buttons{display:none}",
            defaultTitleButtonModalTemplate = '<div class="modal " style="display: block; margin-top: -62px;"><div class="modal-inner"><div class="modal-title">{{title}}</div><div class="modal-text">{{content}}</div></div><div class="modal-buttons "><span class="modal-button modal-button-bold" data-action="{{action}}">{{btnText}}</span></div></div>',
            defaultTwoButtonModalTemplate = '<div class="modal" style="display: block; margin-top: -62px;"><div class="modal-inner"><div class="modal-text">{{content}}</div></div><div class="modal-buttons "><span class="modal-button modal-button-bold" data-action="{{actionLeft}}">{{btnTextLeft}}</span><span class="modal-button modal-button-bold" data-action="{{actionRight}}">{{btnTextRight}}</span></div></div>',
            defaultButtonModalTemplate  = '<div class="modal" style="display: block; margin-top: -62px;"><div class="modal-inner"><div class="modal-text">{{content}}</div></div><div class="modal-buttons "><span class="modal-button modal-button-bold" data-action="{{action}}">{{btnText}}</span></div></div>',
            defaultTitleModalTemplate = '<div class="modal " style="display: block; margin-top: -62px;"><div class="modal-inner  no-button"><div class="modal-title">{{title}}</div><div class="modal-text">{{content}}</div></div></div>',
            defaultSimpleModalTemplate = '<div class="modal " style="display: block; margin-top: -62px;"><div class="modal-inner no-button"><div class="modal-text">{{content}}</div></div></div>';
        app.params = {
            css: option.customCSS || defaultCSS,
            hasButton: false,
            button: option.button || [],
            modalDelay: option.modalDelay || 1000,
            modalTemplate: option.modalTemplate || {
                TitleButtonModalTemplate: defaultTitleButtonModalTemplate,
                TitleModalTemplate: defaultTitleModalTemplate,
                TwoButtonModalTemplate:defaultTwoButtonModalTemplate,
                ButtonModalTemplate: defaultButtonModalTemplate,
                SimpleModalTemplate: defaultSimpleModalTemplate
            }

        };
        this.init();
    };
    var helper = PModal.prototype.helper = {
        parseDom: function (html) {
            var dom = document.createElement("div");
            dom.innerHTML = html;
            return dom.childNodes;
        },
        error: function (condition) {
            switch (condition) {
                case "show":
                    console.error("参数类型错误,show({string}content,[{string}title],[{object}button],[{number}time])");
                    break;
            }


        }
    };

    PModal.prototype.modalEvent={};
    PModal.prototype.init = function () {
        var that = this;
        var params = that.params;

        that.importCSS(params.css);
        that.changeCSS(params.backgroundColor);

    };
    PModal.prototype.assembleHTML = function (o) {
        //this.params.modalHTML = this.params.modalTemplate;
        // var regex =/{{title}}/;
        var html;

        if (o.title) {
            html = o.button ? this.params.modalTemplate.TitleButtonModalTemplate : this.params.modalTemplate.TitleModalTemplate;

        } else {
            html = o.button ? (o.button.length==2 ?this.params.modalTemplate.TwoButtonModalTemplate :this.params.modalTemplate.ButtonModalTemplate) : this.params.modalTemplate.SimpleModalTemplate;
        }
        o.title && ( html = html.replace(/{{title}}/, o.title));
        o.content && (html = html.replace(/{{content}}/, o.content));
        if (o.button) {
            if(o.button.length==1){
                html = html.replace(/{{btnText}}/, o.button[0].btnText);

                if(typeof o.button[0].action=="function"){
                    //this.modalEvent.push(o.button[0].action);
                    html = html.replace(/{{action}}/, "function");
                }else if (typeof o.button[0].action=="string"){
                    html = html.replace(/{{action}}/, o.button[0].action);
                }
            }else{
                html = html.replace(/{{btnTextLeft}}/, o.button[0].btnText);
                html = html.replace(/{{btnTextRight}}/, o.button[1].btnText);

                if(typeof o.button[0].action=="function"){
                    //this.modalEvent.push(o.button[0].action);
                    html = html.replace(/{{actionLeft}}/, "functionLeft");
                }else if (typeof o.button[0].action=="string"){
                    html = html.replace(/{{actionLeft}}/, o.button[0].action);
                }

                if(typeof o.button[1].action=="function"){
                    //this.modalEvent.push(o.button[0].action);
                    html = html.replace(/{{actionRight}}/, "functionRight");
                }else if (typeof o.button[1].action=="string"){
                    html = html.replace(/{{actionRight}}/, o.button[1].action);
                }
            }

        }
        this.params.hasButton = o.button?true:false;
        return html;

    };
    PModal.prototype.show = function (content, title, button, time) {
        var that = this,
            arg = arguments,
            assembleArg,
            modelHTML;
        if (arg.length == 0) {

            helper.error("show");


        }
        else if (arg.length == 1) {
            if (typeof arg[0] == "string") {
                modelHTML = that.assembleHTML.call(that, {
                    content: arg[0]
                });
            } else {
                helper.error("show");
            }

        }
        else if (arg.length == 2) {
            if (typeof arg[1] == "string") {
                modelHTML = that.assembleHTML.call(that, {
                    content: arg[0],
                    title: arg[1]
                });
            }
            else if (typeof arg[1] == "object") {
                modelHTML = that.assembleHTML.call(that, {
                    content: arg[0],
                    button: arg[1]
                });
                button =  arg[1];
            }
            else if (typeof arg[1] == "number") {
                modelHTML = that.assembleHTML.call(that, {
                    content: arg[0]
                });
                time =  arg[1]
            } else {
                helper.error("show");
            }

        }
        else if (arg.length == 3) {
            if (typeof arg[1] == "string") {
                if (typeof arg[2] == "object") {
                    modelHTML = that.assembleHTML.call(that, {
                        content: arg[0],
                        title: arg[1],
                        button: arg[2]
                    })
                    button =  arg[2];

                } else if (typeof arg[2] == "number") {
                    modelHTML = that.assembleHTML.call(that, {
                        content: arg[0],
                        title: arg[1]
                    })
                    time =  arg[2]

                } else {
                    helper.error("show");
                }
            }
            else if (typeof arg[1] == "object") {
                if (typeof arg[2] == "number") {
                    modelHTML = that.assembleHTML.call(that, {
                        content: arg[0],
                        button: arg[1]
                    });
                    button =  arg[1];
                    time =  arg[2]

                } else {
                    helper.error("show");
                }

            }
        }
        else {
            modelHTML = that.assembleHTML.call(that, {
                content: arg[0],
                title: arg[1],
                button: arg[2]
            });
            button =  arg[2];
            time =  arg[3]
        }

        //assembleArg = Array.prototype.slice.call(arg,1);
        //var html =  that.assembleHTML.apply(that,assembleArg);


        var waitTime = time || this.params.modalDelay;

        var modalDom = helper.parseDom(modelHTML)[0];
        modalDom.id = "#pModal" + new Date().getMilliseconds();
        //var modalDom = document.createElement("div");
        //document.body.appendChild(dom.childNodes[0]);
        //dom.innerHTML =;
        document.body.appendChild(modalDom);
        if (that.params.hasButton) {
            var overlayDom = that.showOverlay();
            that.bindEvent(modalDom,button,overlayDom);
        }
        setTimeout(function () {
            modalDom.classList.add("modal-in");
            if (!that.params.hasButton) {
                setTimeout(function () {
                    that.hide(modalDom);
                }, waitTime);
            }
        }, 0);

    };
    PModal.prototype.bindEvent = function(dom,buttonObj,overlayDom){
        var that = this;
        var button = buttonObj;
        //this.modalEvent.push(o.button[0].action);
        that.display = function(){
            that.hide(dom,overlayDom);
        };

        dom.addEventListener("click", function (e) {

            switch(e.target.dataset["action"]){
                case "string":
                    that.hide(dom,overlayDom);
                    break;
                case "function":
                    button[0].action.call(that,e);
                    //that.hide(dom);
                    break;
                case "functionLeft":
                    button[0].action.call(that,e);
                    //that.hide(dom);
                    break;
                case "functionRight":
                    button[1].action.call(that,e);
                    //that.hide(dom);
                    break;
            }
        });
    };
    PModal.prototype.hide = function (dom,overlayDom) {
        dom.classList.remove("modal-in");
        dom.classList.add("modal-out");
        setTimeout(function () {
            document.body.removeChild(dom);
        }, 400);
         overlayDom &&  this.hideOverlay(overlayDom);

    };
    PModal.prototype.showOverlay = function () {
        var dom = helper.parseDom('<div class="modal-overlay"></div>')[0];
        document.body.appendChild(dom);
        setTimeout(function () {
            dom.className = "modal-overlay modal-overlay-visible";
        }, 0);
        return dom;
    };
    PModal.prototype.hideOverlay = function (dom) {
        dom.className = "modal-overlay";
        setTimeout(function () {
            document.body.removeChild(dom);
        }, 400);
    };
    PModal.prototype.importCSS = function (css) {
        var link = document.createElement("style");
        link.innerHTML = css;
        link.id = "pModelCSS";
        if (!document.querySelector("#pModelCSS")) {
            document.getElementsByTagName("head")[0].appendChild(link);
        }
    };
    PModal.prototype.changeCSS = function () {
        //changeCSS
    };
    //将默认配置的pModal暴露,也可在使用时自己创建实例
    window.pModal = new PModal();
})();