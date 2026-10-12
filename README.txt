하루 발자취 (아이폰·웹 버전) — 올리는 방법
===========================================
GitHub Pages(무료)에 올리면 https 주소가 생기고, 아이폰 사파리에서 열어 홈 화면에 추가해 쓸 수 있습니다.
(안드로이드 폰·컴퓨터 브라우저에서도 같은 주소로 열립니다.)

[1단계] 새 저장소 만들기 (폰에서도 가능)
1. GitHub 화면 위쪽 + ▾ > New repository
2. 이름: hanuru-web, 공개 범위: Public (무료 GitHub Pages는 Public만 가능), Create repository

[2단계] 파일 올리기
1. 이 zip의 압축을 풉니다.
2. 새 저장소 화면의 「uploading an existing file」 링크 > 압축 푼 파일을 모두 선택해 올리고 Commit changes
   (README.txt 는 빼도 됩니다.)

[3단계] 주소 켜기
1. 저장소 위쪽 Settings > 왼쪽 Pages
2. Build and deployment 의 Source 를 「Deploy from a branch」, Branch 를 main / (root) 로 정하고 Save
3. 1~2분 뒤 같은 화면 위에 주소가 나옵니다. 예) https://내아이디.github.io/hanuru-web/

[4단계] 아이폰에서 설치
1. 사파리로 주소를 엽니다. (크롬이 아니라 사파리에서 해야 홈 화면에 추가가 됩니다)
2. 아래 가운데 공유 버튼(□↑) > 「홈 화면에 추가」 > 추가
3. 홈 화면의 「하루 발자취」를 열고 「기록 시작」 > 위치 허용(「앱을 사용하는 동안 허용」)
4. 기록하는 동안 화면을 켜 두세요. 아이폰은 화면이 꺼지거나 다른 앱으로 넘어가면 기록이 멈춥니다.

[클라우드 저장 (선택)]
- config.js 에 Firebase 설정값을 넣으면 기록이 클라우드에도 저장됩니다. 비워 두면 그 폰 안에만 저장됩니다.
- Firebase 콘솔: Authentication > 로그인 방법 > 「이메일/비밀번호」 사용 설정
  (아이폰에서는 이메일 로그인을 씁니다. 로그인 버튼 > 「처음이면 가입」)
- Firestore 규칙 (본인만 읽고 쓰기):

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}

- 안드로이드 앱과 같은 이메일로 로그인하면 같은 기록이 보입니다.
- 저장소가 Public 이므로 config.js 에 넣는 Firebase 값이 공개됩니다. 이 값은 비밀번호가 아니고 위 규칙이 접근을 막지만,
  규칙을 꼭 넣어 주세요.

제작자 인스타 @greada_2
