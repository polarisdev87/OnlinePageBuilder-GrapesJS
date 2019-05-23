function init() {
    var blkStyle =
        '.blk-row::after{ content: ""; clear: both; display: block;} .blk-row{padding: 10px;}';
    var editor = grapesjs.init({
        allowScripts: 1,
        showOffsets: 1,
        autorender: 0,
        noticeOnUnload: 0,
        container: "#gjs",
        height: "100%",
        fromElement: true,
        clearOnRender: 0,

        storageManager: {
            autoload: 0
        },

        commands: {
            defaults: [{
                id: "undo",
                run: function (editor, sender) {
                    sender.set("active", false);
                    editor.UndoManager.undo(1);
                }
            },
            {
                id: "redo",
                run: function (editor, sender) {
                    sender.set("active", false);
                    editor.UndoManager.redo(1);
                }
            },
            {
                id: "clean-all",
                run: function (editor, sender) {
                    sender.set("active", false);
                    if (confirm("Are you sure to clean the canvas?")) {
                        var comps = editor.DomComponents.clear();
                    }
                }
            },
            {
                id: "save",
                run: function (editor, senderBtn) {
                    sender.set("active", false);
                    saveHtmlToList(editor);
                },
                stop: function (editor, senderBtn) { }
            }
            ]
        },

        assetManager: {
            upload: "https://test.page",
            params: {
                _token: "pCYrSwjuiV0t5NVtZpQDY41Gn5lNUwo3it1FIkAj"
            },
        },
        
        canvas: {
            styles: [
                "../stylesheet/bootstrap.min.css",
                "../stylesheet/normalize.css",
                "../stylesheet/style.css",
            ]
        },

        blockManager: {
            blocks: []
        },
    });

    editor.on('change:changesCount', (model) => {
        console.log('changed');
    });

    editor.on('load', function () {
        editor.setComponents('<div data-gjs-type="pcBox" data-title="ABC" frameborder="0" data-title=""><div class="c1678"><h4></h4></div></div>');
        editor.setStyle("#header h1 a{display: block; width: 300px; height: 80px;}");
        editor.UndoManager.clear();
    });
    var pnm = editor.Panels;
    pnm.addButton("options", [{
        id: "undo",
        className: "fa fa-undo icon-undo",
        command: function command(editor, sender) {
            sender.set("active", 0);
            editor.UndoManager.undo(1);
        },
        attributes: {
            title: "Undo (CTRL/CMD + Z)"
        }
    }, {
        id: "redo",
        className: "fa fa-repeat icon-redo",
        command: function command(editor, sender) {
            sender.set("active", 0);
            editor.UndoManager.redo(1);
        },
        attributes: {
            title: "Redo (CTRL/CMD + Y)"
        }
    }]);

    editor.render();
    var comps = editor.DomComponents;
    var defaultType = comps.getType('text');
    var defaultModel = defaultType.model;
    var defaultView = defaultType.view;
    createPCBoxComp(editor, comps, defaultModel, defaultView);
    addBlock(editor, getPCBoxBlock());

}

function getPCBoxBlock() {
    return [{
        id: "community_template1",
        label: "Community Section",
        category: "Template",
        content: `<div class="container">
                    <div class="row mx-0 bg-orange community-cn-block justify-content-between">
                        <div class="col-md-6 col-xl-5 community-cn order-2 order-md-1 wow fadeInUp">
                            <h2 class="text-white">Community</h2>
                            <p class="text-white">Greenfield, expansive and geo-strategic in its long-term vision, the special Economic Zone of Duqm on Oman's south easterncoast is quite unlike anything the</p>
                            <p class="text-white font-16">Middle East has to offer. Overlooking the Arabian Sea and the Indian Ocean beyond, Duqm SEZ has an unparalleled advantage in positioning your business within strategic distance of some of the fastest growing markets in the</p>
                            <a href="#" class="btn btn-white">Learn More</a>
                        </div>
                        <div class="col-md-6 col-xl-6 px-0 order-1 order-md-2 community-img has-animation has-blue animation-rtl" data-delay="2">
                            <img class="d-block d-md-none w-100" src="./images/community.jpg">
                        </div>
                    </div>
                    <div class="row community-list mx-0 wow fadeInUp" data-wow-delay=".2s">
                        <div class="col-6 col-md-3 community-list-cn bg-blue">
                            <div class="community-box">
                                <h3 class="font-medium mb-0">25</h3>
                                <p class="text-light-slate-gray">Projects created</p>
                            </div>
                        </div>
                        <div class="col-6 col-md-3 community-list-cn bg-blue">
                            <div class="community-box">
                                <h3 class="font-medium mb-0">782</h3>
                                <p class="text-light-slate-gray">Sq.m. of lands</p>
                            </div>
                        </div>
                        <div class="col-6 col-md-3 community-list-cn bg-blue">
                            <div class="community-box">
                                <h3 class="font-medium mb-0">1683</h3>
                                <p class="text-light-slate-gray">Professionals staff</p>
                            </div>
                        </div>
                        <div class="col-6 col-md-3 community-list-cn bg-blue">
                            <div class="community-box">
                                <h3 class="font-medium mb-0">451</h3>
                                <p class="text-light-slate-gray">Dubai awards</p>
                            </div>
                        </div>
                    </div>
                </div>`
    }];
}

