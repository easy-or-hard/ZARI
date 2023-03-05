import e from "express";

/**
 * singleton class
 * {@link AbstractRouter}
 */
export default class AbstractRouter {

    /**
     * singleton , dont use constructor!!!!!
     * @protected
     */
    protected constructor() {
        throw new Error();
    }

    /**
     * 라우팅을 직접 구현하세요.
     * interface, abstract 를 사용하고 싶으나 제약이 너무나 많음.
     * interface 는 static 을 사용할 수 없고,
     * abstract 는 abstract static 을 사용 할 수 없음.
     * 그래서 그냥 네이밍 컨벤션으로 갑니다.
     * @param {e.Application} application
     */
    static setRoute(application: e.Application): void {};
}