# [level 5] 쿼리의 모음의 개수 - 87394 

[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/87394) 

### 성능 요약

메모리: 9.61 MB, 시간: 147.35 ms

### 구분

코딩테스트 연습 > 월간 코드 챌린지 시즌3

### 채점결과

정확성: 100.0<br/>합계: 100.0 / 100.0

### 제출 일자

2026년 03월 12일 20:42:26

### 문제 설명

<p>길이가 <code>n</code>인 배열 <code>a</code>가 주어집니다. 당신은 여기에 <code>q</code>개의 쿼리를 순차적으로 날려 <code>n</code>개의 0으로 이루어진 배열을 <code>a</code>로 만들고자 합니다.</p>

<p><code>query(l, r, x)</code>는 다음 수도코드와 같은 역할을 합니다. (0 ≤ <code>l</code> ≤ <code>r</code> &lt; <code>n</code>, 1 ≤ <code>x</code> ≤ 10<sup>5</sup> )</p>
<div class="highlight"><pre class="codehilite"><code>for i = l, l+1, ..., r:
    a[i] := max(a[i], x)
</code></pre></div>
<p><code>q</code>개의 쿼리를 통해 <code>a</code>를 만드는 방법은 여러 가지가 있을 수 있습니다. 예를 들어 <code>a = [1,2]</code>, <code>q = 2</code>라면 다음 4가지 방법으로 <code>a</code>를 만들 수 있습니다.</p>

<ol>
<li><code>query(0, 0, 1)</code>, <code>query(1, 1, 2)</code></li>
<li><code>query(1, 1, 2)</code>, <code>query(0, 0, 1)</code></li>
<li><code>query(0, 1, 1)</code>, <code>query(1, 1, 2)</code></li>
<li><code>query(1, 1, 2)</code>, <code>query(0, 1, 1)</code></li>
</ol>

<p>정수 <code>q</code>와 정수 배열 <code>a</code>가 매개변수로 주어집니다. <code>q</code>개의 쿼리를 통해 <code>a</code>를 만드는 방법의 가짓수를 998,244,353으로 나눈 나머지를 return 하도록 solution 함수를 완성해주세요.</p>

<hr>

<h5>제한사항</h5>

<ul>
<li>1 ≤ <code>q</code> ≤ 50</li>
<li>1 ≤ <code>a</code>의 길이 ≤ 50</li>
<li>1 ≤ <code>a</code>의 모든 원소 ≤ 10<sup>5</sup></li>
</ul>

<hr>

<h5>입출력 예</h5>
<table class="table">
        <thead><tr>
<th>q</th>
<th>a</th>
<th>result</th>
</tr>
</thead>
        <tbody><tr>
<td>2</td>
<td>[1,2]</td>
<td>4</td>
</tr>
<tr>
<td>3</td>
<td>[3]</td>
<td>19</td>
</tr>
<tr>
<td>5</td>
<td>[1,4,4]</td>
<td>157740</td>
</tr>
<tr>
<td>50</td>
<td>[1,6,5,2,4]</td>
<td>61953538</td>
</tr>
</tbody>
      </table>
<hr>

<h5>입출력 예 설명</h5>

<p><strong>입출력 예 #1</strong></p>

<ul>
<li>문제 예시와 같습니다.</li>
</ul>

<p><strong>입출력 예 #2</strong></p>

<ul>
<li><code>a</code>를 만들기 위해 날릴 수 있는 쿼리는 오직 <code>query(0, 0, 1)</code>, <code>query(0, 0, 2)</code>, <code>query(0, 0, 3)</code> 뿐입니다. 3<sup>3</sup> = 27가지 경우의 수 중에서 <code>query(0, 0, 3)</code>을 사용하지 않는 8가지 경우를 걸러내면 답은 27 - 8 = 19가 됩니다. 따라서, 19를 return 해야 합니다.</li>
</ul>

<p><strong>입출력 예 #3</strong></p>

<ul>
<li><code>a</code>를 만들 수 있는 경우의 수가 157,740가지 이므로, 157,740을 return 해야 합니다.</li>
</ul>

<p><strong>입출력 예 #4</strong></p>

<ul>
<li>설명 생략</li>
</ul>


> 출처: 프로그래머스 코딩 테스트 연습, https://school.programmers.co.kr/learn/challenges