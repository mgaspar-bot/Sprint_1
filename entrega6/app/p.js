//Les variables 'simples' i les funcions tambe son objects, tot es un Object!
function printProtos(n) {
    while (n){
        console.log(n.constructor.name);
        console.log(`typeof n === 'object' : ${typeof n === 'object'}`);
        n = Object.getPrototypeOf(n);
    }
    console.log();
    console.log();
};

let n = 2;
printProtos(n);
n = `s`
printProtos(n);
n = true;
printProtos(n);
n = () => {}
printProtos(n);

//Les Promises sempre s'executen quan existeixen, no cal tornar-les ni res 
//una altra cosa es que la resta del codi les esperi!

(new Promise((res,rej) => {
    // res('M\'he resolt!')
    rej(`He fallat`);
})).then((mess) => {console.log(mess);})
.catch((mess) => {console.log(mess);});

//TOTES les funcions son variadiques i tenen un arguments.length que mesura 
//quants arguments li has passat. Son d'un objecte Function que te aquestes coses

function args() {
    console.log('Una call de args:');
    for (let i = 0; i < arguments.length; i++) {
        console.log(arguments[i]);
    }
    console.log();
    console.log();
}
args();
args(1);
args(1,'hola', 56, true);



