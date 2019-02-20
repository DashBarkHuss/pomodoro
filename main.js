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
        
        // function createInputs(numberOfInputs = 2){
        //     for (i = inputs.children.length; i<numberOfInputs; i++){
        //         this.input = document.createElement("input");
        //         this.input.className = "input";
        //         this.input.innerHTML = "input";
        //         this.inputs.appendChild(this.input);
        //     }
        // }
        function createInputs(numberOfInputs = 2){
            for (i = inputs.children.length; i<numberOfInputs; i++){
                let input = makeElem("input", "input");
                this.inputs.appendChild(input);
                let removeInput = makeElem("button", "removeInput", "remove");
                this.inputs.appendChild(removeInput);
                let addInput = makeElem("button", "addInput", "+");
                this.inputs.appendChild(addInput);
            }
        }

        //makes any element
        function makeElem(type, className, text=""){
            let elem = document.createElement(type);
            elem.className = className;
            elem.innerHTML = text;
            return elem
        }

        createInputs();

        
        //create submit button
        this.submit = document.createElement("button");
        this.submit.id = "submitIntervals";
        this.submit.innerHTML = "submit";
        this.el.appendChild(this.submit);
        
        this.addInput = document.createElement("button");
        this.addInput.id = "submitIntervals";
        this.addInput.innerHTML = "add";
        this.el.appendChild(this.addInput);
        
        // add input
        this.addInput.addEventListener('click', ()=>{
            createInputs(inputs.children.length+1);
        });
        function add(e){
            let elems = new DocumentFragment();
            makeElem;
            // elems.push(makeElem("input","input"), makeElem("button","button"))
            // this.parentElement.insertBefore(elems, makeElem("input","input"), this.nextSibling);
    
            
    
             
            debugger;
        };

       document.querySelectorAll(".addInput").forEach((x)=>x.addEventListener('click', add));

    
        //removeInput

        
        
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
