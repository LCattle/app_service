require('./Header.scss');
const HeaderInitHtml = (titleTxt) => {
    return `
            <div class="Header">
                <h1 class="title-box">
                    <span class="back-icon">
                        <img src="static/app_service/zs_svg_back.png" alt="back-btn">
                    </span>
                    <span class="title-text">${ titleTxt}</span>
                    <div class="search-box">
                        <input class="search-inp" id="search-inp" type="text" placeholder="请输入搜索内容">
                        <span class="btn close-search">
                            <img class="" src="static/app_service/ic_clear_dark.png" alt="search-btn">
                        </span>
                    </div>
                    <span class="search-btn">
                        <img src="static/app_service/search.png" alt="search-btn">
                    </span>
                </h1>
            </div> `;
};
let Header = {
    HeaderInitEvent: () => {

    },
    HeaderInit: (titleTxt) => {
       $('#header').html(HeaderInitHtml(titleTxt));
    }
}
module.exports = Header;