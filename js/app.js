function loadData(){
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(data => dataStream(data.data))
}
loadData()
const dataShow = (id) =>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((res) => res.json())
    .then((data) => dataDisplay(data.data))
}
// id	5
// level	1
// word	"Eager"
// meaning	"আগ্রহী"
// pronunciation	"ইগার"
const dataDisplay = (words)=>{
   const wordCon = document.getElementById('word-container')
     wordCon.innerHTML = ' '

     if(words.length === 0 ){
        wordCon.innerHTML = `
             <div class="text-center col-span-full bangla-font space-y-4">
            <h2 class="text-4xl font-bold">কোনো শব্দ পাওয়া যায় নি</h2>
            <p>পরবর্তী Lesson Select করুন</p>
          </div>
        `
        return;
     }
     words.forEach(word => {
         const  card = document.createElement('div');
         card.innerHTML = `
           <div class="bg-gray-100 shadow-sm rounded-xl text-center px-5 py-10 space-y-4">
               <h2 class="font-bold text-xl">${word.word ? word.word : "কোন শব্দ পাওয়া যায় নি"}</h2>
               <p class="font-semibold">${word.pronunciation ? word.pronunciation : "কোন pronunciation পাওয়া যায় নি"}</p>
               <h3>${word.meaning ? word.meaning :  "কোন অর্থ পাওয়া যায় নি"}</h3>
               <div class="flex justify-between items-center">
                <button class="btn"><i class="fa-solid fa-info"></i></button>
                <button class="btn"><i class="fa-solid fa-volume-high"></i></button>
               </div>
            </div>`

         wordCon.appendChild(card)
     });

}

function dataStream(lessons){
    const buttonContainer = document.getElementById('btnContainer');
    buttonContainer.innerHTML = ' '

    for(let lesson of lessons){
        const div = document.createElement('div');
        div.innerHTML =`
           <button onclick="dataShow(${lesson.level_no})" class="btn btn-outline btn-primary">Lesson - ${lesson.level_no}</button>
        `
           buttonContainer.appendChild(div)
    }
 

}