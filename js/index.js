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
                "stylesheet/animate.css",
                "stylesheet/slick.css",
                "stylesheet/slick-theme.css",
                "stylesheet/normalize.css",
                "stylesheet/bootstrap.min.css",
                "stylesheet/custom-scrollbar.css",
                "stylesheet/footable.bootstrap.min.css",
                "stylesheet/calendar.min.css",
                "fonts/font-awesome.min.css",
                "stylesheet/style.css",
            ],
            scripts: [
                "js/jquery-3.2.1.min.js",
                "js/jquery-ui.js",
                "js/html5.js",
                "js/html-ie.js",
                "js/popper.min.js",
                "js/bootstrap.min.js",
                "js/jquery.matchHeight.js",
                "js/slick.js",
                "js/custom-scrollbar.js",
                "js/wow.min.js",
                "js/footable.min.js",
                "js/calendar.min.js",
            ]
        },

        blockManager: {
            blocks: []
        },
    });

    editor.on('load', function () {
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
    var wrapper = comps.getWrapper();
    
    editor.on('change:changesCount', (editorModel, changes) => {
        if (changes) {
            // do something with changes 
            if (typeof (document.getElementsByClassName('gjs-frame')[0].contentWindow.changeTabWidth) == "function")
                document.getElementsByClassName('gjs-frame')[0].contentWindow.changeTabWidth();
        } else {
            // do something else with no changes 
        }
    });

    editor.on('component:styleUpdate', (model) => {
        // console.log(model);
    })

    editor.on('component:selected', (model) => {
        // if(model.view.$el.attr('data-id') && model.view.$el.attr('data-id').indexOf("tab") > -1){
        //     if(typeof(document.getElementsByClassName('gjs-frame')[0].contentWindow.reInitSlick) == "function")
        //         document.getElementsByClassName('gjs-frame')[0].contentWindow.reInitSlick(model.view.$el);
        // }
    })

    editor.on('block:drag:stop', (compModel, blockModel) => {
        if(blockModel.id == "tab") {
            wrapper.view.$el.find('.square-tab-list').each( function() {
                var amount = $(this).find('.square-tab-box').length;
                $(this).find('.square-tab-box').each(function() {
                    var id = $(this).data('id');
                    if(id == "tab") {
                        $(this).attr('data-id', "tab" + amount);
                        $(this).attr('data-amount', amount);
                    }
                })
                if(!document.getElementById("tab" + amount)) {
                    if(typeof(document.getElementsByClassName('gjs-frame')[0].contentWindow.destroySlick) == "function") {
                        console.log('destroy')
                        document.getElementsByClassName('gjs-frame')[0].contentWindow.destroySlick();
                    }
                    $(this).parent('.square-tab').append(`
                        <div data-gjs-type="default" data-highlighttable="1" id=tab${amount} class="square-tab-content">
                            <h5 data-gjs-type="text" data-highlighttable="1" class="d-block d-sm-none mt-3 mb-0 text-center">Things to do</h5>
                            <ul data-gjs-type="default" data-highlighttable="1" class="square-tab-content-list">
                                <li data-gjs-type="default" data-highlighttable="1">
                                    <div data-gjs-type="default" data-highlighttable="1" class="square-tab-content-img">
                                        <img data-gjs-type="image" data-highlighttable="1" src="./images/visit2.jpg">
                                    </div>
                                    <div data-gjs-type="default" data-highlighttable="1" class="square-tab-content-detail border-box border-light-gray border-1">
                                        <div data-gjs-type="text" data-highlighttable="1" class="my-location d-flex align-items-center mb-3">
                                            <img data-gjs-type="image" data-highlighttable="1" src="./images/my-location.svg" class="mr-2" width="20">
                                            0.7Km
                                        </div>
                                        <h5 data-gjs-type="text" data-highlighttable="1" class="font-medium">City Hotel Duqm</h5>
                                        <p data-gjs-type="text" data-highlighttable="1" class="text-gray">City Hotel Duqm is located between Salalah and Muscat.</p>
                                        <div data-gjs-type="text" data-highlighttable="1" class="link">Find Out More</div>
                                    </div>
                                </li>
                                <li data-gjs-type="default" data-highlighttable="1">
                                    <div data-gjs-type="default" data-highlighttable="1" class="square-tab-content-img">
                                        <img data-gjs-type="image" data-highlighttable="1" src="./images/visit3.jpg">
                                    </div>
                                    <div data-gjs-type="default" data-highlighttable="1" class="square-tab-content-detail border-box border-light-gray border-1">
                                        <div data-gjs-type="text" data-highlighttable="1" class="my-location d-flex align-items-center mb-3">
                                            <img data-gjs-type="image" data-highlighttable="1" src="./images/my-location.svg" class="mr-2" width="20">
                                            3Km
                                        </div>
                                        <h5 data-gjs-type="text" data-highlighttable="1" class="font-medium">Park Inn by Radisson</h5>
                                        <p data-gjs-type="text" data-highlighttable="1" class="text-gray">We welcome our guests in a safe and secure hotel environment</p>
                                        <div data-gjs-type="text" data-highlighttable="1" class="link">Find Out More</div>
                                    </div>
                                </li>
                                <li>
                                    <div data-gjs-type="default" data-highlighttable="1" class="square-tab-content-img">
                                        <img data-gjs-type="image" data-highlighttable="1" src="./images/visit1.jpg">
                                    </div>
                                    <div data-gjs-type="default" data-highlighttable="1" class="square-tab-content-detail border-box border-light-gray border-1">
                                        <div data-gjs-type="text" data-highlighttable="1" class="my-location d-flex align-items-center mb-3">
                                            <img data-gjs-type="image" data-highlighttable="1" src="./images/my-location.svg" class="mr-2" width="20">
                                            1.2Km
                                        </div>
                                        <h5 data-gjs-type="text" data-highlighttable="1" class="font-medium">Crowne plaza Duqm</h5>
                                        <p data-gjs-type="text" data-highlighttable="1" class="text-gray">Get the celebrity treatment with world-class service at Crowne Plaza Duqm</p>
                                        <div data-gjs-type="text" data-highlighttable="1" class="link">Find Out More</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        `);
                    var id = $(this).parents('.container').parent().attr('id');
                    console.log(id);
                    console.log(editor.getComponents().models);
                    var html = $(this).parents('.container').parent().parent().html();
                    var reInit = document.getElementsByClassName('gjs-frame')[0].contentWindow.reInit;
                    editor.getComponents().models.forEach((model) => {
                        if(model.ccid == id) {
                            // console.log(model.attributes.components);
                            // console.log(html);
                            model.replaceWith(html);
                            if(typeof(document.getElementsByClassName('gjs-frame')[0].contentWindow.makeSlick) == "function") {
                                console.log('init');
                                document.getElementsByClassName('gjs-frame')[0].contentWindow.makeSlick(amount);
                            }
                            reInit();
                        }
                    })
                    // editor.getComponents().models[1].components($(this).parent('.square-tab').html());
                    
                }
            })

        }
    });

    // Get the model and the view from the default Component type
    var defaultType = comps.getType('default');
    var defaultModel = defaultType.model;
    var defaultView = defaultType.view;

    var inputTypes = [
        { value: 'text', name: 'Text' },
        { value: 'email', name: 'Email' },
        { value: 'password', name: 'Password' },
        { value: 'number', name: 'Number' },
    ];

    addBlock(editor, getCommunityTemplate1());
    addBlock(editor, getVisitHeaderTemplate());
    addBlock(editor, getVisitorGuide());
    addBlock(editor, getVisitorLink());
    addBlock(editor, getVisitorNews());
    addBlock(editor, getCustomTab());

    function getCustomTab() {
        return [{
            id: 'tab',
            label: '',
            attributes: {
                class: 'custom-icon flowz-visitor-tab-style-2',
                title: '',
            },
            category: 'Tabs',
            content: `
                    <li>
                        <div class="square-tab-box" data-id="tab">
                            <div class="icon motel"></div>
                            <span class="d-none d-sm-block">Tab</span>
                        </div>
                    </li>
                    `,

        }]
    }
}

function getCommunityTemplate1() {
    return [{
        id: "community_template1",
        label: "Community Section",
        attributes: {
            class: 'custom-icon flowz-callToAction-style-2',
            title: 'Community Section',
        },
        category: "Template",
        content: {
            components: `<div class="container">
                    <div class="row mx-0 bg-orange community-cn-block justify-content-between">
                        <div class="col-md-6 col-xl-5 community-cn order-2 order-md-1 wow fadeInUp">
                            <h2 class="text-white">Community</h2>
                            <p class="text-white">Greenfield, expansive and geo-strategic in its long-term vision, the special Economic Zone of Duqm on Oman's south easterncoast is quite unlike anything the</p>
                            <p class="text-white font-16">Middle East has to offer. Overlooking the Arabian Sea and the Indian Ocean beyond, Duqm SEZ has an unparalleled advantage in positioning your business within strategic distance of some of the fastest growing markets in the</p>
                            <div class="btn btn-white">Learn More</div>
                        </div>
                        <div class="col-md-6 col-xl-6 px-0 order-1 order-md-2 community-img has-animation has-blue animation-rtl ">
                            <img class="d-block d-md-none w-100" src="./images/community.jpg"/>
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
        }
    }];
}

function getVisitHeaderTemplate() {
    return [{
        id: "visitor_header",
        label: '',
        attributes: {
            class: 'custom-icon flowz-visitor-headerback-style-2',
            title: ''
        },
        category: 'Tabs',
        content: {
            components: `<div class="container">
                    <div class="row">
                        <div class="col-12 text-center">
                            <h2 class="wow fadeInUp">What's On Duqm</h2>
                            <p class="text-gray mb-3 mb-lg-4 wow fadeInUp" data-wow-delay=".2s">Lorem ipsum dolor amet consectetur adipiscing elitsa Pellentesque commodo <br class="d-none d-sm-block" /> tincidunt tempus Duis lacus lectus aliquet euismod porta amet massa.</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">   
                            <div class="square-tab wow fadeIn">
                                <ul class="square-tab-list">
                                    <li>
                                        <div class="square-tab-box active" data-id="motel">
                                            <div class="icon motel"></div>
                                            <span class="d-none d-sm-block">Hotels</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="square-tab-box" data-id="things">
                                            <div class="icon things"></div>
                                            <span class="d-none d-sm-block">Things to do</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="square-tab-box" data-id="restaurant">
                                            <div class="icon restaurant"></div>
                                            <span class="d-none d-sm-block">Restaurant</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="square-tab-box" data-id="flights">
                                            <div class="icon flights"></div>
                                            <span class="d-none d-sm-block">Flights</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="square-tab-box" data-id="cruises">
                                            <div class="icon cruises"></div>
                                            <span class="d-none d-sm-block">Cruises</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="square-tab-box" data-id="roadTrip">
                                            <div class="icon road-trip"></div>
                                            <span class="d-none d-sm-block">Road Trips</span>
                                        </div>
                                    </li>
                                </ul>
                                <div id="motel" class="square-tab-content active">
                                    <h5 class="d-block d-sm-none mt-3 mb-0 text-center">Hotels</h5>
                                    <ul class="square-tab-content-list">
                                        <li>
                                            <div class="square-tab-content-img">
                                                <img src="./images/visit3.jpg">
                                            </div>
                                            <div class="square-tab-content-detail border-box border-light-gray border-1">
                                                <div class="my-location d-flex align-items-center mb-3">
                                                    <img src="./images/my-location.svg" class="mr-2" width="20">
                                                    3Km
                                                </div>
                                                <h5 class="font-medium">Park Inn by Radisson</h5>
                                                <p class="text-gray">We welcome our guests in a safe and secure hotel environment</p>
                                                <div class="link">Find Out More</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="square-tab-content-img">
                                                <img src="./images/visit1.jpg">
                                            </div>
                                            <div class="square-tab-content-detail border-box border-light-gray border-1">
                                                <div class="my-location d-flex align-items-center mb-3">
                                                    <img src="./images/my-location.svg" class="mr-2" width="20">
                                                    1.2Km
                                                </div>
                                                <h5 class="font-medium">Crowne plaza Duqm</h5>
                                                <p class="text-gray">Get the celebrity treatment with world-class service at Crowne Plaza Duqm</p>
                                                <div class="link">Find Out More</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="square-tab-content-img">
                                                <img src="./images/visit2.jpg">
                                            </div>
                                            <div class="square-tab-content-detail border-box border-light-gray border-1">
                                                <div class="my-location d-flex align-items-center mb-3">
                                                    <img src="./images/my-location.svg" class="mr-2" width="20">
                                                    0.7Km
                                                </div>
                                                <h5 class="font-medium">City Hotel Duqm</h5>
                                                <p class="text-gray">City Hotel Duqm is located between Salalah and Muscat.</p>
                                                <div class="link">Find Out More</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div id="things" class="square-tab-content">
                                    <h5 class="d-block d-sm-none mt-3 mb-0 text-center">Things to do</h5>
                                    <ul class="square-tab-content-list">
                                        <li>
                                            <div class="square-tab-content-img">
                                                <img src="./images/visit2.jpg">
                                            </div>
                                            <div class="square-tab-content-detail border-box border-light-gray border-1">
                                                <div class="my-location d-flex align-items-center mb-3">
                                                    <img src="./images/my-location.svg" class="mr-2" width="20">
                                                    0.7Km
                                                </div>
                                                <h5 class="font-medium">City Hotel Duqm</h5>
                                                <p class="text-gray">City Hotel Duqm is located between Salalah and Muscat.</p>
                                                <div class="link">Find Out More</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="square-tab-content-img">
                                                <img src="./images/visit3.jpg">
                                            </div>
                                            <div class="square-tab-content-detail border-box border-light-gray border-1">
                                                <div class="my-location d-flex align-items-center mb-3">
                                                    <img src="./images/my-location.svg" class="mr-2" width="20">
                                                    3Km
                                                </div>
                                                <h5 class="font-medium">Park Inn by Radisson</h5>
                                                <p class="text-gray">We welcome our guests in a safe and secure hotel environment</p>
                                                <div class="link">Find Out More</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="square-tab-content-img">
                                                <img src="./images/visit1.jpg">
                                            </div>
                                            <div class="square-tab-content-detail border-box border-light-gray border-1">
                                                <div class="my-location d-flex align-items-center mb-3">
                                                    <img src="./images/my-location.svg" class="mr-2" width="20">
                                                    1.2Km
                                                </div>
                                                <h5 class="font-medium">Crowne plaza Duqm</h5>
                                                <p class="text-gray">Get the celebrity treatment with world-class service at Crowne Plaza Duqm</p>
                                                <div class="link">Find Out More</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div id="restaurant" class="square-tab-content">
                                    <h5 class="d-block d-sm-none mt-3 mb-0 text-center">Restaurant</h5>
                                    <ul class="square-tab-content-list">
                                        <li>
                                            <div class="square-tab-content-img">
                                                <img src="./images/visit1.jpg">
                                            </div>
                                            <div class="square-tab-content-detail border-box border-light-gray border-1">
                                                <div class="my-location d-flex align-items-center mb-3">
                                                    <img src="./images/my-location.svg" class="mr-2" width="20">
                                                    1.2Km
                                                </div>
                                                <h5 class="font-medium">Crowne plaza Duqm</h5>
                                                <p class="text-gray">Get the celebrity treatment with world-class service at Crowne Plaza Duqm</p>
                                                <div class="link">Find Out More</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="square-tab-content-img">
                                                <img src="./images/visit2.jpg">
                                            </div>
                                            <div class="square-tab-content-detail border-box border-light-gray border-1">
                                                <div class="my-location d-flex align-items-center mb-3">
                                                    <img src="./images/my-location.svg" class="mr-2" width="20">
                                                    0.7Km
                                                </div>
                                                <h5 class="font-medium">City Hotel Duqm</h5>
                                                <p class="text-gray">City Hotel Duqm is located between Salalah and Muscat.</p>
                                                <div class="link">Find Out More</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="square-tab-content-img">
                                                <img src="./images/visit3.jpg">
                                            </div>
                                            <div class="square-tab-content-detail border-box border-light-gray border-1">
                                                <div class="my-location d-flex align-items-center mb-3">
                                                    <img src="./images/my-location.svg" class="mr-2" width="20">
                                                    3Km
                                                </div>
                                                <h5 class="font-medium">Park Inn by Radisson</h5>
                                                <p class="text-gray">We welcome our guests in a safe and secure hotel environment</p>
                                                <div class="link">Find Out More</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div id="flights" class="square-tab-content">
                                    <h5 class="d-block d-sm-none mt-3 mb-0 text-center">Flights</h5>
                                    <ul class="square-tab-content-list">
                                        <li>
                                            <div class="square-tab-content-img">
                                                <img src="./images/visit3.jpg">
                                            </div>
                                            <div class="square-tab-content-detail border-box border-light-gray border-1">
                                                <div class="my-location d-flex align-items-center mb-3">
                                                    <img src="./images/my-location.svg" class="mr-2" width="20">
                                                    3Km
                                                </div>
                                                <h5 class="font-medium">Park Inn by Radisson</h5>
                                                <p class="text-gray">We welcome our guests in a safe and secure hotel environment</p>
                                                <div class="link">Find Out More</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="square-tab-content-img">
                                                <img src="./images/visit1.jpg">
                                            </div>
                                            <div class="square-tab-content-detail border-box border-light-gray border-1">
                                                <div class="my-location d-flex align-items-center mb-3">
                                                    <img src="./images/my-location.svg" class="mr-2" width="20">
                                                    1.2Km
                                                </div>
                                                <h5 class="font-medium">Crowne plaza Duqm</h5>
                                                <p class="text-gray">Get the celebrity treatment with world-class service at Crowne Plaza Duqm</p>
                                                <div class="link">Find Out More</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="square-tab-content-img">
                                                <img src="./images/visit2.jpg">
                                            </div>
                                            <div class="square-tab-content-detail border-box border-light-gray border-1">
                                                <div class="my-location d-flex align-items-center mb-3">
                                                    <img src="./images/my-location.svg" class="mr-2" width="20">
                                                    0.7Km
                                                </div>
                                                <h5 class="font-medium">City Hotel Duqm</h5>
                                                <p class="text-gray">City Hotel Duqm is located between Salalah and Muscat.</p>
                                                <div class="link">Find Out More</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div id="cruises" class="square-tab-content">
                                    <h5 class="d-block d-sm-none mt-3 mb-0 text-center">Cruises</h5>
                                    <ul class="square-tab-content-list">
                                        <li>
                                            <div class="square-tab-content-img">
                                                <img src="./images/visit2.jpg">
                                            </div>
                                            <div class="square-tab-content-detail border-box border-light-gray border-1">
                                                <div class="my-location d-flex align-items-center mb-3">
                                                    <img src="./images/my-location.svg" class="mr-2" width="20">
                                                    0.7Km
                                                </div>
                                                <h5 class="font-medium">City Hotel Duqm</h5>
                                                <p class="text-gray">City Hotel Duqm is located between Salalah and Muscat.</p>
                                                <div class="link">Find Out More</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="square-tab-content-img">
                                                <img src="./images/visit3.jpg">
                                            </div>
                                            <div class="square-tab-content-detail border-box border-light-gray border-1">
                                                <div class="my-location d-flex align-items-center mb-3">
                                                    <img src="./images/my-location.svg" class="mr-2" width="20">
                                                    3Km
                                                </div>
                                                <h5 class="font-medium">Park Inn by Radisson</h5>
                                                <p class="text-gray">We welcome our guests in a safe and secure hotel environment</p>
                                                <div class="link">Find Out More</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="square-tab-content-img">
                                                <img src="./images/visit1.jpg">
                                            </div>
                                            <div class="square-tab-content-detail border-box border-light-gray border-1">
                                                <div class="my-location d-flex align-items-center mb-3">
                                                    <img src="./images/my-location.svg" class="mr-2" width="20">
                                                    1.2Km
                                                </div>
                                                <h5 class="font-medium">Crowne plaza Duqm</h5>
                                                <p class="text-gray">Get the celebrity treatment with world-class service at Crowne Plaza Duqm</p>
                                                <div class="link">Find Out More</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div id="roadTrip" class="square-tab-content">
                                    <h5 class="d-block d-sm-none mt-3 mb-0 text-center">Road Trips</h5>
                                    <ul class="square-tab-content-list">
                                        <li>
                                            <div class="square-tab-content-img">
                                                <img src="./images/visit1.jpg">
                                            </div>
                                            <div class="square-tab-content-detail border-box border-light-gray border-1">
                                                <div class="my-location d-flex align-items-center mb-3">
                                                    <img src="./images/my-location.svg" class="mr-2" width="20">
                                                    1.2Km
                                                </div>
                                                <h5 class="font-medium">Crowne plaza Duqm</h5>
                                                <p class="text-gray">Get the celebrity treatment with world-class service at Crowne Plaza Duqm</p>
                                                <div class="link">Find Out More</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="square-tab-content-img">
                                                <img src="./images/visit2.jpg">
                                            </div>
                                            <div class="square-tab-content-detail border-box border-light-gray border-1">
                                                <div class="my-location d-flex align-items-center mb-3">
                                                    <img src="./images/my-location.svg" class="mr-2" width="20">
                                                    0.7Km
                                                </div>
                                                <h5 class="font-medium">City Hotel Duqm</h5>
                                                <p class="text-gray">City Hotel Duqm is located between Salalah and Muscat.</p>
                                                <div class="link">Find Out More</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="square-tab-content-img">
                                                <img src="./images/visit3.jpg">
                                            </div>
                                            <div class="square-tab-content-detail border-box border-light-gray border-1">
                                                <div class="my-location d-flex align-items-center mb-3">
                                                    <img src="./images/my-location.svg" class="mr-2" width="20">
                                                    3Km
                                                </div>
                                                <h5 class="font-medium">Park Inn by Radisson</h5>
                                                <p class="text-gray">We welcome our guests in a safe and secure hotel environment</p>
                                                <div class="link">Find Out More</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`,
            script: `
                var script = document.createElement('script');
                script.src="js/script.js";
                document.body.appendChild(script);
                document.addEventListener('keydown', function(event) {
                    if(event.keyCode == 46) {
                        changeTabWidth();
                    }
                });
                `
        }
    }];
}

function getVisitorGuide() {
    return [{
        id: "visitor_guide",
        label: "",
        attributes: {
            class: "custom-icon flowz-visitor-guide-style-2",
            title: ""
        },
        category: "Features Blocks",
        content: {
            components: `<section class="visitor-section">
                    <div class="visitor-section-cn">
                        <div class="row mx-0 px-sm-3 px-lg-5">
                            <div class="col-12 text-center">
                                <h2 class="text-white wow fadeInUp" data-gjs-editable="true" data-gjs-removable="false">Duqm Visitor Guide</h2>
                                <p class="text-white wow fadeInUp mb-0 mb-lg-4" data-wow-delay=".2s" data-gjs-editable="true" data-gjs-removable="false">Duis porta finibus vehicula Fusce ultricies est vitae blandit venenatis Proisa <br class="d-none d-sm-block" /> lectus condimentum consequat justo pharetra nibh.</p>
                            </div>
                        </div>
                        <div class="row mx-0 px-3 px-lg-5 visitor-guide-slider">
                            <div class="col-12 mt-50 wow fadeInUp" data-wow-delay=".3s">
                                <div class="visitor-box">
                                    <div class="visitor-box-img">
                                        <img src="./images/visit4.jpg">
                                    </div>
                                    <div class="visitor-box-detail">
                                        <h5 class="font-medium">Duqm Travel Guide</h5>
                                        <p class="text-gray">Follow our quick guide for all you need to know ahead of your Duqm holiday</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mt-50 wow fadeInUp" data-wow-delay=".4s">
                                <div class="visitor-box">
                                    <div class="visitor-box-img">
                                        <img src="./images/visit5.jpg">
                                    </div>
                                    <div class="visitor-box-detail">
                                        <h5 class="font-medium">Duqm upcoming hotels</h5>
                                        <p class="text-gray">Check out our guide of the latest hotels in Duqm and plan the perfect holiday today</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mt-50 wow fadeInUp" data-wow-delay=".5s">
                                <div class="visitor-box">
                                    <div class="visitor-box-img">
                                        <img src="./images/visit6.jpg">
                                    </div>
                                    <div class="visitor-box-detail">
                                        <h5 class="font-medium">Top Duqm attractions</h5>
                                        <p class="text-gray">Pellentesque habitant tristique senectus netus malesuada fames turpis egestas.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mt-50 wow fadeInUp" data-wow-delay=".6s">
                                <div class="visitor-box">
                                    <div class="visitor-box-img">
                                        <img src="./images/visit7.jpg">
                                    </div>
                                    <div class="visitor-box-detail">
                                        <h5 class="font-medium">Duqm smart cities economy</h5>
                                        <p class="text-gray">Nunc eget justo odio posuere aliquet Nullam accumsan eros purus suscipit mollis.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>`,
            script: `
                    $('.visitor-guide-slider').slick({
                        dots: false,
                        infinite: false,
                        arrows: false,
                        speed: 300,
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        responsive: [
                            {
                                breakpoint: 1200,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 3,
                                    dots: true
                                }
                            },
                            {
                            breakpoint: 992,
                                settings: {#
                                    slidesToShow: 2,
                                    slidesToScroll: 2,
                                    dots: true
                                }
                            },
                            {
                            breakpoint: 576,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    dots: true
                                }
                        }]
                    });
                    `
        }

    }]
}

function getVisitorLink() {
    return [{
        id: 'vistor_link',
        label: '',
        attributes: {
            class: 'custom-icon flowz-visitor-link-style-2',
            title: ''
        },
        category: 'Features Blocks',
        content: `<div class="container">
                    <div class="row">
                        <div class="col-12 text-center">
                            <h2 class="wow fadeInUp">Quick Links</h2>
                            <p class="text-gray mb-0 mb-lg-4 wow fadeInUp" data-wow-delay=".2s">Duis porta finibus vehicula Fusce ultricies est vitae blandit venenatis Proisa <br class="d-none d-sm-block" />lectus condimentum consequat justo pharetra nibh.</p>
                        </div>
                    </div>
                    <div class="row quick-link-row mt-50 wow fadeInUp">
                        <div class="col-12 col-xl-7">
                            <div class="quick-link-detail">
                                <div class="quick-link-img" style="background-image: url(/sezadV4/public/site/images/quick-link1.jpg);"></div>
                                <div class="quick-link-tag">Visa requirements</div>
                            </div>
                        </div>
                        <div class="col-md-6 col-xl-5">
                            <div class="quick-link-detail">
                                <div class="quick-link-img" style="background-image: url(/sezadV4/public/site/images/quick-link2.jpg);"></div>
                                <div class="quick-link-tag">How to reach</div>
                            </div>
                        </div>
                        <div class="col-md-6 col-xl-4">
                            <div class="quick-link-detail">
                                <div class="quick-link-img" style="background-image: url(/sezadV4/public/site/images/quick-link3.jpg);"></div>
                                <div class="quick-link-tag">Fun For The Whole Family</div>
                            </div>
                        </div>
                        <div class="col-md-6 col-xl-4">
                            <div class="quick-link-detail">
                                <div class="quick-link-img" style="background-image: url(/sezadV4/public/site/images/quick-link4.jpg);"></div>
                                <div class="quick-link-tag">Discover Adventure</div>
                            </div>
                        </div>
                        <div class="col-md-6 col-xl-4">
                            <div class="quick-link-detail weather-block">
                                <div class="d-flex justify-content-between align-items-start">
                                    <div>
                                        <h5 class="weather-title mb-0">Duqm, Oman</h5>
                                        <p class="weather-date">Thursday, 10:00 am</p>
                                    </div>
                                    <div class="weather-switch">
                                        <input type="checkbox" id="weatherSwitch">
                                        <label for="weatherSwitch">Toggle</label>
                                    </div>
                                </div>
                                <div class="weather-mode d-flex ">
                                    <div class="mode mode-day active">
                                        <div class="mode-title-block"> 
                                            <p class="mode-title mb-3">Day</p>
                                            <div class="d-flex align-items-center">
                                                <img src="./images/sun.svg" class="mr-2 mr-sm-3" width="50">
                                                <h2 class="mb-0 text-white">25°</h2>
                                            </div>
                                        </div>
                                        <div class="mode-detail-block"> 
                                            <span class="d-block">Precipitation: 5%</span>
                                            <span class="d-block">Humidity: 70%</span>
                                            <span class="d-block">Wind: 6 km/h</span>
                                        </div>
                                    </div>
                                    <div class="mode mode-night d-flex">
                                        <div class="v-separator"></div>
                                        <div>
                                            <div class="mode-title-block"> 
                                                <p class="mode-title mb-3">Night</p>
                                                <div class="d-flex align-items-center">
                                                    <img src="./images/moon.svg" class="mr-2 mr-sm-3" width="50">
                                                    <h2 class="mb-0 text-white">19°</h2>
                                                </div>
                                            </div>
                                            <div class="mode-detail-block"> 
                                                <span class="d-block">Precipitation: 2%</span>
                                                <span class="d-block">Humidity: 63%</span>
                                                <span class="d-block">Wind: 14 km/h</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
    }]
}

