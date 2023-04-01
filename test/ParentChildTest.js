/**
 * 부모와 자식의 정적 변수, 멤버 변수, 생성자를 호출하는 순서를 알아보자.
 * 결과, 부모의 정적 변수, 멤버 변수, 생성자가 먼저 호출되고, 자식의 정적 변수, 멤버 변수, 생성자가 호출된다.
 */
class Parent {
    static publicStaticMember = (() => {
        console.log("Parent's publicStaticMember");
        return 1;
    })();

    publicMember = (() => {
        console.log("Parent's publicMember");
        return 1;
    })();

    constructor() {
        console.log('this is parent constructor');
    }
}

class Child extends Parent {
    static publicStaticMemberChild = (() => {
        console.log("Child's publicStaticMember");
        return 1;
    })()

    publicMemberChild = (() => {
        console.log("Child's publicMember");
        return 1;
    })();

    constructor() {
        super();
        console.log('this is child constructor');
    }
}

const child = new Child();

console.log(1234);