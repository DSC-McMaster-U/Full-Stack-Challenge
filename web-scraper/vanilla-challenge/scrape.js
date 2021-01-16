const puppeteer = require('puppeteer');

async function scrapeData(){
    try {

        const browser = await puppeteer.launch({headless: false});

        const page = await browser.newPage();
    
        const url = 'https://ca.finance.yahoo.com/';
    
        await page.goto(url);
    }catch(err){
        console.log(err);
    }
    
}

function getData(){
    document.getElementById("data").innerHTML = window.scrapeData();
}



