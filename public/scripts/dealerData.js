$(document).ready(() => {
    const url = 'http://localhost:8080/dealerData';
    let dealerCount = $('#dealer-count');
    let zipCode = $('#dealer-zipcode');
    let filteredData = $('#filtered-data');
    let html = [];
    let modalHtml = [];

    $.get(url, (data, status) => {
        dealerCount.html(data.dealers.length);
        zipCode.html(data.zipcode);
        data.dealers.map((dealer, index) => {
            return html += 
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
                </div>`;
        });
        filteredData.html(html);
    });
});