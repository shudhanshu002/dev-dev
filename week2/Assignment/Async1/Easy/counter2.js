let counter=0;
function update() {
    console.clear();
    console.log(counter);
    counter++;
    setTimeout(update,1000);
}

update();
