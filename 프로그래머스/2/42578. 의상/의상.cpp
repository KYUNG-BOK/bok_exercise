#include <string>
#include <vector>
#include <unordered_map>

using namespace std;

int solution(vector<vector<string>> clothes) {
    unordered_map<string, int> cnt;

    for (auto &c : clothes) {
        const string &type = c[1];
        cnt[type]++;
    }

    long long ans = 1;
    for (auto &p : cnt) {
        ans *= (p.second + 1);
    }

    return (int)(ans - 1); // 아무것도 입지 않는 경우의 수는 제외합니닷.
}