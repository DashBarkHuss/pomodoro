;(function(window){
    //Pomodoro
    var Pomodoro = function(el){
        this.el = document.getElementById(el);
        this.el.innerHTML ="hi";
        console.log(this.el);
        //create interval inputs
        this.inputs = document.createElement("div");
        this.inputs.id = "inputs";
        this.inputs.innerHTML = "inputs";
        this.el.appendChild(this.inputs);

        this.intervals={};
        
        function createInput(numberOfInputs = 1){
            let elems = document.createDocumentFragment();
            for (i = 0; i<numberOfInputs; i++){
                let input = makeElem("input", "input");
                let removeInput = makeElem("button", "removeInput", "remove");
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
        this.addInput.id = "submitIntervals";
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
    //get interval on submit
    function saveIntervals(){
        calcInputs.bind(this)();
        console.log(this.inputValues);
        const validate = (function(){
                if(this.inputValues.length == 0){
                alert('You must submit atleast one work interval and one break interval.'); 
                return;
            }else if (this.inputValues.length%2!=0){
                alert(`Must have one break after work session of ${this.inputValues[this.inputValues.length-1]} minutes.`); 
                return;
            }
        }).bind(this)();;
        //save intervals into interval object
        let work = this.inputValues.filter((x,i)=>{
            return i%2 ==0;
        });
        let breaks = this.inputValues.filter((x,i)=>{
            return i%2 !=0;
        });
        
        console.log(work, breaks);
        this.intervals.work = work;
        this.intervals.breaks = breaks;
        console.log(this.intervals);
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

    this.submit.addEventListener('click', saveIntervals.bind(this));
    
    
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
