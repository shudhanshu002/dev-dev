// const fs = require('fs');

// fs.writeFileSync('output.txt',"hello there \n new");


//Async
const fs = require('fs');

fs.writeFile('output.txt',"Async write ho raha \n hai ji",(err)=>{
    if(err) {
        console.error("Error writinf file",err);
        return;
    }
    console.log('file wrrirten succes');
})
