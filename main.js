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
        
        function createInputs(numberOfInputs = 2){
            for (i = inputs.children.length; i<numberOfInputs; i++){
                this.input = document.createElement("input");
                this.input.className = "input";
                this.input.innerHTML = "input";
                this.inputs.appendChild(this.input);
            }
        }

        createInputs();

        this.submit = document.createElement("button");
        this.submit.id = "submitIntervals";
        this.submit.innerHTML = "submit";
        this.el.appendChild(this.submit);

        this.addInput = document.createElement("button");
        this.addInput.id = "submitIntervals";
        this.addInput.innerHTML = "add";
        this.el.appendChild(this.addInput);

        this.addInput.addEventListener('click', ()=>{
            createInputs(inputs.children.length+1)
        });

        
        
        // let addInput = createInputs(inputs.chil)

        // this.input2 = document.createElement("input");
        // this.input2.class = ".input";
        // this.input2.innerHTML = "input";
        // this.inputs.appendChild(this.input2);
        
        //add work interval
        //add add break interval
        
        //get interval on submit
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
