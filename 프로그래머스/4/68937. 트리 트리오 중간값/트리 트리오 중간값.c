#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>

int bfs(int start, int n, int* head, int* to, int* next, int* dist, int* farCount) {
    int* q = (int*)malloc(sizeof(int) * (n + 1));
    int front = 0, rear = 0;

    for (int i = 1; i <= n; i++) dist[i] = -1;

    dist[start] = 0;
    q[rear++] = start;

    int far = start;
    int maxDist = 0;

    while (front < rear) {
        int cur = q[front++];

        if (dist[cur] > maxDist) {
            maxDist = dist[cur];
            far = cur;
        }

        for (int e = head[cur]; e != -1; e = next[e]) {
            int nxt = to[e];

            if (dist[nxt] == -1) {
                dist[nxt] = dist[cur] + 1;
                q[rear++] = nxt;
            }
        }
    }

    *farCount = 0;

    for (int i = 1; i <= n; i++) {
        if (dist[i] == maxDist) {
            (*farCount)++;
        }
    }

    free(q);
    return far;
}

int solution(int n, int** edges, size_t edges_rows, size_t edges_cols) {
    int* head = (int*)malloc(sizeof(int) * (n + 1));
    int* to = (int*)malloc(sizeof(int) * edges_rows * 2);
    int* next = (int*)malloc(sizeof(int) * edges_rows * 2);
    int* dist = (int*)malloc(sizeof(int) * (n + 1));

    for (int i = 1; i <= n; i++) head[i] = -1;

    int idx = 0;

    for (size_t i = 0; i < edges_rows; i++) {
        int a = edges[i][0];
        int b = edges[i][1];

        to[idx] = b;
        next[idx] = head[a];
        head[a] = idx++;

        to[idx] = a;
        next[idx] = head[b];
        head[b] = idx++;
    }

    int countA = 0;
    int countB = 0;

    int a = bfs(1, n, head, to, next, dist, &countA);
    int b = bfs(a, n, head, to, next, dist, &countA);

    int diameter = dist[b];

    bfs(b, n, head, to, next, dist, &countB);

    int answer = (countA >= 2 || countB >= 2) ? diameter : diameter - 1;

    free(head);
    free(to);
    free(next);
    free(dist);

    return answer;
}