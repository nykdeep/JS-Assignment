
/* fetch JSON data and pass it to other functions */
function fetchDataFromJson() {
    let jsonData;
    fetch('sideBarData.json')
        .then(res => res.json())
        .then(data => {
            jsonData = data.data;

            if (jsonData.length) {
                createSectionElement(jsonData);
                getArticleData(jsonData);
            }

        })
        .catch(error => {
            document.getElementById("outerdiv").innerHTML = "Error Occured";
            console.error('There was an error!', error);
        });

}

/* separate the data based on title and its  section */
const getArticleData = mainData => {

    //let result = mainData.groupBy(({ sectionName }) => sectionName);

    //group by title
    let groupByTitle = _.groupBy(mainData, data => data.newsSection);
    let grpTitle = Object.keys(groupByTitle);

    for (let x = 0; x < grpTitle.length; x++) {

        let item = grpTitle[x];
        console.log(item);
        let headerTitle = createEl("header", "headerSec");
        let headerId = "headerTitle" + (x + 1);
        headerTitle.setAttribute("id", headerId);

        let textTag = document.createTextNode(item);
        headerTitle.appendChild(textTag);

        let artcileTag = createEl("article", "article");
        let articleId = "article" + (x + 1);
        artcileTag.setAttribute("id", articleId);

        let div = document.getElementById('outerdiv');
        div.appendChild(headerTitle);
        div.appendChild(artcileTag);

        //groupby sectionName
        let result = _.groupBy(groupByTitle[item], data => data.sectionName);
        let key = Object.keys(result);
        for (let i = 0; i < key.length; i++) {
            getSectionData(mainData, key[i], articleId);
        }
    }

}

const createEl = (type, className) => {
    let el = document.createElement(type);
    el.setAttribute("class", className);
    return el;
}

const getSectionData = (mainData, type, articleId) => {
    let dataAry = mainData.filter(item => {
        if (item.sectionName == type)
            return item;
    });
    if (dataAry.length)
        createNewsItems(dataAry, articleId);
}

/* create article section elements based on Data received */

const createNewsItems = (ary, articleId) => {

    let data = ary[0];

    let sectionTag = createEl("section", "card");
    let articleTag = document.getElementById(articleId);
    articleTag.appendChild(sectionTag);


    let cardBadge = createEl("div", "cardbadge");
    let text = document.createTextNode(data.sectionName);
    cardBadge.appendChild(text);
    sectionTag.appendChild(cardBadge);


    let imgCard = createEl("img", "imgCard");
    imgCard.src = data.urlToImage;
    sectionTag.appendChild(imgCard);

    let len = ary.length > 4 ? 4 : ary.length;

    for (let i = 0; i < len; i++) {
        let containerTag = createEl("div", "container");
        let textTag = document.createTextNode(ary[i].title);
        containerTag.appendChild(textTag);
        sectionTag.appendChild(containerTag);
    }

    let button = createEl("button", "btn");
    button.innerHTML = "See All";
    sectionTag.appendChild(button);
}

/* side bar news section */
const createSectionElement = (sectionData) => {

    for (let i = 0; i < sectionData.length; i++) {
        let item = sectionData[i];
        let sectionTag = createEl("section", "sidebarsection");
        let asideele = document.getElementById("outerSideBar");
        asideele.appendChild(sectionTag);

        let img = createEl("img", "img");
        img.src = item.urlToImage;
        sectionTag.appendChild(img);

        var text = document.createTextNode(item.title);
        sectionTag.appendChild(text);

    }
}

fetchDataFromJson();

