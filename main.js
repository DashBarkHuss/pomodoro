;(function(window){
    //Pomodoro
    var Pomodoro = function(el){
        this.el = document.getElementById(el);
        //create interval inputs
        this.inputs = document.createElement("div");
        this.inputs.id = "inputs";
        this.inputs.innerHTML = "Submit Intervals in Minutes";
        this.el.appendChild(this.inputs);

        this.intervals={};
        
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
        this.inputs.append(createInput(2));
        
        
        //create submit button
        this.submit = document.createElement("button");
        this.submit.id = "submitIntervals";
        this.submit.innerHTML = "submit";
        this.el.appendChild(this.submit);
        
        //create lower add button
        this.addInput = document.createElement("button");
        this.addInput.id = "addInput";
        this.addInput.innerHTML = "add";
        this.el.appendChild(this.addInput);
        
        // lower add button input
        this.addInput.addEventListener('click', ()=>{
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
        calcInputs.bind(this)();

        //validate inputs
        let error = false;
        const validate = (function(){
            if(this.inputValues.length == 0){
                alert('You must submit atleast one work interval and one break interval.'); 
                error = true;
            }else if (this.inputValues.length%2!=0){
                alert(`Must have one break after work session of ${this.inputValues[this.inputValues.length-1]} minutes.`); 
                error = true;
            }
        }).bind(this)();

        if (error){return};

        //save inputs into interval object
        let work = this.inputValues.filter((x,i)=>{
            return i%2 ==0;
        });
        let breaks = this.inputValues.filter((x,i)=>{
            return i%2 !=0;
        });
        
        this.intervals.work = work;
        this.intervals.breaks = breaks;
        
        //start pomodoro
        startPomo(this); //bind vs passing this?
    }
    function calcInputs(){
        this.inputValues = (()=>{
            var array = [];
            document.querySelectorAll(".input").forEach((x)=>{
                if(x.value.length==0) return;
                array.push(parseFloat(x.value));
            });
            return array;
        })();
        
    }
    //test----------
    // this.intervals =
    //  {work:[.09,.05],
    // breaks:[.05,.09]}
    // startPomo(this);
    /////----------
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
        // timer
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
        let seconds;
        setTimer()

        function setTimer(){
            let lastInterval = pomo.currentInt == pomo.intervals.inOrder.length;
      
            lastInterval? pomo.currentInt = 1 : pomo.currentInt += 1;
            seconds = Math.round(pomo.intervals.inOrder[pomo.currentInt-1] * 60);
            pomo.timerDisplay.innerHTML = seconds;
            if(pomo.currentIntDiv)pomo.currentIntDiv.classList.remove("currentInt");
            pomo.currentIntDiv = document.querySelector(".int-"+pomo.currentInt);
            pomo.currentIntDiv.classList.add("currentInt");
        }
        function updateTimer(){
            seconds -= 1;
            pomo.timerDisplay.innerHTML = seconds;
            console.log(seconds, pomo.timerDisplay.innerHTML);
            if(seconds<=0) setTimer() ;
        };
        setInterval(updateTimer, 1000);
        
         //set work[0] time, 


        //line up work[0], breaks[0], work[1], breaks[1]
        pomo.intervals
    }
    function addEventListeners(){
        document.querySelectorAll(".addInput").forEach((x)=>x.addEventListener('click', addAfter));
        document.querySelectorAll(".removeInput").forEach((x)=>x.addEventListener('click', remove));
    }   
    
    addEventListeners();
    

    this.submit.addEventListener('click', submit.bind(this));
    
    
        //create pomodor with intervals
        // save intervals into an object that contains two arrays: work intervals and break intervals.
       

        //puts time in time display div
        //creates control divs or calls controls which does that
        //loops: intervals.work[i], followed by intervals.break[i], reset i to 0 if it's the last i
    };
//controls
    window.Pomodoro = Pomodoro;
})(window);
