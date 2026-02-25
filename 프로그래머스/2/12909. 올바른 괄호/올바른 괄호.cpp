#include <bits/stdc++.h>
using namespace std;

bool solution(string s) {
    int bal = 0;
    for (char c : s) {
        if (c == '(') bal++;
        else {
            if (bal == 0) return false;
            bal--;
        }
    }
    return bal == 0;
}