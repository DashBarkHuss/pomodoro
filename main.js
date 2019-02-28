;(function(window){
    //Pomodoro
    var Pomodoro = function(el){
        this.el = document.getElementById(el);

        //create interval inputs__________________________________
        //________________________________________________________
        function inputForm(pomo = this){
            pomo.inputs = document.createElement("div");
            pomo.inputs.id = "inputs";
            pomo.inputs.innerHTML = "Submit Intervals in Minutes";
            pomo.el.appendChild(pomo.inputs);

            
            function createInput(numberOfInputs = 1){ //refactor this to make two inputs with .work class and .breaks
                let elems = document.createDocumentFragment();
                for (var i = 0; i<numberOfInputs; i++){
                    let input = makeElem("input", "input");
                    let removeInput = makeElem("button", "removeInput", "-");
                    let addInput = makeElem("button", "addInput", "+");
                    elems.append(input, removeInput, addInput);
                }
                return elems;
            }
            
            //makes any element
            function makeElem(type, className, text=""){
                let elem = document.createElement(type);
                elem.className = className;
                elem.innerHTML = text;
                return elem
            }
            
            //start with two input elements
            
            
            if (pomo.intervals){
                pomo.inputs.append(createInput(pomo.intervals.inOrder.length));
                for (i = 0; i < pomo.intervals.inOrder.length; i++){
                    pomo.inputs.querySelectorAll(".input")[i].value = pomo.intervals.inOrder[i];
                }
            } else {
                pomo.intervals={};
                pomo.inputs.append(createInput(2));
            }
            
            
            //create submit button
            pomo.submit = document.createElement("button");
            pomo.submit.id = "submitIntervals";
            pomo.submit.innerHTML = "submit";
            pomo.el.appendChild(pomo.submit);
            
            //create lower add button
            pomo.addInput = document.createElement("button");
            pomo.addInput.id = "addInput";
            pomo.addInput.innerHTML = "add";
            pomo.el.appendChild(pomo.addInput);
            
            // lower add button input
            pomo.addInput.addEventListener('click', ()=>{
                this.inputs.append(createInput());
                addEventListeners();
            });
            
            //add Input after this input 
            function addAfter(e){
                this.parentElement.insertBefore(createInput(), this.nextSibling);  
                addEventListeners();
            };
            //removeInput
            function remove(e){ //this function wouldn't work if the html order was switched
            this.nextSibling.remove();
            this.previousSibling.remove();
            this.remove();
        }

        //get intervals on submit
        function submit(){
            //get inputs
            calcInputs();

            //validate inputs
            let error = false;
            const validate = (function(){
                if(pomo.inputValues.length == 0){
                    alert('You must submit atleast one work interval and one break interval.'); 
                    error = true;
                }else if (pomo.inputValues.length%2!=0){
                    alert(`Must have one break after work session of ${pomo.inputValues[pomo.inputValues.length-1]} minutes.`); 
                    error = true;
                }
            })();

            if (error){return};

            //save inputs into interval object
            let work = pomo.inputValues.filter((x,i)=>{
                return i%2 ==0;
            });
            let breaks = pomo.inputValues.filter((x,i)=>{
                return i%2 !=0;
            });
            
            pomo.intervals.work = work;
            pomo.intervals.breaks = breaks;
            
            //start pomodoro
            startPomo(pomo); //bind vs passing this?
        }
        function calcInputs(){
            pomo.inputValues = (()=>{
                var array = [];
                document.querySelectorAll(".input").forEach((x)=>{
                    if(x.value.length==0) return;
                    array.push(parseFloat(x.value));
                });
                return array;
            })();
            
        }

        addEventListeners();
        function addEventListeners(){
            document.querySelectorAll(".addInput").forEach((x)=>x.addEventListener('click', addAfter));
            document.querySelectorAll(".removeInput").forEach((x)=>x.addEventListener('click', remove));
        }   

        pomo.submit.addEventListener('click', submit.bind(this));
    }

    inputForm(this);

    // __________________________test________________________________________
    this.intervals =
     {work:[1.1,.05],
    breaks:[.05,.09]}
    startPomo(this);
    ///----------

    //start pomo________________________________________________
    //___________________________________________________________
    function startPomo(pomo){
        //remove display
            //if more elements are added to the starting UI in the future, this should probably be changed to a loop deleteing all of pomo.el.chilren
        pomo.inputs.remove();
        pomo.submit.remove();
        pomo.addInput.remove(); 
        
        //set new displays
          //grid container
        pomo.pomoDisplay = document.createElement("div");
        pomo.pomoDisplay.id = "pomo";
        pomo.el.appendChild(pomo.pomoDisplay);

        //edit
        pomo.editButton = document.createElement("button");
        pomo.editButton.id = "editButton";
        pomo.editButton.innerHTML = "Edit";
        pomo.pomoDisplay.appendChild(pomo.editButton);
        
        // timer display
        pomo.timerDisplay = document.createElement("div");
        pomo.timerDisplay.id = "timerDisplay";
        pomo.pomoDisplay.appendChild(pomo.timerDisplay);
        
        // next intervals, contains intervals
        pomo.intervalsDisplay = document.createElement("div");
        pomo.intervalsDisplay.id = "intervals";
        pomo.pomoDisplay.appendChild(pomo.intervalsDisplay);
        
        //loop to make intervals in order
        pomo.intervals.inOrder=[];
        for (let i=0; i<pomo.intervals.work.length; i++){
            pomo.intervals.inOrder.push(pomo.intervals.work[i], pomo.intervals.breaks[i]);
        }
        //loop to make interval divs
        for (let i=0; i<pomo.intervals.inOrder.length; i++){
            let interval = pomo.intervals.inOrder[i];
            let isWork = i%2==0;

            pomo["int"+i] = document.createElement('div');
            pomo["int"+i].className = isWork? "work":"breaks";
            pomo["int"+i].classList.add("int");
            pomo["int"+i].classList.add("int-"+(i+1));
            pomo["int"+i].innerHTML = interval;
            pomo.intervalsDisplay.appendChild(pomo["int"+i]);  
        }
        //time loop
        pomo.currentInt = 0;
        pomo.isWork = function(){return pomo.currentInt%2 != 0;};
        let seconds;
        setTimer()
        pomo.isPaused = false;
        
        //set timer to the start of a new interval
        function setTimer(skip = null){
            let lastInterval = pomo.currentInt == pomo.intervals.inOrder.length;
            let firstInterval = pomo.currentInt == 1;
            
            if (skip == null || skip == "next") {
                lastInterval? pomo.currentInt = 1 : pomo.currentInt += 1;
                
            } else {
                firstInterval? pomo.currentInt = pomo.intervals.inOrder.length : pomo.currentInt -= 1;
            }
            if(skip != null){clearInterval(timer); timer = setInterval(updateTimer, 1000);}
            
            seconds = Math.round(pomo.intervals.inOrder[pomo.currentInt-1] * 60);
            pomo.timerDisplay.innerHTML = makeSecondsReadable(seconds);
            if(pomo.currentIntDiv)pomo.currentIntDiv.classList.remove("currentInt");
            pomo.currentIntDiv = document.querySelector(".int-"+pomo.currentInt);
            pomo.currentIntDiv.classList.add("currentInt");
        }

        //make the timer go down in seconds
        function updateTimer(){
            if (pomo.isPaused) return;

            seconds -= 1;
            pomo.timerDisplay.innerHTML = makeSecondsReadable(seconds);

            if(seconds<=0) { //if timer is done then 'ding' and set timer to next interval
                console.log("play()")
                //mute pomo.isWork()? document.querySelector(".tom").play() : document.querySelector(".tink").play();
                setTimer() ;
            }
        };

        //seconds to readable time 
        function makeSecondsReadable(seconds){
            let extra0;
            `${seconds%60}`.length == 1 ? extra0 = "0" : extra0 = "";
            return `${Math.floor(seconds / 60)}:${extra0}${seconds%60}`;
        }

        //run timer
        let timer = setInterval(updateTimer, 1000);

        //controls
        //-create control divs
        //--controls container
        pomo.controlsDiv = document.createElement("div");
        pomo.controlsDiv.id = "controls";
        pomo.pomoDisplay.appendChild(pomo.controlsDiv);
        
        //--back div
        pomo.back = document.createElement("div");
        pomo.back.id = "back";
        pomo.back.innerHTML = "⏮️";
        pomo.controlsDiv.appendChild(pomo.back);
        
        //--play/pause div
        pomo.playPause = document.createElement("div");
        pomo.playPause.id = "playPause";
        pomo.playPause.innerHTML = "| |";
        pomo.controlsDiv.appendChild(pomo.playPause);
        
        //--next div
        pomo.next = document.createElement("div");
        pomo.next.id = "next";
        pomo.next.innerHTML = "⏭️";
        pomo.controlsDiv.appendChild(pomo.next);
        
        pomo.isMute = false;
        //--muteUnmute div 
        pomo.muteUnmute = document.createElement("div");
        pomo.muteUnmute.id = "muteUnmute";
        pomo.muteUnmute.innerHTML = "🔊";
        pomo.controlsDiv.appendChild(pomo.muteUnmute);

        //-controls functions
        //--playPause
        function playPause(){
            pomo.isPaused = !pomo.isPaused;
            pomo.playPause.innerHTML = pomo.isPaused? "▶": "| |";
        }
       
        //--mute unmute
        function muteUnmute(){
            pomo.isMute = !pomo.isMute;
            pomo.muteUnmute.innerHTML = !pomo.isMute? "🔊":"🔇";
            document.querySelectorAll("audio").forEach(x=>x.muted=!x.muted);
        }

        //--next 
        function next(){
            setTimer("next");
        }
        
        //--back 
        function back(){
            setTimer("back");
        }
        
        //--edit
        function edit(){
            clearInterval(timer) //or pause?
            
    
            for (i=0; i<pomo.pomoDisplay.children.length; i++){
                
                pomo.pomoDisplay.children[i].remove();
            };

            pomo.pomoDisplay.remove();
            inputForm(pomo, pomo.intervals.inOrder) //these need to go into the start.
        }
        //-controls events
        pomo.playPause.addEventListener('click', playPause);
        pomo.next.addEventListener('click', next);
        pomo.back.addEventListener('click', back);
        pomo.muteUnmute.addEventListener('click', muteUnmute);
        pomo.editButton.addEventListener('click', edit);
    }
    

    };
//controls
    window.Pomodoro = Pomodoro;
})(window);
