$(document).ready(() => {
    const url = 'http://www.wes2k.com:8080/dealerData',
        dealerCount = $('#dealer-count'),
        zipCode = $('#dealer-zipcode'),
        filteredData = $('#filtered-data'),
        checkboxes = $('.filters').find('input:checkbox');
    let filterArr = ['Residential Pro', 'Commercial Pro', 'Service Pro', 'Installation Pro'];
    
    checkboxes.each(function() {
        let checkbox = $(this),
            dealerType = $(this).data('id');
        
        checkbox.change(function() {
            let index = filterArr.indexOf(dealerType);
            if($(this).is(":checked")) {
                if(index === -1) {
                    filterArr.push(dealerType)
                }
            }
            else {
                if(filterArr.length > 1) {
                    if (index > -1) {
                        filterArr.splice(index, 1);
                    }
                }
                else {
                    filterArr = [];
                }
            }
            console.log(index, dealerType, filterArr);
            getData(filterArr);
        });
    });

    /* $('#commercial').change(function() {
        if($(this).is(":checked")) {
            filterArr.push('Commercial Pro')
        }
        else {
            let index = filterArr.indexOf('Commercial Pro');
            if (index > -1) {
                filterArr.splice(index, 1);
            }
        }
        getData(filterArr);
    }); */

    const getData = (criteria) => {
        $.get(url, (data, status) => {
            if(data) {
                dealerCount.html(data.dealers.length);
                zipCode.html(data.zipcode);
                filteredData.html(
                    renderDealerHtml(
                        filteredDealers(data.dealers, criteria)
                    )
                );
            }
        });
    };

    /* $.get(url, (data, status) => {
        if(data) {
            dealerCount.html(data.dealers.length);
            zipCode.html(data.zipcode);
            filteredData.html(renderDealerHtml(
                filteredDealers(data.dealers, 'Commercial Pro')
            ));
        }
    }); */
    

    const filteredDealers = (dealers, criteria) => {
        /* return dealers.filter((dealer) => {
            return dealer.data.certifications.indexOf(criteria) > -1; */
            
            return dealers.filter(dealer => {
                return dealer.data.certifications.find(certification => {
                    return criteria.includes(certification);
                });
            });
        //});
    };

    const renderDealerHtml = (dealers) => {
        return dealers.map((dealer, index) => 
                `<div class="dealer-box">
                    <div class="dealer-padded-content">
                        <div class="dealer-header"><h1>${dealer.data.name}</h1></div>
                        <div class="vertical-line-separator"></div>
                        <div class="dealer-details">
                            <div class="phone-container">
                                <div><span class="phone-icon-img"></span></div>
                                <div><h1>${dealer.data.phone1}</h1></div>
                            </div>
                            <div><em>Can\'t talk now? Click below to send an email.</em></div>
                            <button class="myBtn"><span class="email-icon"></span>Contact this Pro</button>
                            <div class="dealer-hours">
                                <h3>Business Hours</h3>
                                <p>Weekdays ${dealer.data.weekHours.mon}</p>
                                <p>Saturdays ${(dealer.data.weekHours.sat) ? dealer.data.weekHours.sat : ' - Closed'}</p>
                                <p>Sundays - ${(dealer.data.weekHours.sun) ? dealer.data.weekHours.sun : 'Closed'}</p>
                            </div>
                        </div>
                    </div>
                    <div class="dealer-tags">
                        ${dealer.data.certifications.map(certification => `<div class=${(certification.replace(/\s/g,'')).toLowerCase()}><span></span>${certification}</div>`).join('')}
                    </div>
                    <!-- Modal -->
                    <div class="myModal modal">
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <div class="modal-blue-header">
                                <h3>EMAIL</h3>
                                <h1>${dealer.data.name}</h1>
                            </div>
                            <div class="modal-contact-form">
                                <p>Fill out the form below and ${dealer.data.name} will get in touch.</p>
                                <form>
                                    <label>First and last name</label>
                                    <input type="text" placeholder="Jane Smith"/>
                                    <label>Phone number</label>
                                    <input class="phone" type="tel"/>
                                    <label>Email address</label>
                                    <input type="email"/>
                                    <label>Comments or questions</label>
                                    <textarea></textarea>
                                    <label>Do you currently own a pool or spa?</label>
                                    <button class="form-button form-button-active">Yes</button>
                                    <button class="form-button">No</button>
                                    <div class="contact-form-separator"></div>
                                    <button class="form-submit-button">Send my email<span></span></button>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex.</p>
                            </div>
                        </div>
                    </div>
                    <!-- Modal end -->
                </div>`
        ).join('');
    };

    getData(filterArr);
});