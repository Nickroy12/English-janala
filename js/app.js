function loadData(){
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(data => dataStream(data.data))
}
loadData()
const dataShow = (id) =>{
loader(true)
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((res) => res.json())
    .then((data) =>{
        removeBtn()
        const clickBtn = document.getElementById(`lesson-btn-${id}`)
        console.log(clickBtn)
        clickBtn.classList.add('active')
    dataDisplay(data.data)
    })
}
const sBtn = (btn) =>{
   const btnElement = btn.map(el => `<span class="btn">${el}</span>`)
  return btnElement.join(' ')
}
const loader = (status) =>{
    if(status === true){
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('word-container').classList.add('hidden')
    }else{
          document.getElementById('word-container').classList.remove('hidden')
           document.getElementById('spinner').classList.add('hidden');
    }

}
const loadDetail = async (id) => {
    
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url)
 const detail = await res.json();
  disDetail(detail.data)
}
const disDetail = (w) =>{
  console.log(w)
  const detailBox = document.getElementById('detail-container');
  detailBox.innerHTML = `    <div class="">
        <h2 class="text-2xl font-bold">${w.word}(<i class="fa-solid fa-microphone-lines"></i>: ${w.pronunciation})</h2>
        
    </div>
    <div class="">
        <h2 class=" font-bold">Meaning</h2>
        <p>${w.meaning}</p>
        
    </div>
    <div class="">
        <h2 class=" font-bold">Example</h2>
        <p>${w.sentence}</p>
        
    </div>
    <div class="">
        <h2 class=" font-bold">Synonym</h2>
        <span >${sBtn(w.synonyms)}</span>

        
    </div>`
  document.getElementById('my_modal').showModal();
}
const removeBtn = () =>{
    const btn = document.querySelectorAll('.lesson-btn');
    btn.forEach(btn => btn.classList.remove('active'))
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
        loader(false)
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
                <button onclick="loadDetail(${word.id})" class="btn"><i class="fa-solid fa-info"></i></button>
                <button  class="btn"><i class="fa-solid fa-volume-high"></i></button>
               </div>
            </div>`

         wordCon.appendChild(card)
     });
 loader(false)
}
document.getElementById('btn-search').addEventListener('click' , ()=>{
    const input = document.getElementById('inputValue').value.trim().toLowerCase();
    console.log(input)
    fetch('https://openapi.programming-hero.com/api/words/all')
    .then (res => res.json())
    .then (data => {
        const allWord = data.data
        const filter = allWord.filter(w => w.word.toLowerCase().includes(input))
        console.log(filter)
        dataDisplay(filter)
    })
    
})
function dataStream(lessons){
    const buttonContainer = document.getElementById('btnContainer');
    buttonContainer.innerHTML = ' '

    for(let lesson of lessons){
        const div = document.createElement('div');
        div.innerHTML =`
           <button id="lesson-btn-${lesson.level_no}" onclick="dataShow(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">Lesson - ${lesson.level_no}</button>
        `
           buttonContainer.appendChild(div)
    }
 

}