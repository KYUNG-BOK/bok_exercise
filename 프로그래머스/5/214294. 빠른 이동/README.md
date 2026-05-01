# [level 5] 빠른 이동 - 214294 

[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/214294) 

### 성능 요약

메모리: 15.5 MB, 시간: 326.29 ms

### 구분

코딩테스트 연습 > 2023 현대모비스 알고리즘 경진대회 본선

### 채점결과

정확성: 100.0<br/>합계: 100.0 / 100.0

### 제출 일자

2026년 05월 01일 11:02:53

### 문제 설명

<p>현대모비스의 주행시험장 트랙을 주행해 볼 수 있는 가상 시뮬레이션 프로그램이 있습니다. 시뮬레이션의 트랙에는 1 ~ <code>n</code>의 서로 다른 번호가 붙은 지점이 <code>n</code>개 있으며, 각 지점마다 고유한 스탬프가 있습니다. 각 지점을 방문할 때 해당 지점의 스탬프를 얻을 수 있습니다. 당신은 1번 지점에서 시작하여 각 지점을 최소 한 번씩 방문해 <code>n</code>가지 스탬프를 모두 모으려 합니다.</p>

<p>지점들은 <code>m</code>개의 단방향 도로로 연결되어 있습니다. 당신은 지점 사이를 이동하기 위해 단방향 도로를 이용할 수 있습니다. </p>

<p>다음은 <code>n</code> = 6인 예시입니다.</p>

<p><img src="https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/files/production/70e3b68c-64d7-4b5a-a5d8-071d258f8cdb/ex1.png" title="" alt="ex1.png"></p>

<ul>
<li>각 원은 지점을 나타내며, 원 안에 적힌 수는 지점의 번호를 나타냅니다.</li>
<li>화살표는 두 지점을 연결하고 있는 단방향 도로를 나타냅니다.</li>
</ul>

<p>위 예시에서 1번 지점에서 출발해 <code>1 - 2 - 6</code>과 같은 경로로 움직이면 1, 2, 6번 지점의 스탬프 3가지를 모을 수 있습니다. 하지만 6번 지점에 도착하면 더 이상 이용할 수 있는 도로가 없습니다. </p>

<p>시뮬레이션에는 단방향 도로를 이용하는 것 외의 이동 방법으로 <code>빠른 이동</code> 기능이 있습니다. <code>빠른 이동</code>이란 당신이 스탬프를 얻은 지점 중 원하는 곳으로 순간 이동할 수 있는 기능입니다. 예를 들어 위 예시에서 <code>1 - 2 - 6 - 2(빠른 이동) - 4 - 3 - 5</code>와 같은 경로로 움직이면 모든 지점을 한 번씩 방문해 <code>n</code>가지 스탬프를 모두 모을 수 있습니다.</p>

<p>당신은 <code>n</code>가지 스탬프를 모두 모으기 위해 필요한 <code>빠른 이동</code>의 최소 사용 횟수를 알고 싶습니다.</p>

<p>지점의 수를 나타내는 정수 <code>n</code>과 지점을 연결하는 단방향 도로들의 정보를 담고 있는 2차원 정수 배열 <code>roads</code>가 매개변수로 주어집니다. 이때, 1번 지점에서 출발해 <code>n</code>가지 스탬프를 모두 모으기 위해 필요한 <code>빠른 이동</code>의 최소 사용 횟수를 return 하도록 solution 함수를 완성해 주세요.</p>

<hr>

<h5>제한사항</h5>

<ul>
<li>2 ≤ <code>n</code> ≤ 500</li>
<li><code>n</code> - 1 ≤ <code>roads</code>의 길이 = <code>m</code> ≤ 100,000</li>
<li><code>roads</code>의 원소는 <code>[a, b]</code> 형태입니다.

<ul>
<li><code>a</code>번 지점에서 <code>b</code>번 지점으로 이동할 수 있는 단방향 도로를 의미합니다.</li>
<li>1 ≤ <code>a</code>, <code>b</code> ≤ <code>n</code></li>
<li><code>a</code> ≠ <code>b</code></li>
<li>같은 도로는 최대 한 번만 주어집니다.</li>
</ul></li>
<li>도착 불가능한 지점이 있는 경우는 주어지지 않습니다.</li>
</ul>

