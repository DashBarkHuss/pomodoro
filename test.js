console.log("test file")
;(function(window){
    //Pomodoro
    var Pomodoro = function(el){
        this.el = document.getElementById(el);
        console.log(this.el);


       this.button = document.createElement("button");
       this.button.className="addInput";
       this.button.innerHTML="addInput";
       this.el.appendChild(this.button);

       function test(){
            console.log("test function reached");
       }

        function add(e){
            test;
    
           //  test();
            debugger;
        };
        console.log("hi");
        //document.querySelectorAll(".addInput").forEach((x)=>x.addEventListener('click', add));
        this.button.addEventListener('click', add);
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