function getVisitorNews() {
    return [{
        id: 'vistor_news',
        label: '',
        attributes: {
            class: 'custom-icon flowz-visitor-news-style-2',
            title: ''
        },
        category: 'Latest Scroller',
        content: {
            components: `<section>
                    <div class="bg-box bg-light-gray right wow fadeInRight"></div>
                    <div class="container">
                        <div class="row align-items-end">
                            <div class="col-auto">
                                <h2 class="mb-2 wow fadeInLeft" data-wow-delay=".2s">Latest News</h2>
                                <h6 class="d-inline-block font-regular mb-0 wow fadeInLeft" data-wow-delay=".2s">Fusce ultrices tortor vitae tortor facilisis fringilla</h6>
                            </div>
                            <div class="col-auto ml-auto wow fadeInRight" data-wow-delay=".4s">
                                <div class="link">View All</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <ul class="news-block">
                                    <li class="wow fadeInUp" data-wow-delay=".5s">
                                        <div class="news-img">
                                            <img src="./images/news1.jpg">
                                        </div>
                                        <div class="news-box">
                                            <p class="news-date">October 27, 2018</p>
                                            <div class="news-title">A Japanese Economic  Delegation Explores Investment Opportunities in Duqm</div>
                                            <div class="link">Read More</div>
                                        </div>
                                    </li>
                                    <li class="wow fadeInUp" data-wow-delay=".7s">
                                        <div class="news-img">
                                            <img src="./images/news2.jpg">
                                        </div>
                                        <div class="news-box">
                                            <p class="news-date">October 25, 2018</p>
                                            <div class="news-title">Development Of Strategy To Promote Fish Industries In Duqm</div>
                                            <div class="link">Read More</div>
                                        </div>
                                    </li>
                                    <li class="wow fadeInUp" data-wow-delay=".9s">
                                        <div class="news-img">
                                            <img src="./images/news3.jpg">
                                        </div>
                                        <div class="news-box">
                                            <p class="news-date">October 23, 2018</p>
                                            <div class="news-title">Oman Conference For Economic And Free Zones Discusses Promoting Competitiveness</div>
                                            <div class="link">Read More</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>`,
            script: `
            $('.news-block').slick({
                dots: false,
                infinite: false,
                arrows: false,
                speed: 300,
                slidesToShow: 3,
                responsive: [
                    {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true
                    }
                    }]
                });
                $('.latest-news').slick({
                    dots: false,
                    infinite: false,
                    arrows: false,
                    speed: 300,
                    slidesToShow: 3,
                    responsive: [
                    {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true
                    }
                    }]
                });
                $(window).on('resize', function(){
                    aboutMenu();
                    $('.news-block').slick('destroy');
                    $('.news-block').slick('init');
                    });
                    function aboutMenu(){
                        $(window).on('resize', function(){
                        if($(window).outerWidth() > 575){
                            $('.about-menu').addClass('show');
                        } else {
                            $('.about-menu').removeClass('show');
                        }
                        });
                };
            `
        }
    }]
}


function addBlock(editor, blocks) {
    $.each(blocks, function (index, item) {
        editor.BlockManager.add(item.id, item);
    });
}

init();