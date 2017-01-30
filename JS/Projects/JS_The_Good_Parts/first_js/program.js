
document.writeln("Hello World")

//
// Object Literals...
//

var empty_object = {};
var stooge = {
    "first-name" : "Jerome",
    "last-name" : "Howard"
};

var flight = {
    airline: "oceanic",
    number: 85,
    departure: {
        IATA: "SYDa",
        time: "2004",
        city: "Sydney"
    },
    arrival: {
        IATA: "LAX",
        time: "2004-09-23 10:42",
        city: "Los Angeles"
    }
}


stooge.nickname = 'Curly'

// Create handler example...
if (typeof Object.create !== 'function') {
    Object.create = function(o) {
        var F = function() {};
        F.prototype = o;
        return new F();
    };
}
var another_stooge = Object.create(stooge);
another_stooge['first-name'] = 'Harry';
another_stooge['middle-name'] = 'Moses';
another_stooge.nickname = 'Moe';

document.writeln("Properties of Another-Stooge object...")
var name;
for (name in another_stooge) {
    document.writeln(name)
}


//
// Functions....
//
document.writeln("");
document.writeln("");
document.writeln("");
document.writeln("");
document.writeln("  --- Functions ---");



// Function Literals
var add = function(a, b) {
    return a + b;
};


// Four patterns of Function invocation in JS:
//    - Method Invocation Pattern
//    - Function Invocation Pattern
//    - Constructor Invocation Pattern
//    - Apply Invocation Pattern
// 

// 1. Method invocation example: 
document.writeln("  --- 1 Method invocation example ---");

var myObject = {
    value: 0,
    increment: function(inc) {
        this.value += typeof inc === 'number' ? inc : 1; 
    } 
};

myObject.increment();
document.writeln(myObject.value);

myObject.increment(29);
document.writeln(myObject.value);


// 2. Function invocation example: 
document.writeln("  --- 2 Function invocation example ---");

myObject.double = function() {
    var that = this;
    var helper = function () {
        that.value = add(that.value, that.value);
    };
    helper();
};

myObject.double();
document.writeln(myObject.value);


// 3. Constructor invocation example: 
document.writeln("  --- 3 Function constructor example ---");
// First create a constructor function:
var Quo = function(string) {
    this.status = string;
}

Quo.prototype.get_status = function() {
    return this.status;
};
var myQuo = new Quo("confused");
document.writeln(myQuo.get_status());


// 4. Apply invocation example: 
document.writeln("  --- 4 Function constructor example ---");

var apply_add = function(a, b) {
    document.writeln("Ich komme aus ApplyAdd()");
    return a + b;
};
var array = [3,4];
var sum = apply_add.apply(null, array); // Note: null, is the value to be applied to this, the array represents the list of params...
document.writeln("Sum was: " + sum);


var statusObject = {
    status: 'A-OK'
};
var status = Quo.prototype.get_status.apply(statusObject); // this now points to statusObject... (making all calls to similiar named methods on Quo delegated to statObj...)
document.writeln("Status from statusObject is: " + status); 


document.writeln("");
document.writeln("");
document.writeln("  --- Function Arguments ---");

var sum = function() {
    var i, sum = 0;
    for (i = 0; i < arguments.length; i += 1) {
        sum += arguments[i];
    }
    return sum;
};
document.writeln(sum(4, 8, 1980, 13, 13, 69, (8*4), 2));

document.writeln("");
document.writeln("");
document.writeln("  --- Function Returns ---");

// Functions always return something, when nothing is specified, 'undefined' gets returned...

// TODO: Make some examples later on...

document.writeln("");
document.writeln("");
document.writeln("  --- Exceptions ---");
// Simple add function with type checking for numeric types... 

var add = function(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw { name: 'TypeError', message: 'add needs numbers' };
    }
    return a + b;
}
var try_add = function() {
    try {
        add("seven");
    } catch (e) {
        document.writeln(e.name + ': ' + e.message);
    }
}
try_add();



document.writeln("");
document.writeln("");
document.writeln("  --- Type Augmentation ---");
Function.prototype.method = function(name, func) {
    this.prototype[name] = func;
    return this;
};
Number.method('myint', function(){
    return Math[this < 0 ? 'ceiling' : 'floor'](this);
});
document.writeln((10 / 3).myint());

String.method('trim', function () {
    return this.replace(/^\s+|\s+$/g, '');
});
document.writeln('"' + "     neat     ".trim() + '"');


document.writeln("");
document.writeln("");
document.writeln("  --- Function Recursion ---");
var hanoi = function (disc, src, aux, dst) {
    if (disc > 0) {
        hanoi(disc - 1, src, dst, aux);
        document.writeln('Move disc ' + disc + ' from ' + src + ' to ' + dst);
        hanoi(disc -1, aux, src, dst); 
    }
};
hanoi(3, 'Src', 'Aux', 'Dst');