function addBlock(editor, blocks) {
    $.each(blocks, function (index, item) {
        editor.BlockManager.add(item.id, item);
    });
}

function createPCBoxComp(editor, comps, defaultModel, defaultView) {

    comps.addType('pcBox', {
        // Define the Model
        model: defaultModel.extend({
            // Extend default properties
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
                droppable: false,
                draggable: true,
                type: 'pcBox',
                tagName: 'div',
                void: 0,
                title: '',
                attributes: {
                    frameborder: 0,
                },
                traits: [{
                    type: 'text',
                    label: 'Title',
                    name: 'title',
                    placeholder: 'eg. Lorem Ipsum',
                    changeProp: 1
                }]
            }),
            getAttrToHTML: function getAttrToHTML() {
                for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                    args[_key3] = arguments[_key3];
                }

                var attr = defaultModel.prototype.getAttrToHTML.apply(this, args);
                attr["data-title"] = this.get('title');
                return attr;
            },
            updateInitialValues: function updateInitialValues() {
                this.set('title', this.attributes.attributes["data-title"])
            },
            init: function init() { },
            initialize: function initialize(o) {
                defaultModel.prototype.initialize.apply(this, arguments);
                this.updateInitialValues();
                this.listenTo(this, 'change:title', this.updateTitle);

            },
            updateAll: function updateAll() {
                this.updateTitle();
            },

            updateTitle: function updateTitle() {
                var linkModel = this.get("components").at(0);
                if (linkModel && linkModel.get("components").length > 0) {
                    var h4Model = linkModel.get("components").at(0);
                    var title = this.get('title');
                    h4Model.set("content", title);
                }
            }
        }, {
                isComponent: function isComponent(el) {
                    if (el.getAttribute && el.getAttribute('data-gjs-type') == 'pcBox') {
                        return {
                            type: 'pcBox'
                        };
                    }
                }
            }),

        // Define the View
        view: defaultView.extend({

            tagName: 'div',
            events: {
                'dblclick': 'openModal',
                'click': 'openSettings'
            },

            openSettings: function openSettings(e) {

                this.el.click();

                var openBlocksBtn = editor.Panels.getButton('views', 'open-blocks');
                openBlocksBtn && openBlocksBtn.set('active', 0);

                var openTMBtn = editor.Panels.getButton('views', 'open-tm');
                openTMBtn && openTMBtn.set('active', 1);
            },
            initialize: function initialize(o) {
                defaultView.prototype.initialize.apply(this, arguments);
                this.listenTo(this.model, 'change:title', this.updateTitle);

            },

            updateTitle: function updateTitle() {
                $(this.el).find('h4').html(this.model.get("title"));
            },

            openModal: function openModal(e) {
                var em = this.opts.config.em;
                var editor = em ? em.get('Editor') : '';

                if (editor) {
                    editor.runCommand('open-assets', {
                        target: this.model,
                        onSelect: function onSelect() {
                            editor.Modal.close();

                            editor.AssetManager.setTarget(null);
                        }
                    });
                }
                this.el.click();
            },
            disableClick: function disableClick() {
                this.preventDefault();
            },
            render: function render() {
                this.updateAttributes();
                this.el.innerHTML = "<div style=\"height:100px;background-color:red\"><h4>" + (this.model.get("title") ? this.model.get("title") : "TEST CONTENT") + "</h4></div>";
                this.model.updateAll();
                return this;
            }
        })
    });
};

init();