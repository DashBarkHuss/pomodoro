;(function(window){
    //Pomodoro
    var Pomodoro = function(el){
        this.el = document.getElementById(el);
        //create interval inputs
        this.inputs = document.createElement("div");
        this.inputs.id = "inputs";
        this.inputs.innerHTML = "Sumbit Intervals";
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
    //test----------
    this.intervals =
     {work:[6,7],
    breaks:[2,3]}
    startPomo(this);
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

        //loop to make 


        //time loop
         //set work[0] time, 


        //line up work[0], breaks[0], work[1], breaks[1]
        pomo.intervals
    }
    function addEventListeners(){
        document.querySelectorAll(".addInput").forEach((x)=>x.addEventListener('click', addAfter));
        document.querySelectorAll(".removeInput").forEach((x)=>x.addEventListener('click', remove));
    }   
    
    addEventListeners();
    
    function calcInputs(){
        this.inputValues = (()=>{
            var array = [];
            document.querySelectorAll(".input").forEach((x)=>{
                if(x.value.length==0) return;
                array.push(parseInt(x.value));
            });
            return array;
        })();
        
    }

    this.submit.addEventListener('click', submit.bind(this));
    
    
        //create pomodor with intervals
        // save intervals into an object that contains two arrays: work intervals and break intervals.
       
        //start pomodoro 
        function start(){
            //removes input section and submit buttons, 
            //create time display div
            this.timeDisplay = document.createElement("div");
            this.timeDisplay.id = "display";
            this.timeDisplay.innerHTML = "display";
            this.el.appendChild(this.timeDisplay);
        }
        //puts time in time display div
        //creates control divs or calls controls which does that
        //loops: intervals.work[i], followed by intervals.break[i], reset i to 0 if it's the last i
    };
//controls
    window.Pomodoro = Pomodoro;
})(window);
