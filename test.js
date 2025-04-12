// let a={name:"vikas",sddress:"noids",age:25};
// let c=[2,4,5,6];

// console.log(Object.keys(a));
// for(let keys in a){
//     console.log(keys+":"+a.keys);

// }
// for (let task of c){//// it not support entries
//     console.log(task);

// }

// c.forEach((value, index)=>{
//     console.log(value+":"+index);

// })

// let a=1700;
// let b=1701;
// let c=0;
// let num=1700
// while(num<=1900){
//     c=a+b;
//     console.log(c);
//     a=b;
//     b=c;
//     num++

// }


// function b(num){
//     if(num==0||num==1) return 1;
// return num* b(num-1)
// }
// console.log(b(5))

// let c = "hgnis sakiv olleh";
// let rev = "";
// console.log(c.length-1);

// for (let i = c.length - 1; i >=0; i--) {
//     rev = rev + c[i];
//     console.log(rev)
// }
// console.log(rev);

// function palindrome(srting) {
//     let rev=""
//     for (let i = srting.length - 1; i >= 0; i--) {
//         rev = rev + srting[i];
//         console.log(rev)
//     }
//     if(rev==srting) return "palindrome"
//     else return "not polindrpom"
// }
// console.log(palindrome("2023"));
// let obj = {}
// function checkoccurance(str) {
//     let strArr = str.split(" ");
//     for (let i = 0; i < strArr.length; i++) {
//         //console.log(obj[strArr[i]]);

//         if (!obj[strArr[i]]) {
//             obj[strArr[i]] = 1
//         } else {
//             obj[strArr[i]]++;
//         }
//     } console.log(obj.hello)
//     return obj
// }

// console.log(checkoccurance("hello bolo hello bolo"));


class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
class linkedloist {
    constructor() {
        this.head = null;
    }
    addfirst(data) {
        const newnNode = new Node(data);
        newnNode.next = this.head;
        this.head = newnNode;
        console.log(this.head);
    }
    addLast(data){
        const newNode=new Node(data);
        if(!this.head){
            this.head=newNode;
        }else{
           let  current=this.head;
            while(current.next){
                current=current.next;
            }
            current.next=newNode;
            console.log(this.head);
        }
    }
}
const lList = new linkedloist();
lList.addfirst(5)
lList.addfirst(15)
lList.addLast(51)