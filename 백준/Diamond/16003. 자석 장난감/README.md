# [Diamond I] 자석 장난감 - 16003 

[문제 링크](https://www.acmicpc.net/problem/16003) 

### 성능 요약

메모리: 113160 KB, 시간: 556 ms

### 분류

그래프 이론, 현 그래프

### 제출 일자

2026년 1월 17일 18:38:46

### 문제 설명

<p style="margin:0cm 0cm 0.0001pt; text-align:justify"><span style="font-family:"맑은 고딕"">제이지는 리틀 프렌즈를 위한 장난감 세트를 출시했다. 이 장난감 세트에는 리틀 프렌즈 모양의 N 개의 동그란 자석과 M 개의 줄 모양의 자석이 있다. 동그란 자석은 서로 붙지 않고, 줄 모양 자석 역시 서로 붙지 않는다. 하지만 줄 모양 자석과 동그란 자석은 서로 붙기 때문에, 이 자석들을 모아두면 서로 다른 두 개의 동그란 자석을 줄 모양 자석이 연결하는 형태가 된다.</span></p>

<p style="margin:0cm 0cm 0.0001pt; text-align:justify"><span style="font-family:"맑은 고딕"">이 장난감 세트를 가지고 노는 방법은 이렇게 연결되어있는 동그란 자석들을 하나씩 제거해가는 것이다. 어떤 동그란 자석 X 를 제거하면 X 에 붙어있는 줄 모양 자석도 모두 제거되는데, 이때 자석 X 를 제거하기 위해서는 X 와 줄 모양 자석으로 연결되어있는 다른 <strong>모든 동그란 자석들의 모든 쌍이</strong> 줄 모양 자석으로 연결되어있어야 한다.</span></p>

<p style="margin:0cm 0cm 0.0001pt; text-align:justify"> </p>

<p style="margin:0cm 0cm 0.0001pt; text-align:justify"><span style="font-family:"맑은 고딕"">예를 들어, 아래 그림과 같은 자석들의 연결 상태에서는 위에서 설명한 규칙에 따라 모든 자석의 제거가 가능하다.</span></p>

<p style="margin:0cm 0cm 0.0001pt; text-align:justify"><img alt="" src="https://upload.acmicpc.net/367f3681-bf95-4b93-826d-3d3238d7612b/-/preview/"><br>
<span style="font-family:"맑은 고딕"">아래 상태 역시 모든 자석을 제거할 수 있다. 예를 들어 무지 – 어피치 – 콘 – 튜브 – 라이언의 순서로 제거할 수도 있고 다른 순서로도 가능하다.</span></p>

<p style="margin:0cm 0cm 0.0001pt; text-align:justify"><img alt="" src="https://upload.acmicpc.net/d0ac53f5-e392-47fd-97ab-d63f66f5a37a/-/preview/"><br>
<span style="font-family:"맑은 고딕"">하지만 아래 그림의 경우에는 불가능하다. 처음에 제거할 수 있는 자석이 라이언뿐인데, 그 후 다른 어떤 자석도 제거할 수 없기 때문이다.</span></p>

<p style="margin:0cm 0cm 0.0001pt; text-align:justify"><img alt="" src="https://upload.acmicpc.net/0ed908a6-4f27-4e11-ba3e-c3c7cd7d95f8/-/preview/"><br>
<span style="font-family:"맑은 고딕"">제이지는 이 장난감 세트를 가지고 놀 리틀 프렌즈를 위해 자석들의 연결 상태가 모든 자석을 제거할 수 있는 방법이 있는지 알려주는 프로그램 역시 동봉하려고 한다. 제이지와 리틀 프렌즈를 위해 여러분이 그 프로그램을 작성해주자.</span></p>

### 입력 

 <p style="margin:0cm 0cm 0.0001pt; text-align:justify"><span style="font-family:"맑은 고딕"">첫 번째 줄에 동그란 자석의 개수 N과 줄 모양 자석의 개수 M 이 주어진다. 동그란 자석은 모두 1 번부터 N 번까지 번호가 붙어 있다. (1≤N≤100,000, 1≤M≤300,000)</span></p>

<p><span style="font-family:"맑은 고딕"">이후 M 개의 줄 각각에 줄 모양 자석이 연결하는 서로 다른 두 동그란 자석의 번호가 주어진다. 동일한 동그란 자석 쌍을 연결하는 줄 모양 자석은 최대 1개이다.</span></p>

### 출력 

 <p style="margin:0cm 0cm 0.0001pt; text-align:justify"><span style="font-family:"맑은 고딕"">입력으로 주어진 연결 상태에서 규칙에 따라 모든 자석을 제거할 수 있는 경우 첫 줄에 1을 출력하고, 다음 줄에 모든 자석이 제거되는 자석 번호의 순서를 출력한다. 가능한 순서가 여러 개이면 그 중 아무것이나 출력해도 좋다. 규칙에 따라 모든 자석을 제거할 수 없는 경우 한 줄에 0을 출력한다.</span></p>

