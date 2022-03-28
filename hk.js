const puppeteer = require('puppeteer');
const loginLink='https://www.hackerrank.com/auth/login';
require('dotenv').config()


const codeObj=require('./ans.js');


let browserOpen= puppeteer.launch({
    headless:false,
    args:['--start-maximized'],
    defaultViewport:null
});

let page;


browserOpen.then(function(browserObj){
    let browserOpenPromise= browserObj.newPage()
    return browserOpenPromise;
}).then(function(newTab){
    page=newTab;
    let hackerRankOpenPromise=newTab.goto(loginLink);
    return hackerRankOpenPromise;
}).then(function(){
    let emailEntered=page.type("input[id='input-1']",process.env.email,{delay:5})
    return emailEntered;
}).then(function(){
    let passwordEntered=page.type("input[id='input-2']",process.env.password,{delay:5})
    return passwordEntered;
}).then(function(){
    let loginButtonClicked=page.click('button[data-analytics="LoginPassword"]',{delay:50}) ;
    return loginButtonClicked ;
}).then(function(){
   let clickOnAlgoPromise=waitAndClick('.topic-card a[data-attr1="algorithms"]',page)
   return clickOnAlgoPromise ;
}).then(function(){
    let getToWarmUP= waitAndClick('input[value="warmup"]',page)
    return getToWarmUP;
}).then(function(){
    let waitfor3Seconds= page.waitFor(3000)
    return waitfor3Seconds
}).then(function(){
    let allChallengesPromise= page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled',{delay:50})
    return allChallengesPromise;
}).then(function(questionArr){
    console.log(questionArr.length);
    let questionWillBeSolved= questionSolver(questionArr[0],codeObj.ans[0])
    return questionWillBeSolved;
})

console.log(codeObj.ans[0]);

function waitAndClick(selector, cPage){
    return new Promise(function(resolve,reject){
        let waitForModelPromise = cPage.waitForSelector(selector)
        waitForModelPromise.then(function(){
            let clickModel= cPage.click(selector)
            return clickModel
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    })
}

function questionSolver(question,answer){
    return new Promise(function(resolve,reject){
        let questionWillBeClicked = question.click() ;
        questionWillBeClicked.then(function(){
            let EditorInFocusPromise=waitAndClick('.monaco-editor.no-user-select .vs',page)
            return EditorInFocusPromise;
        }).then(function(){
            return waitAndClick('.checkbox-input',page) 
        }).then(function(){
            return page.waitForSelector('.input.text-area.custominput.auto-width',page);
        }).then(function(){
            return page.type('.input.text-area.custominput.auto-width',answer,{delay:0})
        }).then(function(){
            let ctrlIsPressed=page.keyboard.down('Control')
            return ctrlIsPressed
        }).then(function(){
            let AIsPressed=page.keyboard.press('a',{delay:100})
            return AIsPressed
        }).then(function(){
            let XIsPressed=page.keyboard.press('x',{delay:100})
            return XIsPressed
        }).then(function(){
            let ctrlIsUnPressed=page.keyboard.up('Control')
            return ctrlIsUnPressed
        }).then(function(){
            let mainEditorInFocus =waitAndClick('.monaco-editor.no-user-select .vs',page)
            return mainEditorInFocus
        }).then(function(){
            let ctrlIsPressed=page.keyboard.down('Control')
            return ctrlIsPressed
        }).then(function(){
            let AIsPressed=page.keyboard.press('a',{delay:100})
            return AIsPressed
        }).then(function(){
            let VIsPressed=page.keyboard.press('v',{delay:100})
            return VIsPressed
        }).then(function(){
            let ctrlIsUnPressed=page.keyboard.up('Control')
            return ctrlIsUnPressed
        }).then(function(){
            return page.click('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled',{delay:50})
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    })
}