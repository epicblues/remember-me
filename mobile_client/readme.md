# 안드로이드 실행 방법

## 2 개의 터미널이 필요하다.

1. npx react-native start
1. npx react-native run-android

## 네트워크 설정(API 요청 용)

- 안드로이드 가상 머신은 초기 설정된 8081 포트를 통해 로컬 컴퓨터와 통신
  - 컴파일된 react-native 소스 코드를 가상 머신에 보낸다.(metro)
- localhost를 사용하려면 가상 머신 포트와 로컬 머신 포트를 연결해야 한다.
  ```bash
  adb reverse REMOTE LOCAL
  adb reverse tcp:5000 tcp:5000
  # remote의 포트를 local 포트와 연결한다.
  # 내 pc의 5000번 포트서 실행되는 애플리케이션과 통신할 수 있다.
  ```
