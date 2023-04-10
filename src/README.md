# restful api 서버(http api?)

## 컨벤션
### 파일 이름
- 임포트시에 객체를 바로 생성하는 싱글톤 객체는 kebab-case(ex: zodiac-universe-model.js)
- 클래스는 camel case, (ex: ConflictError.js)
- 다른 노드 모듈에 설정값을 추가한 객체는 그 모듈의 앞에 'custom-'을 붙인다.(ex: custom-process.js, custom-morgan.js)

### 프로퍼티와 메소드 컨벤션
개발시 케이스만 적었고, 이 외의 케이스는 논의가 필요합니다.
- 다른 모듈을 랩할 때 그 모듈을 사용하는 방법과 동일하게 랩합니다.
  - custom-morgan.js 은 원래 app.use(morgan()) 형태로 사용하므로 래퍼도 똑같이 메소드 형대로 노출
  - swagger-jsdoc.js 는 원래 app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)) 형태로 사용하므로 server 는 프로퍼티로 노출하고, setup 은 메소드로 노출

