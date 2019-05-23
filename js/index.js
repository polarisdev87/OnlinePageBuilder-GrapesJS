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
            assets: [
                'http://placehold.it/350x250/78c5d6/fff/image1.jpg',
                // Pass an object with your properties
                {
                    type: 'image',
                    src: 'http://placehold.it/350x250/459ba8/fff/image2.jpg',
                    height: 350,
                    width: 250
                },
                {
                    // As the 'image' is the base type of assets, omitting it will
                    // be set as `image` by default
                    src: 'http://placehold.it/350x250/79c267/fff/image3.jpg',
                    height: 350,
                    width: 250
                },
            ],
        },

        canvas: {
            styles: [
                "stylesheet/bootstrap.min.css",
                "stylesheet/normalize.css",
                "stylesheet/style.css",
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
    addBlock(editor, getCommunityTemplate1());

}

function getCommunityTemplate1() {
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
                            <img class="col-md-6 col-xl-6 px-0 order-1 order-md-2 community-img has-animation has-blue animation-rtl d-block w-100" src="./images/community.jpg" data-gjs-editable="true" data-gjs-removable="false"/>
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

init();