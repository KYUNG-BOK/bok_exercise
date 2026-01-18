# [Platinum I] 숏코딩 - 15956 

[문제 링크](https://www.acmicpc.net/problem/15956) 

### 성능 요약

메모리: 57404 KB, 시간: 328 ms

### 분류

구현, 자료 구조, 문자열, 집합과 맵, 많은 조건 분기, 분리 집합, 파싱

### 제출 일자

2026년 1월 18일 15:24:12

### 문제 설명

<p>코드 페스티벌 온라인 예선에 참가하고 있던 라이언은 이제 남은 시간이 <span id="remaining-time">00:00:00</span>밖에 없다는 것을 깨닫게 되었다. 라이언은 이미 머릿속에서 풀이를 구상하고 코딩도 완료했기 때문에, 이를 그대로 타이핑하기만 하면 된다.</p>

<p style="text-align: center;"><img alt="" src="https://upload.acmicpc.net/6d222569-3f51-447f-9ea9-9a9b77bfe041/-/preview/"></p>

<p>지금 라이언은 변수들과 정수들끼리 같은지 다른지 비교하는 간단한 조건문 (conditional expression) <em>S</em>를 작성하고자 한다. 자세히 설명하자면,</p>

<ul>
	<li>라이언이 작성하는 <strong>변수</strong>의 이름은 영문 알파벳으로만 구성된 문자열이다. 예를 들어, <code>kakao</code>, <code>COde</code>, <code>festival</code>은 변수의 이름이 될 수 있지만, <code>C0de</code>, <code>2018</code>, <code>hello_world</code>는 변수의 이름이 될 수 없다. 변수는 정수 값을 저장하고 있으며, 변수의 <strong>값</strong>은 해당 변수가 저장하고 있는 정수 값을 의미한다.</li>
	<li>라이언이 작성하는 <strong>정수</strong>는 무조건 -10<sup>9</sup> 이상 10<sup>9</sup> 이하이다. 0을 제외한 정수는 숫자 <code>0</code>으로 시작하지 않으며, 0을 표기하는 유일한 방법은 <code>0</code>이다. 예를 들어, 라이언은 <code>0</code>, <code>123456</code>, <code>-987654321</code> 과 같은 정수는 작성할 수 있지만, <code>-0</code>, <code>0123</code>, <code>00000</code>, <code>-009876</code>, <code>999999999999999</code>와 같은 정수는 작성할 수 없다.</li>
	<li><strong>단항식</strong>은 <strong>변수</strong> 또는 <strong>정수</strong>이다.</li>
	<li>라이언은 아래 두 개의 <strong>비교 연산자</strong>를 사용하여 <strong>논리식</strong>을 만든다.
	<ul>
		<li><strong>같음 연산자</strong> <code>==</code>: <code><a>==<b></code>와 같이 사용하며, 두 단항식 <code><a></code>와 <code><b></code>의 값을 계산하여, 같으면 <code>true</code>를, 다르면 <code>false</code>를 반환한다.</li>
		<li><strong>다름 연산자</strong> <code>!=</code>: <code><a>!=<b></code>와 같이 사용하며, 두 단항식 <code><a></code>와 <code><b></code>의 값을 계산하여, 다르면 <code>true</code>를, 같으면 <code>false</code>를 반환한다.</li>
		<li>위의 두 연산자 모두, 연산자의 좌변과 우변에는 <strong>오직</strong> 단항식만이 올 수 있다. 예를 들어, <code>(a==b)!=(b==c)</code>는 <code>!=</code>의 좌변과 우변에 단항식이 아닌 논리식이 들어 있으므로 라이언이 사용하는 논리식이 아니다.</li>
	</ul>
	</li>
	<li>라이언은 논리곱 연산자 <code>&&</code>로 <strong>한 개 이상의</strong> 논리식들을 연결하여 <strong>조건문</strong>을 만든다. 연결한 논리식들이 <strong>모두</strong> <code>true</code>를 반환할 때에만 <code>true</code>, 그렇지 않다면 <code>false</code>를 반환하도록 할 것이다. 연결할 때에 공백 등을 삽입하지 않는다. 예를 들어, 라이언이 세 논리식 <code>a==b</code>, <code>b!=c</code>, <code>1!=a</code>를 연결하고자 한다면, <code>a==b&&b!=c&&1!=a</code>와 같이 연결한다.</li>
</ul>

<p>라이언이 작성하고자 하는 조건문 <em>S</em>는 위 문단에서 언급한 방법으로만 만들 수 있음이 보장된다.</p>

<p>하지만, 라이언은 남은 시간에 비해 <em>S</em>의 길이가 너무 길다고 생각하여, <em>S</em>와 동치이면서 위에서 제시된 방법으로 만들 수 있는 길이가 가장 짧은 조건문 <em>S'</em>을 대신 입력할 생각이다. 두 조건문 <em>T<sub>1</sub></em>과 <em>T<sub>2</sub></em>가 동치라는 것은, 어떤 변수 (조건문에 등장하지 않는 모든 가능한 변수도 포함) 에 어떤 값 (라이언이 작성하지 않는 정수도 가능)을 넣더라도 <em>T<sub>1</sub></em>의 참/거짓 여부와 <em>T<sub>2</sub></em>의 참/거짓 여부가 같다는 것이다.</p>

<p>라이언을 위해, <em>S'</em>을 대신 구해주는 프로그램을 작성하자. <em>S'</em>이 여러 가지 있다면, 그 중 하나를 아무거나 구해주면 된다.</p>
<script>
var endTime = new Date("9999-08-04 19:00:00+0900").getTime();
setInterval(function() {
  var currentTime = new Date().getTime();
  var diff = endTime - currentTime;
  if (diff < 0) diff = 0;
  var hours = Math.floor(diff / 1000 / 60 / 60) % 24;
  var minutes = Math.floor(diff / 1000 / 60 % 60);
  var seconds = Math.floor(diff / 1000 % 60);
  $("#remaining-time").text(("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2)); 
}, 1000);
</script>

### 입력 

 <p>첫 번째 줄에 라이언이 입력하고자 하는 조건문 <em>S</em>(1 ≤ |<em>S</em>| ≤ 10<sup>6</sup>)가 주어진다.</p>

### 출력 

 <p>첫 번째 줄에 <em>S</em>와 동치이면서, 문제 본문에 제시된 방법으로 만들 수 있는 길이가 가장 짧은 조건문 <em>S'</em>을 출력한다.</p>

