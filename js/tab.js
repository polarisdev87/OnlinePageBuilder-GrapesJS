
function changeTabId() {
    $('.square-tab-list').each(function () {
        var amount = $(this).find('.square-tab-box').length;
        $(this).find('.square-tab-box').each(function () {
            if ($(this).data('id') == 'tab') {
                console.log(amount);
                $(this).attr('data-id', 'tab' + amount);
                // $(this).parent().parent().css({'display': 'inline'});
                $('.square-tab-content-list').slick('unslick');
                $('.square-tab').append(`
                <div id="tab${amount}" class="square-tab-content">
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
              `);
                $('.square-tab-content-list').slick({
                    dots: false,
                    infinite: false,
                    arrows: false,
                    speed: 300,
                    slidesToShow: 3,
                    slidesToScroll: 3,
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
            }
        });
    });
}

changeTabId();