// Define a walk_the_DOM function that visits every node of the tree in HTML source order,
// starting from some given node. It invokes a function, passing it each node in turn. 
// walk_the_DOM calls itself to process each of the child nodes. 
var walk_the_DOM = function walk(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walk(node, func);
        node = node.nextSibling
    }
};

// Define a getElementsByAttribute function. It takes an attribute name string and an optional 
// matching value. It calls walk_the_DOM, passing it a function that looks for an attribute name in 
// the node. The matching nodes are accumulated in a results array. 
var getElementsByAttribute = function (att, value) {
    var results = [];
    walk_the_DOM(document.body, function (node) {
        var actual = node.nodeType === 1 && node.getAttribute(att);
        if (typeof actual === 'string' && (actual === value || typeof value !== 'string')) {
            results.push(node);
        }
    });
    return results;
};

// Make a factorial function with tail recursion. It is tail recursion because it returns the results
// of calling itself. (JavaScript does not optimize Tail Recursion.) 
var factorial = function factorial(i, a) {
    a = a || 1;
    if (i < 2) {
        return a;
    }
    return factorial(i - 1, a * i); 
};
document.writeln(factorial(4));



document.writeln("");
document.writeln("");
document.writeln("  --- Scope ---");

var foo = function() {
    var a = 3, b = 5; 
    document.writeln("1 a: " + a + "b: " + b);

    var bar = function() {
        var b = 7, c = 11; 
        document.writeln("\t 3 a: " + a + "b: " + b  + "c: " + c);

        a += b + c;
        document.writeln("\t 4 a: " + a + "b: " + b  + "c: " + c);
    };
    document.writeln("2 a: " + a + "b: " + b);
    bar();
    document.writeln("5 a: " + a + "b: " + b);
};
foo();



document.writeln("");
document.writeln("");
document.writeln("  --- Closure ---");

var myObject = function () {
    var value = 0;

    return {
        increment: function(inc) {
            value += typeof inc === 'number' ? inc : 1;
        },
        getValue: function() {
            return value;
        }
    };
}();

// Create a make function called quo(). It makes an object with a get_status 
// method and a private status property.
var quo = function (status) {
    return {
        get_status: function () {
            return status;
        }
    };
};

var myQuo = quo("amazed");
document.writeln(myQuo.get_status());

var fade = function (node) {
    var level = 1;
    var step = function () {
        var hex = level.toString(16);
        node.style.backgroundColor = '#FFFF' + hex + hex;
        if (level < 15) {
            level += 1;
            setTimeout(step, 100);
        }
    };
    setTimeout(step, 100);
};
fade(document.body);



// Bad example of reference passing and solution with Closure:
// -> Make a function that assigns event handler functions to an array of nodes the wrong way.
//    When you click on a node, an alert box is supposed to display the ordinal of the node. 
//    But it always displays the number of nodes instead.
var add_the_handlers = function (nodes) {
    var i;
    for (i = 0; i < nodes.length; i += 1) {
        nodes[i].onclick = function(e) {
            alert(i);
        };
    }
};
// add_the_handlers(document.body.children);

// Make a function that assigns event handler functions to an array of nodes the right way.
// When you click on a node, an alert box will display the ordinal of the node.
var add_the_handlers_correctly = function (nodes) {
    var i; 
    for (i = 0; i < nodes.length; i += 1) {
        nodes[i].onclick = function (i) {
            return function (e) {
                alert(e);
            };
        }(i);
    }
};



document.writeln("");
document.writeln("");
document.writeln("  --- Callbacks ---");
// Generate an example...

document.writeln("");
document.writeln("");
document.writeln("  --- Module(s) ---");

String.method('deentityify', function () {
    var entity = {
        quot: '"',
        lt: '<',
        gt: '>'        
    };

    return function () {
        return this.replace(/&([^&;]+);/g, 
            function (a, b) {
                var r = entity[b];
                return typeof r === 'string' ? r : a;
            }
        );
    };
}());
document.writeln('&lt;&quot;&gt;'.deentityify());


// Produces an object that produces unique strings. A unique string is made up of two parts:
// a prefix and a sequence number. The object comes with methods for setting the prefix 
// and sequence number, and a gensym method that produces unique strings.
serial_maker = function() {
    var prefix = '';
    var seq = 0;
    return {
        set_prefix: function(p) {
            prefix = String(p);
        },
        set_seq: function (s) {
            seq = s;
        },
        gensym: function() {
            var result = prefix + seq;
            seq += 1;
            return result;
        }
    };
};
var seqer = serial_maker();
seqer.set_prefix('Q');
seqer.set_seq(1000);
var unique = seqer.gensym();
document.writeln(unique);




document.writeln("");
document.writeln("");
document.writeln("  --- Cascade ---");

// JS equiv of 'Fluent' API tech...
getElement('div16').
    move(350, 150).
    width(100).
    height(100).
    color('red').
    border('10px outset').
    padding('4px').
    appendText("Please stand by").
    on('mousedown', function(m){
        this.startDrag(m, this.getNinth(m));
    }).
    on('mousemove', 'drag').
    on('mouseup', 'stopDrag').