<hr>

<h5>입출력 예</h5>
<table class="table">
        <thead><tr>
<th>n</th>
<th>roads</th>
<th>result</th>
</tr>
</thead>
        <tbody><tr>
<td>6</td>
<td>[[1, 2], [2, 6], [2, 4], [4, 3], [3, 2], [3, 5]]</td>
<td>1</td>
</tr>
<tr>
<td>5</td>
<td>[[1, 2], [2, 3], [3, 4], [4, 5]]</td>
<td>0</td>
</tr>
<tr>
<td>8</td>
<td>[[6, 4], [2, 3], [1, 6], [4, 5], [1, 2], [1, 8], [3, 7], [7, 2]]</td>
<td>2</td>
</tr>
<tr>
<td>9</td>
<td>[[1, 2], [1, 3], [1, 4], [2, 5], [4, 5], [5, 6], [5, 7], [6, 9], [7, 9], [5, 8]]</td>
<td>3</td>
</tr>
<tr>
<td>7</td>
<td>[[1, 2], [2, 3], [3, 4], [4, 5], [3, 6], [1, 7], [7, 4]]</td>
<td>1</td>
</tr>
</tbody>
      </table>
<hr>

<h5>입출력 예 설명</h5>

<p><strong>입출력 예 #1</strong></p>

<p>문제 예시와 같습니다.</p>

<p><strong>입출력 예 #2</strong></p>

<p>지점들의 연결 상태는 아래 그림과 같습니다.</p>

<p><img src="https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/files/production/05f71f64-1ef6-46dc-9dcc-27debbe2e997/ex2.png" title="" alt="ex2.png"></p>

<p><code>1 - 2 - 3 - 4 - 5</code>와 같은 경로로 움직이면 <code>빠른 이동</code>을 사용하지 않고 모든 지점을 최소 한 번씩 방문해 5가지 스탬프를 모두 모을 수 있습니다.</p>

<p>따라서 0을 return 합니다.</p>

<p><strong>입출력 예 #3</strong></p>

<p>지점들의 연결 상태는 아래 그림과 같습니다.</p>

<p><img src="https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/files/production/638ee9b0-eac8-487b-826b-17fde1721823/ex3.png" title="" alt="ex3.png"></p>

<p><code>1 - 6 - 4 - 5 - 1(빠른 이동) - 2 - 3 - 7 - 1(빠른 이동) - 8</code>과 같은 경로로 움직이면 모든 지점을 최소 한 번씩 방문해 8가지 스탬프를 모두 모을 수 있으며, 이보다 <code>빠른 이동</code>을 적게 사용하는 방법은 없습니다.</p>

<p>따라서 2를 return 합니다.</p>

<p><strong>입출력 예 #4</strong></p>

<p>지점들의 연결 상태는 아래 그림과 같습니다.</p>

<p><img src="https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/files/production/d3e47636-ac04-470c-bf8b-afec58f5c446/ex5.png" title="" alt="ex5.png"></p>

<p><code>1 - 2 - 5 - 6 - 9 - 1(빠른 이동) - 4 - 5 - 7 - 5(빠른 이동) - 8 - 1(빠른 이동) - 3</code>과 같은 경로로 움직이면 모든 지점을 최소 한 번씩 방문해 9가지 스탬프를 모두 모을 수 있으며, 이보다 <code>빠른 이동</code>을 적게 사용하는 방법은 없습니다.</p>

<p>따라서 3을 return 합니다.</p>

<p><strong>입출력 예 #5</strong></p>

<p>지점들의 연결 상태는 아래 그림과 같습니다.</p>

<p><img src="https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/files/production/c1704a2e-4390-4899-a629-1aecce5a3b86/ex6.PNG" title="" alt="ex6.PNG"></p>

<p><code>1 - 2 - 3 - 6 - 1(빠른 이동) - 7 - 4 - 5</code>와 같은 경로로 움직이면 모든 지점을 최소 한 번씩 방문해 7가지 스탬프를 모두 모을 수 있으며, 이보다 <code>빠른 이동</code>을 적게 사용하는 방법은 없습니다.</p>

<p>따라서 1을 return 합니다.</p>


> 출처: 프로그래머스 코딩 테스트 연습, https://school.programmers.co.kr/learn/challenges