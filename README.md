# ZARI
별자리의 자리를 따와서 ZARI로 지었습니다.

## 프로젝트 구조
- `src` : 프로젝트의 소스 코드가 들어있는 디렉토리입니다.
- `src/client` : 클라이언트 코드가 들어있는 디렉토리입니다.
- `src/server` : 서버 코드가 들어있는 디렉토리입니다.
  - `src/server/demo` : 더미 데이터가 들어있는 디렉토리입니다.
  - `src/server/MVC` : MVC 패턴을 적용한 디렉토리입니다.
    - `src/server/MVC/Routes` : 라우터가 들어있는 디렉토리입니다.
    - `src/server/MVC/Controllers` : 컨트롤러가 들어있는 디렉토리입니다.
    - `src/server/MVC/Services` : 서비스가 들어있는 디렉토리입니다.
    - `src/server/MVC/Models` : 모델이 들어있는 디렉토리입니다.

## 서비스 주소
- [프로덕트]([https://zari.xiyo.dev/)
- [디벨로프]([https://zari-dev.xiyo.dev/)

## 로컬에서 프로젝트 시작하기
1. `git clone [URL]` 
2. `npm install`
3. `npm start`

### 알아두기
프로젝트의 루트에 `.env` 파일이 없으면 로컬 모드로 실행 됩니다.
- 더미 데이터는 `src/server/demo` 디렉토리에 있습니다.